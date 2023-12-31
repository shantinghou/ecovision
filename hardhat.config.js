/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { API_URL, ISSUER_PRIVATE_KEY, PRIVATE_KEY, PRIVATE_KEY_2, PRIVATE_KEY_3 } = process.env;
module.exports = {
   solidity: "0.8.18",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${ISSUER_PRIVATE_KEY}`, `0x${PRIVATE_KEY}`, `0x${PRIVATE_KEY_2}`, `0x${PRIVATE_KEY_3}`]
      }
   },
}
