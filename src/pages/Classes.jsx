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

import { useAuth } from "../context/AuthContext";

export default function Classes() {

    const { user } = useAuth();

    /* =========================================================

        BACK-END

        ADMIN

        GET /classes
        POST /classes
        PUT /classes/:id
        DELETE /classes/:id

        PROFESSOR

        GET /classes/my

        ALUNO

        GET /classes/student

    ========================================================= */

    const [classes, setClasses] = useState([

        {
            id: 1,
            name: "3º Desenvolvimento",
            year: "2026",
            teacher: "Carlos Silva"
        },

        {
            id: 2,
            name: "2º Desenvolvimento",
            year: "2026",
            teacher: "Maria Oliveira"
        }

    ]);

    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);

    const [editingClass, setEditingClass] = useState(null);

    const [form, setForm] = useState({

        name: "",

        year: "",

        teacher: ""

    });

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    }

    function openNewClass(){

        setEditingClass(null);

        setForm({

            name:"",

            year:"",

            teacher:""

        });

        setOpen(true);

    }

    function editClass(item){

        setEditingClass(item);

        setForm(item);

        setOpen(true);

    }

    function saveClass(){

        /* =========================================

            BACK-END

            POST /classes

            PUT /classes/:id

        ========================================= */

        if(editingClass){

            setClasses(

                classes.map(item=>

                    item.id===editingClass.id

                        ?{

                            ...editingClass,

                            ...form

                        }

                        :item

                )

            );

        }

        else{

            setClasses([

                ...classes,

                {

                    id:Date.now(),

                    ...form

                }

            ]);

        }

        setOpen(false);

    }

    function deleteClass(id){

        Swal.fire({

            title:"Excluir turma?",

            text:"Esta ação não poderá ser desfeita.",

            icon:"warning",

            showCancelButton:true,

            confirmButtonText:"Excluir",

            cancelButtonText:"Cancelar"

        }).then(result=>{

            if(result.isConfirmed){

                /* =========================================

                    BACK-END

                    DELETE /classes/:id

                ========================================= */

                setClasses(

                    classes.filter(item=>item.id!==id)

                );

            }

        });

    }

    const filteredClasses = classes.filter(item=>

        item.name.toLowerCase().includes(search.toLowerCase())

    );

    return(

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

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                    {user.role==="Administrador" &&(

                        <Button

                            icon={<FaPlus/>}

                            onClick={openNewClass}

                        >

                            Nova Turma

                        </Button>

                    )}

                </div>

                <DataTable

                    columns={[

                        "ID",

                        "Turma",

                        "Ano",

                        "Professor"

                    ]}

                    data={filteredClasses}

                    actions={(item)=>

                        user.role==="Administrador" &&(

                            <div className="flex gap-2">

                                <Button

                                    color="green"

                                    icon={<FaEdit/>}

                                    onClick={()=>editClass(item)}

                                />

                                <Button

                                    color="red"

                                    icon={<FaTrash/>}

                                    onClick={()=>deleteClass(item.id)}

                                />

                            </div>

                        )

                    }

                />

            </Card>

            {user.role==="Administrador" &&(

                <Modal

                    open={open}

                    onClose={()=>setOpen(false)}

                    title={

                        editingClass

                        ?"Editar Turma"

                        :"Nova Turma"

                    }

                >

                    <div className="space-y-4">

                        <Input

                            label="Nome da Turma"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                        />

                        <Input

                            label="Ano"

                            name="year"

                            value={form.year}

                            onChange={handleChange}

                        />

                        <Select

                            label="Professor"

                            name="teacher"

                            value={form.teacher}

                            onChange={handleChange}

                        >

                            {/* ===================================

                                BACK-END

                                GET /teachers

                            ==================================== */}

                            <option value="">

                                Selecione

                            </option>

                            <option>

                                Carlos Silva

                            </option>

                            <option>

                                Maria Oliveira

                            </option>

                            <option>

                                João Pereira

                            </option>

                        </Select>

                        <div className="flex justify-end gap-3">

                            <Button

                                color="gray"

                                onClick={()=>setOpen(false)}

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