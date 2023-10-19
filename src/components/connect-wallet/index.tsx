import { useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Web3Context } from "../../context/connector";


const ConnectWallet = () => {
    const { chainId, account, active } = useWeb3React<Web3Provider>()
    const { activateMetamask, deactivateMetamask } = useContext(Web3Context);

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (sessionStorage?.getItem('isConnected') === 'metamask') {
                activateMetamask();
            }
        }
        connectWalletOnPageLoad()
    }, [activateMetamask])

    return (
        <>
            {active ? (
                <Box display={"flex"} gap={3}>
                    <Stack direction="column" alignItems="flex-end" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Typography variant="body2" component="span">Account: {account}</Typography>
                        <Typography variant="body2" component="span">Chain Id: {chainId}</Typography>
                    </Stack>
                    <Button variant="contained" color="success" size="small" onClick={deactivateMetamask}>
                        Disconnect
                    </Button>
                </Box>
            ) : (
                <Button variant="contained" color="success" size="small" onClick={activateMetamask}>
                    Connect MetaMask
                </Button>
            )}
        </>
    )
};

export default ConnectWallet;