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
const ISSUER_PRIVATE_KEY = process.env.ISSUER_PRIVATE_KEY;
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR

const avatarCollection = ["ipfs://QmWKZLKikK73pPcX6nskzaLYX2HgJdPKynrmdbACZaMKeA",
                       "ipfs://QmRXHao4ftgJL2GXBERUdTS5dRsHsHEt3P2dk6idTnX2WV",
                       "ipfs://QmPZrEikLLjP7VQqNgnFxS7U8TMErmvxFxArkB45rn1haz",
                       "ipfs://QmY4RBE4cTZJyjUwApQabcDiWq6JfY6byrQ7nKZatxz34n"]
const eAvatarContract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")

async function batchMintEAvatar(ownerAddress, contractAddress, numToMint) {
  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  const wallet = new ethers.Wallet(ISSUER_PRIVATE_KEY, provider);
  const avatarContract = new ethers.Contract(contractAddress, eAvatarContract.abi, wallet);

  const minted = []
  for (let i = 0; i < numToMint; i++) {
    const price = 100000; //due to green bond
    await avatarContract.mintNFT(ownerAddress, price, avatarCollection[i]);
    minted.push(i+1);
  }
  console.log(minted);
}

async function main(){
  const ownerAddress = PUBLIC_KEY; 
  const numToMint = 4; 
  batchMintEAvatar(ownerAddress, CONTRACT_ADDRESS_EAVATAR, numToMint)
    .then(() => console.log("Batch minting completed."))
    .catch((error) => console.error("Error during batch minting:", error));
}

main()
