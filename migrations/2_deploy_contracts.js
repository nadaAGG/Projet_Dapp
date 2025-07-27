const Exercice1 = artifacts.require("Exercice1");
const Exercice2 = artifacts.require("Exercice2");
const GestionChaines = artifacts.require("GestionChaines");
const Exercice4 = artifacts.require("Exercice4");
const Exercice5 = artifacts.require("Exercice5");
const Exercice6 = artifacts.require("Exercice6");
const Rectangle = artifacts.require("Rectangle");
const Payment = artifacts.require("Payment");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Exercice1, 10, 20);
  deployer.deploy(Exercice2);
  deployer.deploy(GestionChaines);
  deployer.deploy(Exercice4);
  deployer.deploy(Exercice5);
  deployer.deploy(Exercice6);
  deployer.deploy(Rectangle);
  deployer.deploy(Payment, accounts[0]);
};