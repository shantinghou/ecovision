/*
Documentation: 
Function: Deploy the contract
Procedure:
1. Make sure .env is updated to your own wallet settings
2. Make sure you are deploying the right contract
3. Run the command node scripts/deploy.js in your terminal and check the contract
address in your test net
*/
async function main() {
    //Evolve Deployment ------------------------------------------------------
    const Evolve = await ethers.getContractFactory("Evolve")
  
    // Start deployment, returning a promise that resolves to a contract object
    const evolve = await Evolve.deploy()
    await evolve.deployed()
    console.log("Evolve deployed to address:", evolve.address)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
  