// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;
    uint data;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
        data;
    }

    function setData(uint _data) external {
        data = _data;
    }

    function getBalance() external view returns(uint) {
        return data;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    // function refill(uint amount) external returns(uint) {
    //     // require(msg.sender == owner, "Only the owner can refill.");
    //     data = data + 10;
    //     return data;
    //     // cupcakeBalances[address(this)] += amount;
    // }

    // Allow anyone to purchase cupcakes
    // function purchase(uint amount) public payable {
    //     require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
    //     require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
    //     cupcakeBalances[address(this)] -= amount;
    //     cupcakeBalances[msg.sender] += amount;
    // }
}
