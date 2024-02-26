import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const GuidanceSidebar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="sidebar-wrapper">
            <navv id="sidebar">
                <ul className="list-unstyled components">
                    {user && user.role === "guidance" && (
                        <li>
                            <Link to="/guidance/requests">
                                <i className="fa fa-file"></i> Requests
                            </Link>
                        </li>
                    )}

                    <li>
                        <a
                            href="#documentSubmenu"
                            data-toggle="collapse"
                            aria-expanded="false"
                            className="dropdown-toggle"
                        >
                            <i className="fa fa-file"></i> Violations
                        </a>

                        <ul className="collapse list-unstyled" id="documentSubmenu">
                            <li>
                                <Link to="/guidance/violations">
                                    <i className="fa fa-clipboard"></i> All
                                </Link>
                            <br/>
                                <Link to="/guidance/violation">
                                    <i className="fa fa-plus"></i> Create
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </navv>
        </div>
    );
};

export default GuidanceSidebar;

