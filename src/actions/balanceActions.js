import axios from "axios";

import {
    NEW_BALANCE_REQUEST,
    NEW_BALANCE_SUCCESS,
    NEW_BALANCE_FAIL,

    CLEAR_ERRORS,

    CASHIER_BALANCE_REQUEST,
    CASHIER_BALANCE_SUCCESS,
    CASHIER_BALANCE_FAIL,

    DELETE_BALANCE_REQUEST,
    DELETE_BALANCE_SUCCESS,
    DELETE_BALANCE_FAIL,

    UPDATE_BALANCE_REQUEST,
    UPDATE_BALANCE_SUCCESS,
    UPDATE_BALANCE_FAIL,

    BALANCE_DETAILS_REQUEST,
    BALANCE_DETAILS_SUCCESS,
    BALANCE_DETAILS_FAIL,

    ALL_BALANCE_REQUEST,
    ALL_BALANCE_SUCCESS,
    ALL_BALANCE_FAIL,

} from "../constants/balanceConstants";


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};


export const getCashierBalance = () => async (dispatch) => {
    try {
        dispatch({ type: CASHIER_BALANCE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.get(
            `${process.env.REACT_APP_API}api/v1/cashier/balance`,
            config
        );

        dispatch({
            type: CASHIER_BALANCE_SUCCESS,
            payload: data.balance,
        });
    } catch (error) {
        dispatch({
            type: CASHIER_BALANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getAllBalance = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_BALANCE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/v1/cashier/balanceLogs`,
            config
        );

        dispatch({
            type: ALL_BALANCE_SUCCESS,
            payload: data.balanceLogs,
        });
    } catch (error) {
        dispatch({
            type: ALL_BALANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};




export const newBalance = (balanceData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BALANCE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_API}api/v1/cashier/balance/new`,
            balanceData,
            config
        );

        dispatch({
            type: NEW_BALANCE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_BALANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};




export const deleteBalance = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BALANCE_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.delete(`${process.env.REACT_APP_API}api/v1/cashier/balance/${id}`, config);

        dispatch({
            type: DELETE_BALANCE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_BALANCE_FAIL,
            payload: error.response.data.message,
        });
    }
};






export const getBalanceDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: BALANCE_DETAILS_REQUEST });

        const config = {
            withCredentials: true,
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/cashier/balance/${id}`, config);

        console.log("Balance details response:", data);

        if (!data.success || !data.balance) {
            throw new Error('Invalid response format');
        }

        dispatch({
            type: BALANCE_DETAILS_SUCCESS,
            payload: data.balance,
        });
    } catch (error) {
        console.error("Error in getBalanceDetails:", error);

        dispatch({
            type: BALANCE_DETAILS_FAIL,
            payload: { error: `Error fetching balance details: ${error.message}` },
        });
    }
};







export const updateBalance = (id, balanceData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BALANCE_REQUEST });

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}api/v1/cashier/balance/${id}`, balanceData, config);

        dispatch({
            type: UPDATE_BALANCE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BALANCE_FAIL,
            payload: error.response ? error.response.data.message : 'Error updating balance',
        });
    }
};





