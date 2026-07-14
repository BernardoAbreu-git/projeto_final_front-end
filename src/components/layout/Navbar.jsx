import { FaUserCircle, FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ setSidebarOpen }) {

    const { user } = useAuth();

    return (

        <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

            <div className="flex items-center gap-3">

                <button
                    className="md:hidden text-2xl"
                    onClick={() => setSidebarOpen(true)}
                >
                    <FaBars />
                </button>

                <div>

                    <h2 className="text-xl md:text-2xl font-bold">
                        Sistema Escolar
                    </h2>

                    <p className="text-gray-500">
                        Bem-vindo, {user.name}
                    </p>

                </div>

            </div>

            {/* ===============================================
                BACK-END

                O usuário autenticado virá do JWT.

                Exemplo:

                {
                    id,
                    name,
                    role
                }

            =============================================== */}

            <div className="flex items-center gap-3">

                <FaUserCircle className="text-3xl text-blue-700" />

                <div>

                    <p className="font-semibold">
                        {user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user.role}
                    </p>

                </div>

            </div>

        </header>

    );

}