import {
    NEW_BALANCE_REQUEST,
    NEW_BALANCE_SUCCESS,
    NEW_BALANCE_RESET,
    NEW_BALANCE_FAIL,

    CLEAR_ERRORS,

    CASHIER_BALANCE_REQUEST,
    CASHIER_BALANCE_SUCCESS,
    CASHIER_BALANCE_FAIL,

    DELETE_BALANCE_REQUEST,
    DELETE_BALANCE_SUCCESS,
    DELETE_BALANCE_RESET,
    DELETE_BALANCE_FAIL,

    UPDATE_BALANCE_REQUEST,
    UPDATE_BALANCE_SUCCESS,
    UPDATE_BALANCE_RESET,
    UPDATE_BALANCE_FAIL,

    BALANCE_DETAILS_REQUEST,
    BALANCE_DETAILS_SUCCESS,
    BALANCE_DETAILS_FAIL,

} from "../constants/balanceConstants";

const initialState = {
    loading: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
};



export const balancesReducer = (state = { loading: false, error: null, balances: [] }, action) => {
    switch (action.type) {
        case CASHIER_BALANCE_REQUEST:
            return {
                loading: true,
                balances: [],
            };
        case CASHIER_BALANCE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CASHIER_BALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                balances: action.payload,
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



export const newBalanceReducer = (state = { balance: {} }, action) => {
    switch (action.type) {
        case NEW_BALANCE_REQUEST:
            return {
                ...state,

                loading: true,
            };
        case NEW_BALANCE_SUCCESS:
            return {
                loading: false,

                success: action.payload.success,

                balance: action.payload.balance,
            };

        case NEW_BALANCE_FAIL:
            return {
                ...state,

                error: action.payload,
            };
        case NEW_BALANCE_RESET:
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






export const balanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BALANCE_REQUEST:
        case UPDATE_BALANCE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                isDeleted: false,
                isUpdated: false
            };
        case DELETE_BALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
                isUpdated: false,
                error: null
            };
        case UPDATE_BALANCE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                error: null,
            };
        case DELETE_BALANCE_FAIL:
        case UPDATE_BALANCE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isDeleted: false,
                isUpdated: false
            };
        case DELETE_BALANCE_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_BALANCE_RESET:
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




export const balanceDetailsReducer = (state = { loading: false, balance: {} }, action) => {
    switch (action.type) {
        case BALANCE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case BALANCE_DETAILS_SUCCESS:
            return {
                loading: false,
                balance: action.payload,
            };
        case BALANCE_DETAILS_FAIL:
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