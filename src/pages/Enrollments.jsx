import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

export default function Enrollments() {
  return (
    <Layout>
      <PageHeader
        title="Matrículas"
        subtitle="Gerenciamento de matrículas"
      />

      <div className="bg-white rounded-xl shadow p-6">

        {/* ===========================================
            BACK-END

            GET /enrollments
            POST /enrollments
            PUT /enrollments/:id
            DELETE /enrollments/:id

            Dados esperados:

            id
            name
            email
            phone
            enrollment_date

        ============================================ */}

        <h2 className="text-lg font-semibold mb-2">
          Página de Matrículas
        </h2>

        <p className="text-gray-500">
          Em construção...
        </p>

      </div>

    </Layout>
  );
}