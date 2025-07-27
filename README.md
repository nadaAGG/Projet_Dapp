# TP3 Blockchain dApp

Application décentralisée (dApp) développée pour interagir avec les contrats intelligents du TP3 Solidity.

## Description

Cette dApp permet d'exécuter et de tester les 8 exercices Solidity du TP 3 à travers une interface web intuitive construite avec ReactJS, Truffle et Web3.js.

## Technologies utilisées

- **Solidity** : Langage de programmation pour les contrats intelligents
- **Truffle** : Framework de développement pour Ethereum
- **Ganache** : Blockchain Ethereum locale pour le développement
- **ReactJS** : Framework JavaScript pour l'interface utilisateur
- **Web3.js** : Bibliothèque JavaScript pour interagir avec Ethereum
- **React Router** : Gestion de la navigation

## Structure du projet

```
blockchain-tp3-dapp/
├── contracts/          # Contrats Solidity
├── migrations/         # Scripts de déploiement Truffle
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── pages/          # Pages des exercices
│   ├── utils/          # Utilitaires (configuration Web3)
│   ├── App.js          # Composant principal
│   └── index.js        # Point d'entrée React
├── public/             # Fichiers statiques
├── truffle-config.js   # Configuration Truffle
└── package.json        # Dépendances et scripts
```

## Installation et configuration

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- Ganache CLI ou Ganache GUI
- MetaMask (optionnel)

### Étapes d'installation

1. skip this step

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer Ganache**
```bash
# Avec Ganache CLI
ganache-cli -p 7545

# Ou utiliser Ganache GUI sur le port 7545
```

4. **Compiler les contrats**
```bash
truffle compile
```

5. **Déployer les contrats**
```bash
truffle migrate --reset
```

6. **Démarrer l'application React**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## Exercices implémentés

### Exercice 1 - Addition
- Fonctions `addition1()` (view) et `addition2()` (pure)
- Modification des variables d'état

### Exercice 2 - Conversion Ether/Wei
- Conversion bidirectionnelle entre Ether et Wei

### Exercice 3 - Gestion des Chaînes
- Manipulation de strings en Solidity
- Concaténation, comparaison, longueur

### Exercice 4 - Nombre Positif
- Vérification si un nombre est positif

### Exercice 5 - Parité
- Vérification de la parité d'un nombre (pair/impair)

### Exercice 6 - Tableau de Nombres
- Gestion d'un tableau dynamique
- Ajout, consultation, calcul de somme

### Exercice 7 - Héritage
- Contrat abstrait `Forme` et classe `Rectangle`
- Démonstration de l'héritage en Solidity

### Exercice 8 - Paiements
- Gestion des transactions Ether
- Réception et retrait de paiements

## Fonctionnalités de l'interface

- **Page d'accueil** : Menu avec liens vers les 8 exercices
- **Navigation** : React Router pour la navigation entre pages
- **Composants informatifs** :
  - Affichage des informations blockchain (dernier bloc, compte connecté)
  - Détails des transactions (hash, gas utilisé, statut)
- **Interface responsive** : Adaptée aux différentes tailles d'écran

