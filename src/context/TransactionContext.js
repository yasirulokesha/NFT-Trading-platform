import React, { createContext, useEffect, useState } from 'react'
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../Utils/constants";


export const TransactionsContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionsContract
    });
}


export const TransactionsProvider = ({ children }) => {
    return (
        <TransactionsContext.Provider value={{}}>
            {children}
        </TransactionsContext.Provider>
    )
}