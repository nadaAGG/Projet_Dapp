// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice5 {
    // Vérifier la parité d'un nombre
    function estPair(uint256 nombre) public pure returns (bool) {
        return nombre % 2 == 0;
    }
    
    // Fonction alternative pour vérifier si impair
    function estImpair(uint256 nombre) public pure returns (bool) {
        return nombre % 2 != 0;
    }
}