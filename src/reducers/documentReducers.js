import {
    ALL_DOCUMENTS_REQUEST,
    ALL_DOCUMENTS_SUCCESS,
    ALL_DOCUMENTS_FAIL,

    DOCUMENT_DETAILS_REQUEST,
    DOCUMENT_DETAILS_SUCCESS,
    DOCUMENT_DETAILS_FAIL,

    ADMIN_DOCUMENTS_REQUEST,
    ADMIN_DOCUMENTS_SUCCESS,
    ADMIN_DOCUMENTS_FAIL,

    NEW_DOCUMENT_REQUEST,
    NEW_DOCUMENT_SUCCESS,
    NEW_DOCUMENT_RESET,
    NEW_DOCUMENT_FAIL,

    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_RESET,
    DELETE_DOCUMENT_FAIL,

    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_RESET,
    UPDATE_DOCUMENT_FAIL,

    CLEAR_ERRORS,
} from "../constants/documentConstants";

const initialState = {
    loading: false,
    document: {},
    error: null,
};

export const documentsReducer = (state = { documents: [] }, action) => {
    switch (action.type) {
        case ALL_DOCUMENTS_REQUEST:
        case ADMIN_DOCUMENTS_REQUEST:
            return {
                loading: true,
                documents: [],
            };
        case ALL_DOCUMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                documents: action.payload.documents,
                documentsCount: action.payload.documentsCount,
                resPerPage: action.payload.resPerPage,
                filteredDocumentsCount: action.payload.filteredDocumentsCount,
            };
        case ALL_DOCUMENTS_FAIL:
        case ADMIN_DOCUMENTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ADMIN_DOCUMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                documents: action.payload,
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



export const documentDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DOCUMENT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DOCUMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                document: action.payload,
            };

        case DOCUMENT_DETAILS_FAIL:
            return {
                ...state,
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

export const newDocumentReducer = (state = { document: {} }, action) => {
    switch (action.type) {
        case NEW_DOCUMENT_REQUEST:
            return {
                ...state,

                loading: true,
            };
        case NEW_DOCUMENT_SUCCESS:
            return {
                loading: false,

                success: action.payload.success,

                document: action.payload.document,
            };

        case NEW_DOCUMENT_FAIL:
            return {
                ...state,

                error: action.payload,
            };
        case NEW_DOCUMENT_RESET:
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

export const documentReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_DOCUMENT_REQUEST:
        case UPDATE_DOCUMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };

        case UPDATE_DOCUMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case DELETE_DOCUMENT_FAIL:
        case UPDATE_DOCUMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case DELETE_DOCUMENT_RESET:
            return {
                ...state,
                isDeleted: false,
            };

        case UPDATE_DOCUMENT_RESET:
            return {
                ...state,
                isUpdated: false,
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