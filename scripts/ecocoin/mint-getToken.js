const { ethers } = require("hardhat");
require("dotenv").config();

const PUBLIC_KEY = process.env.PUBLIC_KEY;

async function mintTokens(erc20TokenAddress, recipient, amount) {
    const [issuer] = await ethers.getSigners();
  
    // Load the ERC-20 Token contract using the provided address
    const MyToken = await ethers.getContractFactory("EcoToken");
    const erc20TokenContract = await MyToken.attach(erc20TokenAddress);
  
    // Mint tokens to the recipient
    await erc20TokenContract.mint(recipient, amount);
  
    console.log(`Minted ${amount} tokens to the recipient's address (${recipient})`);
}
   

async function getTokenBalance(erc20TokenAddress, account) {
    // Load the ERC-20 Token contract using the provided address
    const MyToken = await ethers.getContractFactory("EcoToken");
    const erc20TokenContract = await MyToken.attach(erc20TokenAddress);

    // Get the token balance of the account
    const balance = await erc20TokenContract.getTokenBalance(account);
    console.log(`Account (${account}) token balance: ${balance.toString()} tokens`);
}

async function main() {
    // Mint some initial tokens to the bond issuer (deployer)
    const issuer = await ethers.getSigner(PUBLIC_KEY);
    const mintAmount = "50"; // Set the initial balance as a string representing the number of tokens
    const contractAddress = process.env.CONTRACT_ADDRESS_ECOTOKEN;
     await mintTokens(contractAddress, issuer.address, mintAmount);

    // Get and display the token balance of the bond issuer (deployer)
     await getTokenBalance(contractAddress, issuer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
