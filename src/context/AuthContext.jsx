import { createContext, useContext, useState } from "react";
import { getUserFromToken, saveToken, logout as authLogout } from "../services/AuthService";

const AuthContext = createContext();

const ROLE_MAP = {

    admin: "Administrador",
    professor: "Professor",
    aluno: "Aluno"

};

const ROLE_MAP_REVERSE = {

    Administrador: "admin",
    Professor: "professor",
    Aluno: "aluno"

};

function getInitialUser() {

    const decoded = getUserFromToken();

    if (!decoded) return null;

    return {

        id: decoded.id,

        name: decoded.name,

        role: ROLE_MAP[decoded.role] || decoded.role

    };

}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(getInitialUser);

    function login(userData, token) {

        saveToken(token);

        setUser({

            id: userData.id,

            name: userData.name,

            role: ROLE_MAP[userData.role] || userData.role

        });

    }

    function logout() {

        authLogout();

        setUser(null);

    }

    function getBackendRole() {

        if (!user) return null;

        return ROLE_MAP_REVERSE[user.role] || user.role;

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout,

                getBackendRole

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {

    return useContext(AuthContext);

}
