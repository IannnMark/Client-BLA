import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CashierSidebar = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <div className="sidebar-wrapper">
            <navv id="sidebar">
                <ul className="list-unstyled components">

                    {user && user.role === "cashier" && (
                        <li>
                            <Link to="/cashier/requests">
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
                            <i className="fa fa-file"></i> Balance
                        </a>

                        <ul className="collapse list-unstyled" id="documentSubmenu">
                            <li>
                                <Link to="/cashier/balances">
                                    <i className="fa fa-clipboard"></i> All
                                </Link>
                                <br />
                                <Link to="/cashier/balance">
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

export default CashierSidebar;

