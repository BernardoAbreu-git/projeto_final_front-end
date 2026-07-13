        import api from "./Api";

// ======================================================
//
// BACK-END
//
// POST /login
//
// Esperado:
//
// {
//     email,
//     password
// }
//
// Retorno:
//
// {
//     token,
//     user
// }
//
// ======================================================

export async function login(email, password) {

    const response = await api.post("/login", {

        email,
        password

    });

    return response.data;

}

// ======================================================
//
// BACK-END
//
// GET /me
//
// Retorna o usuário autenticado.
//
// ======================================================

export async function getMe() {

    const response = await api.get("/me");

    return response.data;

}

// ======================================================
//
// BACK-END
//
// Logout.
//
// Se houver endpoint:
//
// POST /logout
//
// Caso contrário, basta remover o token.
//
// ======================================================

export function logout() {

    localStorage.removeItem("token");

}

// ======================================================
//
// Verifica se existe um token salvo.
//
// ======================================================

export function isAuthenticated() {

    return !!localStorage.getItem("token");

}

// ======================================================
//
// Salva o token.
//
// ======================================================

export function saveToken(token) {

    localStorage.setItem("token", token);

}

// ======================================================
//
// Retorna o token.
//
// ======================================================

export function getToken() {

    return localStorage.getItem("token");

}