import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import StatCard from "../components/dashboard/StatCard";

import { useAuth } from "../context/AuthContext";

export default function Dashboard(){

    const { user } = useAuth();

    return(

        <Layout>

            <PageHeader

                title="Dashboard"

                subtitle={`Bem-vindo ${user.name}`}

            />

            <div className="grid grid-cols-4 gap-6">

                {

                    user.role==="Administrador" &&

                    <>

                        <StatCard

                            title="Usuários"

                            value="154"

                        />

                        <StatCard

                            title="Turmas"

                            value="18"

                        />

                        <StatCard

                            title="Matrículas"

                            value="420"

                        />

                        <StatCard

                            title="Notas"

                            value="1260"

                        />

                    </>

                }

                {

                    user.role==="Professor" &&

                    <>

                        <StatCard

                            title="Minhas Turmas"

                            value="5"

                        />

                        <StatCard

                            title="Alunos"

                            value="172"

                        />

                    </>

                }

                {

                    user.role==="Aluno" &&

                    <>

                        <StatCard

                            title="Média Geral"

                            value="8.9"

                        />

                    </>

                }

            </div>

        </Layout>

    )

}