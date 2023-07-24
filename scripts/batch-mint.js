require("dotenv").config();
const { ethers } = require("hardhat");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BASE_URI = process.env.BASE_URI;
const CONTRACT_ADDRESS = "0x50b5042f125fd57DC19F083e0D4e9C80a5777190";

contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")

async function batchMintNFT(ownerAddress, contractAddress, numToMint) {
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const ecoContract = new ethers.Contract(contractAddress, contract.abi, wallet);

  for (let i = 0; i < numToMint; i++) {
    const price = 1; 
    await ecoContract.mintNFT(ownerAddress, price);
  }
}

const ownerAddress = PUBLIC_KEY; 
const numToMint = 5; 

batchMintNFT(ownerAddress, CONTRACT_ADDRESS, numToMint)
  .then(() => console.log("Batch minting completed."))
  .catch((error) => console.error("Error during batch minting:", error));
