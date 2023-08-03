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
const ISSUER_PUBLIC_KEY = process.env.ISSUER_PUBLIC_KEY
async function main() {
  
    //EAvatar Deployment ------------------------------------------------------
    const EAvatar = await ethers.getContractFactory("EAvatar")
  
    // Start deployment, returning a promise that resolves to a contract object
    const eAvatar = await EAvatar.deploy(ISSUER_PUBLIC_KEY)
    await eAvatar.deployed()
    console.log("EAvatar deployed to address:", eAvatar.address)

    //Eco Item Deployment ------------------------------------------------------
    const EcoItems = await ethers.getContractFactory("EcoItems")
  
    // Start deployment, returning a promise that resolves to a contract object
    const ecoItems = await EcoItems.deploy()
    await ecoItems.deployed()
    console.log("EcoItems deployed to address:", ecoItems.address)

    //Eco token Deployment ------------------------------------------------------
    const EcoToken = await ethers.getContractFactory("EcoToken")
  
    // Start deployment, returning a promise that resolves to a contract object
    const ecoToken = await EcoToken.deploy()
    await ecoToken.deployed()
    console.log("EcoToken deployed to address:", ecoToken.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  