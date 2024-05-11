import {
    CREATE_REQUEST,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_FAIL,
    MY_REQUESTS,
    MY_REQUESTS_SUCCESS,
    MY_REQUESTS_FAIL,
    REQUEST_DETAILS,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    ALL_REQUESTS,
    ALL_REQUESTS_SUCCESS,
    ALL_REQUESTS_FAIL,
    UPDATE_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_RESET,
    UPDATE_REQUEST_FAIL,
    DELETE_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_RESET,
    DELETE_REQUEST_FAIL,
    CLEAR_ERRORS
} from "../constants/inquiriesConstants";

export const newRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                request: action.payload,
                checkoutUrl: action.payload.checkoutUrl,
            };
        case CREATE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

export const myRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case MY_REQUESTS:
            return {
                loading: true,
            };

        case MY_REQUESTS_SUCCESS:
            return {
                loading: false,

                requests: action.payload,
            };

        case MY_REQUESTS_FAIL:
            return {
                loading: false,
                error: action.payload,
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


export const requestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case REQUEST_DETAILS:
            return {
                ...state,
                loading: true,
            };

        case REQUEST_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,

                request: action.payload,
            };

        case REQUEST_DETAILS_FAIL:
            return {
                ...state,
                loading: false,

                error: action.payload,
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

export const allRequestsReducer = (state = { requests: [] }, action) => {
    switch (action.type) {
        case ALL_REQUESTS:
            return {
                ...state,
                loading: true,
            };

        case ALL_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                requests: action.payload.requests,
                totalRequests: action.payload.totalRequests,
            };
        case ALL_REQUESTS_FAIL:
            return {
                ...state,
                loading: false,

                error: action.payload,
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

export const inquiriesReducers = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
        case DELETE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_REQUEST_FAIL:
        case DELETE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case UPDATE_REQUEST_RESET:
            return {
                ...state,
                isUpdated: false,
            };

        case DELETE_REQUEST_RESET:
            return {
                ...state,
                isDeleted: false,
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