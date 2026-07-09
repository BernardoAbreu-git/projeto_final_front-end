import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";

import {
  FaUsers,
  FaSchool,
  FaClipboardList,
  FaBook,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaChartLine
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

    const { user } = useAuth();

    return (

        <Layout>

            <PageHeader
                title="Dashboard"
                subtitle="Resumo geral do sistema"
            />

            {/* ==========================================
                BACK-END

                GET /dashboard

                Retorno esperado:

                {
                    users,
                    classes,
                    enrollments,
                    grades
                }

            =========================================== */}

            <div className="grid grid-cols-4 gap-6">

                {user.role === "Administrador" && (
                    <>
                        <StatCard
                            title="Usuários"
                            value="154"
                            icon={<FaUsers />}
                        />

                        <StatCard
                            title="Turmas"
                            value="18"
                            icon={<FaSchool />}
                        />

                        <StatCard
                            title="Matrículas"
                            value="420"
                            icon={<FaClipboardList />}
                        />

                        <StatCard
                            title="Notas"
                            value="1260"
                            icon={<FaBook />}
                        />
                    </>
                )}

                {user.role === "Professor" && (
                    <>
                        <StatCard
                            title="Minhas Turmas"
                            value="5"
                            icon={<FaSchool />}
                        />

                        <StatCard
                            title="Alunos"
                            value="172"
                            icon={<FaUserGraduate />}
                        />
                    </>
                )}

                {user.role === "Aluno" && (
                    <>
                        <StatCard
                            title="Média Geral"
                            value="8.9"
                            icon={<FaChartLine />}
                        />
                    </>
                )}

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <ActivityCard
                    title="Últimas Atividades"
                    items={[
                        "Professor Carlos lançou novas notas.",
                        "Aluno João foi matriculado.",
                        "Nova turma criada.",
                        "Administrador cadastrou um professor."
                    ]}
                />

                <ActivityCard
                    title="Avisos"
                    items={[
                        "Bem-vindo ao Sistema Escolar.",
                        "Projeto Final FullStack.",
                        "Integração com Back-end em desenvolvimento."
                    ]}
                />

            </div>

        </Layout>

    );

}