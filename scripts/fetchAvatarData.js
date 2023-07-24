/*
Documentation: 
Function: Get information about EAvatars
Procedure:
1. Make sure your contract is compiled and deployed and NFTs are mintedx
2. Make sure .env is updated to your own wallet settings and contract address
3. Make sure you are getting information about the right contract
4. Run the command node scripts/fetchAvatarData.js in your terminal
*/
require("dotenv").config()
const { ethers } = require("hardhat");
const BASE_URI = process.env.BASE_URI
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const PUBLIC_KEY = process.env.PUBLIC_KEY

async function getMetadata(tokenId){
    const response = await fetch(" https://ipfs.io/ipfs/" + BASE_URI + "/" + tokenId+".json")
    const metadata = await response.json();
    return metadata
}

async function getAdressNfts(){
    // Adjust contract name as needed
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS);

    console.log("get ids")
    let ids = await contract.ownerCollection (PUBLIC_KEY)
    console.log(ids)
    
    let metadatas = []
    for (let i = 0; i < ids.length; i++){
        let metadata = await contract.getMetadata(ids[i]);
        metadatas.push(metadata);
    }
    console.log(metadatas);
    
}

async function main(){
    // Adjust contract name as needed
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS);
    /* Under development
    let ids = await contract.ownerCollection (PUBLIC_KEY)
    console.log("using json fetch...");
    jsonFetch = []
    for(let i = 1; i <= 4; i++){
         jsonFetch.push(await getMetadata(i.toString()));
     }
     console.log(jsonFetch);
    */
    console.log("using contract storage");
    getAdressNfts();
}

main ();