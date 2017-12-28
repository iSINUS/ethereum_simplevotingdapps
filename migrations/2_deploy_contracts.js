var Questionary = artifacts.require("./Questionary.sol");

module.exports = function(deployer) {
  deployer.deploy(Questionary);
};
