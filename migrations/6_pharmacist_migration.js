const Pharmacist = artifacts.require("Pharmacist");

module.exports = function (deployer) {
  deployer.deploy(Pharmacist);
};

