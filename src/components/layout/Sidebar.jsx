import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
  FaClipboardList,
  FaBook,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {

  // ==================================================
  // BACK-END
  //
  // Aqui será retornada a ROLE do usuário.
  //
  // Exemplo:
  //
  // const role = user.role
  //
  // admin
  // professor
  // aluno
  // ==================================================

  const role = "admin";

  return (
    <aside className="w-64 h-screen bg-blue-900 text-white flex flex-col">



      <div className="h-20 flex items-center justify-center border-b border-blue-800">

        <h1 className="text-2xl font-bold">
          SchoolSys
        </h1>

      </div>


      <nav className="flex-1 p-4 space-y-2">

        <MenuItem icon={<FaHome />} text="Dashboard" />

        {(role === "admin" || role === "professor") && (
          <>
            <MenuItem
              icon={<FaUserGraduate />}
              text="Alunos"
            />

            <MenuItem
              icon={<FaChalkboardTeacher />}
              text="Professores"
            />

            <MenuItem
              icon={<FaSchool />}
              text="Turmas"
            />

            <MenuItem
              icon={<FaClipboardList />}
              text="Matrículas"
            />
          </>
        )}

        <MenuItem
          icon={<FaBook />}
          text="Notas"
        />

        {role === "admin" && (
          <MenuItem
            icon={<FaUsers />}
            text="Usuários"
          />
        )}

        <MenuItem
          icon={<FaUserCircle />}
          text="Perfil"
        />

      </nav>


      <div className="border-t border-blue-800 p-4">

        <button className="flex items-center gap-3 hover:text-red-400 transition">

          <FaSignOutAlt />

          Sair

        </button>

      </div>

    </aside>
  );
}

function MenuItem({ icon, text }) {

  return (

    <button
      className="
      w-full
      flex
      items-center
      gap-3
      p-3
      rounded-xl
      hover:bg-blue-800
      transition
      "
    >

      {icon}

      <span>{text}</span>

    </button>

  );

}