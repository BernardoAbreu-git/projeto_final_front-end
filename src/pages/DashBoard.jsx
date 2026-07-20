import { useState, useEffect } from "react";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import StatCard from "../components/dashboard/StatCard";
import ActivityCard from "../components/dashboard/ActivityCard";

import {
  FaUsers,
  FaSchool,
  FaClipboardList,
  FaBook,
  FaChartLine
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import api from "../services/Api";

export default function Dashboard() {

    const { user } = useAuth();

    const [counts, setCounts] = useState({
        users: 0,
        classes: 0,
        enrollments: 0,
        grades: 0
    });

    useEffect(() => {
        async function load() {
            try {
                const [usersRes, classesRes, enrollmentsRes, gradesRes] = await Promise.all([
                    api.get("/users").catch(() => ({ data: [] })),
                    api.get("/modules/classes").catch(() => ({ data: [] })),
                    api.get("/modules/enrollments").catch(() => ({ data: [] })),
                    api.get("/notes").catch(() => ({ data: [] }))
                ]);

                setCounts({
                    users: usersRes.data.length,
                    classes: classesRes.data.length,
                    enrollments: enrollmentsRes.data.length,
                    grades: gradesRes.data.length
                });
            } catch (error) {
                console.error("Erro ao buscar dados do dashboard:", error);
            }
        }
        load();
    }, []);

    return (

        <Layout>

            <PageHeader
                title="Dashboard"
                subtitle="Resumo geral do sistema"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                {user.role === "Administrador" && (
                    <>
                        <StatCard
                            title="Usuários"
                            value={counts.users}
                            icon={<FaUsers />}
                        />

                        <StatCard
                            title="Turmas"
                            value={counts.classes}
                            icon={<FaSchool />}
                        />

                        <StatCard
                            title="Matrículas"
                            value={counts.enrollments}
                            icon={<FaClipboardList />}
                        />

                        <StatCard
                            title="Notas"
                            value={counts.grades}
                            icon={<FaBook />}
                        />
                    </>
                )}

                {user.role === "Professor" && (
                    <>
                        <StatCard
                            title="Turmas"
                            value={counts.classes}
                            icon={<FaSchool />}
                        />

                        <StatCard
                            title="Notas"
                            value={counts.grades}
                            icon={<FaBook />}
                        />
                    </>
                )}

                {user.role === "Aluno" && (
                    <StatCard
                        title="Notas"
                        value={counts.grades}
                        icon={<FaChartLine />}
                    />
                )}

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

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
