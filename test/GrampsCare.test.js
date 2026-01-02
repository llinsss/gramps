const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GrampsCare", function () {
    let GrampsCare;
    let contract;
    let owner;
    let caregiver;
    let sibling;
    let stranger;

    beforeEach(async function () {
        [owner, caregiver, sibling, stranger] = await ethers.getSigners();
        const GrampsCareFactory = await ethers.getContractFactory("GrampsCare");
        contract = await GrampsCareFactory.deploy();
        // In ethers v6, deployment is awaited differently, but Hardhat helper usually makes it awaitable directly or via .waitForDeployment()
        // However, the standard hardhat-toolbox factory.deploy() returns a contract instance that might need .waitForDeployment() in v6
        // or just await contract.deployed() in v5. 
        // Let's try the modern v6 pattern: await contract.waitForDeployment();
        // But default hardhat ethers might still behave like v5 if the 'hardhat-ethers' version is old.
        // Given the "parseEther" error, it's definitely v6.
        await contract.waitForDeployment();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await contract.owner()).to.equal(owner.address);
        });

        it("Should verify owner is a caregiver", async function () {
            await expect(
                contract.payExpense(stranger.address, 0, "Test")
            ).not.to.be.revertedWith("Not a caregiver");
        });
    });

    describe("Access Control", function () {
        it("Should allow owner to add a caregiver", async function () {
            await contract.addCaregiver(caregiver.address);
            expect(await contract.caregivers(caregiver.address)).to.equal(true);
        });

        it("Should emit CaregiverAdded event", async function () {
            await expect(contract.addCaregiver(caregiver.address))
                .to.emit(contract, "CaregiverAdded")
                .withArgs(caregiver.address);
        });

        it("Should allow owner to remove a caregiver", async function () {
            await contract.addCaregiver(caregiver.address);
            await contract.removeCaregiver(caregiver.address);
            expect(await contract.caregivers(caregiver.address)).to.equal(false);
        });

        it("Should NOT allow strangers to manage caregivers", async function () {
            await expect(
                contract.connect(stranger).addCaregiver(caregiver.address)
            ).to.be.revertedWith("Not authorized");
        });
    });

    describe("Care Fund (Deposits & Expenses)", function () {
        // Ethers v6 uses parseEther directly
        const depositAmount = ethers.parseEther("1.0");

        beforeEach(async function () {
            // Seed contract with funds
            await owner.sendTransaction({
                to: await contract.getAddress(),
                value: depositAmount,
            });
            await contract.addCaregiver(caregiver.address);
        });

        it("Should accept deposits from anyone", async function () {
            const extraFunds = ethers.parseEther("0.5");
            await expect(
                sibling.sendTransaction({ to: await contract.getAddress(), value: extraFunds })
            )
                .to.emit(contract, "Deposit")
                .withArgs(sibling.address, extraFunds);

            const balance = await ethers.provider.getBalance(await contract.getAddress());
            // Ethers v6 uses native BigInts, so we use standard math operators
            expect(balance).to.equal(depositAmount + extraFunds);
        });

        it("Should allow caregiver to pay expense", async function () {
            const expenseAmount = ethers.parseEther("0.1");
            await expect(
                contract.connect(caregiver).payExpense(stranger.address, expenseAmount, "Meds")
            )
                .to.emit(contract, "ExpensePaid")
                .withArgs(caregiver.address, stranger.address, expenseAmount, "Meds");

            const balance = await ethers.provider.getBalance(await contract.getAddress());
            expect(balance).to.equal(depositAmount - expenseAmount);
        });

        it("Should NOT allow non-caregiver to pay expense", async function () {
            const expenseAmount = ethers.parseEther("0.1");
            await expect(
                contract.connect(stranger).payExpense(stranger.address, expenseAmount, "Fraud")
            ).to.be.revertedWith("Not a caregiver");
        });

        it("Should fail if insufficient funds", async function () {
            const tooMuch = ethers.parseEther("5.0");
            await expect(
                contract.connect(caregiver).payExpense(stranger.address, tooMuch, "Lambo")
            ).to.be.revertedWith("Insufficient funds");
        });
    });

    describe("Document Registry (The Vault)", function () {
        const docHash = ethers.id("Last Will and Testament v1");

        beforeEach(async function () {
            await contract.addCaregiver(caregiver.address);
        });

        it("Should allow caregiver to register a document", async function () {
            await expect(
                contract.connect(caregiver).registerDocument(docHash, "Legal")
            )
                .to.emit(contract, "DocumentRegistered");

            const result = await contract.verifyDocument(docHash);
            expect(result.exists).to.equal(true);
            expect(result.timestamp).to.be.gt(0);
        });

        it("Should NOT allow duplicates", async function () {
            await contract.registerDocument(docHash, "Legal");
            await expect(
                contract.registerDocument(docHash, "Legal")
            ).to.be.revertedWith("Document already registered");
        });

        it("Should return false for unknown documents", async function () {
            const randomHash = ethers.id("Fake Doc");
            const result = await contract.verifyDocument(randomHash);
            expect(result.exists).to.equal(false);
        });
    });
});
