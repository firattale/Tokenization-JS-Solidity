// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";


contract KycContract is Ownable {
  
  mapping(address => bool) public allowed;

  function setAllowed(address _address, bool _allowed) public onlyOwner{
    allowed[_address] = _allowed;
  }
  function isAllowed(address _address) public view onlyOwner returns (bool) {
    return allowed[_address];
  }
}
