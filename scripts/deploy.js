const PUBLIC_KEY = process.env.PUBLIC_KEY
async function main() {
    const EAvatar = await ethers.getContractFactory("EAvatar")
  
    // Start deployment, returning a promise that resolves to a contract object
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
  