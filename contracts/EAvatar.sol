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

contract EAvatar is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // Counters.Counter private _itemsSold;

    //NFT bond------------------------------------------------------------
    struct EBond {
        address bondIssuer;
        string bondName;
        uint issueDate;
        uint256 maturityDate;
        uint256 interestPaymentPercent;
        uint256 periodOfPayment;
        uint256 faceValue;
        uint256 shift;
        uint256 supply;
    }

    EBond private Bond;
    constructor(address bond_issuer) ERC721("EAvatar", "EA") {
        Bond = EBond(bond_issuer, "E-Bond One", 
                        block.timestamp, //issue date - set in deployment
                        1852905600, //unix timestamp https://www.unixtimestamp.com/
                        5,  //interest payment percent
                        15778463, //half a year
                        100000, //face value
                        2, //shift
                        1000 // supply
                    );
    }

    //get bond info
    function getBondInfo() public view returns (EBond memory bond){
        return Bond;
    }
    //get issuer address
    function getIssuer() public view returns (address issuer){
        return Bond.bondIssuer;
    }

        //check if bond has reached maturity
    function isBondMatured() public view returns (bool) {
    return block.timestamp >= Bond.maturityDate;
    }

    //get interest amount
    function interestPaymentAmount() public view returns (uint256 amount){
        //calculate interest amount
        if (!isBondMatured()) {
            return (Bond.faceValue * Bond.interestPaymentPercent) 
            / (10**Bond.shift);
        } else {
            return 0;
        }  
    }

    //get accrued interest amount
    function calculateAccruedInterest() public view returns (uint256) {
    if (!isBondMatured()) {
        uint256 interestAmount = interestPaymentAmount();
        uint256 periodsElapsed = (block.timestamp - Bond.maturityDate) / Bond.periodOfPayment;
        uint256 accruedInterest = interestAmount * periodsElapsed;
        return accruedInterest;
        } else {
        return 0;
        }
    }

    //get if collection available for purchase
    function availableNFTs() public view returns (bool ans){
        return (Bond.supply > 0);
    }

    //NFT metadata------------------------------------------------------------

    //character data
    struct AvatarChar {
        string characterUrl;
    }
    //nft metadata
    struct EMetadata {
        uint256 tokenId;
        // string name;
        uint256 mintedAt;
        // uint256 percentOwnership;
        // uint256 shift;
        uint256 listing_price;
        // AvatarChar character;
        address ownerId;
    }

    //store metadata of ALLLLLL nfts on collection
    mapping(uint256 => EMetadata) private idToMetadata;
    mapping(address => uint256[]) private ownerIds;
    
    event nftItemCreated (uint256 tokenId, address owner, uint256 price);

    //MINT NFT
    //string memory tokenURI should resolve to a JSON document that describes the NFT's metadata.
    function mintNFT(address recipient, string memory tokenURI, uint256 price)
        public onlyOwner
        returns (uint256)
    {
        //check supply
        require(_tokenIds.current() < Bond.supply, "No more available nfts to purchase");
    
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        createNFTitem(newItemId, price, recipient);

        return newItemId;
    }

    function createNFTitem(uint256 tokenId, uint256 price, address owner) private {
        // require(price > 0, "Price must be at least 1 ether");

        idToMetadata[tokenId] = EMetadata(
            tokenId, block.timestamp, price, owner
        );

        ownerIds[owner].push(tokenId);

        emit nftItemCreated(
            tokenId,
            owner,
            price
        );
    }
    function getMetadata(uint tokenId) public view returns(EMetadata memory item){
        return idToMetadata[tokenId];
    }
    //get tokenIds of owner
    function ownerCollection(address owner) public view returns(uint[] memory ids){
        return ownerIds[owner];
    }


    //for metadata
    string private _baseUri;

    function setBaseURI(string calldata baseUri) external onlyOwner() {
        _baseUri = baseUri;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    event NftBought(address from, address to, uint256 _amount);

    //transfer 
    function transferNFT(address payable from, address payable to, uint _amount, uint256 tokenId) public payable{
       //require _to to pay _from / contract
        // require(msg.value == _amount, 'Incorrect value');

        safeTransferFrom(from, to, tokenId);
        // update - not for sale anymore
        payable(to).transfer(_amount); // send the ETH to the seller

        emit NftBought(from, msg.sender, msg.value);
    }
}