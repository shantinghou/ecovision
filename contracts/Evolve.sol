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

contract Evolve is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private charEvolvedURI;
    mapping(uint256 => uint8) private evolutionStage;

    constructor() ERC721("Evolve", "E") {
        charEvolvedURI[0] = "QmUSD4Dki1LzUmfQhyG7pBDuGsBHavmNwzZAu115b7Tj5n";
        charEvolvedURI[1] = "QmQLtcMTdWngE65HFAaMEouMVom5D7JDDrifV2zSvwBT4y";
    }

    //MINT NFT-----------------------------------------------------------------
    //string memory tokenURI should resolve to a JSON document that describes the NFT's metadata.
    function mintNFT(address recipient)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, charEvolvedURI[0]);

        return newItemId;
    }
    
    // EVOLUTION ---------------------------------------------------------------
    // Character Evolution
    function evoStage (uint256 tokenId) public view returns (uint8){
        return evolutionStage[tokenId];
    }

    function evolveCharacter(uint256 tokenId) public {
        uint8 stage = evoStage(tokenId);
        if (stage >= 1) { return;}
        uint8 newStage = stage + 1;
        string memory newURI = charEvolvedURI[newStage];
        _setTokenURI(tokenId, newURI);
    }

    // check evolution state
    function evolveState(uint256 tokenId) public view returns(uint8 evolve, string memory uri){
        AvatarChar memory avatar = idToMetadata[tokenId].character;
        return (avatar.evolved, avatar.characterURI);
    }
}