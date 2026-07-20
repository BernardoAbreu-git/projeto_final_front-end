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

export default function Grades() {

    const { user } = useAuth();

    const [grades, setGrades] = useState([]);
    const [users, setUsers] = useState([]);
    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [form, setForm] = useState({
        exam: "",
        userId: "",
        classRoomId: ""
    });

    useEffect(() => {
        fetchGrades();
        fetchUsers();
        fetchClasses();
    }, []);

    async function fetchGrades() {
        try {
            const data = await api.get("/notes");
            setGrades(data.data);
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
        }
    }

    async function fetchUsers() {
        try {
            const data = await api.get("/users");
            setUsers(data.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    async function fetchClasses() {
        try {
            const data = await api.get("/modules/classes");
            setClasses(data.data);
        } catch (error) {
            console.error("Erro ao buscar turmas:", error);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function openNewGrade() {
        setEditingGrade(null);
        setForm({
            exam: "",
            userId: "",
            classRoomId: ""
        });
        setOpen(true);
    }

    function editGrade(item) {
        setEditingGrade(item);
        setForm({
            exam: item.exam,
            userId: item.userId || "",
            classRoomId: item.classRoomId || ""
        });
        setOpen(true);
    }

    async function saveGrade() {
        try {
            if (editingGrade) {
                await api.put(`/notes/${editingGrade.id}`, form);
            } else {
                await api.post("/notes", form);
            }

            setOpen(false);
            fetchGrades();
            Swal.fire({
                title: "Sucesso",
                text: editingGrade ? "Nota atualizada." : "Nota criada.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: error.response?.data?.error || "Erro ao salvar nota.",
                icon: "error"
            });
        }
    }

    function deleteGrade(id) {
        Swal.fire({
            title: "Excluir nota?",
            text: "Esta ação não poderá ser desfeita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/notes/${id}`);
                    fetchGrades();
                    Swal.fire({
                        title: "Sucesso",
                        text: "Nota removida.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Erro",
                        text: error.response?.data?.error || "Erro ao excluir nota.",
                        icon: "error"
                    });
                }
            }
        });
    }

    const filteredGrades = grades.filter(item =>
        (item.User?.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (item.ClassRoom?.matter || "").toLowerCase().includes(search.toLowerCase())
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
                    columns={["ID", "Aluno", "Disciplina", "Nota"]}
                    data={filteredGrades.map(item => ({
                        id: item.id,
                        student: item.User?.name || "-",
                        subject: item.ClassRoom?.matter || "-",
                        exam: item.exam
                    }))}
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
                    title={editingGrade ? "Editar Nota" : "Nova Nota"}
                >
                    <div className="space-y-4">
                        <Input
                            label="Nota (exame)"
                            name="exam"
                            value={form.exam}
                            onChange={handleChange}
                        />

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Aluno</label>
                            <select
                                name="userId"
                                value={form.userId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">Selecione</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Turma</label>
                            <select
                                name="classRoomId"
                                value={form.classRoomId}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">Selecione</option>
                                {classes.map(c => (
                                    <option key={c.id} value={c.id}>{c.matter} - {c.teacher}</option>
                                ))}
                            </select>
                        </div>

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
