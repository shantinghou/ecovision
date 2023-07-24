require("dotenv").config();
const { ethers } = require("hardhat");

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")

async function batchMintNFT(ownerAddress, contractAddress, numToMint) {
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const ecoContract = new ethers.Contract(contractAddress, contract.abi, wallet);

  for (let i = 2; i < numToMint; i++) {
    const price = 1; 
    await ecoContract.mintNFT(ownerAddress, price, i);
  }
}

const ownerAddress = PUBLIC_KEY; 
const numToMint = 5; 

batchMintNFT(ownerAddress, CONTRACT_ADDRESS, numToMint)
  .then(() => console.log("Batch minting completed."))
  .catch((error) => console.error("Error during batch minting:", error));
