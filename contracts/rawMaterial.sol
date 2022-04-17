// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract RawMaterial{
    uint weight;
    uint quantity;
    address adOfManufacturer;

    constructor(){
        adOfManufacturer = 0x98A769c3AeC0a7ab1c39F22d55870A6c45577944;
    }

    event NewUpdate(
        uint indexed date,
        address indexed from,
        uint weight,
        uint quantity
    );

    function update(uint _weight, uint _quantity) external{
        // require(to==adOfManufacturer,'receiver was not the correct node');
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