import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { MDBDataTable } from "mdbreact";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import MetaData from "../layout/MetaData";

import Loader from "../layout/Loader";

import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { allUsers, clearErrors, deleteUser } from "../../actions/userActions";

import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  const { isDeleted } = useSelector((state) => state.user);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isDeleted) {
      successMsg("User deleted successfully");
      // alert.success('User deleted successfully');

      navigate("/admin/users");

      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);
  //   }, [dispatch, alert, error, navigate]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "No.", // Add a label for the counter column
          field: "index", // Use a field name for the counter column
          sort: "asc", // Sort the counter column in ascending order
        },
        {
          label: "User ID",

          field: "id",

          sort: "asc",
        },

        {
          label: "First Name",

          field: "firstname",

          sort: "asc",
        },
        {
          label: "Last Name",

          field: "lastname",

          sort: "asc",
        },

        {
          label: "Email",

          field: "email",

          sort: "asc",
        },

        {
          label: "Role",

          field: "role",

          sort: "asc",
        },

        {
          label: "Avatar",

          field: "avatar",

          sort: "asc",
        },

        {
          label: "Actions",

          field: "actions",
        },
      ],

      rows: [],
    };

    users.forEach((user, index) => {
      data.rows.push({
        id: user._id,

        firstname: user.firstname,

        lastname: user.lastname,

        email: user.email,

        role: user.role,

        avatar: user.avatar ? (
          <img
            src={user.avatar.url}
            alt={user.fname}
            className="avatar-image"
            style={{ width: "80px", height: "80px" }}
          />
        ) : null,

        actions: (
          <Fragment>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteUserHandler(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>

            {/* <button className="btn btn-danger py-1 px-2 ml-2">

                        <i className="fa fa-trash"></i>

                    </button>*/}
          </Fragment>
        ),
        index: index + 1, // New field to hold the sequential number
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Users"} />

      <div className="row">
        <div className="col-12 col-md-1">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3 custom-mdb-datatable" // Add custom class here
                bordered
                striped
                hover
                noBottomColumns
                responsive
                searching={true} // Enable searching
                searchLabel="Search..." // Customize search input placeholder
                entriesLabel="Show entries"
                entriesOptions={[10, 20, 30]}
                infoLabel={["Showing", "to", "of", "entries"]}
                paginationLabel={["Previous", "Next"]}
                responsiveSm
                responsiveMd
                responsiveLg
                responsiveXl
                noRecordsFoundLabel="No records found"
                paginationRowsPerPageOptions={[10, 20, 30]}
                pagingTop
                pagingBottom
                paginationLabels={["Previous", "Next"]}
                style={{
                  fontSize: "16px",
                  fontFamily:
                    "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                }}
                // Add custom styling for cells based on request status
                tbodyTextBlack
                tbodyBorderY
                tbodyBorderX
                tbodyBorderBottom
                tbodyBorderTop
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;