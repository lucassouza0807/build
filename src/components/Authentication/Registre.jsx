import Link from "next/link";
import { useRouter } from "next/navigation";
import Menu from "../Menu";
import Footer from "../Footer";
import { toast } from "react-toastify";
import { useState, useContext } from "react";
import axios from "axios";
import { celular, valiadarCPF, validarCNPJ } from "@/helpers/validacao";
import { ContextHelper } from "@/helpers/contexts";

export default function Registre() {
    const router = useRouter();
    const [cpfcnpj, setCpfCnpj] = useState();
    const [telefone, setTelefone] = useState();
    const [dadosCpfCnpj, setDadosCpfCnpj] = useState();
    const { setDadosDoPerfil } = useContext(ContextHelper)

    const verifica = async (cpfcnpj) => {

        if (cpfcnpj.length == 0) {
            setDadosCpfCnpj();
        }
        if (cpfcnpj.length == 14) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}cpf/${cpfcnpj.replace("/", "")}`, { cpf: cpfcnpj.replace("/", "") }).then((response) => {
                setDadosCpfCnpj();
            }).catch(error => {
                if (cpfcnpj.length == 0) {
                    setDadosCpfCnpj();
                } else {
                    setDadosCpfCnpj(error.response.data);
                }
            });
        } else if (cpfcnpj.length == 18) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}cnpj/${cpfcnpj.replace("/", "")}`, { cnpj: cpfcnpj.replace("/", "") }).then((response) => {
                setDadosCpfCnpj();
            }).catch(error => {
                if (cpfcnpj.length == 0) {
                    setDadosCpfCnpj();
                } else {
                    setDadosCpfCnpj(error.response.data);
                }
            });
        }
    }

    function valiadar(value) {
        if (value.length <= 14) {

            setCpfCnpj(valiadarCPF(value));
        } else if (value.length <= 18) {

            setCpfCnpj(validarCNPJ(value));
        }
    }
    function telefoneCelular(value) {
        setTelefone(celular(value));

    }
    const cadastra = async (e) => {
        e.preventDefault();
        let dados = e.target;
        let email = dados.email.value;
        let nome = dados.nome.value;
        let senha = dados.senha.value;
        let confirmasenha = dados.confirmasenha.value;
        let celular = dados.celular.value;
        let cpfcnpj = dados.cpfcnpj.value;
        let ie = dados.inscricao?.value;
        let razao = dados.razao?.value;
        let ccm = dados.ccm?.value;
        let verificaNome = nome.split(" ");
        let dadosFormulario = { nome: nome, email: email, senha: senha, celular: celular, cpfcnpj: cpfcnpj, ie: ie, ccm: ccm, razao_social: razao }
        if (senha != confirmasenha) {
            toast.error(`Confirma a senha corretamente`, {
                theme: "light",
                position: "bottom-right"
            });
        }else if (!verificaNome[1]) {
            toast.error("Digita o nome e o sobrenome", {
                theme: 'light',
                position: "bottom-right"
            });
        }else{
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}pessoa-cadastro`, dadosFormulario)
            .then((response) => {
                localStorage.setItem("tokenCliente", response.data.token);
                setDadosDoPerfil(response.data.pessoa);
                toast.success("Usúario criado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

                router.push("endereco");
            })
            .catch((error) => {
                const e = error.response.data.errors;
                if (error.response.data.errors.cpfcnpj) {
                    toast.error("CPF ou CNPJ já cadastrado", {
                        theme: 'light',
                        position: "bottom-right"
                    });

                } else {
                    Object.keys(e).map(i => {
                        toast.error(e[`${i}`][0], {
                            theme: 'light',
                            position: "bottom-right"
                        });
                    });

                }

            });
        }
        
    }

    return (
        <>
            <Menu />
            <div className="container" data-layout="container">
                <div className="row flex-center min-vh-100 py-6">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-auto">
                                        <h5>Registrar</h5>
                                    </div>
                                    <div className="col-auto fs--1 text-600"><span className="mb-0 undefined">Já tem uma contat?</span> <span><Link href="login" alt="Login">Entrar</Link></span></div>
                                </div>
                                <form onSubmit={(e) => { cadastra(e) }}>
                                    <div className="mb-3"><input className="form-control" type="text" autoComplete="on" name="nome" placeholder="Digita o seu nome" required /></div>
                                    <div className="mb-3"><input className="form-control" type="email" autoComplete="on" name="email" placeholder="Digta o seu email" required /></div>
                                    <div className="mb-3"><input className="form-control" type="tel" autoComplete="on" name="celular" placeholder="Digta um número de celular com DDD" onChange={(e) => { telefoneCelular(e.target.value) }} value={telefone} required /></div>
                                    <div className="mb-3"><input className="form-control" type="tel" autoComplete="on" name="cpfcnpj" placeholder="Digta o seu CPF ou CNPJ" required onChange={(e) => { valiadar(e.target.value), verifica(e.target.value) }} value={cpfcnpj} /> {dadosCpfCnpj && dadosCpfCnpj ? (<span className="aviso">{dadosCpfCnpj.message}</span>) : ''}</div>
                                    {cpfcnpj && dadosCpfCnpj?.status != 'Erro' && cpfcnpj.length > 14 ? (
                                        <div>
                                            <div className="mb-3"><input className="form-control" type="text" name="razao" autoComplete="on" placeholder="Digita razão social" required /></div>
                                            <div className="mb-3"><input className="form-control" type="text" name="inscricao" autoComplete="on" placeholder="Digita o Inscrição Estadual(IE)" required /></div>
                                            <div className="mb-3"><input className="form-control" type="text" name="ccm" autoComplete="on" placeholder="Digita o ccm" required /></div>
                                        </div>

                                    ) : (<></>)}

                                    <div className="row gx-2">
                                        <div className="mb-3 col-sm-6"><input className="form-control" type="password" name="senha" autoComplete="on" placeholder="Digita a senha" required /></div>
                                        <div className="mb-3 col-sm-6"><input className="form-control" type="password" name="confirmasenha" autoComplete="on" placeholder="Confirma a senha" required /></div>
                                    </div>
                                    <div className="form-check"><input className="form-check-input" type="checkbox" id="basic-register-checkbox" required /><label className="form-label" htmlFor="basic-register-checkbox">Eu aceito o <Link alt="termo" href="/termos-de-uso">termo </Link>e <Link alt="política de Privacidade" className="white-space-nowrap" href="/politica-de-privacidade">política de Privacidade</Link></label></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Cadastrar</button></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}