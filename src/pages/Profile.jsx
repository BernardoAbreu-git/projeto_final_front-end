import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

export default function Profile() {
  return (
    <Layout>
      <PageHeader
        title="Meu Perfil"
        subtitle="Informações do usuário"
      />

      <div className="bg-white rounded-xl shadow p-6">

        {/* ===========================================
            BACK-END

            GET /profile

            PUT /profile

            Dados esperados:

            id
            name
            role

        ============================================ */}

        <h2 className="text-lg font-semibold mb-2">
          Perfil do Usuário
        </h2>

        <p className="text-gray-500">
          Em construção...
        </p>

      </div>

    </Layout>
  );
}