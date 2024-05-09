import React, { useState, useRef, useEffect } from "react";
// import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.css";
import "./sidebar.css"; // Import CSS file for sidebar styles 

const GuidanceSidebar = () => {
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (event) => {
        event.preventDefault();
        const dropdown = document.getElementById("documentDropdown");
        dropdown.style.display =
            dropdown.style.display === "none" ? "block" : "none";
    };

    const toggleDropdownn = (event) => {
        event.preventDefault();
        const dropdown = document.getElementById("productDropdown");
        dropdown.style.display =
            dropdown.style.display === "none" ? "block" : "none";
    };

    return (
        <>
            <div className={`sidebar-container ${open ? "sidebar-open" : ""}`}>
                {!open && (
                    <div
                        className="sidebar-icon-button"
                        onClick={toggleDrawer}
                        style={{
                            marginRight: "2px",
                            cursor: "pointer",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            style={{
                                marginRight: "5px",
                                marginTop: "5px",
                                fontSize: "3.5rem",
                            }}
                        />
                        <p
                            style={{ margin: "2px", fontWeight: "bold", fontSize: "2rem" }}
                        ></p>
                    </div>
                )}
                {open && (
                    <>
                        <div className="sidebar-backdrop" onClick={toggleDrawer}></div>
                        <div
                            className="custom-drawer"
                            style={{
                                backgroundColor: "#B1A078",
                                marginTop: "-11px",
                                zIndex: "1000",
                            }}
                            ref={sidebarRef}
                        >
                            <div className="drawer-content">
                                <ul className="list-unstyled components">
                                    <li>
                                        <a href="/guidance/requests">
                                            <i class="fa-solid fa-envelope-open-text"></i> Requests
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#" onClick={toggleDropdown}>
                                            <i
                                                className="fa fa-file"
                                                style={{ marginBottom: "-0px" }}
                                            ></i>{" "}
                                            Violations
                                        </a>

                                        <ul
                                            id="documentDropdown"
                                            style={{ display: "none", marginTop: "15px" }}
                                        >
                                            <a href="/guidance/violations" className="document-link">
                                                <i class="fa-solid fa-triangle-exclamation"></i> Violation
                                                List
                                            </a>
                                            <br></br>
                                            <br></br>
                                            <a href="/guidance/violation">
                                                <i class="fa-solid fa-folder-plus"></i> Add Record
                                            </a>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="/guidance/clearance">
                                            <i class="fa-solid fa-warehouse"></i> Clearance
                                        </a>
                                    </li>


                                    <li>
                                        <a href="/guidance/violation-logs">
                                            <i class="fa fa-history"></i> Violation Logs
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GuidanceSidebar;