//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

//implementation of the ERC-721 standard
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//uses a counter to keep track of the total number of NFTs minted and set the unique ID on our new NFT
import "@openzeppelin/contracts/utils/Counters.sol";
//only the owner of the smart contract (you) can mint NFTs
import "@openzeppelin/contracts/access/Ownable.sol";
//store metadata
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//enumerate
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';

contract EcoItems is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct EWeapons {
        mapping(uint256 => string) itemTypes;
        mapping(uint256 => uint8) speed;
        mapping(uint256 => uint8) ap_boost;
        mapping(uint256 => uint256) supply;
    }

    struct EPotions {
        mapping(uint256 => string) itemTypes;
        mapping(uint256 => string) ability; //ap, hp, or speed
        mapping(uint256 => uint8) timeLimit;
        mapping(uint256 => uint256) supply;
    }

    
    EWeapons private Weapons;
    EPotions private Potions;
    constructor() ERC721("EcoItems", "EI") {
        
    }

    //get Item info
    function getItemInfo(uint256 itemId) public view returns (EItems memory item){
        return itemIdToData[itemId];
    }
    //get HP Boost
    function getHPBoost(uint256 itemId) public view returns (uint256 health_boost){
        return itemIdToData[itemId].HP_boost;
    }

    //get AP Boost
    function getAPBoost(uint256 itemId) public view returns (uint256 attack_boost){
        return itemIdToData[itemId].AP_boost;
    }

    //for metadata
    string public baseURI = "";
    //check onlyOwner 
    function setBaseURI(string memory newURI) public onlyOwner() {
        baseURI = newURI;
    }
    

    struct ItemMetadata {
        uint256 tokenId;
        uint256 mintedAt;
        uint256 listing_price;
        EItems item;
        address ownerId;
    }

    mapping(uint256 => ItemMetadata) private itemIdToMetadata;
    mapping(address => uint256[]) private itemOwnerIds;

    function mintItem(address recipient, string memory tokenURI, uint256 price)
        public onlyOwner
        returns (uint256)
    {
        //check supply
        require(_tokenIds.current() < Item.supply, "No more available nfts to purchase");
    
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        createItem(newItemId, price, recipient);

        return newItemId;
    }

    function createItem(uint256 tokenId, uint256 price, address owner) private {
        // require(price > 0, "Price must be at least 1 ether");

        itemIdToMetadata[tokenId] = ItemMetadata(
            tokenId, block.timestamp, price, owner
        );

        itemOwnerIds[owner].push(tokenId);

        emit nftItemCreated(
            tokenId,
            owner,
            price
        );
    }

    function getMetadata(uint tokenId) public view returns(ItemMetadata memory item){
        return itemIdToMetadata[tokenId];
    }
    //get tokenIds of owner
    function ownerCollection(address owner) public view returns(uint[] memory ids){
        return itemOwnerIds[owner];
    }

    event nftItemCreated (uint256 tokenId, address owner, uint256 price);
}