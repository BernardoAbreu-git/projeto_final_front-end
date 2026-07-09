import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

export default function Classes() {
  return (
    <Layout>
      <PageHeader
        title="Turmas"
        subtitle="Gerenciamento de turmas"
      />

      <div className="bg-white rounded-xl shadow p-6">

        {/* ===========================================
            BACK-END

            GET /classes
            POST /classes
            PUT /classes/:id
            DELETE /classes/:id

        ============================================ */}

        <h2>Em construção...</h2>

      </div>
    </Layout>
  );
}