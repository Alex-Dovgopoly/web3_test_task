import { AppBar, Toolbar, Typography } from "@mui/material";
import ConnectWallet from "../connect-wallet";


function Header() {
    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: "flex",
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    LOGO
                </Typography>
                <ConnectWallet />
            </Toolbar>
        </AppBar>
    )
};

export default Header;