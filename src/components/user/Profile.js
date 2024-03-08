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

          <div className="profile-page" style={{
            backgroundImage: `url('/images/userprofilebg.gif')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingTop: "1%",
            height: "700px",
            backgroundAttachment: "local, scroll",

          }}>
            <h2>My Profile</h2>

            <div className="row justify-content-around mt-4 user-info">
              <div style={{ marginLeft: 50, }}>
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
                  className="btn btn-primary btn-block my-3 ml-4"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/password/update"
                  id="edit_profile"
                  className="btn btn-primary btn-block mt-2 ml-4"
                >
                  Change Password
                </Link>
              </div>

              <div style={{ marginRight: 1000, }}>
                <div>
                  <h4 className="">Full Name</h4>
                  <p>{user.firstname} {user.lastname}</p>
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


        </Fragment>

      )}
    </Fragment>
  );
};

export default Profile;
