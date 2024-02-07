import axios from "axios";
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
export const monthlySalesChart = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: MONTHLY_SALES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/orders/sales-per-month`,
      config
    );
    dispatch({
      type: MONTHLY_SALES_SUCCESS,
      payload: data.salesPerMonth,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productSalesChart = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: PRODUCT_SALES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/products/sales`,
      config
    );
    dispatch({
      type: PRODUCT_SALES_SUCCESS,
      payload: data.totalPercentage,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PRODUCT_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const monthlyRequestsChart = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: MONTHLY_REQUESTS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/requests/request-per-month`,
      config
    );
    dispatch({
      type: MONTHLY_REQUESTS_SUCCESS,
      payload: data.requestPerMonth,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY_REQUESTS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const documentSalesChart = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: DOCUMENT_SALES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/documents/sales`,
      config
    );
    dispatch({
      type: DOCUMENT_SALES_SUCCESS,
      payload: data.totalPercentage,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: DOCUMENT_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

