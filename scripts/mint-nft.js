//mintNFT with owner address and contract address
require("dotenv").config()
const { ethers } = require("hardhat");
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const BASE_URI = process.env.BASE_URI

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

async function mintNFT(i){
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    //   the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': CONTRACT_ADDRESS,
    'nonce': nonce,
    'gas': 500000,
    'data': await nftContract.methods.mintNFT(PUBLIC_KEY, 1, i).encodeABI()
  };
  
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
            return hash
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

// mintNFT(1);
// async function main(){
//   let minted = []
//   for(let i = 0; i < 4; i++)
//     minted.push(await mintNFT(i))
//   console.log(minted)
//   return minted
// }

// main()

async function mint(tokenId) {
  try {
    const tx = await nftContract.methods.mintNFT(PUBLIC_KEY, 1, tokenId).send({ from: PUBLIC_KEY });
    console.log(`Minted token ${tokenId} with transaction hash ${tx.transactionHash}`);
  } catch (error) {
    console.error(`Error minting token ${tokenId}: ${error}`);
  }
}

// call the mint function in a loop
async function mintNFTs() {
  for (let i = 0; i < NUM_MINTS; i++) {
    const tokenId = TOKEN_IDS[i];
    await mint(tokenId);
  }
}