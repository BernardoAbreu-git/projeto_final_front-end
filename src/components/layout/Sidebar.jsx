import {
  FaHome,
  FaUsers,
  FaSchool,
  FaClipboardList,
  FaBook,
  FaUserCircle,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {

  /* ===============================================
      BACK-END

      Depois o usuário virá do JWT.

      Exemplo:

      const { user } = useAuth();

  =============================================== */

  const { user } = useAuth();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      {/* LOGO */}

      <div className="h-20 border-b border-slate-700 flex items-center justify-center gap-3">

        <FaGraduationCap className="text-3xl text-blue-400" />

        <div>

          <h1 className="font-bold text-xl">

            SchoolSys

          </h1>

          <p className="text-xs text-gray-400">

            Sistema Escolar

          </p>

        </div>

      </div>

      {/* MENU */}

      <nav className="flex-1 p-5 space-y-2">

        {/* Dashboard aparece para todos */}

        <MenuItem
          to="/"
          icon={<FaHome />}
          text="Dashboard"
        />

        {/* Apenas Administrador */}

        {user.role === "Administrador" && (
          <>
            <MenuItem
              to="/users"
              icon={<FaUsers />}
              text="Usuários"
            />

            <MenuItem
              to="/classes"
              icon={<FaSchool />}
              text="Turmas"
            />

            <MenuItem
              to="/enrollments"
              icon={<FaClipboardList />}
              text="Matrículas"
            />
          </>
        )}

        {/* Professor */}

        {user.role === "Professor" && (
          <MenuItem
            to="/classes"
            icon={<FaSchool />}
            text="Minhas Turmas"
          />
        )}

        {/* Notas aparece para todos */}

        <MenuItem
          to="/grades"
          icon={<FaBook />}
          text="Notas"
        />

        {/* Perfil aparece para todos */}

        <MenuItem
          to="/profile"
          icon={<FaUserCircle />}
          text="Perfil"
        />

      </nav>

      {/* USUÁRIO */}

      <div className="border-t border-slate-700 p-5">

        <div className="flex items-center gap-3 mb-5">

          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">

            {user.name.charAt(0)}

          </div>

          <div>

            <h3 className="font-semibold">

              {user.name}

            </h3>

            <p className="text-sm text-gray-400">

              {user.role}

            </p>

          </div>

        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 hover:bg-red-600 py-3 transition">

          <FaSignOutAlt />

          Sair

        </button>

      </div>

    </aside>
  );
}

function MenuItem({ to, icon, text }) {

  return (

    <NavLink

      to={to}

      className={({ isActive }) =>
        `flex items-center gap-4 p-4 rounded-xl transition
        ${
          isActive
            ? "bg-blue-600"
            : "hover:bg-slate-800"
        }`
      }

    >

      <span className="text-lg">

        {icon}

      </span>

      {text}

    </NavLink>

  );

}