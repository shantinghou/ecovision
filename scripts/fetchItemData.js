/* 
Documentation: 
Function: Get information about EcoItems
Procedure:
1. Make sure your contract is compiled and deployed and NFTs are minted
2. Make sure .env is updated to your own wallet settings and contract address
3. Make sure you are getting information about the right contract
4. Run the command node scripts/fetchItemData.js in your terminal
*/
require("dotenv").config()
const { ethers } = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PUBLIC_KEY_2 = process.env.PUBLIC_KEY_2;
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3;

// Adjust contract address as needed
const contractAddress = "0xab927D39309e0279e361aF2005Ce2B28e0c637b4";

async function getMetadata(tokenId){
    // Adjust contract name as needed
    const contract = await ethers.getContractAt('EcoItems', contractAddress);

    const tokenURI = await contract.tokenURI(tokenId);
    console.log(tokenURI);
    const response = await fetch("https://gateway.pinata.cloud/ipfs/"+tokenURI.substring(7));
    const metadata = await response.json();
    console.log(metadata);

    let contractOwnerBalances = await contract.balanceOf(PUBLIC_KEY_3);
    console.log("balance - " + contractOwnerBalances);
}
getMetadata ("1");