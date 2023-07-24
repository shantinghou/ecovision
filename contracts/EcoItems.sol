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

    // For metadata
    string public baseURI = "";

    // Track total supply
    uint256 private _totalSupply;

    // Check onlyOwner
    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    struct EWeapons {
        uint8 speed;
        uint8 ap_boost;
    }

    struct EPotions {
        uint8 hp_boost;
        uint8 ap_boost;
        uint8 speed;
        uint8 timeLimit;
    }

    enum ItemType { EWeapons, EPotions }

    struct ItemMetadata {
        uint256 tokenId;
        uint256 mintedAt;
        uint256 listing_price;
        address ownerId;
        ItemType itemType;
        bytes itemData;
    }

    event EWeaponMinted(uint256 tokenId, address owner, uint8 speed, uint8 ap_boost);
    event EPotionMinted(uint256 tokenId, address owner, uint8 hp_boost, uint8 ap_boost, uint8 speed, uint8 timeLimit);

    // Each item can be either an EWeapon or EPotion
    mapping(uint256 => ItemMetadata) public items;

    constructor() ERC721("EcoItems", "EI") {
        _totalSupply = 0;
    }

    // Public function to check total supply of items
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Function to mint an EWeapon
    function mintEWeaponItem(uint8 speed, uint8 ap_boost, string memory tokenURI) external onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        bytes memory data = abi.encode(EWeapons(speed, ap_boost));
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI); 
        items[newItemId] = ItemMetadata(
            newItemId,
            block.timestamp,
            0, 
            msg.sender,
            ItemType.EWeapons,
            data
        );
        _totalSupply++;

        emit EWeaponMinted(newItemId, msg.sender, speed, ap_boost);
    }

    // Function to mint an EPotion
    function mintEPotionItem(uint8 hp_boost, uint8 ap_boost, uint8 speed,  
    uint8 timeLimit, string memory tokenURI) external onlyOwner {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        bytes memory data = abi.encode(EPotions(hp_boost, ap_boost, speed, timeLimit));
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI); 
        items[newItemId] = ItemMetadata(
            newItemId,
            block.timestamp,
            0,
            msg.sender,
            ItemType.EPotions,
            data
        );
        _totalSupply++;

        emit EPotionMinted(newItemId, msg.sender, hp_boost, ap_boost, speed, timeLimit);
    }

    // Override the _transfer function to update the ownerId when a token is transferred
    function _transfer(address from, address to, uint256 tokenId) internal override {
        super._transfer(from, to, tokenId);
        items[tokenId].ownerId = to;
    }

    // Helper function to decode EWeapons data from bytes
    function decodeEWeapons(bytes memory data) internal pure returns (EWeapons memory) {
        (uint8 speed, uint8 ap_boost) = abi.decode(data, (uint8, uint8));
        return EWeapons(speed, ap_boost);
    }

    // Helper function to decode EWeapons data from bytes
    function decodeEPotions(bytes memory data) internal pure returns (EPotions memory) {
        (uint8 hp_boost, uint8 ap_boost, uint8 speed, uint8 timeLimit) = 
        abi.decode(data, (uint8, uint8, uint8, uint8));
        return EPotions(hp_boost, ap_boost, speed, timeLimit);
    }

    // Public function to fetch EWeapons data for an item
    function getEWeaponsData(uint256 tokenId) public view returns (EWeapons memory) {
        require(items[tokenId].itemType == ItemType.EWeapons, "Not an EWeapons item");
        return decodeEWeapons(items[tokenId].itemData);
    }

    // Public function to fetch EPotions data for an item
    function getEPotionsData(uint256 tokenId) public view returns (EPotions memory) {
        require(items[tokenId].itemType == ItemType.EPotions, "Not an EPotions item");
        return decodeEPotions(items[tokenId].itemData);
    }
}