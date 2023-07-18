const { ethers } = require("hardhat");
require("dotenv").config()
const API_URL = process.env.API_URL
const collector = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"
const receiver = "0xfF650AD783D278994eaa379A70C3958b79A1044c"

async function buyNft(){
    const eAvatar = await ethers.getContractAt('EAvatar', contractAddress);

    const price = ethers.utils.parseUnits("0.001", 'ether');

    const transaction = await eAvatar.transferNFT(collector, receiver, "2", { value: price });

    await transaction.wait();
  }
buyNft();