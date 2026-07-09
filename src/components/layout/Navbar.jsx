import { FaBell, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

    const { user, changeRole } = useAuth();

    return (

        <header className="bg-white shadow-sm h-20 flex justify-between items-center px-8">

            <div>

                <h2 className="text-2xl font-bold">

                    Sistema Escolar

                </h2>

                <p className="text-gray-500">

                    Bem-vindo, {user.name}

                </p>

            </div>

            <div className="flex items-center gap-5">

                <FaBell
                    className="text-2xl text-gray-500 cursor-pointer"
                />

                {/* =====================================================

                    BACK-END

                    Remover este select.

                    O perfil virá do JWT.

                ===================================================== */}

                <select

                    value={user.role}

                    onChange={(e)=>changeRole(e.target.value)}

                    className="border rounded-lg px-3 py-2"

                >

                    <option>

                        Administrador

                    </option>

                    <option>

                        Professor

                    </option>

                    <option>

                        Aluno

                    </option>

                </select>

                <div className="flex items-center gap-3">

                    <FaUserCircle className="text-3xl text-blue-700"/>

                    <div>

                        <p className="font-semibold">

                            {user.name}

                        </p>

                        <p className="text-sm text-gray-500">

                            {user.role}

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}