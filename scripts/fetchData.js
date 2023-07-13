//get data by nftId list
require("dotenv").config()
const { ethers } = require("hardhat");
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x853B1a17F4009C707d435A6E6Ef24978589D5FE7"

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