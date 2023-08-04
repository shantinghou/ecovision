# Ecovision
# Introduction
This readme file provides information about the Green Bond Game Character NFT, its purpose, and how it can be used. The Green Bond Game Character NFT is a non-fungible token that represents a unique game character that is designed to promote environmentally friendly initiatives.
# Purpose
To use the Green Bond Game Character NFT, game developers can purchase it on a cryptocurrency exchange or through a decentralized marketplace. Once purchased, the Green Bond Game Character NFT can be incorporated into a game, where it can be used to incentivize players to support environmentally friendly initiatives. For example, players could be rewarded with in-game bonuses for completing environmentally friendly tasks, such as recycling or using renewable energy.
# Contracts
E-Avatar Contract - Game character NFTs with portion ownership of the E-Avatar green bond<br />
EcoItem Contract - in-game items that are tradable and work to help game characters in the game <br />
EcoToken Contract - ERC20 token for transferring interest and maturity payments between bond issuer and investor <br />
Evolve Contact - Dynamic game character NFTs that can evolve and change their URI
# Scripts
1. Run the Python files in the generate folder to automatically generate JSON files of EAvatars and EcoItems (see below) <br />
2. Run deploy.js to deploy the EAvatar, EcoItems, and EcoToken contract <br />
3. Run batch-mint.js to mint EAvatar NFTs <br />
4. Run fetchAvatarData.js to get the EAvatar NFTs' metadata <br />
5. Run bondInteract.js to get the bond information <br />
7. Run mint-and-get-item.js to mint EcoItems NFTs and get the items' information <br />
8. Run fetchItemData.js to get the EAvatar NFTs' metadata <br />
9. Run transfer.js to transfer EAvatar or EcoItems NFTs <br />
10. Run gacha.html in the gacha folder to perform gacha spins <br />
11. Run the scripts in the Evolution folder to deploy the Evolve contract and evolve characters <br />
12. Run the scripts in the ecocoin folder to mint and get EcoToken information as well as send interest and maturity payments
# Generate NFTs
The generate folder demonstrates how we plan to generate unique NFTs to distribute, 
as well as how we will generate their relative metadata. <br/>
genAvatars.py indicates rarity of character traits and how characters are generated <br/>
metadata.py builds the individual metadata in form of json files for each NFT
# Conclusion
The Green Bond Game Character NFT provides an innovative way to promote environmentally friendly initiatives through the use of gamification. By incorporating a green bond game character into a game, players can be incentivized to support sustainable development and learn about environmentally friendly practices. The Green Bond Game Character NFT is also a unique and valuable collectible that can be owned and traded by game developers and players alike.
