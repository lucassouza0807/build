import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ContextHelper } from "@/helpers/contexts";
import { useRouter } from "next/navigation";

export default function DadosEmpresa() {
    const [cnpj, setCNPJ] = useState();
    const [dadosDoEmpresa, setDadosDoEmpresa] = useState({});

    const { dadosPerfil } = useContext(ContextHelper);
    const verificaCNPJ = async (e) => {
        let cnpj = e.target.value;
        if (cnpj.length <= 18) {
            validarCNPJ(e.target.value);
        }
    }
    function validarCNPJ(value) {
        value = value.replace(/\D/g, "");
        value = value.replace(/^(\d{2})(\d)/, "$1.$2");
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
        value = value.replace(/(\d{4})(\d)/, "$1-$2");
        setCNPJ(value);
    }
    useEffect(() => {
       
        let token = localStorage.getItem('tokenCliente');

        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}pessoa-perfil`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then((response) => {
                setDadosDoEmpresa(response.data);
                setCNPJ(response.data.cpfcnpj);
                
            }).catch(error => {
                console.log(error);
            });
        }
       
    }, []);
    
    const editarrEmpresa = async (e) =>{
        e.preventDefault();
        const razao = e.target.razao_social;
        const cnpj = e.target.cnpj;
        const inscricao = e.target.inscricao;
        const ccm = e.target.ccm;

        //console.log("Razão Social: " + razao.value + " CNPJ: " + cnpj.value + " Inscrição Estadual(IE): " + inscricao.value + " CCM: " + ccm.value);
        const dadosAtualizado = {razao_social: razao.value, cpfcnpj: cnpj.value, ie: inscricao.value, ccm: ccm.value}
        let token = localStorage.getItem('tokenCliente');
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}editar-pessoa/${dadosPerfil.id}`, dadosAtualizado, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
            .then((response) => {
                toast.success(`Dados do atualizado com sucesso`, {
                    theme: 'light',
                    position: "bottom-right"
                });
            }).catch(error => {
                const e = error.response.data.errors
                Object.keys(e).map(i => {
                    toast.error(e[`${i}`][0].replace("campo", " "), {
                        theme: 'light',
                        position: "bottom-right"
                    });
                });
            });
    }
    return (
        <>
            <Head>
                <title>Dados da empresa</title>
            </Head>
            

            <div className="container">
                <div className="row flex-center ">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-12 text-center">
                                        <h5>Dados da empresa</h5>
                                    </div>
                                </div>
                                <form onSubmit={(e) => editarrEmpresa(e)}>
                                    <div className="mb-3"><input className="form-control" type="text" name="razao_social" placeholder="Digita a razão social" defaultValue={dadosDoEmpresa.razao_social}/></div>
                                    <div className="mb-3"><input className="form-control" type="tel" name="cnpj" placeholder="Digita o cnpj" onChange={(e) => { verificaCNPJ(e) }} value={cnpj} /></div>
                                    <div className="mb-3"><input className="form-control" type="text" name="inscricao" placeholder="Digita o Inscrição Estadual(IE)" defaultValue={dadosDoEmpresa.ie}/></div>
                                    <div className="mb-3"><input className="form-control" type="text" name="ccm" placeholder="Digita o ccm" defaultValue={dadosDoEmpresa.ccm}/></div>
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