pragma solidity ^0.4.18;

import './CryptoBean.sol';
import './crowdsale/emission/MintedCrowdsale.sol';


contract CryptoBeanCrowdsale is MintedCrowdsale{

    ERC20 _token = new CryptoBean();

    constructor(uint256 _rate, address _wallet)
        public Crowdsale(_rate, _wallet, _token){
        }
}
