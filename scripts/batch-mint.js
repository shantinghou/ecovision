/*
Documentation:
Function: Minting multiple NFTs to one address
Procedure:
1. Make sure your contract is compiled and deployed
2. Make sure .env is updated to your own wallet settings and contract address
3. You can change the value of ownerAddress and numToMint as you see fit
4. Update the starting index of the loop for batch minting based on how many NFTs
you have already minted for that collection
5. Run the command node scripts/batch-mint.js in your terminal and check for the
transactions under the contract address or your wallet address in the Sepolia test net
*/
require("dotenv").config();
const { ethers } = require("hardhat");

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR
const CONTRACT_ADDRESS_ECOITEM = process.env.CONTRACT_ADDRESS_ECOITEM

const eAvatarContract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")

async function batchMintEAvatar(ownerAddress, contractAddress, numToMint) {
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const avatarContract = new ethers.Contract(contractAddress, eAvatarContract.abi, wallet);

  const minted = []
  for (let i = 1; i < numToMint; i++) {
    const price = 100000; 
    await avatarContract.mintNFT(ownerAddress, price);
    minted.push(i)
  }
  console.log(minted);
}

async function main(){
  const ownerAddress = PUBLIC_KEY; 
  const numToMint = 5; 
  batchMintEAvatar(ownerAddress, CONTRACT_ADDRESS_EAVATAR, numToMint)
    .then(() => console.log("Batch minting completed."))
    .catch((error) => console.error("Error during batch minting:", error));
}

main()
