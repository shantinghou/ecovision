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
const ISSUER_PUBLIC_KEY = process.env.ISSUER_PUBLIC_KEY;
const PUBLIC_KEY_2 = process.env.PUBLIC_KEY_2;
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3;

// Adjust contract address as needed
const contractAddress = process.env.CONTRACT_ADDRESS_ECOITEM;

async function getMetadata(tokenId){
    // Adjust contract name as needed
    const contract = await ethers.getContractAt('EcoItems', contractAddress);

    const tokenURI = await contract.tokenURI(tokenId);
    console.log(tokenURI);
    const response = await fetch("https://gateway.pinata.cloud/ipfs/"+tokenURI.substring(7));
    const metadata = await response.json();
    console.log(metadata);
}

async function main() {
    const contract = await ethers.getContractAt('EcoItems', contractAddress);
    let contractOwnerBalances = await contract.balanceOf(ISSUER_PUBLIC_KEY);
    console.log("Balance:" + contractOwnerBalances);
    for (let i = 1; i <= contractOwnerBalances; i++){
        console.log("Getting info about EcoItem " + i);
        await getMetadata (i);
    }
}
main()