import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function atualizarSenha() {
    const router = useRouter();

    const tokenSenha = async () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}verificar-token-senha`, {
            body: {
                token: JSON.stringify(router.query.senha)
            }
        })
            .then((response) => {
                if (response.data.status == 'error') {
                    router.push("/");
                }
            })
            .catch(error => {
                router.push("/");
            })


    }
    if (router.query.senha !== undefined) {
        tokenSenha();
    }
    const alterarSenha = (e) => {
        e.preventDefault();
        let senha = e.target.senha;
        let confirmaSenha = e.target.confirmaSenha;
        if (senha.value == confirmaSenha.value) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}alterar-senha`, {
                token: router.query.senha,
                senha: senha.value
            })
                .then((response) => {
                    toast.success(response.data.message, {
                        theme: "light",
                        position: "bottom-right"
                    });

                })
                .catch(error => {
                    toast.error(error.response.data.message, {
                        theme: "light",
                        position: "bottom-right"
                    });
                    router.push("/");
                })

        } else {
            toast.error("Senhas diferentes", {
                theme: "light",
                position: "bottom-right"
            });
        }
    }
    return (
        <>
            <Head>
                <title>Alterar senha</title>
            </Head>
            <Menu />
            <div className="container  pt-8 mb-8">
                <div className="row flex-center ">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-12 text-center">
                                        <h5>Alterar a senha</h5>
                                    </div>
                                </div>
                                <form onSubmit={(e) => alterarSenha(e)}>
                                    <div className="mb-3"><input className="form-control" type="password" name="senha" placeholder="Digita uma senha" /></div>
                                    <div className="mb-3"><input className="form-control" type="password" name="confirmaSenha" placeholder="Confirma a senha" /></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Atualizar</button></div>
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
