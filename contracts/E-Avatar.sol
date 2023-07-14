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

    struct EBond {
        address bondIssuer;
        string bondName;
        uint issueDate;
        uint256 maturityDate;
        uint256 interestPayment;
        uint256 periodOfPayment;
        uint256 faceValue;
        uint256 shift;
    }

    EBond private Bond;

    //(collection name, collection symbol)
    constructor(address bond_issuer) ERC721("E-Avatar", "E-A") {
        Bond = EBond(bond_issuer, "E-Bond One", 
                        block.timestamp, //issue date - set in deployment
                        1852905600, //unix timestamp https://www.unixtimestamp.com/
                        5,  //interest payment
                        15778463, //half a year
                        100000, //face value
                        2 //shift
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

    //get interest amount
    function interestPaymentAmount() public view returns (uint256 amount){
        //calculate interest amount
    }

    //after lunch - NFT metadata
    
    //string memory tokenURI should resolve to a JSON document that describes the NFT's metadata.
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    string private _baseUri;

    function setBaseURI(string calldata baseUri) external onlyOwner() {
        _baseUri = baseUri;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

}