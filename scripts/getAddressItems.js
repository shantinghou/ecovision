//get data by nftId list
const { ethers } = require("hardhat");
require("dotenv").config()
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PUBLIC_KEY_2 = process.env.PUBLIC_KEY_2
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x0b8CC80Db84Aa659e8Ca66C9839C53E2B61DAc74"

async function getAddressItems(){
    // const contract = new web3.eth.Contract(abiJson, contractAddress);
    const contract = await ethers.getContractAt('EcoItems', contractAddress);

    console.log("get ids")
    let ids = await contract.ownerCollection(PUBLIC_KEY_3)
    console.log(ids)
    
    let metadata = await contract.getMetadata(ids[0])
    console.log(metadata)
    
}
getAddressItems();