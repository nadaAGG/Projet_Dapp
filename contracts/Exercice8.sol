pragma solidity ^0.8.19;

contract Payment {
    address public recipient;
    
    constructor(address _recipient) {
        recipient = _recipient;
    }
    
    // Recevoir des paiements
    function receivePayment() public payable {
        require(msg.value > 0, "Le montant doit etre superieur a 0");
    }
    
    // Retirer les fonds
    function withdraw() public {
        require(msg.sender == recipient, "Seul le destinataire peut retirer les fonds");
        payable(recipient).transfer(address(this).balance);
    }
    
    // Obtenir le solde du contrat
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    // Obtenir l'adresse de l'appelant
    function getSender() public view returns (address) {
        return msg.sender;
    }
    
    // Permettre de recevoir des Ether directement
    receive() external payable {
        require(msg.value > 0, "Le montant doit etre superieur a 0");
    }
}