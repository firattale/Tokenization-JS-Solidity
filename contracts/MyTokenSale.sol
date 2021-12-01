// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "./CrowdSale.sol";

contract MyTokensale is Crowdsale {
    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token
    ) Crowdsale(rate, wallet, token) {}
}
