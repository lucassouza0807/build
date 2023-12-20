import Head from "next/head";
import axios from "axios";
import { useContext } from "react";
import { ContextHelper } from "@/helpers/contexts";
import { toast } from "react-toastify";

export default function Senha() {
    const { dadosPerfil } = useContext(ContextHelper)

    const atualizarSenha = async (e) => {
        e.preventDefault();
        let senhaAtual = e.target.senhaAtual.value;
        let senha = e.target.senha.value;
        let senhaConfirma = e.target.senhaConfirma.value;
        if(senha == senhaConfirma && senha != "" && senhaConfirma != ""){
            let token = localStorage.getItem('tokenCliente');
            const dadosSenha = {senha_atual: senhaAtual, senha: senha};
            axios.put(`${process.env.NEXT_PUBLIC_API_URL}atualizar-senha/${dadosPerfil.id}`, dadosSenha, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => {
                toast.success(response.data.message, {
                    theme: 'light',
                    position: "bottom-right"
                });
            })
            .catch(error => {
                toast.error(error.response.data.message, {
                    theme: 'light',
                    position: "bottom-right"
                });
            })
        }else{
            toast.error("Senhas diferentes", {
                theme: 'light',
                position: "bottom-right"
            });
        }
    }
    return (
        <>
            <Head>
                <title>Senha</title>
            </Head>
            <div className="container">
                <div className="row flex-center ">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-12 text-center">
                                        <h5>Alterar a senha</h5>
                                    </div>
                                </div>
                                <form onSubmit={(e) => atualizarSenha(e)}>
                                <div className="mb-3"><input className="form-control" type="password" name="senhaAtual" placeholder="Digita a senha atual" required/></div>
                                    <div className="mb-3"><input className="form-control" type="password" name="senha" placeholder="Digita uma senha" required/></div>
                                    <div className="mb-3"><input className="form-control" type="password" name="senhaConfirma" placeholder="Confirma a senha" required/></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Atualizar</button></div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}