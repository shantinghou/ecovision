/*
Documentation: 
Function: Deploy the contract
Procedure:
1. Make sure .env is updated to your own wallet settings
2. Make sure you are deploying the right contract
3. Run the command node scripts/deploy.js in your terminal and check the contract
address in your test net
*/
const PUBLIC_KEY = process.env.PUBLIC_KEY
async function main() {
    // Adjust contract name as needed
    const EAvatar = await ethers.getContractFactory("EAvatar")
  
    // Start deployment, returning a promise that resolves to a contract object
    // Adjust address as needed
    const eAvatar = await EAvatar.deploy(PUBLIC_KEY)
    await eAvatar.deployed()
    console.log("Contract deployed to address:", eAvatar.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  