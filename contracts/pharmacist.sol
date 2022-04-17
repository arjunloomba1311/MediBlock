// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Pharmacist{
    uint weight;
    uint quantity;
    address adOfPharmacist;

    constructor(){
        adOfPharmacist = 0xeB20F0832eE83E80a18dE45C4449E7379c5F6BF8;
    }

    event NewUpdate(
        uint indexed date,
        address indexed from,
        uint weight,
        uint quantity
    );

    function update(uint _weight, uint _quantity) external{
        // require(to==adOfPharmacist,'receiver was not the correct node');
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