import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    /* =====================================================

        BACK-END

        Aqui ficará:

        GET /me

        ou

        jwtDecode(token)

    ===================================================== */

    const [user, setUser] = useState({

        id: 1,

        name: "Bernardo",

        email: "bernardo@email.com",

        role: "Administrador"

    });

    function changeRole(role) {

        setUser({

            ...user,

            role

        });

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                changeRole

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}

    