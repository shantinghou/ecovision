//get NFTs metadata (list) by owneraddress
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