import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { login as authLogin } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [name, setName] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            const data = await authLogin(name, password);

            login(data.user, data.token);

            navigate("/dashboard");

        } catch (err) {

            setError(err.response?.data?.error || "Erro ao fazer login.");

        }

    }

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="bg-white rounded-3xl shadow-xl w-[430px] p-10">

                <div className="text-center mb-10">

                    <FaGraduationCap className="mx-auto text-6xl text-blue-700" />

                    <h1 className="text-3xl font-bold mt-4">

                        SchoolSys

                    </h1>

                    <p className="text-gray-500">

                        Sistema Escolar

                    </p>

                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    <Input

                        label="Nome"
                        placeholder="Digite seu nome"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <Button type="submit">

                        Entrar

                    </Button>

                </form>

            </div>

        </div>

    );

}
