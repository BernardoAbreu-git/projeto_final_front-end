import axios from "axios";

const api = axios.create({

    // ===============================================
    // BACK-END
    //
    // Alterar para a URL da API quando estiver pronta.
    //
    // Exemplo:
    // http://localhost:3000
    // http://localhost:5000/api
    //
    // ===============================================

    baseURL: "http://localhost:3000",

    headers: {

        "Content-Type": "application/json"

    }

});

// ===================================================
//
// BACK-END
//
// Caso utilizem autenticação JWT,
// este interceptor enviará automaticamente:
//
// Authorization: Bearer TOKEN
//
// Basta descomentar.
//
// ===================================================

/*

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

*/

// ===================================================
//
// BACK-END
//
// Caso o token expire (401),
// poderá redirecionar o usuário ao login.
//
// ===================================================

/*

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

*/

export default api;