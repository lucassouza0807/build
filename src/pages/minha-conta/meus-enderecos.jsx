import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Head from "next/head";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { ContextHelper } from "@/helpers/contexts";

export default function EnderecoCliente() {
    const { dadosPerfil } = useContext(ContextHelper)

    const router = useRouter();
    const [enderecoData, setEnderecoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorito, setFavorito] = useState(false);
    const [principal, setPrincipal] = useState();
    const [enderecoEditado, setEditadoEndereco] = useState(false);
    const [enderecoExcluido, setExcluidoEndereco] = useState(false);
    const [dadosEndereco, setDadosEndereco] = useState({});
    const [dadosEnderecoDeletar, setDadosEnderecoDeletar] = useState({});
    const [dadosCep, setDadosCep] = useState({});
    const [modalEditar, setModalEditar] = useState(false);
    const [modalDeletar, setModalDeletar] = useState(false);

    const estados = [
        {uf: 'AC', estado: 'Acre'},
        {uf: 'AL', estado: 'Alagoas'},
        {uf: 'AP', estado: 'Amapá'},
        {uf: 'AM', estado: 'Amazonas'},
        {uf: 'BA', estado: 'Bahia'},
        {uf: 'CE', estado: 'Ceará'},
        {uf: 'DF', estado: 'Distrito Federal'},
        {uf: 'ES', estado: 'Espírito Santo'},
        {uf: 'GO', estado: 'Goiás'},
        {uf: 'MA', estado: 'Maranhão'},
        {uf: 'MT', estado: 'Mato Grosso'},
        {uf: 'MS', estado: 'Mato Grosso do Sul'},
        {uf: 'MG', estado: 'Minas Gerais'},
        {uf: 'PA', estado: 'Pará'},
        {uf: 'PB', estado: 'Paraíba'},
        {uf: 'PR', estado: 'Paraná'},
        {uf: 'PE', estado: 'Pernambuco'},
        {uf: 'PI', estado: 'Piauí'},
        {uf: 'RJ', estado: 'Rio de Janeiro'},
        {uf: 'RN', estado: 'Rio Grande do Norte'},
        {uf: 'RS', estado: 'Rio Grande do Sul'},
        {uf: 'RO', estado: 'Rondônia'},
        {uf: 'RR', estado: 'Roraima'},
        {uf: 'SC', estado: 'Santa Catarina'},
        {uf: 'SP', estado: 'São Paulo'},
        {uf: 'SE', estado: 'Sergipe'},
        {uf: 'TO', estado: 'Tocantins'},
        {uf: 'EX', estado: 'Estrangeiro'},

    ];

 
    
    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0
        }
        
        if (dadosPerfil) {
            enderecoDados(dadosPerfil.id).then((data) => {
                setEnderecoData(data);
                setLoading(false);
                setEditadoEndereco(false)
                setExcluidoEndereco(false)
            });
        }
    }, [dadosPerfil, enderecoEditado, enderecoExcluido]);

    const editoEndereco = (e) => {
        setDadosEndereco(e)
        setModalEditar(true);
    }
    const deleteEndereco = (e) => {
        setModalDeletar(true);
        setDadosEnderecoDeletar(e)
    }
    const favoritoSelecionado = (e) => {
        setFavorito(e);
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}principal-endereco/${e}/${dadosPerfil.id}`)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
    }

    const validarCep = async (e) => {
        e.preventDefault();
        let cep = e.target.value;

        if (cep.length > 8) {

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}cep/${cep}`, { cep: cep }).then((response) => {
                setDadosCep(response.data.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }
    const enderecoEditar = async (e) => {
        e.preventDefault();
        let identificacao = e.target.identificacao;
        let cep = e.target.cep;
        let estado = e.target.estado;
        let cidade = e.target.cidade;
        let bairro = e.target.bairro;
        let logradouro = e.target.logradouro;
        let numero = e.target.numero;
        let complemento = e.target.complemento;
        let obs = e.target.obs;
        let responsavel = e.target.responsavel;
        //console.log("ID: " + dadosEndereco.id + " Identificação: " + identificacao.value + " CEP: " + cep.value + " Estado: " + estado.value + " Cidade: " + cidade.value + " Bairro: " + bairro.value + " Logradouro: " + logradouro.value + " Nº: " + numero.value + " Complemento: " + complemento.value + " Observação: " + obs.value)
        const dadosEnderecoForm = { cep: cep.value, estado: estado.value, cidade: cidade.value, bairro: bairro.value, logradouro: logradouro.value, numero: numero.value, complemento: complemento.value, obs: obs.value, identificacao: identificacao.value, responsavel: responsavel.value };
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}editar-endereco/${dadosEndereco.id}`, dadosEnderecoForm)
            .then((response) => {
                setDadosEndereco(response.data.fresh)
                setModalEditar(false)
                setEditadoEndereco(true)
                toast.success(response.data.message, {
                    theme: 'light',
                    position: "bottom-right"
                });
            }).catch(error => {
                console.log(error);
            });
    }

    const zipCodeMask = (value) => {
        if (!value) return "";
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
        return value
    }

    const handleZipCode = (event) => {
        let input = event.target
        input.value = zipCodeMask(input.value);
    }

    const excluir = async (e) => {
        setModalDeletar(false);
        const dados = { situacao: "Inativo" };
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}desativa-endereco/${e.id}`, dados)
            .then((response) => {
                setEditadoEndereco(true)
                toast.success(response.data.message, {
                    theme: 'light',
                    position: "bottom-right"
                });
            }).catch(error => {
                console.log(error.response);
            });
    }

    return (
        <>
            {loading ? (<Loading />) : ''}
            <Head>
                <title>Endereços</title>
            </Head>

            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <div className="user-profile-container-site">
                                <div className="user-personal-data-container-site">

                                    <div className="col-12 text-center">
                                        <h5>Meus endereços</h5>
                                    </div>
                                    <div className="btn-adicionar">
                                        <Link href="/minha-conta/adicionar-endereco" alt="Adicionar endereço" className="btn btn-success">Adicionar endereço</Link>
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
                                                                        <th scope="col">Endereço</th>
                                                                        <th scope="col">Responsavel</th>
                                                                        <th scope="col">Tipo</th>
                                                                        <th className="text-end" scope="col"> Ação </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {enderecoData != undefined && enderecoData.enderecos?.map((item, key) => {

                                                                        if (item.situacao != 'Inativo') {
                                                                            return (
                                                                                <tr key={`endereco-${item.id}`}>
                                                                                    <td><span onClick={(e) => { favoritoSelecionado(item.id) }}>{item.principal == 1 && !favorito || favorito == item.id ? (<AiFillStar className="cursor-pointer text-warning" />) : (<AiOutlineStar className="cursor-pointer" />)}</span> {item.logradouro} Nº {item.numero} {item.cidade}, {item.estado}, {item.cep}</td>
                                                                                    <td>{item.responsavel}</td>
                                                                                    <td>{item.identificacao[0].toUpperCase() + item.identificacao.substr(1)}</td>
                                                                                    <td className="d-flex justify-content-end">
                                                                                        <button type="button" className="p-0 me-2 btn btn-action" onClick={() => editoEndereco(item)} data-toggle="modal" data-target="#modalExemplo">
                                                                                            <BiEdit />
                                                                                        </button>
                                                                                        <button type="button" className="p-0 btn btn-action" onClick={() => deleteEndereco(item)}>
                                                                                            <AiOutlineDelete />
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>

                                                                            )
                                                                        }
                                                                    })}

                                                                </tbody>
                                                            </table>
                                                            {enderecoData && enderecoData.quantidade == 0 || enderecoData && enderecoData.status == "error" ? (<div className="text-center">{enderecoData.message}</div>) : ''}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Modal
                                show={modalEditar}
                                onHide={() => setModalEditar(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Alterar dados do endereço</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={(e) => { enderecoEditar(e) }}>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="responsavel" placeholder="Digita o nome do responsavel" defaultValue={dadosEndereco && dadosEndereco.responsavel} /></div>
                                        </div>
                                        <div className="row gx-2">

                                            <div className="mb-3 col-sm-6">

                                                <select aria-label="Default select example" name="identificacao" className="form-select" required placeholder="Selecione o tipo de endereço">
                                                    {dadosEndereco && dadosEndereco.identificacao == 'trabalho' ? (
                                                        <>
                                                            <option value="trabalho">Trabalho</option>
                                                            <option value="casa">Casa</option>
                                                        </>
                                                    ) :
                                                        (
                                                            <>
                                                                <option value="casa">Casa</option>
                                                                <option value="trabalho">Trabalho</option>
                                                            </>
                                                        )}
                                                </select>
                                            </div>
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="tel" autoComplete="on" name="cep" placeholder="Digita o CEP" maxLength="9" onChange={(e) => { validarCep(e), handleZipCode(e) }} defaultValue={dadosEndereco && dadosEndereco.cep} /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-6">
                                                <select className="form-select" id="" name="estado" placeholder="Estado" onChange={() => setDadosCep({})} defaultValue={dadosCep.uf ?? dadosEndereco.estado} value={dadosCep.uf} >
                                                    {estados.map(item => {
                                                        
                                                        return(
                                                            <option value={item.uf} key={`estados-${item.uf}`} selected={dadosEndereco.estado == item.uf ? true : false}>{item.estado}</option>
                                                        )
                                                    })}
                                                    
                                                </select>
                                            </div>
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="cidade" placeholder="Cidade" onChange={() => setDadosCep({})} defaultValue={dadosCep.localidade ?? dadosEndereco.cidade} value={dadosCep.localidade} /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="bairro" placeholder="Bairro" onChange={() => setDadosCep({})} defaultValue={dadosCep.bairro ?? dadosEndereco.bairro} value={dadosCep.bairro} /></div>
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="logradouro" placeholder="Endereço" onChange={() => setDadosCep({})} defaultValue={dadosCep.logradouro ?? dadosEndereco.logradouro} value={dadosCep.logradouro} /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-3"><input className="form-control" type="tel" autoComplete="on" name="numero" placeholder="Número" defaultValue={dadosEndereco && dadosEndereco.numero} /></div>
                                            <div className="mb-3 col-sm-9"><input className="form-control" type="text" autoComplete="on" name="complemento" placeholder="Complemento" defaultValue={dadosEndereco && dadosEndereco.complemento} /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-12"><input className="form-control" type="text" autoComplete="on" name="obs" placeholder="Ponto de referença" defaultValue={dadosEndereco && dadosEndereco.referenca} /></div>
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
                                    <Modal.Title id="contained-modal-title-vcenter">Tem certeza que quer excluir o endereço</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {dadosEnderecoDeletar.logradouro} Nº {dadosEnderecoDeletar.numero} {dadosEnderecoDeletar.cidade}, {dadosEnderecoDeletar.estado}, {dadosEnderecoDeletar.cep}
                                    <div className="m-3 d-flex justify-content-between">
                                        <button className="btn btn-primary">Cancela</button>
                                        <button className="btn btn-danger" onClick={(e) => excluir(dadosEnderecoDeletar)}>Excluir</button>
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

const enderecoDados = async (clienteInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}enderecos-cliente/${clienteInfo}`, {
        id_pessoa: clienteInfo
    })

    const data = await res.json();
    return data;
}
