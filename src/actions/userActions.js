import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  CLEAR_ERRORS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  USER_SALES_REQUEST,
  USER_SALES_SUCCESS,
  USER_SALES_FAIL,
  USER_REQUESTS_REQUEST,
  USER_REQUESTS_SUCCESS,
  USER_REQUESTS_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}api/v1/login`,
      // `http://localhost:4000/api/v1/login`,
      // "/api/v1/login",
      { email, password },
      config
    );

    console.log('Login Response:', data);

    dispatch({
      type: LOGIN_SUCCESS,

      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${process.env.REACT_APP_API}api/v1/admin/register`, userData, config);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: "Email already exists",
      });
    } else {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};



// Load user

// export const loadUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: LOAD_USER_REQUEST });
//     const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`);
//     // const { data } = await axios.get("/api/v1/me");
//     dispatch({
//       type: LOAD_USER_SUCCESS,
//       payload: data.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOAD_USER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const response = await axios.get(`${process.env.REACT_APP_API}api/v1/me`, { withCredentials: true });

    console.log('Load User Response:', response.data); // Add this line to log the response

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: response.data.user,
    });
  } catch (error) {
    console.error('Load User Error:', error); // Add this line to log the error

    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response ? error.response.data.message : 'Unknown error',
    });
  }
};


export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_API}api/v1/logout`, { withCredentials: true });
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${process.env.REACT_APP_API}api/v1/me/update`, userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}api/v1/password/update`,
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};


// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}api/v1/password/forgot`,
      email,
      config
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset password

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({
      type: NEW_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get all users

// export const allUsers = () => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_USERS_REQUEST });

//     const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/users`);

//     dispatch({
//       type: ALL_USERS_SUCCESS,

//       payload: data.users,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_USERS_FAIL,

//       payload: error.response.data.message,
//     });
//   }
// };
export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}api/v1/admin/users`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allGuidanceUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}api/v1/guidance/users`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allCashierUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}api/v1/cashier/users`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Update user - ADMIN

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/admin/user/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete user - ADMIN

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.delete(`${process.env.REACT_APP_API}api/v1/admin/user/${id}`, config);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const userSales = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: USER_SALES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}api/v1/orders/customer-sales`,
      config
    );
    dispatch({
      type: USER_SALES_SUCCESS,
      payload: data.customerSales,
    });
  } catch (error) {
    dispatch({
      type: USER_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};




export const userRequests = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: USER_REQUESTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}api/v1/requests/user-requests`,
      config
    );
    dispatch({
      type: USER_REQUESTS_SUCCESS,
      payload: data.customerRequests,
    });
  } catch (error) {
    dispatch({
      type: USER_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
