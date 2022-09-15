const SimpleStorage = artifacts.require("TodoList");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};
