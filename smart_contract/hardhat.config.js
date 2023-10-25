require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:7545',
      accounts: [`0x332ee9819290c7a8c7285e9031e7932e726c09d700d607689d93512b523248ee`]
    }
  }
};