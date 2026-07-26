import { createContext, useContext, useState } from "react";

const Auth = createContext();

const AuthProvider = ({children})=>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("users")) || []);
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")) || null);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState("dark");

    const toggleTheme = ()=>{
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    const authContextValue = {
        user,
        setUser,
        loggedInUser,
        setLoggedInUser,
        loading,
        setLoading,
        theme,
        toggleTheme,
    };

    return (
        <Auth.Provider value={authContextValue}>
            {children}
        </Auth.Provider>
    )
}

const useAuth = () => useContext(Auth); 
export {AuthProvider, useAuth}