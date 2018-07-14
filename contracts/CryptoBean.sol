pragma solidity ^0.4.18;

import './token/ERC20/MintableToken.sol';

contract CryptoBean is MintableToken {
  string public name = "CryptoBean";
  string public symbol = "HT";
  uint8 public decimals = 18;
}
