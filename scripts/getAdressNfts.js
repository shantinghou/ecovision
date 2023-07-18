//get data by nftId list
const { ethers } = require("hardhat");
require("dotenv").config()
const PUBLIC_KEY = process.env.PUBLIC_KEY

// const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x0b8CC80Db84Aa659e8Ca66C9839C53E2B61DAc74"
const receiver = "0xfF650AD783D278994eaa379A70C3958b79A1044c"

async function getAdressNfts(){
    // const contract = new web3.eth.Contract(abiJson, contractAddress);
    const contract = await ethers.getContractAt('EAvatar', contractAddress);

    console.log("get ids")
    let ids = await contract.ownerCollection (PUBLIC_KEY)
    console.log(ids)
    
    let metadata = await contract.getMetadata(ids[0])
    console.log(metadata)
    
}
getAdressNfts();