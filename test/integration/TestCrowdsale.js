var CryptoBeanCrowdsale = artifacts.require("CryptoBeanCrowdsale");
var CryptoBean = artifacts.require("CryptoBean");

contract('CryptoBeanCrowdsale', function(accounts) {

  const wallet = accounts[1];
  const purchaser = [
    accounts[7],
  ];
  let walletInitialBalance;

  beforeEach(async function () {
    this.crowdsale = await CryptoBeanCrowdsale.deployed();
    this.token = CryptoBean.at(await this.crowdsale.token.call());
    walletInitialBalance = await web3.eth.getBalance(wallet).toNumber();
  });

  it('should deploy the token and store the address', async function(){
    assert(this.token, 'Token address couldn\'t be stored')
  });

  /**
   * 0.007eth == 1 CryptoBean (2.60e at time of writing)
   */
  describe('purchasing cryptoBean\'s', function(){
    it('will 150 cryptoBean for 1eth', async function(){
      const increase = await purchase(purchaser[0], 1, this.crowdsale);
      assert.equal(increase, 150, 'The sender didn\'t receive 150 cryptoBeans for 1ETH');
    });

    it('will get 1.125 cryptoBeans for 0.0075eth', async function(){
      const increase = await purchase(purchaser[0], 0.0075, this.crowdsale);
      assert.equal(increase, 1.125, 'The sender didn\'t receive 1.125 cryptoBeans');
    })

    it('will get 1.00. cryptoBean for 0.007 eth', async function(){
      const increase = await purchase(purchaser[0], 0.0066666667, this.crowdsale);
      assert.equal(increase, 1.000000005000004, 'The sender didn\'t receive 1.000000005000004 cryptoBeans');
    });
  });

  describe('escrow', function(){

    it('should be releasing release to funds to wallet', async function(){
      const balance = await web3.eth.getBalance(wallet).toNumber();
      console.log('walletInitialBalance: ', walletInitialBalance);
      console.log('balance: ', balance);
      const increase = web3.fromWei(walletInitialBalance - balance);
      console.log('increase: ', increase);
    })
  })
});

/**
 * Purchase tokens.
 * @helper
 * @param  {String} purchaser Purchaser address.
 * @param  {Integer} amount    The amount in ETH.
 * @param  {TruffleContract} crowdsale The crowdsale instance.
 * @return {Integer}           The amount cryptoBeans bought.
 */
async function purchase(purchaser, amount, crowdsale){
  this.token = CryptoBean.at(await crowdsale.token.call());
  const previousAmount = await this.token.balanceOf(purchaser);
  await crowdsale.buyTokens(purchaser, { from: purchaser, value: web3.toWei(amount, "ether")});
  const newAmount = await this.token.balanceOf(purchaser);

  return web3.fromWei(newAmount.toNumber(), "ether") - web3.fromWei(previousAmount.toNumber(), "ether");
}
