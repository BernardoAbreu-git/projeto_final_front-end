
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

import { useEffect } from "react";
import api from "../services/Api";
import { useState, useEffect } from "react";
import api from "../services/Api";

export default function Users() {
    const { user } = useAuth();
    if(user.role!=="Administrador"){

    return <Navigate to="/"/>

}

    /* =========================================================

        BACK-END

        GET /users

        const response = await api.get("/users");

        setUsers(response.data);

    ========================================================= */

const [users, setUsers] = useState([
            useEffect(() => {

    loadUsers();

}, []);

async function loadUsers() {

    try {

        const response = await api.get("/users");

        setUsers(response.data);

    } catch (error) {

        console.error(error);

    }

}

    useEffect(() => {

    loadUsers();

}, []);

async function loadUsers() {

    try {

        const response = await api.get("/users");

        setUsers(response.data);

    } catch (error) {

        console.error(error);

        Swal.fire({

            icon: "error",

            title: "Erro",

            text: "Não foi possível carregar os usuários."

        });

    }

}

    const [search, setSearch] = useState("");
    

    const [open, setOpen] = useState(false);

    const [editingUser, setEditingUser] = useState(null);

    const [form, setForm] = useState({

        name: "",
        email: "",
        role: "Aluno"

    });

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
            email: "",
            role: "Aluno"

        });

        setOpen(true);

    }

    function editUser(user) {

        setEditingUser(user);

        setForm(user);

        setOpen(true);

    }

    function saveUser() {

        /* ===============================================

            BACK-END

            POST /users

            PUT /users/:id

        =============================================== */

        if (editingUser) {

            setUsers(

                users.map(user =>

                    user.id === editingUser.id

                        ? {

                            ...editingUser,

                            ...form

                        }

                        : user

                )

            );

        }

        else {

            setUsers([

                ...users,

                {

                    id: Date.now(),

                    ...form

                }

            ]);

        }

        setOpen(false);

    }

    function deleteUser(id) {

        Swal.fire({

            title: "Excluir usuário?",

            text: "Esta ação não poderá ser desfeita.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Excluir",

            cancelButtonText: "Cancelar"

        }).then(result => {

            if (result.isConfirmed) {

                /* ===========================================

                    BACK-END

                    DELETE /users/:id

                =========================================== */

                setUsers(

                    users.filter(user => user.id !== id)

                );

                Swal.fire({

                    title: "Sucesso",

                    text: "Usuário removido.",

                    icon: "success"

                });

            }

        });

    }

    const filteredUsers = users.filter(user =>

        user.name.toLowerCase().includes(search.toLowerCase())

        ||

        user.email.toLowerCase().includes(search.toLowerCase())

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

                    columns={[

                        "ID",

                        "Nome",

                        "Email",

                        "Cargo"

                    ]}

                    data={filteredUsers}

                    actions={(user) => (

                        <div className="flex gap-2">

                            <Button

                                color="green"

                                icon={<FaEdit />}

                                onClick={() => editUser(user)}

                            />

                            <Button

                                color="red"

                                icon={<FaTrash />}

                                onClick={() => deleteUser(user.id)}

                            />

                        </div>

                    )}

                />

            </Card>

            <Modal

                open={open}

                onClose={() => setOpen(false)}

                title={

                    editingUser

                        ? "Editar Usuário"

                        : "Novo Usuário"

                }

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

                    <Select

                        label="Cargo"

                        name="role"

                        value={form.role}

                        onChange={handleChange}

                    >

                        <option>

                            Administrador

                        </option>

                        <option>

                            Professor

                        </option>

                        <option>

                            Aluno

                        </option>

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