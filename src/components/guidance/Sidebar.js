import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import TaskIcon from '@mui/icons-material/Task';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandMore";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DraftsIcon from '@mui/icons-material/Drafts';

const GuidanceSidebar = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setOpen(open);
    };

    const [openViolations, setOpenViolations] = useState(false);

    const handleViolationsClick = () => {
        setOpenViolations(!openViolations);
    };

    return (
        // <div className="sidebar-wrapper">
        //     <navv id="sidebar">
        //         <ul className="list-unstyled components">
        //             {user && user.role === "guidance" && (
        //                 <li>
        //                     <Link to="/guidance/requests">
        //                         <i className="fa fa-file"></i> Requests
        //                     </Link>
        //                 </li>
        //             )}

        //             <li>
        //                 <a
        //                     href="#documentSubmenu"
        //                     data-toggle="collapse"
        //                     aria-expanded="false"
        //                     className="custom-toggle"
        //                 >
        //                     <i className="fa fa-file"></i> Violations
        //                 </a>

        //                 <ul className="collapse list-unstyled" id="documentSubmenu">
        //                     <li>
        //                         <Link to="/guidance/violations">
        //                             <i className="fa fa-clipboard"></i> All
        //                         </Link>
        //                         <br />
        //                         <Link to="/guidance/violation">
        //                             <i className="fa fa-plus"></i> Create
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </li>

        //             <li>
        //                 <a
        //                     href="#clearanceSubmenu"
        //                     data-toggle="collapse"
        //                     aria-expanded="false"
        //                     className="custom-toggle"
        //                 >
        //                     <i className="fa fa-file"></i> Clearance
        //                 </a>

        //                 <ul className="collapse list-unstyled" id="clearanceSubmenu">
        //                     <li>
        //                         <Link to="/guidance/clearance">
        //                             <i className="fa fa-clipboard"></i> All
        //                         </Link>
        //                     </li>
        //                 </ul>
        //             </li>
        //         </ul>
        //     </navv>
        // </div>

        <>
            <IconButton
                className="sidebar-icon-button"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{
                    marginRight: 2,
                    "& .MuiSvgIcon-root": {
                        fontSize: "4rem",
                        // background: 'linear-gradient(90deg, rgba(156, 134, 92, 1) 21%, rgba(238, 213, 108, 1) 47%, rgba(236, 211, 108, 1) 48%, rgba(156, 134, 92, 1) 80%)',
                        marginLeft: "5px",
                        marginTop: "-5px",
                        // borderRadius: '75px'
                    },
                }}
            >
                <MenuIcon />
                <p style={{ margin: "2px", fontWeight: "bold", fontSize: "2rem" }}></p>
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiPaper-root": {
                        // Customize styles for the drawer paper
                        backgroundColor: "lightgray", // Example color, you can change it
                        width: "220px", // Example width, you can change it
                        marginTop: "130px",
                        background: "#B1A078",
                        "@media (max-width: 800px) and (min-width: 613px)": {
                            marginTop: "180px",
                        },
                        "@media (max-width: 612px)": {
                            marginTop: "180px",
                        },
                        "@media (max-width: 1000px) and (min-width: 801px)": {
                            marginTop: "106px",
                        },
                    },
                }}
            >
                <List>
                    <ListItemButton component={Link} to="/guidance/requests"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#ebde70',
                                borderRadius: '10px',
                            },
                        }}
                    >
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Requests" />
                    </ListItemButton>

                    <ListItemButton onClick={handleViolationsClick} sx={{
                        '&:hover': {
                            backgroundColor: '#ebde70',
                            borderRadius: '10px',
                        },
                    }}>
                        <ListItemIcon>
                            <ReportProblemIcon />
                        </ListItemIcon>
                        <ListItemText primary="Violations" />
                        {openViolations ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={openViolations} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/guidance/violations"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#ebde70',
                                        borderRadius: '10px',
                                    },
                                    pl: 4
                                }}
                            >
                                <ListItemIcon>
                                    <DocumentScannerIcon />
                                </ListItemIcon>

                                <ListItemText primary="All" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/guidance/violation"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#ebde70',
                                        borderRadius: '10px',
                                    },
                                    pl: 4
                                }}
                            >
                                <ListItemIcon>
                                    <NoteAddIcon />
                                </ListItemIcon>

                                <ListItemText primary="Add Violation" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton component={Link} to="/guidance/clearance"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#ebde70',
                                borderRadius: '10px',
                            },

                        }}
                    >
                        <ListItemIcon>
                            <TaskIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clearance" />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
};

export default GuidanceSidebar;