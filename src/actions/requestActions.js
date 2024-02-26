import axios from "axios";
import { ADD_REQUEST, REMOVE_REQUEST, CLEAR_REQUEST } from '../constants/requestConstants'

export const addDocumentRequest = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/document/${id}`)
        dispatch({
            type: ADD_REQUEST,
            payload: {
                document: data.document._id,
                name: data.document.name,
                price: data.document.price,
                image: data.document.images[0].url,
                quantity
            }
        })
        localStorage.setItem('requestDocuments', JSON.stringify(getState().request.requestDocuments))
    } catch (error) {
        // Handle errors, log, or dispatch an error action if needed
        console.error("Error adding document request:", error);
    }
}



export const removeDocumentRequest = (id) => async (dispatch, getState) => {
    console.log('removeDocumentRequest called with id:', id);

    try {
        dispatch({
            type: REMOVE_REQUEST,
            payload: id,
        });
        localStorage.setItem(
            'requestDocuments',
            JSON.stringify(getState().request.requestDocuments)
        );
    } catch (error) {
        console.error('Error removing document:', error);
    }
};


export const clearRequest = () => async (dispatch) => {
    dispatch({
        type: CLEAR_REQUEST,
    })
}