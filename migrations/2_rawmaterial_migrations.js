const rawMaterial = artifacts.require("rawMaterial");

module.exports = function(deployer) {
  deployer.deploy(rawMaterial);
};