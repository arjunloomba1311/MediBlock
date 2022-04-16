// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Manufacturer {
    uint weight;
    uint quantity;

    event NewUpdate(
        uint indexed date,
        address indexed from,
        address indexed to,
        uint weight,
        uint quantity
    );

    function update(address to, uint _weight, uint _quantity) external{
        // require(_weight==40,'error');
        weight = _weight;
        quantity = _quantity;
        emit NewUpdate(block.timestamp,msg.sender,to,_weight,_quantity);
    }

    function getWeight() external view returns(uint){
        return weight;
    }

    function getQuantity() external view returns(uint){
        return quantity;
    }
}