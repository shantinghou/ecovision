/*
Documentation:
Purpose: Mint EcoItems and get their information
Procedure:
1. Make sure your contract is compiled and deployed
2. Make sure .env is updated to your own wallet settings
3. See below for more testing specification 
4. Run the command node scripts/mint-and-get-item.js in your terminal and check
your wallet address or contract address in the test net to see minting transactions
*/
require("dotenv").config();
const { ethers } = require("hardhat");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const contract = require("../artifacts/contracts/EcoItems.sol/EcoItems.json");

const API_URL = process.env.API_URL;
const ISSUER_PRIVATE_KEY = process.env.ISSUER_PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS_ECOITEM;

const web3 = createAlchemyWeb3(API_URL);

async function mintEWeapons(weaponURI) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const signer = new ethers.Wallet(ISSUER_PRIVATE_KEY, provider);
    const ecoContract = new ethers.Contract(contractAddress, contract.abi, signer);

    // Test minting an EWeapon item
    const speed = 30;
    const ap_boost = 10;
    const tx = await ecoContract.mintEWeaponItem(speed, ap_boost, weaponURI);
    await tx.wait();
    console.log("Weapon minted");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function mintEPotions(potionURI) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const signer = new ethers.Wallet(ISSUER_PRIVATE_KEY, provider);
    const ecoContract = new ethers.Contract(contractAddress, contract.abi, signer);

    // Test minting an EPotion item
    const hp_pBoost = 30;
    const ap_pBoost = 30;
    const pSpeed = 10;
    const timeLimit = 30;
    const receipt = await ecoContract.mintEPotionItem(
      hp_pBoost,
      ap_pBoost,
      pSpeed,
      timeLimit,
      potionURI
    );
    await receipt.wait();
    console.log("Potion minted");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getItemInformation() {
  try {
    const provider = new ethers.providers.JsonRpcProvider(API_URL);
    const ecoContract = new ethers.Contract(contractAddress, contract.abi, provider);

    // Check the total number of items
    const totalSupply = await ecoContract.totalSupply();
    console.log("Total supply:", totalSupply.toNumber());

    // Get info of each item
    for (let i = 1; i <= totalSupply; i++) {
      const tokenId = i;
      const item = await ecoContract.items(tokenId);
      const holder = item.ownerId;
      console.log(`Owner: ${holder}`);
      const itemType = item.itemType == 0 ? "EWeapons" : "EPotions";
      console.log(`Token ID: ${tokenId}, Type: ${itemType}`);
      if (itemType === "EWeapons") {
        const eWeaponData = await ecoContract.getEWeaponsData(tokenId);
        console.log("EWeapon Data:");
        console.log("Speed:", eWeaponData.speed);
        console.log("AP Boost:", eWeaponData.ap_boost);
      } else {
        const ePotionData = await ecoContract.getEPotionsData(tokenId);
        console.log("EPotion Data:");
        console.log("HP Boost:", ePotionData.hp_boost);
        console.log("AP Boost:", ePotionData.ap_boost);
        console.log("Speed:", ePotionData.speed);
        console.log("Time Limit:", ePotionData.timeLimit);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Comment out functions as needed
const weaponURIs = [
    "ipfs://QmcxZRzLfo8EfFzmih4ZqWCM8MWdNvtDEgpbNJY2jU8RkR", // 1
    "ipfs://Qma71y6Y2EGR2LTyvU5utfpsDYHCQ4tTvhzqnGhu4DYSze" // 2
  ];

const potionURIs = [
    "ipfs://QmQDXkF6eMy5xWWQWwX9NJxer7AYwotM4Qmk2wCKZjmvoh", // 1
    "ipfs://QmdbLGCLxWf3bDspCXfK62RXccsibv7DRPbWXc11eZP65J" // 2
  ];

async function main(){
    /*
    for (const weaponURI of weaponURIs) {
        await mintEWeapons(weaponURI);
    }
    */
    for (const potionURI of potionURIs) {
        await mintEPotions(potionURI);
    }
    // getItemInformation();
  }
main()