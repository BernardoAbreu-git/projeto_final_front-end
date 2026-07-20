import { useState } from "react";
import Swal from "sweetalert2";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { useAuth } from "../context/AuthContext";

export default function Profile() {

    const { user } = useAuth();

    const [form, setForm] = useState({

        name: user?.name || "",

        role: user?.role || ""

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    function saveProfile() {

        Swal.fire({

            icon: "success",

            title: "Sucesso",

            text: "Perfil atualizado!"

        });

    }

    return (

        <Layout>

            <PageHeader

                title="Meu Perfil"

                subtitle="Informações da conta"

            />

            <Card>

                <div className="space-y-5">

                    <Input

                        label="Nome"

                        name="name"

                        value={form.name}

                        onChange={handleChange}

                    />

                    <Input

                        label="Cargo"

                        value={form.role}

                        disabled

                    />

                    <div className="flex justify-end">

                        <Button

                            color="blue"

                            onClick={saveProfile}

                        >

                            Salvar Alterações

                        </Button>

                    </div>

                </div>

            </Card>

        </Layout>

    );

}
