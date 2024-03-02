import axios from "axios";

import {
    NEW_CLEARANCE_REQUEST,
    NEW_CLEARANCE_SUCCESS,
    NEW_CLEARANCE_RESET,
    NEW_CLEARANCE_FAIL,

    CLEAR_ERRORS,

    GUIDANCE_CLEARANCE_REQUEST,
    GUIDANCE_CLEARANCE_SUCCESS,
    GUIDANCE_CLEARANCE_FAIL,

    DELETE_CLEARANCE_REQUEST,
    DELETE_CLEARANCE_SUCCESS,
    DELETE_CLEARANCE_RESET,
    DELETE_CLEARANCE_FAIL,

    UPDATE_CLEARANCE_REQUEST,
    UPDATE_CLEARANCE_SUCCESS,
    UPDATE_CLEARANCE_RESET,
    UPDATE_CLEARANCE_FAIL,

    CLEARANCE_DETAILS_REQUEST,
    CLEARANCE_DETAILS_SUCCESS,
    CLEARANCE_DETAILS_FAIL,
} from "../constants/clearanceConstants";


const initialState = {
    loading: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
};



export const clearancesReducer = (state = { loading: false, error: null, clearances: [] }, action) => {
    switch (action.type) {
        case GUIDANCE_CLEARANCE_REQUEST:
            return {
                loading: true,
                clearances: [],
            };
        case GUIDANCE_CLEARANCE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case GUIDANCE_CLEARANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                clearances: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};




export const newClearanceReducer = (state = { clearance: {} }, action) => {
    switch (action.type) {
        case NEW_CLEARANCE_REQUEST:
            return {
                ...state,

                loading: true,
            };
        case NEW_CLEARANCE_SUCCESS:
            return {
                loading: false,

                success: action.payload.success,

                clearance: action.payload.clearance,
            };

        case NEW_CLEARANCE_FAIL:
            return {
                ...state,

                error: action.payload,
            };
        case NEW_CLEARANCE_RESET:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};



export const clearanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CLEARANCE_REQUEST:
        case UPDATE_CLEARANCE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                isDeleted: false,
                isUpdated: false
            };
        case DELETE_CLEARANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
                isUpdated: false,
                error: null
            };
        case UPDATE_CLEARANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                error: null,
            };
        case DELETE_CLEARANCE_FAIL:
        case UPDATE_CLEARANCE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isDeleted: false,
                isUpdated: false
            };
        case DELETE_CLEARANCE_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_CLEARANCE_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};





export const clearanceDetailsReducer = (state = { loading: false, clearance: {} }, action) => {
    switch (action.type) {
        case CLEARANCE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CLEARANCE_DETAILS_SUCCESS:
            return {
                loading: false,
                clearance: action.payload,
            };
        case CLEARANCE_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
