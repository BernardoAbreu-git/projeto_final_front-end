import { useState } from "react";
import Swal from "sweetalert2";

import Layout from "../components/layout/Layout";
import PageHeader from "../components/layout/PageHeader";

import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import SearchBar from "../components/common/SearchBar";
import Modal from "../components/common/Modal";

import DataTable from "../components/tables/DataTable";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

export default function Grades() {

    const { user } = useAuth();

    /* =========================================================

        BACK-END

        Administrador
        GET /grades

        Professor
        GET /grades/my-classes

        Aluno
        GET /grades/my-grades

    ========================================================= */

    const [grades, setGrades] = useState([
        {
            id: 1,
            student: "João Silva",
            subject: "Matemática",
            grade: 8.5
        },
        {
            id: 2,
            student: "Maria Souza",
            subject: "Português",
            grade: 9.0
        }
    ]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [editingGrade, setEditingGrade] = useState(null);

    const [form, setForm] = useState({
        student: "",
        subject: "",
        grade: ""
    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    function openNewGrade() {

        setEditingGrade(null);

        setForm({

            student: "",
            subject: "",
            grade: ""

        });

        setOpen(true);

    }

    function editGrade(item) {

        setEditingGrade(item);

        setForm(item);

        setOpen(true);

    }

    function saveGrade() {

        /* ===============================================

            BACK-END

            POST /grades

            PUT /grades/:id

        =============================================== */

        if (editingGrade) {

            setGrades(

                grades.map(item =>

                    item.id === editingGrade.id

                        ? {
                            ...editingGrade,
                            ...form
                        }

                        : item

                )

            );

        } else {

            setGrades([

                ...grades,

                {
                    id: Date.now(),
                    ...form
                }

            ]);

        }

        setOpen(false);

    }

    function deleteGrade(id) {

        Swal.fire({

            title: "Excluir nota?",

            text: "Esta ação não poderá ser desfeita.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Excluir",

            cancelButtonText: "Cancelar"

        }).then(result => {

            if (result.isConfirmed) {

                /* ===========================================

                    BACK-END

                    DELETE /grades/:id

                =========================================== */

                setGrades(

                    grades.filter(item => item.id !== id)

                );

                Swal.fire({

                    title: "Sucesso",

                    text: "Nota removida.",

                    icon: "success"

                });

            }

        });

    }

    const filteredGrades = grades.filter(item =>

        item.student.toLowerCase().includes(search.toLowerCase()) ||

        item.subject.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <Layout>

            <PageHeader

                title="Notas"

                subtitle="Gerenciamento de notas"

            />

            <Card>

                <div className="flex justify-between items-center mb-6">

                    <SearchBar

                        placeholder="Pesquisar nota..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    {(user.role === "Administrador" || user.role === "Professor") && (

                        <Button

                            icon={<FaPlus />}

                            onClick={openNewGrade}

                        >

                            Nova Nota

                        </Button>

                    )}

                </div>

                <DataTable

                    columns={[

                        "ID",

                        "Aluno",

                        "Disciplina",

                        "Nota"

                    ]}

                    data={filteredGrades}

                    actions={(item) =>

                        (user.role === "Administrador" || user.role === "Professor") && (

                            <div className="flex gap-2">

                                <Button

                                    color="green"

                                    icon={<FaEdit />}

                                    onClick={() => editGrade(item)}

                                />

                                <Button

                                    color="red"

                                    icon={<FaTrash />}

                                    onClick={() => deleteGrade(item.id)}

                                />

                            </div>

                        )

                    }

                />

            </Card>

            {(user.role === "Administrador" || user.role === "Professor") && (

                <Modal

                    open={open}

                    onClose={() => setOpen(false)}

                    title={

                        editingGrade

                            ? "Editar Nota"

                            : "Nova Nota"

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

                            label="Disciplina"

                            name="subject"

                            value={form.subject}

                            onChange={handleChange}

                        />

                        <Input

                            label="Nota"

                            type="number"

                            step="0.1"

                            min="0"

                            max="10"

                            name="grade"

                            value={form.grade}

                            onChange={handleChange}

                        />

                        <div className="flex justify-end gap-3 mt-6">

                            <Button

                                color="gray"

                                onClick={() => setOpen(false)}

                            >

                                Cancelar

                            </Button>

                            <Button

                                color="blue"

                                onClick={saveGrade}

                            >

                                Salvar

                            </Button>

                        </div>

                    </div>

                </Modal>

            )}

        </Layout>

    );

}