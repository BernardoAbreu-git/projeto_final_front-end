import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

export default function Grades() {
  return (
    <Layout>
      <PageHeader
        title="Notas"
        subtitle="Gerenciamento de notas"
      />

      <div className="bg-white rounded-xl shadow p-6">

        {/* ===========================================
            BACK-END

            GET /grades
            POST /grades
            PUT /grades/:id
            DELETE /grades/:id

            Dados esperados:

            id
            exam

            (Confirmar com o back-end se haverá
            um campo para a nota em si.)

        ============================================ */}

        <h2 className="text-lg font-semibold mb-2">
          Página de Notas
        </h2>

        <p className="text-gray-500">
          Em construção...
        </p>

      </div>

    </Layout>
  );
}