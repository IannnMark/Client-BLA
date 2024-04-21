import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";


import "./Profile.css";


const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment >
          <MetaData title={"Your Profile"} />
          <div className="coverr">
            <div
              className="profile-page"
            >
              <h2 style={{
                marginLeft: "120px"
              }}>My Profile</h2>

              <div style={{ marginLeft: "270px" }}>
                <div>
                  <figure className="avatar avatar-profile">
                    {user.avatar && user.avatar.url ? (
                      <img
                        className="rounded-circle img-fluid"
                        src={user.avatar.url}
                        alt={user.firstname}
                      />
                    ) : (
                      <img
                        className="rounded-circle img-fluid"
                        src="/images/default_avatar.jpg" // Provide a default avatar image
                        alt={user.firstname}
                      />
                    )}
                  </figure>

                  <Link
                    to="/me/update"
                    id="edit_profile"
                    className="btn btn-primary btn-block my-3 ml-4"
                    style={{ padding: "5px 10px", fontSize: "14px", width: "150px" }}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/password/update"
                    id="edit_profile"
                    className="btn btn-primary btn-block mt-2 ml-4"
                    style={{ padding: "5px 10px", fontSize: "14px", width: "150px" }}
                  >
                    Change Password
                  </Link>
                </div>
                <div style={{ position: "fixed", left: "20px", top: "20px" }}>
                  <div className="label"
                  >
                    <div>
                      <h4>Full Name</h4>
                      <p>
                        {user.firstname} {user.lastname}
                      </p>
                    </div>

                    <div>
                      <h4 className="mr-3">Email Address</h4>
                      <p>{user.email}</p>
                    </div>

                    <div>
                      <h4 className="mr-3">Joined On</h4>
                      <p>{String(user.createdAt).substring(0, 10)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;