export const initialState = {
    username: null,
    isLogged: !!sessionStorage.getItem("token"),
    token: sessionStorage.getItem("token") || null,
    isLoading: true,
    error: null,
    message: null
}

export const AppReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                message: action.payload.message,
                username: action.payload.username,
                error: null
            }
        case "REGISTER_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
                message: action.payload.message
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                username: action.payload.username,
                isLoading: false,
                message: action.payload.message,
                token: action.payload.token,
                isLogged: true
            }
        case "LOGIN_ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
                message: action.payload.message
            }
        default:
            return state
    }
}