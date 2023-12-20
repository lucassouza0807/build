import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import Footer from "@/components/Footer";
import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdicionarEndreco() {
    const [dadosCep, setDadosCep] = useState()
    const [cliente, setCliente] = useState();
    const router = useRouter();

    const validarCep = async (e) => {
        e.preventDefault();
        let cep = e.target.value;
        if (cep.length > 8) {

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}cep/${cep}`).then((response) => {
                setDadosCep(response.data.data)
            }).catch(error => {
                //console.log(error);

            });
        }


    }

    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0;
        }

        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}pessoa-perfil`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }).then((response) => {
                setCliente(response.data);
            }).catch(error => {
                //console.log(error);
            });
        }
    }, []);
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

        const dadosFormulario = { principal: false, cep: cep, estado: estado, cidade: cidade, bairro: bairro, logradouro: logradouro, numero: numero, complemento: complemento, obs: obs, id_pessoa: cliente.id, responsavel: cliente.nome, identificacao: identificacao };

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}cadastrar-endereco-cliente`, dadosFormulario)
            .then(response => {
                toast.success("Endereço criado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

                router.push("/minha-conta/meus-enderecos");
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
    return (
        <>
            <Head>
                <title>Adicionar endereço</title>
            </Head>
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="row flex-center">

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
                                                <div className="mb-3 col-sm-6"><input className="form-control" type="tel" autoComplete="on" name="cep" placeholder="CEP" maxlength="9" onChange={(e) => { validarCep(e), handleZipCode(e) }} required /></div>
                                            </div>
                                            <div className="row gx-2">
                                                <div className="mb-3 col-sm-6">
                                                    <select className="form-select" id="" name="estado" placeholder="Estado" onChange={() => setDadosCep({})} value={dadosCep && dadosCep.uf}>
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
                                                <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="cidade" placeholder="Cidade" value={dadosCep && dadosCep.localidade} /></div>
                                            </div>
                                            <div className="row gx-2">
                                                <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="bairro" placeholder="Bairro" value={dadosCep && dadosCep.bairro} /></div>
                                                <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="logradouro" placeholder="Endereço" value={dadosCep && dadosCep.logradouro} /></div>
                                            </div>
                                            <div className="row gx-2">
                                                <div className="mb-3 col-sm-3"><input className="form-control" type="tel" autoComplete="on" name="numero" placeholder="Número" /></div>
                                                <div className="mb-3 col-sm-9"><input className="form-control" type="text" autoComplete="on" name="complemento" placeholder="Complemento" /></div>
                                            </div>
                                            <div className="row gx-2">
                                                <div className="mb-3 col-sm-12"><input className="form-control" type="text" autoComplete="on" name="obs" placeholder="Ponto de referença" /></div>
                                            </div>
                                            <div className="mb-3 d-flex align-items-center justify-content-between"><button className="btn btn-primary d-block" type="submit" name="submit">Cadastrar</button></div>
                                        </form>

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

