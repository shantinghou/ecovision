/*
Documentation: 
Function: Deploy the contract
Procedure:
1. Make sure .env is updated to your own wallet settings
2. Make sure you are deploying the right contract
3. Run the command node scripts/deploy.js in your terminal and check the contract
address in your test net
*/
const { ethers } = require("hardhat");
const PUBLIC_KEY = process.env.PUBLIC_KEY
async function main() {
    //EAvatar Deployment ------------------------------------------------------
    const EAvatar = await ethers.getContractFactory("EAvatar")
  
    // Start deployment, returning a promise that resolves to a contract object
    const eAvatar = await EAvatar.deploy(PUBLIC_KEY)
    await eAvatar.deployed()
    console.log("EAvatar deployed to address:", eAvatar.address)

    //Eco Item Deployment ------------------------------------------------------
    const EcoItems = await ethers.getContractFactory("EcoItems")
  
    // Start deployment, returning a promise that resolves to a contract object
    const ecoItems = await EcoItems.deploy()
    await ecoItems.deployed()
    console.log("EcoItems deployed to address:", ecoItems.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  