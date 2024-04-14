import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import TaskIcon from '@mui/icons-material/Task';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandMore";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DraftsIcon from '@mui/icons-material/Drafts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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

    const [isHovered, setIsHovered] = useState(false); // State to track hover state


    const handleViolationsClick = () => {
        setOpenViolations(!openViolations);
    };

    return (

        <>

            <div
                className="sidebar-icon-button"
                onClick={toggleDrawer(true)}
                style={{
                    marginRight: "2px",
                    cursor: isHovered ? "pointer" : "default",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <FontAwesomeIcon
                    icon={faBars}
                    style={{ marginRight: "5px", marginTop: "5px", fontSize: "3.5rem" }}
                />
                <p
                    style={{ margin: "2px", fontWeight: "bold", fontSize: "2rem" }}
                ></p>
            </div>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    "& .MuiPaper-root": {

                        backgroundColor: "lightgray",
                        width: "220px",
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