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

    struct EItems {
        address walletID;
        string itemName;
        uint256 HP_boost;
        uint256 AP_boost;
        uint256 supply;
    }

    EItems private Item;
    constructor(address item_owner) ERC721("EcoItems", "EI") {
        Item = EItems(item_owner, // Item issuer
                        "Dior Sauvage Elixir", // Name
                        10, // HP_Boost
                        20, // AP_Boost
                        1000 // Supply
                    );
    }

    //get Item info
    function getItemInfo() public view returns (EItems memory item){
        return Item;
    }
    //get HP Boost
    function getHPBoost() public view returns (uint256 health_boost){
        return Item.HP_boost;
    }

    //get AP Boost
    function getAPBoost() public view returns (uint256 attack_boost){
        return Item.AP_boost;
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
        address ownerId;
    }

    mapping(uint256 => ItemMetadata) private itemIdToMetadata;
    mapping(address => uint256[]) private itemOwnerIds;

    function mintNFT(address recipient, string memory tokenURI, uint256 price)
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