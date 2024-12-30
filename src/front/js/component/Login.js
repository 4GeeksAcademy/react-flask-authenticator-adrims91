import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export const Login = () => {
    const { state, login } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(state.message)

    useEffect(() => {
        if (state.message) {
            setMessage(state.message)
            const timer = setTimeout(() => {
                setMessage(null)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [state.message])

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                login({ username, password })
            }}>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <input
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"></input>
                <input
                    value="Login"
                    type="submit"></input>
            </form>
            <p>{message}</p>
        </>
    )
}