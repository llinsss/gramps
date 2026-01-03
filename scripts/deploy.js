const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const grampsCare = await hre.ethers.deployContract("GrampsCare");

    await grampsCare.waitForDeployment();

    const address = await grampsCare.getAddress();

    console.log("GrampsCare deployed to:", address);

    // Optional: Seed with initial data
    console.log("Seeding initial data...");
    const tx = await deployer.sendTransaction({
        to: address,
        value: hre.ethers.parseEther("1.0")
    });
    await tx.wait();
    console.log("Deposited 1.0 ETH");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
