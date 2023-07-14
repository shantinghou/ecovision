//get data by nftId list
require("dotenv").config()
const { ethers } = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"

async function getMetadata(tokenId){
    // const contract = new web3.eth.Contract(abiJson, contractAddress);
    const contract = await ethers.getContractAt('MyNFT', contractAddress);
    
    // const contract = new web3.eth.Contract("abiJson", contractAddress);
    const tokenURI = await contract.tokenURI(tokenId);
    console.log(tokenURI);
    const response = await fetch("https://gateway.pinata.cloud/ipfs/"+tokenURI.substring(7));
    const metadata = await response.json();
    console.log(metadata)

    let contractOwnerBalances = await contract.balanceOf(PUBLIC_KEY);
    console.log(contractOwnerBalances);
    // let ids = await contract.getTokenIdsFromContract (contractAddress, wallet, contractOwnerBalances)
    // console.log(ids)
    // return ids;
    return;
}
getMetadata ("1");