import { useState, useEffect } from "react";
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

import api from "../services/Api";

export default function Enrollments() {

    const { user } = useAuth();

    const [enrollments, setEnrollments] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editingEnrollment, setEditingEnrollment] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        enrollmentDate: ""
    });

    useEffect(() => {
        fetchEnrollments();
    }, []);

    async function fetchEnrollments() {
        try {
            const data = await api.get("/modules/enrollments");
            setEnrollments(data.data);
        } catch (error) {
            console.error("Erro ao buscar matrículas:", error);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function openNewEnrollment() {
        setEditingEnrollment(null);
        setForm({
            name: "",
            email: "",
            phone: "",
            enrollmentDate: ""
        });
        setOpen(true);
    }

    function editEnrollment(enrollment) {
        setEditingEnrollment(enrollment);
        setForm({
            name: enrollment.name,
            email: enrollment.email,
            phone: enrollment.phone,
            enrollmentDate: enrollment.enrollmentDate
                ? new Date(enrollment.enrollmentDate).toISOString().split("T")[0]
                : ""
        });
        setOpen(true);
    }

    async function saveEnrollment() {
        try {
            const payload = {
                ...form,
                userId: user.id
            };

            if (editingEnrollment) {
                await api.put(`/modules/enrollments/${editingEnrollment.id}`, payload);
            } else {
                await api.post("/modules/enrollments", payload);
            }

            setOpen(false);
            fetchEnrollments();
            Swal.fire({
                title: "Sucesso",
                text: editingEnrollment ? "Matrícula atualizada." : "Matrícula criada.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: error.response?.data?.error || "Erro ao salvar matrícula.",
                icon: "error"
            });
        }
    }

    function deleteEnrollment(id) {
        Swal.fire({
            title: "Excluir matrícula?",
            text: "Esta ação não poderá ser desfeita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/modules/enrollments/${id}`);
                    fetchEnrollments();
                    Swal.fire({
                        title: "Sucesso",
                        text: "Matrícula removida.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Erro",
                        text: error.response?.data?.error || "Erro ao excluir matrícula.",
                        icon: "error"
                    });
                }
            }
        });
    }

    const filteredEnrollments = enrollments.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
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
                    columns={["ID", "Nome", "Email", "Telefone", "Data"]}
                    data={filteredEnrollments.map(item => ({
                        ...item,
                        enrollmentDate: item.enrollmentDate
                            ? new Date(item.enrollmentDate).toLocaleDateString("pt-BR")
                            : ""
                    }))}
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
                title={editingEnrollment ? "Editar Matrícula" : "Nova Matrícula"}
            >
                <div className="space-y-4">
                    <Input
                        label="Nome"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Telefone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <Input
                        label="Data da Matrícula"
                        type="date"
                        name="enrollmentDate"
                        value={form.enrollmentDate}
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
