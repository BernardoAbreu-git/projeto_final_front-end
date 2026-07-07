import Layout from "../layout/Layout";
import PageHeader from "../layout/PageHeader";

export default function Dashboard() {

    return (

        <Layout>

            <PageHeader
                title="Dashboard"
                subtitle="Bem-vindo ao Sistema Escolar"
            />

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-2xl shadow p-6">

                    Card 1

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    Card 2

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    Card 3

                </div>

                <div className="bg-white rounded-2xl shadow p-6">

                    Card 4

                </div>

            </div>

        </Layout>

    );

}