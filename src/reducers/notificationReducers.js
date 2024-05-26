import {
    ALL_NOTIFICATIONS_REQUEST,
    ALL_NOTIFICATIONS_SUCCESS,
    ALL_NOTIFICATIONS_FAIL,
    NOTIFICATION_DETAILS_REQUEST,
    NOTIFICATION_DETAILS_SUCCESS,
    NOTIFICATION_DETAILS_FAIL,
    ADMIN_NOTIFICATIONS_REQUEST,
    ADMIN_NOTIFICATIONS_SUCCESS,
    ADMIN_NOTIFICATIONS_FAIL,
    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_RESET,
    NEW_NOTIFICATION_FAIL,
    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_RESET,
    DELETE_NOTIFICATION_FAIL,
    UPDATE_NOTIFICATION_REQUEST,
    UPDATE_NOTIFICATION_SUCCESS,
    UPDATE_NOTIFICATION_RESET,
    UPDATE_NOTIFICATION_FAIL,
    MARK_NOTIFICATION_AS_READ_REQUEST,
    MARK_NOTIFICATION_AS_READ_SUCCESS,
    MARK_NOTIFICATION_AS_READ_FAIL,
    MARK_NOTIFICATION_AS_READ_RESET,
    MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST,
    MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
    MARK_ALL_NOTIFICATIONS_AS_READ_FAIL,
    MARK_ALL_NOTIFICATIONS_AS_READ_RESET,
    CLEAR_ERRORS,
} from "../constants/notificationConstants";

export const notificationsReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case ALL_NOTIFICATIONS_REQUEST:
        case ADMIN_NOTIFICATIONS_REQUEST:
            return {
                loading: true,
                notifications: [],
            };
        case ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload.notifications,
            };
        case ALL_NOTIFICATIONS_FAIL:
        case ADMIN_NOTIFICATIONS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case ADMIN_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload,
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

export const notificationDetailsReducer = (
    state = { notification: {} },
    action
) => {
    switch (action.type) {
        case NOTIFICATION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NOTIFICATION_DETAILS_SUCCESS:
            return {
                loading: false,
                notification: action.payload,
            };
        case NOTIFICATION_DETAILS_FAIL:
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

export const newNotificationReducer = (
    state = { notification: {} },
    action
) => {
    switch (action.type) {
        case NEW_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_NOTIFICATION_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                notification: action.payload.notification,
            };
        case NEW_NOTIFICATION_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case NEW_NOTIFICATION_RESET:
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

export const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_NOTIFICATION_REQUEST:
        case UPDATE_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case DELETE_NOTIFICATION_FAIL:
        case UPDATE_NOTIFICATION_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case DELETE_NOTIFICATION_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_NOTIFICATION_RESET:
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

export const markNotificationAsReadReducer = (state = {}, action) => {
    switch (action.type) {
        case MARK_NOTIFICATION_AS_READ_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MARK_NOTIFICATION_AS_READ_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
            };
        case MARK_NOTIFICATION_AS_READ_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case MARK_NOTIFICATION_AS_READ_RESET:
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

export const markAllNotificationsAsReadReducer = (state = {}, action) => {
    switch (action.type) {
        case MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
            };
        case MARK_ALL_NOTIFICATIONS_AS_READ_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case MARK_ALL_NOTIFICATIONS_AS_READ_RESET:
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
