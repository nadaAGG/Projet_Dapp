// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Exercice2 {
    // Convertit des Ether en Wei
    function etherEnWei(uint256 montantEther) public pure returns (uint256) {
        return montantEther * 1 ether;
    }
    
    // Convertit des Wei en Ether
    function weiEnEther(uint256 montantWei) public pure returns (uint256) {
        return montantWei / 1 ether;
    }
}