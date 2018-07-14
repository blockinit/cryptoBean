pragma solidity ^0.4.18;

import './CryptoBean.sol';
import './crowdsale/emission/MintedCrowdsale.sol';
import './crowdsale/validation/TimedCrowdsale.sol';


contract CryptoBeanCrowdsale is TimedCrowdsale, MintedCrowdsale {
    constructor
        (
            uint256 _openingTime,
            uint256 _closingTime,
            uint256 _rate,
            address _wallet,
            MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime) {

        }
}
