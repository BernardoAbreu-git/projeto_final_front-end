import { useState, useEffect } from "react";
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

import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import api from "../services/Api";
import { register } from "../services/AuthService";

const ROLE_LABELS = {
    admin: "Administrador",
    professor: "Professor",
    aluno: "Aluno"
};

const ROLE_VALUES = {
    Administrador: "admin",
    Professor: "professor",
    Aluno: "aluno"
};

export default function Users() {
    const { user } = useAuth();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form, setForm] = useState({
        name: "",
        password: "",
        role: "Aluno"
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    if (user.role !== "Administrador") {
        return <Navigate to="/" />;
    }

    async function fetchUsers() {
        try {
            const data = await api.get("/users");
            setUsers(data.data);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function openNewUser() {
        setEditingUser(null);
        setForm({
            name: "",
            password: "",
            role: "Aluno"
        });
        setOpen(true);
    }

    function editUser(u) {
        setEditingUser(u);
        setForm({
            name: u.name,
            password: "",
            role: ROLE_LABELS[u.role] || u.role
        });
        setOpen(true);
    }

    async function saveUser() {
        try {
            if (editingUser) {
                await api.put(`/users/${editingUser.id}`, {
                    name: form.name,
                    role: ROLE_VALUES[form.role] || form.role
                });
            } else {
                await register(form.name, form.password, ROLE_VALUES[form.role] || form.role);
            }
            setOpen(false);
            fetchUsers();
            Swal.fire({
                title: "Sucesso",
                text: editingUser ? "Usuário atualizado." : "Usuário criado.",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Erro",
                text: error.response?.data?.error || "Erro ao salvar usuário.",
                icon: "error"
            });
        }
    }

    function deleteUser(id) {
        Swal.fire({
            title: "Excluir usuário?",
            text: "Esta ação não poderá ser desfeita.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Excluir",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`/users/${id}`);
                    fetchUsers();
                    Swal.fire({
                        title: "Sucesso",
                        text: "Usuário removido.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Erro",
                        text: error.response?.data?.error || "Erro ao excluir usuário.",
                        icon: "error"
                    });
                }
            }
        });
    }

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <PageHeader
                title="Usuários"
                subtitle="Gerenciamento de usuários"
            />

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <SearchBar
                        placeholder="Pesquisar usuário..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        icon={<FaPlus />}
                        onClick={openNewUser}
                    >
                        Novo Usuário
                    </Button>
                </div>

                <DataTable
                    columns={["ID", "Nome", "Cargo"]}
                    data={filteredUsers.map(u => ({
                        ...u,
                        role: ROLE_LABELS[u.role] || u.role
                    }))}
                    actions={(u) => (
                        <div className="flex gap-2">
                            <Button
                                color="green"
                                icon={<FaEdit />}
                                onClick={() => editUser(u)}
                            />
                            <Button
                                color="red"
                                icon={<FaTrash />}
                                onClick={() => deleteUser(u.id)}
                            />
                        </div>
                    )}
                />
            </Card>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                title={editingUser ? "Editar Usuário" : "Novo Usuário"}
            >
                <div className="space-y-4">
                    <Input
                        label="Nome"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    {!editingUser && (
                        <Input
                            label="Senha"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    )}

                    <Select
                        label="Cargo"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="Administrador">Administrador</option>
                        <option value="Professor">Professor</option>
                        <option value="Aluno">Aluno</option>
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
                            onClick={saveUser}
                        >
                            Salvar
                        </Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}
