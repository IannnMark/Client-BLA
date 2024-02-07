import {
  MONTHLY_SALES_REQUEST,
  MONTHLY_SALES_SUCCESS,
  MONTHLY_SALES_FAIL,
  PRODUCT_SALES_REQUEST,
  PRODUCT_SALES_SUCCESS,
  PRODUCT_SALES_FAIL,
  CLEAR_ERRORS,
  MONTHLY_REQUESTS_REQUEST,
  MONTHLY_REQUESTS_SUCCESS,
  MONTHLY_REQUESTS_FAIL,
  DOCUMENT_SALES_REQUEST,
  DOCUMENT_SALES_SUCCESS,
  DOCUMENT_SALES_FAIL,
} from "../constants/chartConstants";


export const salesPerMonthReducer = (state = { salesPerMonth: [] }, action) => {
  switch (action.type) {
    case MONTHLY_SALES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MONTHLY_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        salesPerMonth: action.payload,
      };
    case MONTHLY_SALES_FAIL:
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

export const productSalesReducer = (state = { productSales: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SALES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        productSales: action.payload,
      };
    case PRODUCT_SALES_FAIL:
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



export const requestsPerMonthReducer = (state = { requestsPerMonth: [] }, action) => {
  switch (action.type) {
    case MONTHLY_REQUESTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MONTHLY_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        requestsPerMonth: action.payload,
      };
    case MONTHLY_REQUESTS_FAIL:
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


export const documentSalesReducer = (state = { documentSales: [] }, action) => {
  switch (action.type) {
    case DOCUMENT_SALES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DOCUMENT_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        documentSales: action.payload,
      };
    case DOCUMENT_SALES_FAIL:
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

