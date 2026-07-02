import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {

    /* =======================================================
       BACK-END

       Aqui virão os dados do usuário autenticado.

       Exemplo:

       const user = {
            name: "Bernardo",
            role: "Administrador",
            avatar: "/uploads/avatar.png"
       }

    ======================================================== */

    const user = {
        name: "Bernardo",
        role: "Administrador"
    };

    return (

        <header className="bg-white h-20 shadow flex items-center justify-between px-8">


            <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-96">

                <FiSearch className="text-gray-500"/>

                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="bg-transparent outline-none ml-3 w-full"
                />

            </div>


            <div className="flex items-center gap-6">

                <button className="text-2xl text-gray-600 hover:text-blue-600 transition">

                    <FaBell/>

                </button>

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">

                        {user.name.charAt(0)}

                    </div>

                    <div>

                        <p className="font-semibold">

                            {user.name}

                        </p>

                        <span className="text-sm text-gray-500">

                            {user.role}

                        </span>

                    </div>

                </div>

            </div>

        </header>

    );

}