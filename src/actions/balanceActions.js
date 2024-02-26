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

} from "../constants/balanceConstants";


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};


export const getCashierBalance = () => async (dispatch) => {
    try {
        dispatch({ type: CASHIER_BALANCE_REQUEST });

        const { data } = await axios.get(`/api/v1/cashier/balance`);

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



export const newBalance = (balanceData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_BALANCE_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };


        const { data } = await axios.post(
            `/api/v1/cashier/balance/new`,
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

        const { data } = await axios.delete(`/api/v1/cashier/balance/${id}`);

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

        const { data } = await axios.get(`/api/v1/cashier/balance/${id}`);

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
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/cashier/balance/${id}`, balanceData, config);

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




