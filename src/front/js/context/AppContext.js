import React, { createContext, useReducer } from "react";
import { initialState, AppReducer } from "./AppReducer";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    const register = async ({ username, password }) => {
        try {
            const response = await fetch('https://automatic-rotary-phone-r4r9xvwxqg45f57x5-3001.app.github.dev/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({ type: 'REGISTER_SUCCESS', payload: { username: data.username, loading: false, message: "User created successfully" } })
            } else {
                const errorData = await response.json();
                dispatch({ type: 'REGISTER_ERROR', payload: { error: errorData.message || response.statusText, loading: false, message: "Failed creating user" } })
            }
        } catch (error) {
            console.log("Catch error:", error)
            dispatch({ type: 'REGISTER_ERROR', payload: { error: error.message, loading: false } })
        }
    }
    const login = async ({ username, password }) => {
        try {
            const response = await fetch('https://automatic-rotary-phone-r4r9xvwxqg45f57x5-3001.app.github.dev/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            if (response.ok) {
                const data = await response.json()
                const token = sessionStorage.setItem('token', data.token)
                dispatch({ type: "LOGIN_SUCCESS", payload: { username: data.username, loading: false, message: "User logged succesfully", token: token } })
            } else {
                const errorData = await response.json()
                dispatch({ type: "LOGIN_ERROR", payload: { error: errorData.message || response.statusText, loading: false, message: 'login failed, bad username or password.' } })
            }
        } catch (error) {
            dispatch({ type: "LOGIN_ERROR", payload: { error: error.message, login: false } })
        }
    }

    return (
        <AppContext.Provider value={{ state, dispatch, register, login }}>
            {children}
        </AppContext.Provider>
    )
}