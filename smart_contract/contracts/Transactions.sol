// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address reciever, uint amount, string message, uint256 timestamp, string keyword);
    struct TransferStruct {
        address senderAddress;
        address receiverAddress;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transations;

    function addToBlockchain(address payable reciever, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        transations.push(TransferStruct(msg.sender, reciever, amount, message, block.timestamp, keyword));
        emit Transfer(msg.sender, reciever, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transations;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    
}
