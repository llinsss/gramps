// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title GrampsCare
 * @dev Optimized for deployment on the Base Network (Coinbase L2).
 * 
 * FEATURES:
 * 1. Care Fund: Family members deposit ETH. Caregivers withdraw for verified expenses.
 * 2. Document Registry: Store hashes of critical documents (Wills, DNRs) for on-chain 
 *    Proof-of-Existence without exposing private data.
 * 
 * BASE NETWORK OPTIMIZATIONS:
 * - Uses 'calldata' for string inputs to reduce gas.
 * - Relies heavily on Events for data retrieval (cheap on L2) rather than 
 *   expensive storage arrays.
 */
contract GrampsCare {
    address public owner;
    
    // Mapping of authorized caregivers (Address -> IsAuthorized)
    mapping(address => bool) public caregivers;

    // Mapping of document hashes to verify authenticity (DocHash -> Timestamp)
    mapping(bytes32 => uint256) public documentRegistry;

    // Events (Indexed for efficient querying on Base)
    event Deposit(address indexed from, uint256 amount);
    event ExpensePaid(address indexed caregiver, address indexed recipient, uint256 amount, string reason);
    event CaregiverAdded(address indexed caregiver);
    event CaregiverRemoved(address indexed caregiver);
    event DocumentRegistered(bytes32 indexed docHash, string category, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier onlyCaregiver() {
        require(caregivers[msg.sender] || msg.sender == owner, "Not a caregiver");
        _;
    }

    constructor() {
        owner = msg.sender;
        emit CaregiverAdded(msg.sender);
    }

    /**
     * @dev Deposit funds into the Care Fund.
     * Anyone can deposit (other family members).
     */
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    /**
     * @dev Add a family member/caregiver who can authorized expenses.
     */
    function addCaregiver(address _caregiver) external onlyOwner {
        caregivers[_caregiver] = true;
        emit CaregiverAdded(_caregiver);
    }

    /**
     * @dev Remove a caregiver's access.
     */
    function removeCaregiver(address _caregiver) external onlyOwner {
        caregivers[_caregiver] = false;
        emit CaregiverRemoved(_caregiver);
    }

    /**
     * @dev Withdraw funds to pay for care-related expenses (Bills, Meds, Home Care).
     * @param _to The recipient address (e.g., Pharmacy, Utility Company, or Caregiver reimbursement).
     * @param _amount Amount in wei.
     * @param _reason Description of the expense (stored in logs to save gas).
     */
    function payExpense(address payable _to, uint256 _amount, string calldata _reason) external onlyCaregiver {
        require(address(this).balance >= _amount, "Insufficient funds");
        _to.transfer(_amount);
        emit ExpensePaid(msg.sender, _to, _amount, _reason);
    }

    /**
     * @dev Register a document hash in "The Vault".
     * Provides a permanent timestamped record that a document existed in a specific state.
     * @param _docHash The keccak256 hash of the document content.
     * @param _category The category (Legal, Medical, Financial).
     */
    function registerDocument(bytes32 _docHash, string calldata _category) external onlyCaregiver {
        require(documentRegistry[_docHash] == 0, "Document already registered");
        documentRegistry[_docHash] = block.timestamp;
        emit DocumentRegistered(_docHash, _category, block.timestamp);
    }

    /**
     * @dev Verify if a document is genuine and when it was added.
     */
    function verifyDocument(bytes32 _docHash) external view returns (bool exists, uint256 timestamp) {
        timestamp = documentRegistry[_docHash];
        exists = timestamp != 0;
    }
}
