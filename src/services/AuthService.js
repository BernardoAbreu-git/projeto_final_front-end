import api from "./Api";
import { jwtDecode } from "jwt-decode";

export async function login(name, password) {

    const response = await api.post("/auth/login", {

        name,
        password

    });

    return response.data;

}

export async function register(name, password, role) {

    const response = await api.post("/auth/register", {

        name,
        password,
        role

    });

    return response.data;

}

export function logout() {

    localStorage.removeItem("token");

}

export function isAuthenticated() {

    return !!localStorage.getItem("token");

}

export function saveToken(token) {

    localStorage.setItem("token", token);

}

export function getToken() {

    return localStorage.getItem("token");

}

export function getUserFromToken() {

    const token = getToken();

    if (!token) return null;

    try {

        return jwtDecode(token);

    } catch {

        return null;

    }

}
