import { FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

export default function Login() {

    const navigate = useNavigate();

    /* =========================================================

        BACK-END

        POST /login

        const response = await api.post("/login", {

            email,
            password

        });

        localStorage.setItem("token", response.data.token)

        navigate("/dashboard")

    ========================================================== */

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

                <form className="space-y-5">

                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Digite sua senha"
                    />

                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/dashboard");
                        }}
                    >
                        Entrar
                    </Button>

                </form>

            </div>

        </div>

    );

}