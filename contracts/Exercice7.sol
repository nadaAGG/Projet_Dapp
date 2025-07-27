// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Contrat abstrait Forme
abstract contract Forme {
    uint public x;
    uint public y;
    
    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }
    
    // Déplacer la forme
    function deplacerForme(uint dx, uint dy) public {
        x = dx;
        y = dy;
    }
    
    // Afficher les coordonnées
    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }
    
    // Fonction virtuelle pure
    function afficheInfos() public pure virtual returns (string memory) {
        return "Je suis une forme";
    }
    
    // Fonction virtuelle à implémenter
    function surface() public view virtual returns (uint);
}

// Contrat concret Rectangle
contract Rectangle is Forme {
    uint public lo; // longueur
    uint public la; // largeur
    
    constructor() Forme(10, 20) {
        lo = 5;
        la = 3;
    }
    
    // Implémentation de la fonction surface
    function surface() public view override returns (uint) {
        return lo * la;
    }
    
    // Redéfinition de afficheInfos
    function afficheInfos() public pure override returns (string memory) {
        return "Je suis Rectangle";
    }
    
    // Afficher longueur et largeur
    function afficheLoLa() public view returns (uint, uint) {
        return (lo, la);
    }
    
    // Modifier les dimensions
    function setDimensions(uint _longueur, uint _largeur) public {
        lo = _longueur;
        la = _largeur;
    }
}