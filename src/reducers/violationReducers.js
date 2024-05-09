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
    ALL_VIOLATION_REQUEST,
    ALL_VIOLATION_SUCCESS,
    ALL_VIOLATION_FAIL,
} from "../constants/violationConstants";

const initialState = {
    loading: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
};


export const violationsReducer = (state = { loading: false, error: null, violations: [] }, action) => {
    switch (action.type) {
        case GUIDANCE_VIOLATIONS_REQUEST:
            return {
                loading: true,
                violations: [],
            };
        case GUIDANCE_VIOLATIONS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case GUIDANCE_VIOLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                violations: action.payload,
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

export const allViolationsReducer = (state = { loading: false, error: null, allviolations: [] }, action) => {
    switch (action.type) {
        case ALL_VIOLATION_REQUEST:
            return {
                loading: true,
                allviolations: [],
            };
        case ALL_VIOLATION_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ALL_VIOLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                allviolations: action.payload,
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


export const newViolationReducer = (state = { violation: {} }, action) => {
    switch (action.type) {
        case NEW_VIOLATION_REQUEST:
            return {
                ...state,

                loading: true,
            };
        case NEW_VIOLATION_SUCCESS:
            return {
                loading: false,

                success: action.payload.success,

                violation: action.payload.violation,
            };

        case NEW_VIOLATION_FAIL:
            return {
                ...state,

                error: action.payload,
            };
        case NEW_VIOLATION_RESET:
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


export const violationReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_VIOLATION_REQUEST:
        case UPDATE_VIOLATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                isDeleted: false,
                isUpdated: false
            };
        case DELETE_VIOLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
                isUpdated: false,
                error: null
            };
        case UPDATE_VIOLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                error: null,
            };
        case DELETE_VIOLATION_FAIL:
        case UPDATE_VIOLATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isDeleted: false,
                isUpdated: false
            };
        case DELETE_VIOLATION_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case UPDATE_VIOLATION_RESET:
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


export const violationDetailsReducer = (state = { loading: false, violation: {} }, action) => {
    switch (action.type) {
        case VIOLATION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case VIOLATION_DETAILS_SUCCESS:
            return {
                loading: false,
                violation: action.payload,
            };
        case VIOLATION_DETAILS_FAIL:
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