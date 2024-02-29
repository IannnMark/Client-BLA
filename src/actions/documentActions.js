import axios from "axios";

import {
    ALL_DOCUMENTS_REQUEST,
    ALL_DOCUMENTS_SUCCESS,
    ALL_DOCUMENTS_FAIL,

    DOCUMENT_DETAILS_REQUEST,
    DOCUMENT_DETAILS_SUCCESS,
    DOCUMENT_DETAILS_FAIL,

    CLEAR_ERRORS,

    ADMIN_DOCUMENTS_REQUEST,
    ADMIN_DOCUMENTS_SUCCESS,

    NEW_DOCUMENT_REQUEST,
    NEW_DOCUMENT_SUCCESS,
    NEW_DOCUMENT_FAIL,

    DELETE_DOCUMENT_REQUEST,
    DELETE_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_FAIL,

    UPDATE_DOCUMENT_REQUEST,
    UPDATE_DOCUMENT_SUCCESS,
    UPDATE_DOCUMENT_FAIL
} from "../constants/documentConstants";


export const getDocuments = (
    keyword = "",
    currentPage = 1,
    price,
    category
) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_DOCUMENTS_REQUEST,
            payload: null,
        });

        let link = `${process.env.REACT_APP_API}api/v1/documents?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;


        if (category) {
            link += `&category=${category}`;
        }

        console.log('API Request Link:', link);

        const response = await axios.get(link);

        if (response && response.data) {
            dispatch({
                type: ALL_DOCUMENTS_SUCCESS,
                payload: response.data,
            });
        } else {
            console.error('Invalid API response format:', response);
            dispatch({
                type: ALL_DOCUMENTS_FAIL,
                payload:
                    (response && response.response && response.response.data && response.response.data.message) ||
                    'An error occurred',
            });
        }
    } catch (error) {
        console.error('Document API Error:', error);
        dispatch({
            type: ALL_DOCUMENTS_FAIL,
            payload: error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'An error occurred',
        });
    }
};





export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};

export const getDocumentDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: DOCUMENT_DETAILS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/document/${id}`, { withCredentials: true });

        dispatch({
            type: DOCUMENT_DETAILS_SUCCESS,
            payload: data.document,
        });
    } catch (error) {
        dispatch({
            type: DOCUMENT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const documentDetailsReducer = (state = { document: {} }, action) => {
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
                error: null
            };

        default:
            return state;
    }
};



export const getAdminDocuments = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DOCUMENTS_REQUEST });

        const { data } = await axios.get(`${process.env.REACT_APP_API}api/v1/admin/documents`,
            {
                withCredentials: true,
            });


        dispatch({
            type: ADMIN_DOCUMENTS_SUCCESS,

            payload: data.documents,
        });
    } catch (error) {
        dispatch({
            type: ALL_DOCUMENTS_FAIL,

            payload: error.response.data.message,
        });
    }
};



export const newDocument = (documentData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_DOCUMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        const { data } = await axios.post(
            `${process.env.REACT_APP_API}api/v1/admin/document/new`,
            documentData,
            config
        );

        dispatch({
            type: NEW_DOCUMENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_DOCUMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const deleteDocument = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_DOCUMENT_REQUEST });

        const { data } = await axios.delete(
            `${process.env.REACT_APP_API}api/v1/admin/document/${id}`,
            { withCredentials: true }
        );

        dispatch({
            type: DELETE_DOCUMENT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_DOCUMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};




export const updateDocument = (id, documentData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_DOCUMENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        const { data } = await axios.put(
            `${process.env.REACT_APP_API}api/v1/admin/document/${id}`,
            documentData,
            config
        );

        dispatch({
            type: UPDATE_DOCUMENT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_DOCUMENT_FAIL,
            payload: error.response.data.message,
        });
    }
};
