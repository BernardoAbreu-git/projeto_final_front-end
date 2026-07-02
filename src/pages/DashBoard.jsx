import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import StatCard from "../components/dashboard/StatCard";

import Card from "../components/common/Card";

import {
    FaUserGraduate,
    FaSchool,
    FaClipboardList,
    FaUsers
} from "react-icons/fa";

export default function Dashboard() {

    /* ============================================
        BACK-END

        Buscar dados da dashboard.

        GET /dashboard

        Exemplo:

        const response = await api.get("/dashboard")

        response.data

        {
            students:250,
            teachers:18,
            classes:12,
            enrollments:560
        }

    ============================================ */

    const dashboard = {

        students:250,
        teachers:18,
        classes:12,
        enrollments:560

    };

    return (

        <Layout>

            <PageHeader

                title="Dashboard"

                subtitle="Bem-vindo ao Sistema Escolar"

            />

            <div className="grid grid-cols-4 gap-6">

                <StatCard

                    title="Alunos"

                    value={dashboard.students}

                    icon={<FaUserGraduate/>}

                />

                <StatCard

                    title="Professores"

                    value={dashboard.teachers}

                    icon={<FaUsers/>}

                    color="bg-green-600"

                />

                <StatCard

                    title="Turmas"

                    value={dashboard.classes}

                    icon={<FaSchool/>}

                    color="bg-orange-500"

                />

                <StatCard

                    title="Matrículas"

                    value={dashboard.enrollments}

                    icon={<FaClipboardList/>}

                    color="bg-purple-600"

                />

            </div>

            <Card className="mt-8">

                <h2 className="text-xl font-bold mb-4">

                    Atividades Recentes

                </h2>

                {/* =========================================

                    BACK-END

                    GET /activities

                    const response = await api.get("/activities")

                ========================================== */}

                <div className="space-y-4">

                    <div className="border-b pb-3">

                        João Silva recebeu nota 9.5 em Matemática

                    </div>

                    <div className="border-b pb-3">

                        Maria Souza foi matriculada em ADS

                    </div>

                    <div>

                        Professor Carlos lançou novas notas

                    </div>

                </div>

            </Card>

        </Layout>

    );

}