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

export default function Classes() {

    const { user } = useAuth();

    const [classes, setClasses] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [form, setForm] = useState({
        matter: "",
        teacher: "",
        room: "",
        schedule: ""
    });

    useEffect(() => {
        fetchClasses();
    }, []);

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

    function openNewClass() {
        setEditingClass(null);
        setForm({
            matter: "",
            teacher: "",
            room: "",
            schedule: ""
        });
        setOpen(true);
    }

    function editClass(item) {
        setEditingClass(item);
        setForm({
            matter: item.matter,
            teacher: item.teacher,
            room: item.room,
            schedule: item.schedule
        });
        setOpen(true);
    }

    async function saveClass() {
        try {
            const payload = {
                ...form,
                userId: user.id
            };

            if (editingClass) {
                await api.put(`/modules/classes/${editingClass.id}`, payload);
            } else {
                await api.post("/modules/classes", payload);
            }

            setOpen(false);
            fetchClasses();
            Swal.fire({
                title: "Sucesso",
                text: editingClass ? "Turma atualizada." : "Turma criada.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: error.response?.data?.error || "Erro ao salvar turma.",
                icon: "error"
            });
        }
    }

    function deleteClass(id) {
        Swal.fire({
            title: "Excluir turma?",
            text: "Esta ação não poderá ser desfeita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/modules/classes/${id}`);
                    fetchClasses();
                    Swal.fire({
                        title: "Sucesso",
                        text: "Turma removida.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Erro",
                        text: error.response?.data?.error || "Erro ao excluir turma.",
                        icon: "error"
                    });
                }
            }
        });
    }

    const filteredClasses = classes.filter(item =>
        item.matter.toLowerCase().includes(search.toLowerCase()) ||
        item.teacher.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <PageHeader
                title="Turmas"
                subtitle="Gerenciamento de Turmas"
            />

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <SearchBar
                        placeholder="Pesquisar turma..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {(user.role === "Administrador" || user.role === "Professor") && (
                        <Button
                            icon={<FaPlus />}
                            onClick={openNewClass}
                        >
                            Nova Turma
                        </Button>
                    )}
                </div>

                <DataTable
                    columns={["ID", "Matéria", "Professor", "Sala", "Horário"]}
                    keys={["id", "matter", "teacher", "room", "schedule"]}
                    data={filteredClasses.map(item => ({
                        id: item.id,
                        matter: item.matter,
                        teacher: item.teacher,
                        room: item.room,
                        schedule: item.schedule
                    }))}
                    actions={(item) =>
                        (user.role === "Administrador" || user.role === "Professor") && (
                            <div className="flex gap-2">
                                <Button
                                    color="green"
                                    icon={<FaEdit />}
                                    onClick={() => editClass(item)}
                                />
                                <Button
                                    color="red"
                                    icon={<FaTrash />}
                                    onClick={() => deleteClass(item.id)}
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
                    title={editingClass ? "Editar Turma" : "Nova Turma"}
                >
                    <div className="space-y-4">
                        <Input
                            label="Matéria"
                            name="matter"
                            value={form.matter}
                            onChange={handleChange}
                        />

                        <Input
                            label="Professor"
                            name="teacher"
                            value={form.teacher}
                            onChange={handleChange}
                        />

                        <Input
                            label="Sala"
                            name="room"
                            value={form.room}
                            onChange={handleChange}
                        />

                        <Input
                            label="Horário"
                            name="schedule"
                            value={form.schedule}
                            onChange={handleChange}
                        />

                        <div className="flex justify-end gap-3">
                            <Button
                                color="gray"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                color="blue"
                                onClick={saveClass}
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
