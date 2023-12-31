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
//tostring
import "@openzeppelin/contracts/utils/Strings.sol";

contract EAvatar is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

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

    //get maturity amount
    function bondMatureAmount() public view returns (uint256 amount){
        return Bond.faceValue;
    }

    //update character after maturity
    function matureCharacter(uint256 tokenId, string memory inactiveURI) external onlyOwner() {
        require(isBondMatured());
        _setTokenURI(tokenId, inactiveURI);
        idToMetadata[tokenId].inactive = true;
    }

    //check if interest need to pay !!!!!
    function isInterestTime() public view returns (bool) {
        return (block.timestamp - Bond.issueDate) % Bond.periodOfPayment == 0;
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
            uint256 periodsElapsed = (block.timestamp - Bond.issueDate) / Bond.periodOfPayment;
            uint256 accruedInterest = interestAmount * periodsElapsed;
            return accruedInterest;
        } 
        else {
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
        string name;
        uint8 hp;
        uint8 ap;
        uint8 level; //0...10...20...30
        uint8 evolved; //0, 1, 2, 3...
    }
    //nft metadata
    struct EMetadata {
        uint256 tokenId;
        bool inactive;
        string name;
        uint256 mintedAt;
        uint256 listing_price;
        AvatarChar character;
        address ownerId;
    }

    //store metadata of all nfts on collection
    mapping(uint256 => EMetadata) private idToMetadata;
    
    event nftItemCreated (uint256 tokenId, address owner, uint256 price);

    function getLatestId () public view returns (uint256){
        return _tokenIds.current();
    }
    //MINT NFT-----------------------------------------------------------------
    //string memory tokenURI should resolve to a JSON document that describes the NFT's metadata.
    function mintNFT(address recipient, uint256 price, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        //check supply
        require(price >= Bond.faceValue, "Price is too low for mint");
        require(_tokenIds.current() < Bond.supply, "No more available nfts to purchase");
    
        _tokenIds.increment();

        uint256 tokenId = _tokenIds.current();
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        createNFTitem(tokenId, price, recipient);

        return tokenId;
    }

    function createNFTitem(uint256 tokenId, uint256 price, address owner) internal {
        idToMetadata[tokenId] = EMetadata(
            tokenId, 
            false,
            "", 
            block.timestamp, 
            price, 
            (AvatarChar("", 10, 10, 0, 0)), 
            owner
        );

        emit nftItemCreated(
            tokenId,
            owner,
            price
        );
    }

    // ADJUST METADATA ---------------------------------------------------------
    //check if owner of token, and then change character name
    function changeCharacterName(uint tokenId, address owner, string memory name) public view{
        require(ownerOf(tokenId) == owner);
        EMetadata memory data = getMetadata(tokenId);
        data.character.name = name;
    }

    function getMetadata(uint256 tokenId) public view returns(EMetadata memory item){
        return idToMetadata[tokenId];
    }

    function getMintedCount() public view returns(uint256 num){
        return _tokenIds.current();
    }
    //testing
    function changeLevel(uint256 tokenId, uint8 increase) public returns (uint8 newLevel){
        idToMetadata[tokenId].character.level += increase;
        return (idToMetadata[tokenId].character.level);
    }

    function transferAvatar(address from, address to, uint256 tokenId) public {
        idToMetadata[tokenId].ownerId = to;
        safeTransferFrom(from, to, tokenId);
    }
}
