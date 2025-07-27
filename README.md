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

## Configuration MetaMask (Optionnel)

Pour utiliser MetaMask au lieu de Ganache :

1. Configurer un réseau personnalisé dans MetaMask :
   - RPC URL : `http://127.0.0.1:7545`
   - Chain ID : `1337`
   - Symbol : `ETH`

2. Importer un compte depuis Ganache avec sa clé privée

## Scripts et commandes Truffle

### Commandes Truffle directes (recommandées) :
- `truffle compile` : Compile les contrats Solidity
- `truffle migrate --reset` : Déploie les contrats sur Ganache


### Scripts npm disponibles :
- `npm start` : Démarre l'application React
- `npm run build` : Construit l'application pour la production
- `npm test` : Lance les tests React

## Structure des contrats

Chaque contrat correspond à un exercice spécifique :
- `Exercice1.sol` : Addition avec fonctions view/pure
- `Exercice2.sol` : Conversion Ether/Wei
- `GestionChaines.sol` : Manipulation de strings
- `Exercice4.sol` : Vérification nombre positif
- `Exercice5.sol` : Vérification parité
- `Exercice6.sol` : Gestion tableau dynamique
- `Exercice7.sol` : Héritage (Forme abstraite + Rectangle)
- `Payment.sol` : Gestion des paiements

## Dépannage

### Erreurs communes

1. **Contrats non déployés** : Vérifier que Ganache est démarré et que `npm run migrate` a été exécuté

2. **Erreur de réseau** : Vérifier la configuration dans `truffle-config.js` (port 7545)

3. **MetaMask non connecté** : L'application fonctionne avec Ganache même sans MetaMask

4. **Transactions échouées** : Vérifier que le compte a suffisamment d'Ether pour les frais de gas

## Auteur

Projet réalisé dans le cadre du Master GLCC - Module Blockchain & Web3
Professeur : M. OUALLA
Année universitaire : 2024/2025
