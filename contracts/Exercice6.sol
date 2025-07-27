// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice6 {
    uint[] public nombres;
    
    constructor() {
        nombres = [1, 2, 3, 4, 5]; // Initialisation avec quelques valeurs
    }
    
    // Ajouter un nombre au tableau
    function ajouterNombre(uint _nombre) public {
        nombres.push(_nombre);
    }
    
    // Retourner l'élément à l'indice donné
    function getElement(uint index) public view returns (uint) {
        require(index < nombres.length, "Index inexistant dans le tableau");
        return nombres[index];
    }
    
    // Afficher tout le tableau
    function afficheTableau() public view returns (uint[] memory) {
        return nombres;
    }
    
    // Calculer la somme des nombres dans le tableau
    function calculerSomme() public view returns (uint) {
        uint somme = 0;
        for (uint i = 0; i < nombres.length; i++) {
            somme += nombres[i];
        }
        return somme;
    }
    
    // Obtenir la taille du tableau
    function getTaille() public view returns (uint) {
        return nombres.length;
    }
}