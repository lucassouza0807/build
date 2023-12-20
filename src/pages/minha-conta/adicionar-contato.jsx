import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ContextHelper } from "@/helpers/contexts";
import { celular, telefone } from "@/helpers/validacao";

export default function AdicionarContato() {
    const { dadosPerfil } = useContext(ContextHelper);
    const router = useRouter();
    
    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");
        }
    }, []);

    const adicionarContato = async (e) => {
        e.preventDefault();

        let dados = e.target;
        let email = dados.email;
        let telefone = dados.telefone;
        let celular = dados.celular;

        let dadosFormulario = { email: email.value, telefone: telefone.value, celular: celular.value, id_pessoa: dadosPerfil.id };

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}cadastrar-contato`, dadosFormulario)
            .then(response => {
                toast.success("Contato criado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

                router.push("/minha-conta/contatos");
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
            <Head>
                <title>Adicionar contato</title>
            </Head>
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <div className="container">
                                <div className="row flex-center ">
                                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                                        <div className="card">
                                            <div className="card-body p-4 p-sm-5">
                                                <div className="row flex-between-center mb-2">
                                                    <div className="col-12 text-center">
                                                        <h5>Adicionar contato</h5>
                                                    </div>
                                                </div>
                                                <form onSubmit={(e) => adicionarContato(e)}>
                                                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Digita o email" /></div>
                                                    <div className="mb-3"><input className="form-control" type="tel" name="telefone" onChange={(e) => {handleTelefone(e)}} placeholder="Digita o número telefone com o DDD" /></div>
                                                    <div className="mb-3"><input className="form-control" type="tel" name="celular" onChange={(e) => {handleCelular(e)}} placeholder="Digita o número do celular com o DDD" /></div>
                                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Cadastrar</button></div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}