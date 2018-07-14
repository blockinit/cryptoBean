var CryptoBeanCrowdsale = artifacts.require("./CryptoBeanCrowdsale.sol");
var CryptoBean = artifacts.require('./CryptoBean.sol');

module.exports = function(deployer, network, accounts) {
    const rate = new web3.BigNumber(150);   // 1eth = 150 coffees.
    const wallet = accounts[1];

    return deployer
        .then(() => {
            return deployer.deploy(CryptoBean);
        })
        .then(() => {
            return deployer.deploy(
                CryptoBeanCrowdsale,
                rate,
                wallet
            );
        });
};
