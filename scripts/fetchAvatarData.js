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
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR
const ISSUER_PUBLIC_KEY = process.env.ISSUER_PUBLIC_KEY
const PUBLIC_KEY = process.env.PUBLIC_KEY

async function getMetadata(tokenId){
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);
    const tokenURI = await contract.tokenURI(tokenId);
    const response = await fetch("https://gateway.pinata.cloud/ipfs/"+tokenURI.substring(7));
    const metadata = await response.json();
    return metadata
}

async function getAddressNfts(owner){
    // Adjust contract name as needed
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);

    //get number of and tokenids of wallet
    console.log("get ids of owner: "+owner);
    let balance = await contract.balanceOf(owner);
    let totalMinted = await contract.getMintedCount();
    console.log("Total Minted:" + totalMinted);
    let ids = []
    for (let i = 1; i<=totalMinted; i++){
        let metadata = await contract.getMetadata(i);
        console.log(metadata);
        if (owner == metadata.ownerId){
            ids.push(i)
        }
    }
    console.log("Wallet "+owner+" owns "+balance+" ids: "+ids)

    //get metadata of each id
    let metadatas = []
    let ipfs = []
    let attributes = []
    for (let i = 1; i < ids.length; i++){
        let metadata = await contract.getMetadata(ids[i]);
        metadatas.push(metadata);
        
        let ipfsData = await getMetadata(ids[i])
        ipfs.push(ipfsData)
        attributes.push(ipfsData.attributes)
    }
    console.log("get contract stored metadatas...")
    console.log(metadatas);
    console.log("get ipfs stored metadatas...")
    console.log(ipfs)
    console.log("get attributes in ipfs...")
    console.log(attributes)
    
}

async function main(){
    console.log('fetching data...')
    getAddressNfts(PUBLIC_KEY);
}

main ();