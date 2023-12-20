import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import Footer from "@/components/Footer";
import { useEffect, useState, useContext } from "react";
import Loading from "@/components/Loading";
import { ContextHelper } from "@/helpers/contexts";
import Head from "next/head";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { celular, telefone } from "@/helpers/validacao";

export default function ContatosCliente() {
    const [loading, setLoading] = useState(true);
    const [contatoData, setContatoData] = useState(null);
    const [deletaContato, setDeletaContato] = useState(false);
    const [editarContato, setEditarContato] = useState(false);

    const { dadosPerfil } = useContext(ContextHelper)

    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0;
        }

    }, []);

    const [dadosEditar, setDadosEditar] = useState({});
    const [preDeleteData, setPreDeleteData] = useState();

    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);

    const editar = async (e) => {
        setDadosEditar(e)
        setModalEditar(true);
    }
    const verificaRemover = (e) => {
        setModalDeletar(true);
        setPreDeleteData(e)
    }
    const atualizar = async (e) => {
        e.preventDefault();

        let email = e.target.email;
        let telefone = e.target.telefone;
        let celular = e.target.celular;
        let dadosFormulario = { email: email.value, telefone: telefone.value, celular: celular.value }
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}editar-contato/${dadosEditar.id}`, dadosFormulario)
            .then(response => {
                setModalEditar(false)
                setEditarContato(true)
                toast.success("Dados editado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

            })
            .catch((error) => {

                const e = error.response.data.errors;
                Object.keys(e).map(i => {
                    toast.error(e[`${i}`][0], {
                        theme: 'light',
                        position: "bottom-right"
                    });
                })

            })
    }
    const excluir = async (e) => {
        e.preventDefault()
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}deletar-contato/${preDeleteData.id}`)
            .then((response) => {
                setModalDeletar(false)
                setDeletaContato(true)
                setEditarContato(false)
                toast.success(response.data.msg, {
                    theme: 'light',
                    position: "bottom-right"
                })
            })
    }

    useEffect(() => {
        if (dadosPerfil) {
            contatosData(dadosPerfil.id).then((data) => {
                setContatoData(data);
                setLoading(false);
                setDeletaContato(false)
                setEditarContato(false)
            });
        }
    }, [dadosPerfil, deletaContato, editarContato]);

    const handleTelefone = (e) => {
        const input = e.target;
        input.value = telefone(input.value);
    }

    const handleCelular = (e) => {
        const input = e.target;
        input.value = celular(input.value);
    }

    return (
        <>
            {loading ? (<Loading />) : ''}
            <Head>
                <title>Contatos</title>
            </Head>
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <section className="user">
                                <div className="user-profile-container-site">
                                    <div className="user-personal-data-container-site">
                                        <div className="col-12 text-center">
                                            <h5>Lista de contatos</h5>
                                        </div>
                                        <div className="btn-adicionar">
                                            <Link href="/minha-conta/adicionar-contato" alt="Adicionar Contato" className="btn btn-success">Adicionar contato</Link>
                                        </div>
                                        <div className="lista">
                                            <div className="p-0 card-body">
                                                <div className="tab-content">
                                                    <div
                                                        role="tabpanel"
                                                        id="react-aria736874926-9-tabpane-preview"
                                                        aria-labelledby="react-aria736874926-9-tab-preview"
                                                        className="fade tab-pane active show"
                                                    >
                                                        <div>
                                                            <div className="table-responsive">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Email</th>
                                                                            <th scope="col">telefone</th>
                                                                            <th scope="col">Celular</th>
                                                                            <th className="text-end" scope="col"> Ação </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {contatoData != undefined && contatoData.data?.map((item, key) => {

                                                                            return (<tr key={`contatos-${item.id}`}>
                                                                                <td>{item.email}</td>
                                                                                <td>{item.telefone}</td>
                                                                                <td>{item.celular}</td>
                                                                                <td className="d-flex justify-content-end">
                                                                                    <button type="button" className="p-0 me-2 btn btn-action" onClick={() => editar(item)}>
                                                                                        <BiEdit />
                                                                                    </button>
                                                                                    <button type="button" className="p-0 btn btn-action" onClick={() => verificaRemover(item)}>
                                                                                        <AiOutlineDelete />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>)
                                                                        })}

                                                                    </tbody>
                                                                </table>
                                                                {contatoData && contatoData.quantidade == 0 || contatoData && contatoData.status == "error" ? (<div className="text-center">Não tem contato cadastrado</div>) : ''}

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


                            <Modal
                                show={modalEditar}
                                onHide={() => setModalEditar(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Alterar dados o contato</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={(e) => { atualizar(e) }}>

                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-12"><input className="form-control" type="email" autoComplete="on" name="email" placeholder="Digita o email" defaultValue={dadosEditar && dadosEditar.email} /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-12"><input className="form-control" type="tel" autoComplete="on" name="telefone" onChange={(e) => {handleTelefone(e)}} placeholder="Digita o telefone com o DDD" defaultValue={dadosEditar && dadosEditar.telefone} /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-12"><input className="form-control" type="tel" autoComplete="on" name="celular" onChange={(e) => {handleCelular(e)}} placeholder="Digita o celular com o DDD" defaultValue={dadosEditar && dadosEditar.celular} /></div>
                                        </div>
                                        <div className="mb-3 d-flex align-items-center justify-content-between"><button className="btn btn-primary d-block" type="submit" name="submit">Editar</button></div>
                                    </form>
                                </Modal.Body>
                            </Modal>

                            <Modal
                                show={modalDeletar}
                                onHide={() => setModalDeletar(false)}
                                size="sm-3"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Tem certeza que quer excluir o contato</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="m-3 d-flex justify-content-between">
                                        <button className="btn btn-primary">Cancela</button>
                                        <button className="btn btn-danger" onClick={(e) => { excluir(e) }}>Excluir</button>
                                    </div>
                                </Modal.Body>
                            </Modal>

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}


const contatosData = async (clienteInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}contatos/${clienteInfo}`)

    const data = await res.json();
    return data;
}
