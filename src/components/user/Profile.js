import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import "./Profile.css"; // Import the CSS file for styling

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />
       
          <div className="profile-page"  style={{
              backgroundImage: `url('/images/login.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              paddingTop: "1%",
              height: "700px",  
              backgroundAttachment: "fixed",
  
            }}> {/* Add the 'profile-page' class here */}
          <h2>My Profile</h2>

          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.firstname}
                />
              </figure>

              <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block my-3" // Adjust margin for spacing
                >
                  Edit Profile
                </Link>
                <Link
                  to="/password/update"
                   id="edit_profile"
                  className="btn btn-primary btn-block mt-3"
                >
                  Change Password
                </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>

              <p>
                {user.firstname} {user.lastname}
              </p>

              <h4>Email Address</h4>

              <p>{user.email}</p>

              <h4>Joined On</h4>

              <p>{String(user.createdAt).substring(0, 10)}</p>

              {/* {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )} */}

              {/* {user.role !== "admin" && (
                <Link to="/requests/me" className="btn btn-danger btn-block mt-5">
                  My Requests
                </Link>
              )} */}

              
            </div>
          </div>
          </div>
          

        </Fragment>
       
      )}
    </Fragment>
  );
};

export default Profile;
