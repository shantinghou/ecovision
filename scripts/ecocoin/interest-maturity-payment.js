const { ethers } = require("hardhat");
require("dotenv").config();

const NFT_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS_EAVATAR;
const ERC20_TOKEN_ADDRESS = process.env.CONTRACT_ADDRESS_ECOTOKEN;

async function main() {
  const [deployer, user1, user2] = await ethers.getSigners();

  // Load the EAvatar contract
  const NftContract = await ethers.getContractFactory("EAvatar");
  const nftContract = await NftContract.attach(NFT_CONTRACT_ADDRESS);

  // Load the ERC20 Token contract (Assuming you've already deployed it)
  const ERC20Token = await ethers.getContractFactory("EcoToken");
  const erc20TokenContract = await ERC20Token.attach(ERC20_TOKEN_ADDRESS);

// Get and display the token balances of all addresses
  await getAllBalances(erc20TokenContract, [deployer.address, user1.address, user2.address]);

  // Make sure the contract owner (deployer) has enough tokens to make payments
  const requiredBalance = 100; // Set the required balance for making payments
  const deployerBalance = await erc20TokenContract.getTokenBalance(deployer.address);
  if (deployerBalance < requiredBalance) {
    console.log(`Insufficient balance for deployer. Required: ${requiredBalance}, Available: ${deployerBalance}`);
    return;
  }

  // Assume interest payment period has arrived for testing purposes
  const interestAmount = await nftContract.interestPaymentAmount();
  const tx = await erc20TokenContract.transfer(user1.address, interestAmount);
  console.log(tx)

  // Assume maturity date has arrived for testing purposes
  const maturityAmount = await nftContract.bondMatureAmount();
  const receipt = await erc20TokenContract.transfer(user2.address, maturityAmount);
  console.log(receipt)
  
}

async function getAllBalances(erc20TokenContract, addresses) {
    for (const address of addresses) {
      const balance = await erc20TokenContract.getTokenBalance(address);
      console.log(`Address (${address}) token balance: ${balance.toString()} tokens`);
    }
  }

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
