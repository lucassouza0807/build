import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Footer from "../Footer";
import Menu from "../Menu";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextHelper } from "@/helpers/contexts";

export default function EnderecoCadastro() {

    const router = useRouter();
    const [dadosCep, setDadosCep] = useState({});
    const { dadosPerfil } = useContext(ContextHelper)
    const enderecoCadastra = async (e) => {
        e.preventDefault();
        let dados = e.target;
        let cep = dados.cep.value;
        let estado = dados.estado.value;
        let cidade = dados.cidade.value;
        let bairro = dados.bairro.value;
        let logradouro = dados.logradouro.value;
        let numero = dados.numero.value;
        let complemento = dados.complemento.value;
        let obs = dados.obs.value;
        let identificacao = dados.identificacao.value;

        const dadosFormulario = { principal: false, cep: cep, estado: estado, cidade: cidade, bairro: bairro, logradouro: logradouro, numero: numero, complemento: complemento, obs: obs, id_pessoa: dadosPerfil.id, responsavel: dadosPerfil.nome, identificacao: identificacao };

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}cadastrar-endereco-cliente`, dadosFormulario)
            .then(response => {
                toast.success("Endereço criado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

                router.push("minha-conta");
            })
            .catch((error) => {

                const e = error.response.data.errors;
                Object.keys(e).map(i => {
                    toast.error(e[`${i}`][0], {
                        theme: 'light',
                        position: "bottom-right"
                    });
                });

            });
    }
    const validarCep = async (e) => {
        e.preventDefault();
        let cep = e.target.value;

        if (cep.length > 7) {

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}cep/${cep}`, { cep: cep }).then((response) => {
                setDadosCep(response.data.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const zipCodeMask = (value) => {
        if (!value) return "";
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        return value;
    }

    const handleZipCode = (event) => {
        let input = event.target
        input.value = zipCodeMask(input.value);
    }
    const [estadoSelecionado, setEstadoSelecionado] = useState();

    const handleChangeEstado = (event) => {
      setEstadoSelecionado(event.target.value);
    };
    return (
        <>
            <Menu />
            <div className="container">
                <div className="container" data-layout="container">
                    <div className="row flex-center min-vh-100 py-6">

                        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-9 col-xxl-4">
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <div className="row flex-between-center mb-2">
                                        <div className="col-auto">
                                            <h5>Endereço</h5>
                                        </div>
                                    </div>
                                    <form onSubmit={(e) => { enderecoCadastra(e) }}>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-6">

                                                <select aria-label="Default select example" name="identificacao" className="form-select" required placeholder="Selecione o tipo de endereço"><option value="casa">Casa</option><option value="trabalho">Trabalho</option></select>
                                            </div>
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="tel" autoComplete="on" name="cep" placeholder="Digita o CEP" maxLength="9" onChange={(e) => { validarCep(e), handleZipCode(e) }} required /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-6">
                                                <select className="form-select" id="" name="estado" placeholder="Estado" onChange={() => setDadosCep({})} defaultValue={dadosCep.uf ?? ''} value={dadosCep.uf}>
                                                    <option value="0" placeholder="Estado">Estado*</option>
                                                    <option value="AC">Acre</option>
                                                    <option value="AL">Alagoas</option>
                                                    <option value="AP">Amapá</option>
                                                    <option value="AM">Amazonas</option>
                                                    <option value="BA">Bahia</option>
                                                    <option value="CE">Ceará</option>
                                                    <option value="DF">Distrito Federal</option>
                                                    <option value="ES">Espírito Santo</option>
                                                    <option value="GO">Goiás</option>
                                                    <option value="MA">Maranhão</option>
                                                    <option value="MT">Mato Grosso</option>
                                                    <option value="MS">Mato Grosso do Sul</option>
                                                    <option value="MG">Minas Gerais</option>
                                                    <option value="PA">Pará</option>
                                                    <option value="PB">Paraíba</option>
                                                    <option value="PR">Paraná</option>
                                                    <option value="PE">Pernambuco</option>
                                                    <option value="PI">Piauí</option>
                                                    <option value="RJ">Rio de Janeiro</option>
                                                    <option value="RN">Rio Grande do Norte</option>
                                                    <option value="RS">Rio Grande do Sul</option>
                                                    <option value="RO">Rondônia</option>
                                                    <option value="RR">Roraima</option>
                                                    <option value="SC">Santa Catarina</option>
                                                    <option value="SP">São Paulo</option>
                                                    <option value="SE">Sergipe</option>
                                                    <option value="TO">Tocantins</option>
                                                    <option value="EX">Estrangeiro</option>
                                                </select>
                                            </div>
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="cidade" onChange={() => setDadosCep({})} placeholder="Cidade*" defaultValue={dadosCep.localidade ?? ''} value={dadosCep.localidade} required/></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="bairro" onChange={() => setDadosCep({})} placeholder="Bairro*" defaultValue={dadosCep.bairro ?? ''} value={dadosCep.bairro} /></div>
                                            <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="logradouro" onChange={() => setDadosCep({})} placeholder="Logradouro*" defaultValue={dadosCep.logradouro ?? ''} value={dadosCep.logradouro} required/></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-3"><input className="form-control" type="tel" autoComplete="on" name="numero" placeholder="Número*" required/></div>
                                            <div className="mb-3 col-sm-9"><input className="form-control" type="text" autoComplete="on" name="complemento" placeholder="Complemento (Opcional)" /></div>
                                        </div>
                                        <div className="row gx-2">
                                            <div className="mb-3 col-sm-12"><input className="form-control" type="text" autoComplete="on" name="obs" placeholder="Ponto de referença (Opcional)" /></div>
                                        </div>
                                        <div className="mb-3 d-flex align-items-center justify-content-between w100"><Link href="/minha-conta" alt="Perfil">Pular</Link><button className="btn btn-primary d-block" type="submit" name="submit">Cadastrar</button></div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}