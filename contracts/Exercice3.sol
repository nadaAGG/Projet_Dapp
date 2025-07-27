pragma solidity ^0.8.19;

contract GestionChaines {
    string public message;
    
    constructor() {
        message = "Message initial";
    }
    
    // Modifier la valeur de message
    function setMessage(string memory _message) public {
        message = _message;
    }
    
    // Retourner la valeur de message
    function getMessage() public view returns (string memory) {
        return message;
    }
    
    // Concatener deux chaines
    function concatener(string memory a, string memory b) public pure returns (string memory) {
        return string.concat(a, b);
    }
    
    // Concatener message avec une autre chaine
    function concatenerAvec(string memory autreChaine) public view returns (string memory) {
        return string.concat(message, autreChaine);
    }
    
    // Retourner la longueur d'une chaine
    function longueur(string memory s) public pure returns (uint256) {
        return bytes(s).length;
    }
    
    // Comparer deux chaines
    function comparer(string memory a, string memory b) public pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}
