import axios from "axios";

import {
    NEW_VIOLATION_REQUEST,
    NEW_VIOLATION_SUCCESS,
    NEW_VIOLATION_RESET,
    NEW_VIOLATION_FAIL,
    CLEAR_ERRORS,
    GUIDANCE_VIOLATIONS_FAIL,
    GUIDANCE_VIOLATIONS_REQUEST,
    GUIDANCE_VIOLATIONS_SUCCESS,
    DELETE_VIOLATION_REQUEST,
    DELETE_VIOLATION_SUCCESS,
    DELETE_VIOLATION_RESET,
    DELETE_VIOLATION_FAIL,
    UPDATE_VIOLATION_REQUEST,
    UPDATE_VIOLATION_SUCCESS,
    UPDATE_VIOLATION_RESET,
    UPDATE_VIOLATION_FAIL,
    VIOLATION_DETAILS_REQUEST,
    VIOLATION_DETAILS_SUCCESS,
    VIOLATION_DETAILS_FAIL,
} from "../constants/violationConstants";

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
export const getGuidanceViolations = () => async (dispatch) => {
    try {
        dispatch({ type: GUIDANCE_VIOLATIONS_REQUEST });

        const { data } = await axios.get(`/api/v1/guidance/violations`);

        dispatch({
            type: GUIDANCE_VIOLATIONS_SUCCESS,
            payload: data.violations,
        });
    } catch (error) {
        dispatch({
            type: GUIDANCE_VIOLATIONS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const newViolation = (violationData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_VIOLATION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            `http://localhost:3000/api/v1/guidance/violation/new`,
            violationData,
            config
        );

        dispatch({
            type: NEW_VIOLATION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_VIOLATION_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteViolation = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_VIOLATION_REQUEST });

        const { data } = await axios.delete(`/api/v1/guidance/violation/${id}`);

        dispatch({
            type: DELETE_VIOLATION_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_VIOLATION_FAIL,
            payload: error.response.data.message,
        });
    }
};

// export const getViolationDetails = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: VIOLATION_DETAILS_REQUEST });

//         const { data } = await axios.get(`/api/v1/guidance/violation/${id}`);

//         console.log("Violation details response:", data);

//         if (!data.success || !data.violation) {
//             dispatch({
//                 type: VIOLATION_DETAILS_FAIL,
//                 payload: { error: 'Invalid response format' },
//             });
//             return;
//         }

//         dispatch({
//             type: VIOLATION_DETAILS_SUCCESS,
//             payload: data.violation,
//         });
//     } catch (error) {
//         console.error("Error in getViolationDetails:", error);

//         dispatch({
//             type: VIOLATION_DETAILS_FAIL,
//             payload: { error: 'Error fetching violation details' },
//         });
//     }
// };


export const getViolationDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: VIOLATION_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/guidance/violation/${id}`);

        console.log("Violation details response:", data);

        if (!data.success || !data.violation) {
            throw new Error('Invalid response format');
        }

        dispatch({
            type: VIOLATION_DETAILS_SUCCESS,
            payload: data.violation,
        });
    } catch (error) {
        console.error("Error in getViolationDetails:", error);

        dispatch({
            type: VIOLATION_DETAILS_FAIL,
            payload: { error: `Error fetching violation details: ${error.message}` },
        });
    }
};





export const updateViolation = (id, violationData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VIOLATION_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/guidance/violation/${id}`, violationData, config);

        dispatch({
            type: UPDATE_VIOLATION_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_VIOLATION_FAIL,
            payload: error.response ? error.response.data.message : 'Error updating violation',
        });
    }
};