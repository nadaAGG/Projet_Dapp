// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice1 {
    uint256 public nombre1;
    uint256 public nombre2;
    
    constructor(uint256 _nombre1, uint256 _nombre2) {
        nombre1 = _nombre1;
        nombre2 = _nombre2;
    }
    
    // Fonction view qui calcule la somme des variables d'état
    function addition1() public view returns (uint256) {
        return nombre1 + nombre2;
    }
    
    // Fonction pure qui prend deux nombres en paramètres
    function addition2(uint256 _a, uint256 _b) public pure returns (uint256) {
        return _a + _b;
    }
    
    // Fonctions pour modifier les variables d'état
    function setNombre1(uint256 _nombre) public {
        nombre1 = _nombre;
    }
    
    function setNombre2(uint256 _nombre) public {
        nombre2 = _nombre;
    }
}