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
