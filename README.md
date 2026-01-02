Senior Care Workflow Manager (Gramps)

Software for adult children to coordinate care for aging parents. Features include shared calendars for medical appointments, document storage for wills and property, and visit logs to track health and mood.

Features

- Dashboard: High-level overview of upcoming appointments, tasks, and health status.
- The Vault: Secure document storage for insurance cards, legal documents, and IDs.
- Visit Log: Timeline of family check-ins, allowing siblings to track mood and daily observations.
- Shared Calendar: Coordinate medical appointments and family events.
- Care Tasks: Manage bill payments, home maintenance, and daily duties.
- Web3 Integration: On-chain transparency for funds and documents.

Tech Stack

- Framework: Next.js (App Router)
- Styling: Vanilla CSS (CSS Modules)
- Design System: Glassmorphism / Dark Mode
- Blockchain: Solidity (Base Network)

Base Network Integration (Web3)

This project includes a Smart Contract (`contracts/GrampsCare.sol`) specifically optimized for the Base Network.

 Why Base?
We chose Base (Coinbase's L2) for its low transaction fees, high security, and seamless integration with consumer crypto tools, making it ideal for non-technical family members.

 Contract Features
The `GrampsCare.sol` contract provides:
1.  Care Fund: A transparent, shared wallet for family expenses. Siblings can deposit ETH/USDC, and authorized caregivers can withdraw for verified bills (Pharmacy, Utilities).
2.  Document Registry: Uses `keccak256` hashing to store a "Proof of Existence" for critical documents (Wills, DNRs) in "The Vault" without exposing the actual file content, ensuring immutability.

Optimizations
- Event-Driven Storage: Utilizes EVM events over expensive storage arrays to minimize gas costs on L2.
- Calldata Usage: Optimized string handling for lower execution overhead.

 Getting Started

First, run the development server:

bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
