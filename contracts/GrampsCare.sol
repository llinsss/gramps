// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title GrampsCare
 * @dev Optimized for deployment on the Base Network (Coinbase L2).
 * 
 * FEATURES:
 * 1. Care Fund: Family members deposit ETH. Caregivers withdraw for verified expenses.
 * 2. Document Registry: Store hashes of critical documents (Wills, DNRs) for on-chain 
 *    Proof-of-Existence without exposing private data.
 * 3. Security: Spending limits and Reentrancy protection.
 */
contract GrampsCare is ReentrancyGuard {
    address public owner;
    
    // --- State Variables ---
    mapping(address => bool) public caregivers;
    mapping(bytes32 => uint256) public documentRegistry;

    // Financial Controls
    uint256 public constant DEFAULT_DAILY_LIMIT = 0.5 ether;
    mapping(address => uint256) public dailyLimits;
    mapping(address => mapping(uint256 => uint256)) public dailySpent; // caregiver -> day -> amount

    // --- Events ---
    event Deposit(address indexed from, uint256 amount);
    event ExpensePaid(address indexed caregiver, address indexed recipient, uint256 amount, string reason);
    event CaregiverAdded(address indexed caregiver);
    event CaregiverRemoved(address indexed caregiver);
    event DocumentRegistered(bytes32 indexed docHash, string category, uint256 timestamp);

    // --- Custom Errors (Gas Optimization) ---
    error NotAuthorized();
    error NotCaregiver();
    error InsufficientFunds();
    error DailyLimitExceeded(uint256 limit, uint256 spent);
    error TransferFailed();
    error DocumentAlreadyRegistered();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotAuthorized();
        _;
    }

    modifier onlyCaregiver() {
        if (!caregivers[msg.sender] && msg.sender != owner) revert NotCaregiver();
        _;
    }

    constructor() {
        owner = msg.sender;
        emit CaregiverAdded(msg.sender);
        dailyLimits[msg.sender] = 1000 ether; // Owner has high limit
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function addCaregiver(address _caregiver) external onlyOwner {
        caregivers[_caregiver] = true;
        dailyLimits[_caregiver] = DEFAULT_DAILY_LIMIT;
        emit CaregiverAdded(_caregiver);
    }

    function removeCaregiver(address _caregiver) external onlyOwner {
        caregivers[_caregiver] = false;
        dailyLimits[_caregiver] = 0;
        emit CaregiverRemoved(_caregiver);
    }

    function setDailyLimit(address _caregiver, uint256 _limit) external onlyOwner {
        dailyLimits[_caregiver] = _limit;
    }

    /**
     * @dev Withdraw funds with ReentrancyGuard and Spending Limits.
     */
    function payExpense(address payable _to, uint256 _amount, string calldata _reason) external onlyCaregiver nonReentrant {
        if (address(this).balance < _amount) revert InsufficientFunds();

        // Check spending limit (Owner bypasses limit check if needed, but here we enforce consistent rules or give high limit)
        uint256 currentDay = block.timestamp / 1 days;
        if (dailySpent[msg.sender][currentDay] + _amount > dailyLimits[msg.sender]) {
            revert DailyLimitExceeded(dailyLimits[msg.sender], dailySpent[msg.sender][currentDay]);
        }

        dailySpent[msg.sender][currentDay] += _amount;

        // Safe Transfer using call
        (bool success, ) = _to.call{value: _amount}("");
        if (!success) revert TransferFailed();

        emit ExpensePaid(msg.sender, _to, _amount, _reason);
    }

    function registerDocument(bytes32 _docHash, string calldata _category) external onlyCaregiver {
        if (documentRegistry[_docHash] != 0) revert DocumentAlreadyRegistered();
        documentRegistry[_docHash] = block.timestamp;
        emit DocumentRegistered(_docHash, _category, block.timestamp);
    }

    function verifyDocument(bytes32 _docHash) external view returns (bool exists, uint256 timestamp) {
        timestamp = documentRegistry[_docHash];
        exists = timestamp != 0;
    }
}
