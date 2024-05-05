import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Collapse from '@mui/material/Collapse';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandMore';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


const CashierSidebar = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    const [openBalances, setOpenBalances] = useState(false);

    const handleBalancesClick = () => {
        setOpenBalances(!openBalances);
    };

    return (
        // <div className="sidebar-wrapper">
        //     <navv id="sidebar">
        //         <ul className="list-unstyled components">

        //             {user && user.role === "cashier" && (
        //                 <li>
        //                     <Link to="/cashier/requests">
        //                         <i className="fa fa-file"></i> Requests
        //                     </Link>
        //                 </li>
        //             )}

        //             <li>
        //                 <a
        //                     href="#documentSubmenu"
        //                     data-toggle="collapse"
        //                     aria-expanded="false"
        //                     className="dropdown-toggle"
        //                 >
        //                     <i className="fa fa-file"></i> Balance
        //                 </a>

        //                 <ul className="collapse list-unstyled" id="documentSubmenu">
        //                     <li>
        //                         <Link to="/cashier/balances">
        //                             <i className="fa fa-clipboard"></i> All
        //                         </Link>
        //                         <br />
        //                         <Link to="/cashier/balance">
        //                             <i className="fa fa-plus"></i> Create
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </li>
        //         </ul>
        //     </navv>
        // </div>

        <>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{
                    marginRight: 2,
                    "& .MuiSvgIcon-root": {
                        fontSize: '3rem',
                        color: 'red',
                        marginLeft: '20px',
                    },
                }}
            >
                <MenuIcon />
                <p style={{ margin: "2px", fontWeight: "bold" }}>DASHBOARD</p>
            </IconButton>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <List>
                    <ListItemButton component={Link} to="/cashier/requests">
                        <ListItemIcon>

                            <VolunteerActivismIcon />
                        </ListItemIcon>
                        <ListItemText primary="Requests" />
                    </ListItemButton>


                    <ListItemButton onClick={handleBalancesClick}>
                        <ListItemIcon>
                            <AccountBalanceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Balance" />
                        {openBalances ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>


                    <Collapse in={openBalances} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton component={Link} to="/cashier/balances" sx={{ pl: 4 }}>

                                <ListItemIcon>
                                    <AccountBalanceWalletIcon />
                                </ListItemIcon>

                                <ListItemText primary="All" />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/cashier/balance" sx={{ pl: 4 }}>

                                <ListItemIcon>
                                    <NoteAddIcon />
                                </ListItemIcon>

                                <ListItemText primary="Add Balance" />
                            </ListItemButton>
                        </List>
                    </Collapse>


                </List>
            </Drawer>
        </>


    );
};

export default CashierSidebar;

