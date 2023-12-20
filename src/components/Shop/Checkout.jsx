import { useState, useEffect, useContext, useRef, createContext } from "react";
import { Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import { createRoot } from 'react-dom/client';
import { zipCodeMask } from "@/helpers/validacao";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextHelper } from "@/helpers/contexts";
import Image from "next/image";
import boleto from "../../../public/boleto.png";
import paypal from "../../../public/paypal.png";
import mercado_pago from "../../../public/mercado-pago.png"
import pix from "../../../public/pix.png";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
//import { PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toBRLCurrency } from "@/helpers/preco";
import { v4 as uuidv4 } from 'uuid';
import ReactDOM from 'react-dom';
import { showAprovedPayment } from "../MercadoPago/PagamentoStatus";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { loadScript } from "@paypal/paypal-js";
import { useRouter } from "next/router";

import MercadoPago, { clearElement, initMP } from "../MercadoPago/MercadoPago";

export default function Checkout() {
    //Verifica se se está logado
    const { dadosPerfil } = useContext(ContextHelper);

    const router = useRouter();
    
    useEffect(() => {
        loadScript({ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID })

            .then((paypal) => {
                return (
                    <PayPalScriptProvider
                        options={{
                            //ammount: 500,
                            currency: "BRL",
                            components: 'buttons',
                            intent: "capture",
                            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
                        }}>
                        <ButtonWrapper />
                    </PayPalScriptProvider>
                )


            })

            .catch((err) => {

                console.error("failed to load the PayPal JS SDK script", err);

            });
    }, [])

    const [showStatusPagamento, setShowStatusPagamento] = useState(null);
    const [scroll, setScroll] = useState(null);
    const [showServiceStatus, setShowServiceStatus] = useState(null)
    const [mpIsAproved, setMpIsAproved] = useState(null);
    const [mercadoPago, setMercadoPago] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [tipoPagamento, setTipoPagamento] = useState();
    const [modalPix, setModalPix] = useState(false);
    const [modalMercadoPago, setModalMercadoPago] = useState(false);
    const [modalBoleto, setModalBoleto] = useState(false);
    const [modalPaypal, setModalPaypal] = useState(false);
    const [modalEndereco, setModalEndereco] = useState(false);
    const [dadosCep, setDadosCep] = useState();
    const [qrCode, setQRCode] = useState();
    const [frete, setFrete] = useState();
    const [pagamentos, setPagamentos] = useState(false);
    const [enderecoData, setEnderecoData] = useState({});
    const [enderecoSelecionado, setEnderecoSelecionado] = useState()
    const [change, setChange] = useState(false);
    const [pixKey, setPixKey] = useState()
    const [boletoData, setBoletoData] = useState()
    const [itensPedido, setItensPedido] = useState()
    const [custoFrete, setCustoFrete] = useState(null);
    const [codigoPagmentoMP, setCofigoPagamentoMP] = useState()
    const [infoPedido, setInfoPedido] = useState();
    const [showPaymentStatus, setShowPaymentStatus] = useState(false);
    const [cotacaoFrete, setCotacaoFrete] = useState();


    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://sdk.mercadopago.com/js/v2"
        script.type = "module"

    }, [])



    function getCookie(name) {
        const cookies = document.cookie.split('; ');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');

            if (cookieName === name) {
                return cookieValue;
            }
        }

        return null;
    }

    const clearCart = () => {
        localStorage.removeItem("itens_carrinho");
        localStorage.removeItem("itens_carrinho");
    }

    function setCookie(name, value, secondsToExpire) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + secondsToExpire * 1000);

        const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;

        document.cookie = cookieString;
    }

    // Example of setting a cookie with name "user" and value "JohnDoe" that expires in 3600 seconds (1 hour)

    /* useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`
        script.type = "module";

    }, []) */

    //fretex=
    useEffect(() => {
        if (frete) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}endereco/${frete}`)
                .then(async (response) => {
                    setEnderecoSelecionado(response.data)
                    let w = 0;
                    itensPedido.itens.map((item) => {
                        w = w + (item.produto.peso) * item.quantidade
                    })

                    //console.log(response.data)
                    const package_dimensions = {
                        from: "05001000",
                        to: response.data.cep,
                        height: 5,
                        width: 5,
                        length: 18,
                        weight: w,
                        options: {
                            insurance_value: 1//itensPedido.custo_total
                        }
                    }

                    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}frete/melhor-envio`, package_dimensions)
                        .then((response) => {


                            const no_errors = response.data.data.filter(el => el.error == null)

                            setCotacaoFrete(prevState => no_errors)
                            //

                        })
                        .catch((error) => {
                        })

                })
                .catch((error) => {
                })
        }
    }, [frete, custoFrete])

    useEffect(() => {
        const itens_pedido = JSON.parse(localStorage.getItem("itens_pedido"));
        const mp_c = document.getElementById("mp_container");

        setItensPedido(prevStatte => itens_pedido);

    }, [])

    const createOrder = async (data, actions) => {
        const total = (Number(itensPedido.custo_total) + Number(custoFrete)).toFixed(2)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: `${total}`,
                    },
                },
            ],
        })
        /*  return fetch(`${process.env.NEXT_PUBLIC_API_URL}criar-pedido`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             // use the "body" param to optionally pass additional order information
             // like product ids and quantities
             body: JSON.stringify({
                 cart: [
                     {
                         id: itensPedido.id,
                         quantity: itensPedido.qtd
                     },
                 ],
             }),
         })
             .then((response) => response.json())
             .then((order) => order.id); */
    };

    const onApprove = (data) => {
        /*         console.log(data)
         */        /* return fetch("/my-server/capture-paypal-order", {
method: "POST",
headers: {
  "Content-Type": "application/json",
},
body: JSON.stringify({
  orderID: data.orderID
})
})
.then((response) => response.json())
.then((orderData) => {
  const name = orderData.payer.name.given_name;
  alert(`Transaction completed by ${name}`);
}); */
    };

    const ButtonWrapper = ({ showSpinner }) => {

        const [{ isPending }, dispatch] = usePayPalScriptReducer();

        return (
            <>
                {(showSpinner && isPending) && <div className="spinner" />}
                <PayPalButtons
                    //style={style}
                    disabled={false}
                    //forceReRender={[style]}
                    fundingSource={undefined}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </>
        );
    }
    useEffect(() => {

        if (dadosPerfil) {
            enderecoDados(dadosPerfil.id).then((data) => {
                setEnderecoData(data);
            }).catch((error) => { } /* console.log(error.response) */);
        }
    }, [dadosPerfil, change]);

    const pagamento = async () => {
        setIsLoading(prevState => true);
        const document_number = dadosPerfil.cpfcnpj.replace(/[./-]/g, '');

        let today = new Date();

        let twoDaysLater = new Date();
        twoDaysLater.setDate(today.getDate() + 2);

        let sumOfDates = new Date(today.getTime() + twoDaysLater.getTime());

        let formattedResult = sumOfDates.toISOString().split('T')[0];

        const endereco_id = Number(enderecoSelecionado.id);

        if (tipoPagamento == undefined || tipoPagamento == '' || tipoPagamento == null) {
            toast.error("Selecione um tipo de pagamento", {
                theme: "light",
                position: "bottom-right"
            });
        }

        const total_com_preco = String(toBRLCurrency(itensPedido.custo_total, custoFrete).raw_price.toFixed(2)).replace(".", "").replace(",", "");

        switch (tipoPagamento) {
            case 'mercado-pago':
                const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO, {
                    locale: "pt-BR",
                });

                const bricksBuilder = mp.bricks();

                const renderCardPaymentBrick = async (bricksBuilder) => {
                    const settings = {
                        initialization: {
                            amount: (Number(itensPedido.custo_total) + Number(custoFrete)), // valor total a ser pago
                            payer: {
                                email: dadosPerfil.email,
                            },
                        },
                        customization: {
                            visual: {
                                style: {
                                    customVariables: {
                                        theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
                                    }
                                }
                            },
                            paymentMethods: {
                                maxInstallments: 6, //Pode ser mais
                            }
                        },
                        callbacks: {
                            onReady: () => {
                                setIsLoading(prevState => false);
                            },
                            onSubmit: (cardFormData) => {
                                //  callback chamado o usuário clicar no botão de submissão dos dados
                                //  exemplo de envio dos dados coletados pelo Brick para seu servidor

                                return new Promise((resolve, reject) => {
                                    axios.post(`${process.env.NEXT_PUBLIC_API_URL}mp/proccess-payment`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(cardFormData)
                                    })
                                        .then(async (response) => {
                                            showAprovedPayment(response.data.payment_id.id)
                                            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}criar-pedido`,
                                                {
                                                    ...itensPedido,
                                                    id_endereco: enderecoSelecionado.id,
                                                    id_op_frete: 1,//mock
                                                    id_op_pagto: 1, //mock
                                                    forma_pgmt: "CARTAO/MERCADO-PAGO",
                                                    vencimento: twoDaysLater.toISOString().split('T')[0],
                                                    codigo_frete: uuidv4(),
                                                    codigo_pagamento: response.data.payment_id.id
                                                })
                                                .then((response) => {
                                                    setModalMercadoPago(false)
                                                    clearElement()
                                                    setMpIsAproved(prevState => true)
                                                    setShowPaymentStatus(prevstate => true)
                                                    clearCart();
                                                    resolve()
                                                })
                                                .catch((error) => {
                                                    console.log(error.response)
                                                    reject()
/*                                                     console.log(error.response)
 */                                                })

                                            //resolve();
                                        })
                                        .catch((error) => {
                                            reject();
                                        })
                                });
                            },
                            onError: (error) => {
                                // callback chamado para todos os casos de erro do Brick
                            },
                        },
                    };
                    window.cardPaymentBrickController = await bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
                };

                renderCardPaymentBrick(bricksBuilder);
                setModalMercadoPago(true);
                break;
            case 'pix':
                //const total_com_preco = String(toBRLCurrency(itensPedido.custo_total, custoFrete).raw_price.toFixed(2)).replace(".", "").replace(",", "");
                const dadosPix = {
                    "customer": {
                        "name": dadosPerfil.nome,
                        "email": dadosPerfil.email,
                        "document": {
                            "identity": document_number,
                            "type": document_number.length <= 11 ? "CPF" : "CNPJ"
                        },
                        "address": {
                            "street": enderecoSelecionado.logradouro,
                            "number": enderecoSelecionado.numero,
                            "district": enderecoSelecionado.bairro,
                            "city": enderecoSelecionado.cidade,
                            "state": enderecoSelecionado.estado,
                            "complement": enderecoSelecionado.complemento,
                            "zip_code": enderecoSelecionado.cep
                        }
                    },
                    "payment_terms": {
                        "due_date": twoDaysLater.toISOString().split('T')[0],
                        "fine": {
                            "amount": 3,
                            "percent": 0.1
                        }

                    },
                    "payment_forms": [
                        "PIX"
                    ],
                    "services": [
                        {
                            "name": "Vendas de produtos",
                            "description": "Venda divesas",
                            "amount": Number(total_com_preco)
                        }
                    ]

                }

                axios.post(`${process.env.NEXT_PUBLIC_API_URL}pix`, dadosPix)
                    .then(async (response) => {
                        setPixKey(response.data)
                        setIsLoading(prevState => false)
                        setBoletoData(response.data)

                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}criar-pedido`,
                            {
                                ...itensPedido,
                                id_endereco: enderecoSelecionado.id,
                                id_op_frete: 1,//mock
                                id_op_pagto: 1, //mock
                                forma_pgmt: "PIX",
                                vencimento: twoDaysLater.toISOString().split('T')[0],
                                codigo_frete: uuidv4(),
                                codigo_pagamento: response.data.id
                            })
                            .then((response) => {
                                setInfoPedido(response.data)
                                clearCart()
                                setShowPaymentStatus(prevState => "pix")
                                useEffect(() => {
                                    window.scrollTo(0, 0)

                                }, [])
                            })
                            .catch((error) => {
                                //console.log(error)
                            })

                    })
                    .catch((error) => {
                        setIsLoading(prevState => false)
                    })
                //setModalPix(true);
                break;
            case 'boleto':

                const dadosBoleto = {
                    "customer": {
                        "name": dadosPerfil.nome,
                        "email": dadosPerfil.email,
                        "document": {
                            "identity": document_number,
                            "type": document_number.length <= 11 ? "CPF" : "CNPJ"
                        },
                        "address": {
                            "street": enderecoSelecionado.logradouro,
                            "number": enderecoSelecionado.numero,
                            "district": enderecoSelecionado.bairro,
                            "city": enderecoSelecionado.cidade,
                            "state": enderecoSelecionado.estado,
                            "complement": enderecoSelecionado.complemento,
                            "zip_code": enderecoSelecionado.cep
                        }
                    },
                    "payment_terms": {
                        "due_date": twoDaysLater.toISOString().split('T')[0],
                        "fine": {
                            "amount": 3,
                            "percent": 0.1
                        }

                    },
                    "payment_forms": [
                        "BANK_SLIP"
                    ],
                    "services": [
                        {
                            "name": "Vendas de produtos",
                            "description": "Venda divesas",
                            "amount": Number(total_com_preco)
                        }
                    ]

                }

                axios.post(`${process.env.NEXT_PUBLIC_API_URL}boleto`, dadosBoleto)
                    .then(async (response) => {
                        setIsLoading(prevState => false)
                        setBoletoData(response.data)

                        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}criar-pedido`,
                            {
                                ...itensPedido,
                                id_endereco: enderecoSelecionado.id,
                                id_op_frete: 1,//mock
                                id_op_pagto: 1, //mock
                                forma_pgmt: "BOLETO",
                                vencimento: twoDaysLater.toISOString().split('T')[0],
                                codigo_frete: uuidv4(),
                                codigo_pagamento: response.data.id
                            })
                            .then((response) => {
                                setInfoPedido(response.data)
                                clearCart()
                                setShowPaymentStatus(prevState => "boleto")
                            })
                            .catch((error) => {
                                //console.log(error.response)
                            })
                        //setModalBoleto(true);

                    })
                    .catch((error) => {
                        setIsLoading(prevState => false)
                    })
                break;
            case 'paypal':
                setModalPaypal(true);
        }
    }


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
    
    const handleZipCode = (event) => {
        let input = event.target
        input.value = zipCodeMask(input.value);
    }

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
        let responsavel = dados.responsavel.value
        const dadosFormulario = { principal: false, cep: cep, estado: estado, cidade: cidade, bairro: bairro, logradouro: logradouro, numero: numero, complemento: complemento, obs: obs, id_pessoa: dadosPerfil.id, responsavel: responsavel, identificacao: identificacao };

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}cadastrar-endereco-cliente`, dadosFormulario)
            .then(response => {
                setModalEndereco(false);
                setChange(true);
                toast.success("Endereço criado com suscesso", {
                    theme: 'light',
                    position: "bottom-right"
                });

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

    const copia = async (key) => {
        try {
            await navigator.clipboard.writeText(key);

            toast.success("Chave PIX copiado com sucesso", {
                theme: 'light',
                position: "bottom-right"
            });
        } catch (err) {
            alert(err)
            toast.error("Falha ao copiar o PIX", {
                theme: 'light',
                position: "bottom-right"
            });
        }
    }


    if (showStatusPagamento == null) {
        return (
            <>
                {showPaymentStatus == false &&
                    <>
                        <div className={`${showPaymentStatus == true ? "d-none" : ""} g-3 row`}>
                            <div className="col-xl-4 order-xl-1">
                                <div className="mb-3 card">
                                    <div className="bg-light btn-reveal-trigger d-flex flex-between-center card-header">
                                        <h5 className="mb-0">Valor total do pedido</h5>
                                    </div>
                                    <div className="card-body">
                                        <table className="fs--1 mb-0 table table-borderless">
                                            <tbody>

                                                {/* total dos produtos */}
                                                <tr className="border-bottom">
                                                    <th className="ps-0">Subtotal</th>
                                                    <th className="pe-0 text-end">{itensPedido ? toBRLCurrency(itensPedido.custo_total).formattedNumber : "..."}</th>
                                                </tr>
                                                {/* preço frete */}
                                                <tr className="border-bottom">
                                                    <th className="ps-0">Frete</th>
                                                    <th className="pe-0 text-end">+{custoFrete ? toBRLCurrency(custoFrete).formattedNumber : toBRLCurrency(0).formattedNumber}</th>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-flex justify-content-between bg-light card-footer">
                                        <div className="fw-semi-bold">Total</div>
                                        <div className="fw-bold">{custoFrete && itensPedido ? toBRLCurrency(itensPedido.custo_total, custoFrete).formattedNumber : "..."}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="mb-3 card">
                                    <div className="bg-light card-header">
                                        <div className="flex-between-center row">
                                            <div className="col-sm-auto">
                                                <h5 className="mb-0">Escolha o endereço</h5>
                                            </div>
                                            <div className="col-sm-auto">
                                                <button type="button" className="btn btn-falcon-default btn-sm" onClick={() => setModalEndereco(!modalEndereco)}>
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14 me-2 me-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ transformOrigin: "0.4375em 0.5em", width: '15px' }}>
                                                        <g transform="translate(224 256)">
                                                            <g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)">
                                                                <path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                                                                    transform="translate(-224 -256)"></path>
                                                            </g>
                                                        </g>
                                                    </svg>Adicionar outro Endereço</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            {enderecoData && enderecoData.enderecos?.map((item, key) => {
                                                if (item.situacao == 'Ativo') {

                                                    return (<div className="mb-3 mb-md-0 col-md-6" key={`endereco-carrinho-${item.id}`}>
                                                        <div className="mb-0 form-check radio-select form-check">
                                                            <input name="clientAddress" type="radio" id={`endereco-carrinho-${item.id}`} className="form-check-input" value={item.id} />
                                                            <label htmlFor={`endereco-carrinho-${item.id}`} className="mb-0 fw-bold d-block form-check-label">
                                                                {item.responsavel}
                                                                <span className="radio-select-content" onClick={() => {
                                                                    setFrete(item.id)

                                                                    //handleShipment(item.id)
                                                                }}/* onClick={() => setFrete(item.id)}  */>
                                                                    <span>
                                                                        <b>Endereço:</b> {item.logradouro}, {item.numero} - {item.complemento} {item.bairro} - {item.cidade}, {item.estado} - CEP: {item.cep}
                                                                        <span className="d-block mb-0 pt-2">
                                                                            <b>Tipo:</b> {item.identificacao[0].toUpperCase() + item.identificacao.substr(1)}
                                                                        </span>

                                                                    </span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>)
                                                }

                                            })}
                                            {enderecoData && enderecoData.quantidade == 0 || enderecoData == null || enderecoData && enderecoData.status == "error" ? (<div className="text-center">Adicione um endereço para continuar com o pedido</div>) : ''}

                                        </div>
                                    </div>
                                </div>
                                {frete && frete >= 1 ? (
                                    <div className="mb-3 card">
                                        <div className="bg-light card-header">
                                            <h5 className="mb-0 d-flex flex-row">Selecione o Frete</h5>
                                            <form>
                                                {cotacaoFrete && cotacaoFrete.map((item, index) => {
                                                    return (
                                                        <div className="shipping-box" key={`company-${item.id}:${index}`}>
                                                            <input onClick={(e) => {
                                                                setCustoFrete(prevState => e.target.value)
                                                                setPagamentos(true)
                                                            }}
                                                                className="" name="op_frete" type="radio" id={item.id} value={item.custom_price} />
                                                            <label className="mb-2 fs-1 form-check-label" htmlFor={item.id}>
                                                                <div className="mx-2 imagem-frete">
                                                                    <div className="logo-frete">
                                                                        <div>
                                                                            <Image
                                                                                src={item.company.picture}
                                                                                alt={item.name}
                                                                                width={50}
                                                                                height={20}
                                                                            />

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    {item.name}
                                                                </div>
                                                                <div>
                                                                    até {item.delivery_time} dias utéis.
                                                                </div>
                                                                <div>
                                                                    {toBRLCurrency(item.custom_price).formattedNumber}
                                                                </div>
                                                            </label>
                                                        </div>

                                                    )

                                                }
                                                    /*    <div key={`frete-${index + Math.random(50)}`} className="card-body">
                                                           <div className="d-flex flex-row fretes">
   
                                                               <div className="m-1 form-check form-check">
                                                                    <Image
                                                                   src={item.company.picture}
                                                                   alt={item.name}
                                                                   width={100}
                                                                   height={50}
                                                               />
                                                                   <input name="frete" type="radio" id="frete" className="form-check-input" onClick={() => {
                                                                       setCustoFrete(prevState => item.custom_price)
                                                                   }} />
                                                                   <label htmlFor="frete" className="mb-2 fs-1 form-check-label">{item.name}</label>
                                                                   <span>Até {item.delivery_time} dias utéis</span>
                                                               </div>
                                                           </div>
                                                       </div>  */

                                                )}
                                            </form>

                                        </div>
                                    </div>
                                ) : ''}
                                {pagamentos && pagamentos == true ? (
                                    <div className="card">
                                        <div className="bg-light card-header">
                                            <h5 className="mb-0">Formas de pagamento</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex pagamentos">

                                                <div className="m-1 form-check form-check">
                                                    <input name="payment-method" type="radio" id="pix" className="form-check-input" onChange={() => setTipoPagamento('pix')} />
                                                    <label htmlFor="pix" className="mb-2 fs-1 form-check-label"><Image width={48} src={pix} alt="Pix" /></label>
                                                </div>
                                                <div className="m-1 form-check form-check">
                                                    <input name="payment-method" type="radio" id="mercado-pago" className="form-check-input" onChange={() => setTipoPagamento('mercado-pago')} />
                                                    <label htmlFor="mercado-pago" className="mb-2 fs-1 form-check-label"><Image width={48} src={mercado_pago} alt="Mercado pago" /></label>
                                                </div>
                                                <div className="m-1 form-check form-check">
                                                    <input name="payment-method" type="radio" id="boleto" className="form-check-input" onChange={() => setTipoPagamento('boleto')} />
                                                    <label htmlFor="boleto" className="mb-2 fs-1 form-check-label"><Image width={48} src={boleto} alt="Boleto" /></label>
                                                </div>
                                                <div className="m-1 form-check form-check">
                                                    <input name="payment-method" type="radio" id="paypal" className="form-check-input" onChange={() => setTipoPagamento('paypal')} />
                                                    <label htmlFor="paypal" className="mb-2 fs-1 form-check-label"><Image width={48} src={paypal} alt="Paypal" /></label>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="ps-xxl-5 text-center text-md-center text-xl-center text-xxl-center col-xxl-5 col-xl-12 col-md-12">
                                                    <div className="border-dashed border-bottom d-block d-md-none d-xl-block d-xxl-none my-4"></div>
                                                    <div className="fs-2 fw-semi-bold">Valor total: <span className="text-primary">{custoFrete && itensPedido ? toBRLCurrency(itensPedido.custo_total, custoFrete).formattedNumber : "..."}</span>
                                                    </div>
                                                    <button type="submit" className="mt-3 px-3 btn btn-success" onClick={pagamento}>{isLoading == false ? "Cofirmar pagamento" : <AiOutlineLoading3Quarters className="spin-loading-pgmt" />}</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ) : ''}
                            </div>
                        </div>
                    </>
                }

                <Modal
                    show={modalPix}
                    onHide={() => setModalPix(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Pagamento no pix</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalMercadoPago}
                    onHide={() => {

                        //window.paymentBrickController = null
                        clearElement();

                        setModalMercadoPago(false)

                    }}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Pagamento em Cartão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {mpIsAproved == null && <MercadoPago />}
                    </Modal.Body>
                </Modal>
                <Modal
                    show={modalBoleto}
                    onHide={() => setModalBoleto(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <div className="text-success d-flex d-flex flex-row align-items-center"><FaCheck className="mx-2" /> PEDIDO REALIZADO COM SUCESSO!</div>
                            <p style={{ fontSize: '14px' }}>Por favor, realize o pagamento</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalPaypal}
                    onHide={() => setModalPaypal(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Paypal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center">
                            {/*    <div id="paypal_container"></div> */}
                            <PayPalScriptProvider
                                options={{
                                    //ammount: 500,
                                    currency: "BRL",
                                    components: 'buttons',
                                    intent: "capture",
                                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
                                }}>
                                <ButtonWrapper showSpinner={true} />
                            </PayPalScriptProvider>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalEndereco}
                    onHide={() => setModalEndereco(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Adicionar Endereço</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center">
                            <form onSubmit={(e) => { enderecoCadastra(e) }}>
                                <div className="row gx-2">
                                    <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="responsavel" placeholder="Digita o nome do responsavel" required /></div>
                                </div>
                                <div className="row gx-2">
                                    <div className="mb-3 col-sm-6">

                                        <select aria-label="Default select example" name="identificacao" className="form-select" required placeholder="Selecione o tipo de endereço"><option value="casa">Casa</option><option value="trabalho">Trabalho</option></select>
                                    </div>
                                    <div className="mb-3 col-sm-6"><input className="form-control" type="tel" autoComplete="on" name="cep" placeholder="Digita o CEP" maxLength="9" onChange={(e) => { validarCep(e), handleZipCode(e) }} required /></div>
                                </div>
                                <div className="row gx-2">
                                    <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="estado" placeholder="Digita o estado" value={dadosCep && dadosCep.uf} /></div>
                                    <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="cidade" placeholder="Digita o cidade" value={dadosCep && dadosCep.localidade} /></div>
                                </div>
                                <div className="row gx-2">
                                    <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="bairro" placeholder="Digita o bairro" value={dadosCep && dadosCep.bairro} /></div>
                                    <div className="mb-3 col-sm-6"><input className="form-control" type="text" autoComplete="on" name="logradouro" placeholder="Digita o endereço" value={dadosCep && dadosCep.logradouro} /></div>
                                </div>
                                <div className="row gx-2">
                                    <div className="mb-3 col-sm-3"><input className="form-control" type="tel" autoComplete="on" name="numero" placeholder="Digita o número" /></div>
                                    <div className="mb-3 col-sm-9"><input className="form-control" type="text" autoComplete="on" name="complemento" placeholder="Complemento" /></div>
                                </div>
                                <div className="row gx-2">
                                    <div className="mb-3 col-sm-12"><input className="form-control" type="text" autoComplete="on" name="obs" placeholder="Ponto de referença" /></div>
                                </div>
                                <div className="mb-3 d-flex align-items-center justify-content-between"><button className="btn btn-primary d-block" type="submit" name="submit">Cadastra o endereço</button></div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className={`${showPaymentStatus == "pix" ? "d-block" : "d-none"} container bg-white w-75`}>
                    <div className="card border-warning mb-3">
                        <div className="card-body text-warning">
                            <h5 className="card-title">Informações importantes</h5>
                            <p className="card-text">O pagamento pode levar 1 hora após o pagamento para ser confirmado</p>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <QRCode value={pixKey ? pixKey.pix.emv : ''} />
                        <span>Pix:</span>
                        <div className="pix d-flex flex-row align-items-center justify-content-between mt-3">
                            <div className="pix-value" id="pix">{pixKey && pixKey.pix.emv}</div>
                        </div>
                        <button className="btn btn-success button-pix m-3" onClick={() => copia(pixKey.pix.emv)}>COPIAR</button>
                    </div>
                </div>
                <div className={`${showPaymentStatus == "boleto" ? "d-block" : "d-none"} container bg-white w-75`}>
                    <div className="d-flex flex-column justify-content-center mb-5">
                        <div className="card border-warning mb-3">
                            <div className="card-body text-warning">
                                <h5 className="card-title">Informações importantes</h5>
                                <p className="card-text">Um email foi enviado com o link do boleto</p>
                            </div>
                        </div>
                        <span className="text-center">O número do pedido</span>
                        <b className="text-center" style={{ fontSize: "2rem", fontWeight: "600" }}>#{infoPedido && infoPedido[0].numero_pedido}</b>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <span className="text-center">Forma de pagamento selecionado</span>
                        <b className="text-center" style={{ fontSize: "2rem", fontWeight: "600" }}>BOLETO</b>
                        <Link href={boletoData ? boletoData.payment_options.bank_slip.url : "#"} alt="boleto" className="btn btn-warning mt-3">IMPRIMIR O BOLETO</Link>
                    </div>

                </div>
                {/* Status mercado pago */}
                <div className={`${showPaymentStatus == true ? "d-block" : "d-block"}`} id="statusScreenBrick_container">
                </div>
                {/* Status cora */}

            </>
        )

    }

}

const enderecoDados = async (clienteInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}enderecos-cliente/${clienteInfo}`)

    const data = await res.json();
    return data;
}