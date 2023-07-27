/* 
Documentation: 
Function: 
Procedure:
1. ---
*/
require("dotenv").config()
const { ethers } = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR
const API_URL = process.env.API_URL
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const eAvatarContract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const avatarContract = new ethers.Contract(CONTRACT_ADDRESS_EAVATAR, eAvatarContract.abi, wallet);

async function checkEvolved(tokenId){
    // Adjust contract name as needed
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);
    console.log("getting current evolution state...")
    const state = await contract.evolveState(tokenId)
    console.log("evolution state: "+state);
    return state[1]
}

async function evolveCharacter(tokenId, owner){
    const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);
    console.log("evolving character...");
    await contract.evolveCharacter(tokenId, owner);
    return await checkEvolved(tokenId);
}

async function main(){
    // const contract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);
    // let val = await contract.changeLevel(1, 10);
    
    // console.log(val);
    console.log(await avatarContract.getMetadata(1));
    // let oldURI = await checkEvolved(1);
    // let newURI = await evolveCharacter(1, PUBLIC_KEY);
    // console.log("The current evolution state is ...")
    // let oldURI = await checkEvolved(1);
    // let newURI = await evolveCharacter(1, PUBLIC_KEY);
    // if (newURI == oldURI){
    //     await avatarContract.changeLevel(1, 10);
    //     console.log('try again.')
    //     await checkEvolved(1);
    //     await evolveCharacter(1, PUBLIC_KEY);
    //     console.log(await avatarContract.getMetadata(1));
    // }
}

main();