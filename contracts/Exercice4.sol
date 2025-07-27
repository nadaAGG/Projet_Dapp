// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice4 {
    // Vérifier si un nombre est positif
    function estPositif(int256 nombre) public pure returns (bool) {
        return nombre > 0;
    }
}