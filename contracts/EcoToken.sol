// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EcoToken is ERC20 {
    address public admin;

    constructor() ERC20("EcoToken", "ETK") {
        _mint(msg.sender, 1000000 * 10 ** uint256(decimals()));
        admin = msg.sender; // Contract deployer is the admin
    }

    // Function to mint new tokens, only accessible by the admin
    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint tokens");
        _mint(to, amount);
    }

    // Function to get the token balance of an address
    function getTokenBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    // Override the decimals variable to set the number of decimals to 0
    function decimals() public pure override returns (uint8) {
        return 0;
    }
}
