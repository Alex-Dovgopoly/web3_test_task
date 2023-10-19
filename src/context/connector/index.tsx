import { createContext, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';

const injectedConnector = new InjectedConnector({
    supportedChainIds: [11155111]
});

// Create context
export const Web3Context = createContext({
    activateMetamask: () => { },
    deactivateMetamask: () => { },
});

function ConnectorProvider({ children }: any) {
    const { activate, deactivate } = useWeb3React<Web3Provider>()

    // Connect to MetaMask wallet
    const connectMetamask = useCallback(async () => {
        await activate(injectedConnector);
        sessionStorage.setItem("isConnected", "metamask");
    }, [activate]);

    // Disconnect MetaMask wallet
    const disconnectMetamask = () => {
        deactivate()
        sessionStorage.setItem("isConnected", "");
    };

    return (
        <Web3Context.Provider value={{ activateMetamask: connectMetamask, deactivateMetamask: disconnectMetamask }}>
            {children}
        </Web3Context.Provider>
    );
};

export default ConnectorProvider;