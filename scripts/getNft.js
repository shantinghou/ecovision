/*
Documentation:
Purpose: Get NFTs metadata (list) by owneraddress
Procedure:
1. Make sure your contract is compiled and deployed and your NFTs are minted
2. Make sure .env is updated to your own wallet settings
3. Make sure you are getting information about the right owner
4. Run the command node scripts/getNft.js in your terminal
*/
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const url = `${API_URL}/getNFTs/?owner=${PUBLIC_KEY}`;

var requestOptions = {
  method: 'get',
  redirect: 'follow'
};

fetch(url, requestOptions)
  .then(response => response.json())
    .then((data) => console.log(data.ownedNfts))
  .catch(error => console.log('error', error))