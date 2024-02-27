import axios from "axios";

import {
    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_FAIL,
    CLEAR_ERRORS,
    MY_REQUESTS,
    MY_REQUESTS_SUCCESS,
    MY_REQUESTS_FAIL,
    REQUEST_DETAILS,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    ALL_REQUESTS,
    ALL_REQUESTS_SUCCESS,
    ALL_REQUESTS_FAIL,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST,
    UPDATE_REQUEST_FAIL,
    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_FAIL,
} from "../constants/inquiriesConstants";


export const createRequest = (request) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/request/new`, request, config);
        dispatch({
            type: CREATE_REQUEST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_REQUEST_FAIL,
            payload: error.response.data.message,
        });
    }
};






export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const myRequests = () => async (dispatch) => {
    try {
        dispatch({ type: MY_REQUESTS });

        const config = {
            withCredentials: true, // Add this line
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/requests/me`, config);

        dispatch({
            type: MY_REQUESTS_SUCCESS,
            payload: data.requests,
        });
    } catch (error) {
        dispatch({
            type: MY_REQUESTS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getRequestDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_DETAILS });

        const config = {
            withCredentials: true, // Add this line
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/request/${id}`, config);

        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data.request,
        });
    } catch (error) {
        dispatch({
            type: REQUEST_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};








export const allRequests = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_REQUESTS });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/requests`,
            {
                withCredentials: true,
            });

        dispatch({
            type: ALL_REQUESTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REQUESTS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const allGuidanceRequests = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_REQUESTS });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/guidance/requests`, {
            withCredentials: true,
        });

        dispatch({
            type: ALL_REQUESTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REQUESTS_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const allCashierRequests = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_REQUESTS });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/cashier/requests`, {
            withCredentials: true,
        });

        dispatch({
            type: ALL_REQUESTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REQUESTS_FAIL,
            payload: error.response.data.message,
        });
    }
};






export const updateRequest = (id, requestData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        console.log('Update Request Data:', requestData);

        const response = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/admin/request/${id}`,
            requestData,
            config
        );

        console.log('Update Request Response:', response);

        dispatch({
            type: UPDATE_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Update Request Error:', error);

        dispatch({
            type: UPDATE_REQUEST_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const updateGuidanceRequest = (id, requestData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        console.log('Update Request Data:', requestData);

        const response = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/guidance/request/${id}`,
            requestData,
            config
        );

        console.log('Update Request Response:', response);
        dispatch({
            type: UPDATE_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Update Request Error:', error);

        dispatch({
            type: UPDATE_REQUEST_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const updateCashierRequest = (id, requestData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        console.log('Update Request Data:', requestData);

        const response = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/cashier/request/${id}`,
            requestData,
            config
        );

        console.log('Update Request Response:', response);
        dispatch({
            type: UPDATE_REQUEST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error('Update Request Error:', error);

        dispatch({
            type: UPDATE_REQUEST_FAIL,
            payload: error.response.data.message,
        });
    }
};








export const deleteRequest = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.delete(
            `${process.env.REACT_APP_API}/api/v1/admin/request/${id}`,
            config
        );

        dispatch({
            type: DELETE_REQUEST_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REQUEST_FAIL,
            payload: error.response.data.message,
        });
    }
};
