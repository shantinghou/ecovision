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

async function mintNFT(tokenURI){
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    //   the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': CONTRACT_ADDRESS,
    'nonce': 2000000,
    'gas': 500000,
    'data': await nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };
  
  const signPromise = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  if(signPromise){
    return signPromise.transactionHash;
  }
  else{
    return null
  }
}
// function myLoop(i, minted){
//   setTimeout(function() {   //  call a 3s setTimeout when the loop is called
//     console.log('hello');   //  your code here
//     i++;                    //  increment the counter
//     if (i <= 4) {           //  if the counter < 10, call the loop function
//       add = mintNFT(i)
//       console.log(add)
//       minted.push(add)
//       myLoop(i, minted);             //  ..  again which will trigger another 
//     }                       //  ..  setTimeout()
//   }, 9000)
//   console.log(minted)
//   return minted
// }

async function main(){
  const nftContract = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS);
  let minted = []
  for(let i = 0; i < 4; i++)
    minted.append(mintNFT(i))
  

}

main()