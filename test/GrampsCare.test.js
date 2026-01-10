const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("GrampsCare", function () {
    async function deployFixture() {
        const [owner, caregiver, otherAccount] = await ethers.getSigners();
        const GrampsCare = await ethers.getContractFactory("GrampsCare");
        const gramps = await GrampsCare.deploy();
        return { gramps, owner, caregiver, otherAccount };
    }

    describe("1. Access Control", function () {
        it("Should set the right owner", async function () {
            const { gramps, owner } = await loadFixture(deployFixture);
            expect(await gramps.owner()).to.equal(owner.address);
        });

        it("Should allow owner to add a caregiver", async function () {
            const { gramps, caregiver } = await loadFixture(deployFixture);
            await gramps.addCaregiver(caregiver.address);
            expect(await gramps.caregivers(caregiver.address)).to.be.true;
        });

        it("Should preventing non-owners from adding caregivers", async function () {
            const { gramps, caregiver, otherAccount } = await loadFixture(deployFixture);
            await expect(
                gramps.connect(caregiver).addCaregiver(otherAccount.address)
            ).to.be.revertedWithCustomError(gramps, "NotAuthorized");
        });
    });

    describe("2. Financial Logic", function () {
        async function deployWithFundsFixture() {
            const { gramps, owner, caregiver, otherAccount } = await loadFixture(deployFixture);
            // Add caregiver
            await gramps.addCaregiver(caregiver.address);
            // Deposit 10 ETH
            await owner.sendTransaction({
                to: await gramps.getAddress(),
                value: ethers.parseEther("10.0")
            });
            return { gramps, owner, caregiver, otherAccount };
        }

        it("Should receive deposits", async function () {
            const { gramps } = await loadFixture(deployWithFundsFixture);
            const balance = await ethers.provider.getBalance(await gramps.getAddress());
            expect(balance).to.equal(ethers.parseEther("10.0"));
        });

        it("Should allow caregiver to spend within limit", async function () {
            const { gramps, caregiver, otherAccount } = await loadFixture(deployWithFundsFixture);
            const amount = ethers.parseEther("0.1"); // Below default 0.5 limit

            await expect(gramps.connect(caregiver).payExpense(otherAccount.address, amount, "Meds"))
                .to.changeEtherBalances(
                    [gramps, otherAccount],
                    [-amount, amount]
                );
        });

        it("Should revert if daily limit exceeded", async function () {
            const { gramps, caregiver, otherAccount } = await loadFixture(deployWithFundsFixture);
            const amount = ethers.parseEther("0.6"); // Above default 0.5 limit

            await expect(
                gramps.connect(caregiver).payExpense(otherAccount.address, amount, "Too much")
            ).to.be.revertedWithCustomError(gramps, "DailyLimitExceeded");
        });
    });

    describe("3. Document Registry", function () {
        it("Should register a document", async function () {
            const { gramps, caregiver } = await loadFixture(deployFixture);
            await gramps.addCaregiver(caregiver.address);

            const docHash = ethers.id("Will_V1.pdf");
            await gramps.connect(caregiver).registerDocument(docHash, "Legal");

            const [exists, timestamp] = await gramps.verifyDocument(docHash);
            expect(exists).to.be.true;
            expect(timestamp).to.be.gt(0);
        });

        it("Should prevent duplicate registration", async function () {
            const { gramps, caregiver } = await loadFixture(deployFixture);
            await gramps.addCaregiver(caregiver.address);

            const docHash = ethers.id("Will_V1.pdf");
            await gramps.connect(caregiver).registerDocument(docHash, "Legal");

            await expect(
                gramps.connect(caregiver).registerDocument(docHash, "LegalAgain")
            ).to.be.revertedWithCustomError(gramps, "DocumentAlreadyRegistered");
        });
    });
});
