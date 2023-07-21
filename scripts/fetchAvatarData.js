//get data by nftId list
require("dotenv").config()
const { ethers } = require("hardhat");
const BASE_URI = process.env.BASE_URI
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const PUBLIC_KEY = process.env.PUBLIC_KEY

async function getMetadata(tokenId){
    const response = await fetch(" https://ipfs.io/ipfs/" + BASE_URI + "/" + tokenId+".json")
    const metadata = await response.json();
    console.log(metadata)
}

async function getAdressNfts(){
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
    console.log("using json fetch...");
    for(let i = 1; i <= 4; i++){
        getMetadata(i.toString());
    }
    console.log("using contract storage");
    getAdressNfts();
}

main ();