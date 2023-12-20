import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";
import { celular } from "@/helpers/validacao";
import { toast } from "react-toastify";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Contato() {
    const [telefone, setTelefone] = useState();
    const [videoModal, setVideoModal] = useState(false);

    function telefoneCelular(value) {
        setTelefone(celular(value));
    }

    const enviarContato = async (dados) => {
        dados.preventDefault();
        let email = dados.target.email.value;
        let nome = dados.target.nome.value;
        let celular = dados.target.celular.value;
        let verificaNome = nome.split(" ");

        let dadosFormulario = { nome: nome, email: email, celular: celular }

        if (!verificaNome[1]) {
            toast.error("Digita o nome e o sobrenome", {
                theme: 'light',
                position: "bottom-right"
            });
            return;
        } else {

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}envio-dados`, dadosFormulario)
                .then((response) => {
                    toast.success("Email enviado com sucesso", {
                        theme: 'light',
                        position: "bottom-right"
                    });
                })
                .catch((error) => {
                    toast.error("Falha ao entra em contato com a nossa equipe", {
                        theme: 'light',
                        position: "bottom-right"
                    });
                });

        }

    }
    return (
        <>
            <Head>
                <title>Contato</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <div className="container  pt-7">
                    <div className="contato-empresa p-7 card mb-7">
                        <h2>Entre em contato</h2>
                        <form method="post" onSubmit={(e) => enviarContato(e)}>
                            <label className="form-label">Nome</label>
                            <input type="text" className="form-control" name="nome" placeholder="Digita o seu nome completo" required />
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" placeholder="Digita o seu email" required />
                            <label className="form-label">Celular</label>
                            <input type="tel" className="form-control" name="celular" placeholder="Digita o seu número do celular" onChange={(e) => telefoneCelular(e.target.value)} value={telefone} required />
                            <label className="form-label">Mensagem</label>
                            <textarea name="menssagem" id="" cols="30" className="form-control" rows="10" placeholder="Digita a mensagem"></textarea>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-success mt-3" type="submit" name="enviar">Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}