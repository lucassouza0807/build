import Link from "next/link";
import Menu from "../Menu";
import Footer from "../Footer";
import { useEffect, useState, useContext } from "react";
import { HiOutlineShoppingBag, } from "react-icons/hi";
import { AiOutlineSearch, AiOutlineRise, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { ContextHelper } from "@/helpers/contexts";

export default function Login() {
    const { setDadosDoPerfil, dadosPerfil } = useContext(ContextHelper);
    const router = useRouter();
    const { callback } = router.query;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const senha = e.target.senha.value;
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}pessoa-entrar`, {
            email: email,
            senha: senha
        }).then((response) => {
            const token = JSON.stringify(response.data.authorization.token);
            localStorage.setItem('tokenCliente', token.replace(/"/g, ''));
            localStorage.setItem("_id_id_", response.data.pessoa.id)
            setDadosDoPerfil(response.data.pessoa);
            toast.success('Usuário logado com sucesso', {
                theme: "light",
                position: "bottom-right"
            });


            if (callback) {
                router.push(callback)

                return 0;
            }

            router.push("/minha-conta")

        }).catch(error => {
            toast.error(error.response.data.error, {
                theme: "light",
                position: "bottom-right"
            });
        }).catch(error => {
            toast.error('Erro na conexão com o servidor', {
                theme: "light",
                position: "bottom-right"
            });
        })
    };
    return (
        <>
            <Menu />
            <div className="container">

                <div className="row flex-center min-vh-100 py-6">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-auto">
                                        <h5>Entra</h5>
                                    </div>
                                    <div className="col-auto fs--1 text-600"><span className="mb-0 undefined">ou</span> <span><Link href="cadastro" alt="criar conta">criar conta</Link></span></div>
                                </div>
                                <form method="POST" onSubmit={handleSubmit}>
                                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Digita o email" /></div>
                                    <div className="mb-3"><input className="form-control" type="password" name="senha" placeholder="Digita a senha" /></div>
                                    <div className="row flex-between-center">
                                        <div className="col-auto">
                                            <div className="form-check mb-0"><input className="form-check-input" type="checkbox" id="basic-checkbox"/><label className="form-check-label mb-0" htmlFor="basic-checkbox">Remember me</label></div>
                                        </div>
                                        <div className="col-auto"><a className="fs--1" href="forgot-password">Forgot Password?</a></div>
                                    </div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Entrar</button></div>
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