const hre = require("hardhat");

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
    const signers = await hre.ethers.getSigners();
    const owner = signers[0];
    const caregivers = signers.slice(1, 4); // Use next 3 accounts as caregivers
    const payees = signers.slice(4, 7); // Use next 3 as payees (pharmacy, etc.)

    const contract = await hre.ethers.getContractAt("GrampsCare", CONTRACT_ADDRESS);

    console.log(`Connecting to GrampsCare at ${CONTRACT_ADDRESS}...`);

    // 1. Add Caregivers
    console.log("Adding caregivers...");
    for (const caregiver of caregivers) {
        const tx = await contract.connect(owner).addCaregiver(caregiver.address);
        await tx.wait();
        console.log(`Added caregiver: ${caregiver.address}`);
    }

    // 2. Generate Random Transactions
    console.log("Generating transactions...");

    const reasons = ["Meds", "Groceries", "Utility Bill", "Checkup", "Therapy", "Transport"];
    const docs = ["Will", "Insurance", "DNR", "Prescription", "Receipt"];

    for (let i = 0; i < 25; i++) {
        const randomAction = Math.floor(Math.random() * 3); // 0: Deposit, 1: Pay Expense, 2: Register Doc
        const signer = caregivers[Math.floor(Math.random() * caregivers.length)];

        try {
            if (randomAction === 0) {
                // Deposit
                const amount = (Math.random() * 0.5 + 0.01).toFixed(3);
                const tx = await signer.sendTransaction({
                    to: CONTRACT_ADDRESS,
                    value: hre.ethers.parseEther(amount)
                });
                await tx.wait();
                console.log(`[${i + 1}] Deposited ${amount} ETH from ${signer.address}`);

            } else if (randomAction === 1) {
                // Pay Expense
                const payee = payees[Math.floor(Math.random() * payees.length)];
                const amount = (Math.random() * 0.1 + 0.01).toFixed(3);
                const reason = reasons[Math.floor(Math.random() * reasons.length)];

                const tx = await contract.connect(signer).payExpense(payee.address, hre.ethers.parseEther(amount), reason);
                await tx.wait();
                console.log(`[${i + 1}] Paid ${amount} ETH to ${payee.address} for ${reason}`);

            } else {
                // Register Document
                const docName = `${docs[Math.floor(Math.random() * docs.length)]} #${Math.floor(Math.random() * 1000)}`;
                const hash = hre.ethers.id(docName); // Simulated hash
                const tx = await contract.connect(signer).registerDocument(hash, "Medical");
                await tx.wait();
                console.log(`[${i + 1}] Registered Document: ${docName}`);
            }
        } catch (e) {
            console.log(`[${i + 1}] Transaction failed (likely funds): ${e.message.split('(')[0]}`);
        }
    }

    console.log("Seeding complete!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
