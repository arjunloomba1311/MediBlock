// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Manufacturer{
    uint weight;
    uint quantity;
    address adOfDistributor;

    constructor(){
        adOfDistributor = 0xD95E70EDC9ddAa8B9b54A1E0ea4A7014eEBd7Ad8;
    }

    event NewUpdate(
        uint indexed date,
        address indexed from,
        uint weight,
        uint quantity
    );

    function update(uint _weight, uint _quantity) external{
        // require(to==adOfDistributor,'receiver was not the correct node');
        weight = _weight;
        quantity = _quantity;
        emit NewUpdate(block.timestamp,msg.sender,_weight,_quantity);
    }

    function getWeight() external view returns(uint){
        return weight;
    }

    function getQuantity() external view returns(uint){
        return quantity;
    }
}
