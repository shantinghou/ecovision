//get data by nftId list
require("dotenv").config()
const { ethers } = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PUBLIC_KEY_2 = process.env.PUBLIC_KEY_2;
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3;

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0xab927D39309e0279e361aF2005Ce2B28e0c637b4";

async function getMetadata(tokenId){
    // const contract = new web3.eth.Contract(abiJson, contractAddress);
    const contract = await ethers.getContractAt('EcoItems', contractAddress);
    
    // const contract = new web3.eth.Contract("abiJson", contractAddress);
    const tokenURI = await contract.tokenURI(tokenId);
    console.log(tokenURI);
    const response = await fetch("https://gateway.pinata.cloud/ipfs/"+tokenURI.substring(7));
    const metadata = await response.json();
    console.log(metadata);

    let contractOwnerBalances = await contract.balanceOf(PUBLIC_KEY_3);
    console.log("balance - " + contractOwnerBalances);
}
getMetadata ("1");