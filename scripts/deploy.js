const OWNER_PUBLIC_KEY = process.env.OWNER_PUBLIC_KEY
async function main() {
    //EAvatar Deployment -------------------------------------------------------
    const EAvatar = await ethers.getContractFactory("EAvatar")
  
    // Start deployment, returning a promise that resolves to a contract object
    const eAvatar = await EAvatar.deploy(OWNER_PUBLIC_KEY)
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
  