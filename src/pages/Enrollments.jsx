import { useState } from "react";
import Swal from "sweetalert2";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import SearchBar from "../components/common/SearchBar";
import Modal from "../components/common/Modal";

import DataTable from "../components/tables/DataTable";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function Enrollments() {

    /* =========================================================

        BACK-END

        GET /enrollments

        const response = await api.get("/enrollments");

        setEnrollments(response.data);

    ========================================================= */

    const [enrollments, setEnrollments] = useState([
        {
            id: 1,
            student: "João Silva",
            class: "3º DS",
            date: "2026-02-10",
            status: "Ativa"
        },
        {
            id: 2,
            student: "Maria Souza",
            class: "2º DS",
            date: "2026-02-15",
            status: "Ativa"
        }
    ]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [editingEnrollment, setEditingEnrollment] = useState(null);

    const [form, setForm] = useState({
        student: "",
        class: "",
        date: "",
        status: "Ativa"
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function openNewEnrollment() {

        setEditingEnrollment(null);

        setForm({
            student: "",
            class: "",
            date: "",
            status: "Ativa"
        });

        setOpen(true);
    }

    function editEnrollment(enrollment) {

        setEditingEnrollment(enrollment);

        setForm(enrollment);

        setOpen(true);
    }

    function saveEnrollment() {

        /* ===============================================

            BACK-END

            POST /enrollments

            PUT /enrollments/:id

        =============================================== */

        if (editingEnrollment) {

            setEnrollments(

                enrollments.map(item =>

                    item.id === editingEnrollment.id

                        ? {
                            ...editingEnrollment,
                            ...form
                        }

                        : item

                )

            );

        } else {

            setEnrollments([

                ...enrollments,

                {
                    id: Date.now(),
                    ...form
                }

            ]);

        }

        setOpen(false);

    }

    function deleteEnrollment(id) {

        Swal.fire({

            title: "Excluir matrícula?",

            text: "Esta ação não poderá ser desfeita.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Excluir",

            cancelButtonText: "Cancelar"

        }).then(result => {

            if (result.isConfirmed) {

                /* ===========================================

                    BACK-END

                    DELETE /enrollments/:id

                =========================================== */

                setEnrollments(

                    enrollments.filter(item => item.id !== id)

                );

                Swal.fire({

                    title: "Sucesso",

                    text: "Matrícula removida.",

                    icon: "success"

                });

            }

        });

    }

    const filteredEnrollments = enrollments.filter(item =>

        item.student.toLowerCase().includes(search.toLowerCase()) ||

        item.class.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <Layout>

            <PageHeader

                title="Matrículas"

                subtitle="Gerenciamento de matrículas"

            />

            <Card>

                <div className="flex justify-between items-center mb-6">

                    <SearchBar

                        placeholder="Pesquisar matrícula..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <Button

                        icon={<FaPlus />}

                        onClick={openNewEnrollment}

                    >

                        Nova Matrícula

                    </Button>

                </div>

                <DataTable

                    columns={[

                        "ID",

                        "Aluno",

                        "Turma",

                        "Data",

                        "Status"

                    ]}

                    data={filteredEnrollments}

                    actions={(item) => (

                        <div className="flex gap-2">

                            <Button

                                color="green"

                                icon={<FaEdit />}

                                onClick={() => editEnrollment(item)}

                            />

                            <Button

                                color="red"

                                icon={<FaTrash />}

                                onClick={() => deleteEnrollment(item.id)}

                            />

                        </div>

                    )}

                />

            </Card>

            <Modal

                open={open}

                onClose={() => setOpen(false)}

                title={

                    editingEnrollment

                        ? "Editar Matrícula"

                        : "Nova Matrícula"

                }

            >

                <div className="space-y-4">

                    <Input

                        label="Aluno"

                        name="student"

                        value={form.student}

                        onChange={handleChange}

                    />

                    <Input

                        label="Turma"

                        name="class"

                        value={form.class}

                        onChange={handleChange}

                    />

                    <Input

                        label="Data da Matrícula"

                        type="date"

                        name="date"

                        value={form.date}

                        onChange={handleChange}

                    />

                    <Select

                        label="Status"

                        name="status"

                        value={form.status}

                        onChange={handleChange}

                    >

                        <option>Ativa</option>

                        <option>Cancelada</option>

                        <option>Concluída</option>

                    </Select>

                    <div className="flex justify-end gap-3 mt-6">

                        <Button

                            color="gray"

                            onClick={() => setOpen(false)}

                        >

                            Cancelar

                        </Button>

                        <Button

                            color="blue"

                            onClick={saveEnrollment}

                        >

                            Salvar

                        </Button>

                    </div>

                </div>

            </Modal>

        </Layout>

    );

}