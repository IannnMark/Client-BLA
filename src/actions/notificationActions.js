import axios from "axios";

import {
    NOTIFICATION_DETAILS_REQUEST,
    NOTIFICATION_DETAILS_SUCCESS,
    NOTIFICATION_DETAILS_FAIL,
    ADMIN_NOTIFICATIONS_REQUEST,
    ADMIN_NOTIFICATIONS_SUCCESS,
    ADMIN_NOTIFICATIONS_FAIL,
    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_FAIL,
    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAIL,
    UPDATE_NOTIFICATION_REQUEST,
    UPDATE_NOTIFICATION_SUCCESS,
    UPDATE_NOTIFICATION_FAIL,
    MARK_NOTIFICATION_AS_READ_REQUEST,
    MARK_NOTIFICATION_AS_READ_SUCCESS,
    MARK_NOTIFICATION_AS_READ_FAIL,
    MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST,
    MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_ALL_NOTIFICATIONS_AS_READ_FAIL,
    CLEAR_ERRORS,
} from "../constants/notificationConstants";

export const getNotificationDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFICATION_DETAILS_REQUEST });
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}api/v1/notification/${id}`
        );
        dispatch({
            type: NOTIFICATION_DETAILS_SUCCESS,
            payload: data.notification,
        });
    } catch (error) {
        dispatch({
            type: NOTIFICATION_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getNotifications = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_NOTIFICATIONS_REQUEST });
        console.log("Fetching notifications...");
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}api/v1/notifications`,
            {
                withCredentials: true,
            }
        );
        dispatch({
            type: ADMIN_NOTIFICATIONS_SUCCESS,
            payload: data.notifications,
        });
        console.log("Notifications fetched successfully.");
    } catch (error) {
        dispatch({
            type: ADMIN_NOTIFICATIONS_FAIL,
            payload: error.response.data.message,
        });
        console.error("Failed to fetch notifications:", error);
    }
};

export const newNotification = (notificationData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_NOTIFICATION_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const { data } = await axios.post(
            `${process.env.REACT_APP_API}api/v1/admin/notification/new`,
            notificationData,
            config
        );
        dispatch({
            type: NEW_NOTIFICATION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_NOTIFICATION_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteNotification = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_NOTIFICATION_REQUEST });
        const { data } = await axios.delete(
            `${process.env.REACT_APP_API}api/v1/admin/notification/${id}`,
            {
                withCredentials: true,
            }
        );
        dispatch({
            type: DELETE_NOTIFICATION_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_NOTIFICATION_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateNotification =
    (id, notificationData) => async (dispatch) => {
        try {
            dispatch({ type: UPDATE_NOTIFICATION_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}api/v1/admin/notification/${id}`,
                notificationData,
                config
            );
            dispatch({
                type: UPDATE_NOTIFICATION_SUCCESS,
                payload: data.success,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_NOTIFICATION_FAIL,
                payload: error.response.data.message,
            });
        }
    };

export const markNotificationAsRead = (id) => async (dispatch) => {
    try {
        dispatch({ type: MARK_NOTIFICATION_AS_READ_REQUEST });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.put(
            `${process.env.REACT_APP_API}api/v1/notification/${id}/markAsRead`,
            null,
            config
        );
        dispatch({
            type: MARK_NOTIFICATION_AS_READ_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: MARK_NOTIFICATION_AS_READ_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const markAllNotificationsAsRead = () => async (dispatch) => {
    try {
        dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST });
        console.log("Marking all notifications as read...");
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.put(
            `${process.env.REACT_APP_API}api/v1/notifications/markAllAsRead`,
            null,
            config
        );
        dispatch({
            type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
            payload: data.success,
        });
        console.log("All notifications marked as read successfully.");
    } catch (error) {
        dispatch({
            type: MARK_ALL_NOTIFICATIONS_AS_READ_FAIL,
            payload: error.response.data.message,
        });
        console.error("Failed to mark all notifications as read:", error);
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
