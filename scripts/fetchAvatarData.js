require("dotenv").config()
const { ethers } = require("hardhat");
const BASE_URI = process.env.BASE_URI
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR
const PUBLIC_KEY = process.env.PUBLIC_KEY

async function getMetadata(tokenId){
    const response = await fetch(" https://ipfs.io/ipfs/" + BASE_URI + "/" + tokenId+".json")
    const metadata = await response.json();
    return metadata
}

async function getAdressNfts(owner){
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);

    //get number of and tokenids of wallet
    console.log("get ids of owner: "+owner)
    let balance = await contract.balanceOf(owner)
    let ids = await contract.ownerCollection (owner)
    console.log("Wallet "+owner+" owns "+balance+" ids: "+ids)
    
    //get metadata of each id
    let metadatas = []
    let ipfs = []
    for (let i = 0; i < ids.length; i++){
        let metadata = await contract.getMetadata(ids[i]);
        metadatas.push(metadata);
        
        let ipfsData = await getMetadata(ids[i])
        ipfs.push(ipfsData)
    }
    console.log("get contract stored metadatas...")
    console.log(metadatas);
    console.log("get ipfs stored metadatas...")
    console.log(ipfs)
    
}

async function main(){
    console.log('fetching data...')
    getAdressNfts(PUBLIC_KEY);
}

main ();