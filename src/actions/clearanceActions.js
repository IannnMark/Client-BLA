import axios from "axios";

import {
    NEW_CLEARANCE_REQUEST,
    NEW_CLEARANCE_SUCCESS,
    NEW_CLEARANCE_FAIL,

    CLEAR_ERRORS,

    GUIDANCE_CLEARANCE_REQUEST,
    GUIDANCE_CLEARANCE_SUCCESS,
    GUIDANCE_CLEARANCE_FAIL,

    DELETE_CLEARANCE_REQUEST,
    DELETE_CLEARANCE_SUCCESS,
    DELETE_CLEARANCE_FAIL,

    UPDATE_CLEARANCE_REQUEST,
    UPDATE_CLEARANCE_SUCCESS,
    UPDATE_CLEARANCE_FAIL,

    CLEARANCE_DETAILS_REQUEST,
    CLEARANCE_DETAILS_SUCCESS,
    CLEARANCE_DETAILS_FAIL,
} from "../constants/clearanceConstants";




export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};




export const newClearance = (clearanceData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CLEARANCE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_API}api/v1/clearance/new`,
            clearanceData,
            config
        );

        dispatch({
            type: NEW_CLEARANCE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_CLEARANCE_FAIL,
            payload: error.response ? error.response.data.message : 'Network Error',
        });
    }
};



export const getGuidanceClearance = () => async (dispatch) => {
    try {
        dispatch({ type: GUIDANCE_CLEARANCE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.get(
            `${process.env.REACT_APP_API}api/v1/guidance/clearance`,
            config
        );

        dispatch({
            type: GUIDANCE_CLEARANCE_SUCCESS,
            payload: data.clearance,
        });
    } catch (error) {
        dispatch({
            type: GUIDANCE_CLEARANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getClearance = () => async (dispatch) => {
    try {
        dispatch({ type: GUIDANCE_CLEARANCE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.get(
            `${process.env.REACT_APP_API}api/v1/clearance`,
            config
        );

        dispatch({
            type: GUIDANCE_CLEARANCE_SUCCESS,
            payload: data.clearance,
        });
    } catch (error) {
        dispatch({
            type: GUIDANCE_CLEARANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};



export const deleteClearance = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CLEARANCE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.delete(`${process.env.REACT_APP_API}api/v1/guidance/clearance/${id}`, config);

        dispatch({
            type: DELETE_CLEARANCE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CLEARANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getClearanceDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: CLEARANCE_DETAILS_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/guidance/clearance/${id}`, config);

        console.log("Clearance details response:", data);

        if (!data.success || !data.clearance) {
            throw new Error('Invalid response format');
        }

        dispatch({
            type: CLEARANCE_DETAILS_SUCCESS,
            payload: data.clearance,
        });
    } catch (error) {
        console.error("Error in getClearanceDetails:", error);

        dispatch({
            type: CLEARANCE_DETAILS_FAIL,
            payload: { error: `Error fetching clearance details: ${error.message}` },
        });
    }
};




export const updateClearance = (id, clearanceData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CLEARANCE_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}api/v1/guidance/balance/${id}`, clearanceData, config);

        dispatch({
            type: UPDATE_CLEARANCE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CLEARANCE_FAIL,
            payload: error.response ? error.response.data.message : 'Error updating clearance',
        });
    }
};
