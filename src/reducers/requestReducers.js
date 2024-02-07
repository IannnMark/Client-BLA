import {
    ADD_REQUEST,
    REMOVE_REQUEST,
    SAVE_SHIPPING_INFO,
    CLEAR_REQUEST,
} from "../constants/requestConstants";

export const requestReducer = (state = { requestDocuments: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_REQUEST:
            const documentItem = action.payload;
            const existingDocuments = Array.isArray(state.requestDocuments)
                ? state.requestDocuments
                : [];
            const isDocumentExist = existingDocuments.find(
                (d) => d.document === documentItem.document
            );

            if (isDocumentExist) {
                return {
                    ...state,
                    requestDocuments: existingDocuments.map((d) =>
                        d.document === isDocumentExist.document ? documentItem : d
                    ),
                };
            } else {
                return {
                    ...state,
                    requestDocuments: [...existingDocuments, documentItem],
                };
            }

        case REMOVE_REQUEST:
            console.log('Current State before removal:', state);
            console.log('Action payload:', action.payload);

            return {
                ...state,
                requestDocuments: state.requestDocuments.filter(
                    (document) => document.document !== action.payload
                ),
            };

        case CLEAR_REQUEST:
            return {
                ...state,
                requestDocuments: [],
                shippingInfo: {},
            };

        default:
            return state;
    }
};

export default requestReducer;
