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
require("dotenv").config()
const { ethers } = require("hardhat");
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PUBLIC_KEY_2 = process.env.PUBLIC_KEY_2
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2
const PRIVATE_KEY_3 = process.env.PRIVATE_KEY_3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/EcoItems.sol/EcoItems.json")
const contractAddress = "0xab927D39309e0279e361aF2005Ce2B28e0c637b4"

async function testMintAndGetterFunctions(weaponURI, potionURI) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(API_URL);

        const signer = new ethers.Wallet(PRIVATE_KEY, provider);

        const ecoContract = new ethers.Contract(contractAddress, contract.abi, signer);

        const accounts = await ethers.getSigners();

        /*
        How to test:
        First mint EWeapon (B) / EPotion (C) and comment out (A) and (D)
        Then comment out (B) and (C) and uncomment (A) and (D) to get item information
        */
        
        // Check the total number of items (A)
        const totalSupply = await ecoContract.totalSupply();
        console.log("Total supply:", totalSupply.toNumber());
        
        /* 
        // Test minting an EWeapon item (B)
        const speed = 25;
        const ap_boost = 15;
        const tx = await ecoContract.mintEWeaponItem(speed, ap_boost, weaponURI);
        await tx.wait();
        console.log("Weapon minted");
        
        // Test minting an EPotion item (C)
        const hp_pBoost = 25;
        const ap_pBoost = 25;
        const pSpeed = 15;
        const timeLimit = 60;
        const receipt = await ecoContract.mintEPotionItem(hp_pBoost, 
            ap_pBoost, pSpeed, timeLimit, potionURI);
        await receipt.wait();
        console.log("Potion minted");
        */
        
        // Get info of each item (D)
        for (let i = 1; i <= totalSupply; i++) {
            const tokenId = i;
            const item = await ecoContract.items(tokenId);
            const holder = item.ownerId;
            console.log(`Owner: ${holder}`);
            const itemType = item.itemType == 0 ? "EWeapons" : "EPotions";
            console.log(`Token ID: ${tokenId}, Type: ${itemType}`);
            if (itemType == "EWeapons") {
                const eWeaponData = await ecoContract.getEWeaponsData(tokenId);
                console.log("EWeapon Data:");
                console.log("Speed:", eWeaponData.speed);
                console.log("AP Boost:", eWeaponData.ap_boost);
            } else {
                const ePotionData  = await ecoContract.getEPotionsData(tokenId);
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
  
  //Add Weapon and Potion URI
  const weaponURI = "ipfs://QmdEFxCJavd4cvonreyvwr6fhT4SkUg6B367L1juywbXDZ"
  const potionURI = "ipfs://Qmcx4McJxMPUXvXASBXPK96UgGfd4Hc12TpPSrE5PxjCn2"
  testMintAndGetterFunctions(weaponURI, potionURI);