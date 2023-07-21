//get data by nftId list
require("dotenv").config()
const { ethers } = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY
const BASE_URI = process.env.BASE_URI
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
// const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"
const receiver = "0xfF650AD783D278994eaa379A70C3958b79A1044c"

async function getMetadata(tokenId){
    // const contract = new web3.eth.Contract(abiJson, contractAddress);
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS);
    

    // console.log("https://gateway.pinata.cloud/ipfs/"+BASE_URI+"/"+tokenId);
    const response = await fetch(" https://ipfs.io/ipfs/" + BASE_URI + "/" + tokenId+".json")
    const metadata = await response.json();
    console.log(metadata)

    let contractOwnerBalances = await contract.balanceOf(receiver);
    console.log("balance - " + contractOwnerBalances);
    console.log("get ids")
    let ids = await contract.ownerCollection (receiver)
    console.log(ids)
    return ids;
}

async function main(){
    for(let i = 1; i <= 4; i++){
        getMetadata(i.toString());
    }
}
main ();