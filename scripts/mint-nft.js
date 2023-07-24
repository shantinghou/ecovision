/*
Documentation:
Function: Minting one NFT to one address
Procedure:
1. Make sure your contract is compiled and deployed
2. Make sure .env is updated to your own wallet settings and contract address
3. Make sure the tokenId is unique
4. Run the command node scripts/mint-nft.js in your terminal and check for the
transactions under the contract address or your wallet address in the Sepolia test net
*/
require("dotenv").config()
const { ethers } = require("hardhat");
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const BASE_URI = process.env.BASE_URI

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
// Adjust as needed
const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

async function mintNFT(i){
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); 
  const tx = {
    // Adjust as needed
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
// Adjust token ID as needed
mintNFT(1);