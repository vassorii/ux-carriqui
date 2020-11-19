const Migrations = artifacts.require("Migrations");
const Purchase = artifacts.require("Purchase");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Purchase);
};
