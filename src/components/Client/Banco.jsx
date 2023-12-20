import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ContextHelper } from "@/helpers/contexts";
import { numeroFormato } from "@/helpers/validacao";
import { numeroFormatoData } from "@/helpers/data";
import { useRouter } from "next/navigation";

export default function Banco({ ...props }) {
    const { dadosBanco } = props;

    const router = useRouter();

    const { dadosPerfil } = useContext(ContextHelper)
    const cadastrar = async (e) => {
        e.preventDefault();

        let pix = e.target.pix;
        let agencia = e.target.agencia;
        let conta = e.target.conta;
        let validade = e.target.validade;
        let dadosFormulario = { pix: pix.value, agencia: agencia.value, conta: conta.value,validade: validade.value, id_pessoa: dadosPerfil.id }
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}cadastrar-banco`, dadosFormulario)
            .then(response => {
              
                toast.success("Dados criado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

                //router.push("/minha-conta/conta-bancaria");
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

    const atualizar = async (e) => {
        e.preventDefault();
        
        let pix = e.target.pix;
        let agencia = e.target.agencia;
        let conta = e.target.conta;
        let validade = e.target.validade;
        let dadosFormulario = {pix: pix.value, agencia: agencia.value, conta: conta.value, validade: validade.value}
        if(agencia.value.length >= 16){
            toast.error("Limite de caracteres do campo agencia é de 16", {
                theme: 'light',
                position: "bottom-right"
            });
        }else if(conta.value.length >= 16){
            toast.error("Limite de caracteres do campo conta é de 16", {
                theme: 'light',
                position: "bottom-right"
            });
        }else{

            axios.put(`${process.env.NEXT_PUBLIC_API_URL}editar-banco/${dadosBanco.data.id}`, dadosFormulario)
                .then(response => {
                    console.log(response)
                    toast.success("Dados criado com suscesso", {
                        theme: 'light',
                        position: "bottom-right"
                    });
                })
                .catch((error) => {
    
                    const e = error.response.data.error;
                    Object.keys(e).map(i => {
                        toast.error(e[`${i}`][0], {
                            theme: 'light',
                            position: "bottom-right"
                        });
                    })
    
                })
        }
    }
    
    const handleAgencia = (event) => {
        let input = event.target
        input.value = numeroFormato(input.value);
    }
    const handleConta = (event) => {
        let input = event.target
        input.value = numeroFormato(input.value);
    }
    const handleValidade = (event) => {
        let input = event.target
        input.value = numeroFormatoData(input.value);
    }
    return (
        <>
            <Head>
                <title>Dados Bancario</title>
            </Head>

            <div className="container">
                <div className="row flex-center ">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-12 text-center">
                                        <h5>Dados bancario</h5>
                                    </div>
                                </div>
                                {dadosBanco && dadosBanco.quantidade > 0 ? (

                                    <form onSubmit={(e) => atualizar(e)}>
                                        <div className="mb-3"><input className="form-control" type="text" name="pix" placeholder="Chave do Pix" defaultValue={dadosBanco.data?.pix} /></div>
                                        <div className="mb-3"><input className="form-control" type="tel" name="agencia" placeholder="Agência" onChange={(e) => {handleAgencia(e)}} defaultValue={dadosBanco.data?.agencia} /></div>
                                        <div className="mb-3"><input className="form-control" type="tel" name="conta" placeholder="Número da conta" onChange={(e) => {handleConta(e)}} defaultValue={dadosBanco.data?.conta} /></div>
                                        <div className="mb-3"><input className="form-control" type="tel" name="validade" placeholder="Data de validade" onChange={(e) => {handleValidade(e)}} defaultValue={dadosBanco.data?.validade} /></div>
                                        <button className="btn btn-primary d-block w-100 mt-3" type="submit" name="atualizar">Atualizar</button>
                                    </form>
                                ) : (
                                    <form onSubmit={(e) => cadastrar(e)}>
                                        <div className="mb-3"><input className="form-control" type="text" name="pix" placeholder="Chave do Pix" /></div>
                                        <div className="mb-3"><input className="form-control" type="tel" name="agencia" placeholder="Agência" onChange={(e) => {handleAgencia(e)}} /></div>
                                        <div className="mb-3"><input className="form-control" type="tel" name="conta" placeholder="Número da conta" onChange={(e) => {handleConta(e)}} /></div>
                                        <div className="mb-3"><input className="form-control" type="tel" name="validade" placeholder="Data de validade" onChange={(e) => {handleValidade(e)}} /></div>
                                        <button className="btn btn-primary d-block w-100 mt-3" type="submit" name="cadastrar">Cadastrar</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}