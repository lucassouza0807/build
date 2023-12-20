import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { ContextHelper } from "@/helpers/contexts";
import { useRouter } from "next/router";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import axios from "axios";

export default function Carrinho({ ...props }) {
    const [validarCupom, setValidarCupom] = useState(false);
    const [validarCep, setValidarCep] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const [carrinho, setCarrinho] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [cupomAplicado, setCupomAplicado] = useState(null);
    const [cuponExiste, setCuponExiste] = useState(null);
    const [token, setToken] = useState();

    //const { dadosPerfil } = props

    const { isChanged, setIsChanged, dadosPerfil } = useContext(ContextHelper);

    const router = useRouter();

    const valorTotalFormatado = () => {
        let total = 0;

        if (carrinho !== null) {
            carrinho.map((item) => {
                total += parseFloat(item.total_preco_itens);
            })
        }

        const formattedNumber = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(total);


        return { formattedNumber, total }
    }

    const cupons = [
        { cupom: "GRUDOU5", desconto: 0.05, is_valid: true },
        { cupom: "GRUDOU10", desconto: 0.10, is_valid: true }

    ];

    const aplicarCupom = (e) => {
        e.preventDefault();
        const app_cupom = document.getElementById("cupom").value;

        for (let index = 0; index < cupons.length; index++) {
            if (app_cupom.toLocaleLowerCase() !== cupons[index].cupom.toLocaleLowerCase()) {
                setCuponExiste(false);
            }

            if (app_cupom.toLocaleLowerCase() == cupons[index].cupom.toLocaleLowerCase()) {
                setCupomAplicado(cupons[index])
                setCuponExiste(true)
                break;
            }
        }

    }

    const inputCep = (e) => {
        e.preventDefault();
        let dado = e.target
        //console.log("CEP: " + dado.cep.value)
    }

    const agregarProduto = (produto) => {
        const index = carrinho.findIndex(item => item.id === produto.id);
        if (index !== -1) {
            const novoCarrinho = [...carrinho];
            novoCarrinho[index].quantidade++;
            setCarrinho(novoCarrinho);
        }
    };
    const removerProduto = (id) => {
        const itens_carrinho = JSON.parse(localStorage.getItem("itens_carrinho"))

        const remove = itens_carrinho.filter(index => index !== id);

        localStorage.setItem("itens_carrinho", JSON.stringify(remove));

        setIsChanged(!isChanged);

    };

    const decrementValue = (id) => {

        const index = carrinho.findIndex(item => item.produto.id == id);

        setCarrinho(prevState => {
            return prevState.map(item => {
                if (item.produto.id == id) {
                    const qtd = item.quantidade - 1;
                    const preco_total = item.estoque.preco_vendido * qtd;

                    //itens_carrinho[index] = { ...item, quantidade: qtd, total_preco_itens: preco_total }

                    //localStorage.setItem("itens_carrinho", JSON.stringify(itens_carrinho))

                    return { ...item, quantidade: qtd, total_preco_itens: preco_total.toFixed(2) }
                }

                return item
            })
        })
    };

    const incrementValue = (id) => {
        const index = carrinho.findIndex(item => item.produto.id === id);


        setCarrinho(prevState => {
            return prevState.map(item => {
                if (item.produto.id == id) {
                    const qtd = item.quantidade + 1;
                    const preco_total = item.estoque.preco_vendido * qtd;

                    //itens_carrinho[index] = { ...item, quantidade: qtd, total_preco_itens: preco_total }

                    //localStorage.setItem("itens_carrinho", JSON.stringify(itens_carrinho))

                    return { ...item, quantidade: qtd, total_preco_itens: preco_total.toFixed(2) }
                }

                return item
            })
        })
    };


    useEffect(() => {
        const itens_carrinho = localStorage.getItem("itens_carrinho")

        if (itens_carrinho) {
            const carrinho = { itens_carrinho: itens_carrinho }

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}itens-carrinho`, carrinho)
                .then((response) => {
                    const data = []
                    response.data.map((item) => {
                        const ad_data = {
                            total_preco_itens: item.estoque.preco_vendido,
                            quantidade: 1
                        }

                        data.push({ ...ad_data, ...item })
                    })

                    setCarrinho(data)
                })
                .catch((error) => {
                    //console.log(error.response.data)
                })

        }

    }, [isChanged])

    const toBRLCurrency = (number) => {
        const formattedNumber = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(number);

        return formattedNumber

    }

    if (!carrinho || carrinho.length == 0) {
        return (
            <>
                <main className="main">
                    <div className="container n-cart pt-8 d-flex">

                        <div>
                            <b>O seu carrinho está vazio.</b>
                        </div>
                        <button className="ctn_compra" onClick={() => router.push("/produtos")}>
                            <span style={{ margin: "10px" }}>
                                <FaShoppingCart />
                            </span>
                            <span>
                                CRIAR UMA ARTE
                            </span>
                        </button>
                    </div>
                </main>
            </>
        )
    }
    const validar = async () => {
        const { total } = valorTotalFormatado()
                
        if (!dadosPerfil) {
            router.push({
                pathname: "/login",
                query: {
                    callback: "/finalizar"
                }
            })
            
            return 0;
        }
        
        const pedidoData = {
            "id_pessoa": dadosPerfil.id,
            "id_cliente": dadosPerfil.id,
            "vencimento": null, //inserir no chekout
            //"id_op_frete": null, //inseriri no checkout
            //"id_op_pagto": null, //inserir no checkout
            //"id_endereco": null, //inserir no checkout
            "custo_total": total.toFixed(2),
            "itens": [...carrinho]
        }
        localStorage.setItem("itens_pedido", JSON.stringify(pedidoData))
        router.push("/finalizar")
    }


    return (
        <>
            <div className="container pt-7 mb-10">
                <div className="card">
                    <div className="card-header">
                        <div className="justify-content-between row">
                            {carrinho &&
                                <div className="col-md-auto">
                                    <h5 className="mb-3 mb-md-0">Carrinho de compra ({carrinho.length} Itens)</h5>
                                </div>

                            }

                            <div className="col-md-auto">
                                <Link alt="continuar comprando" role="button" tabIndex="0" href="/" className="border-300 me-2 btn btn-outline-secondary btn-sm">
                                    Continuar Comprando
                                </Link>
                                <Link alt="finalizar" role="button" tabIndex="0" href="" className="btn btn-primary btn-sm">
                                    Finalizar
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="p-0 card-body">
                        <div className="gx-card mx-0 bg-200 text-900 fs--1 fw-semi-bold row">
                            <div className="py-2 col-md-8 col-9">
                                Produto
                            </div>
                            <div className="col-md-4 col-3">
                                <div className="row">
                                    <div className="py-2 d-none d-md-block text-center col-md-8">
                                        Quantidade
                                    </div>
                                    <div className="text-end py-2 col-md-4 col-12">
                                        Preço
                                    </div>
                                </div>
                            </div>
                        </div>
                        {carrinho && carrinho.map((produtoCarrinho, index) => {
                            //console.log(produtoCarrinho)
                            return (
                                <div key={index} className="gx-card mx-0 align-Itens-center border-bottom border-200 row">
                                    <div className="py-3 col-8">
                                        <div className="d-flex align-Itens-center">
                                            <a href="/e-commerce/product/product-details">
                                                <Image
                                                    src={produtoCarrinho.produto.cover}
                                                    width={100}
                                                    height={100}
                                                    className="img-fluid rounded-1 me-3 d-none d-md-block" 
                                                    />
                                            </a>
                                            <div className="flex-1">
                                                <h5 className="fs-0">
                                                    <a className="text-900" href="/e-commerce/product/product-details">
                                                        {produtoCarrinho.produto.nome}
                                                    </a>
                                                </h5>
                                                <div className="del fs--2 fs-md--1">
                                                    <button type="button" className="text-danger fs--2 fs-md--1 fw-normal p-0 btn btn-link btn-sm" onClick={() => removerProduto(produtoCarrinho.produto.id)}>
                                                        <BiSolidTrashAlt className="lixo" />
                                                        <span>
                                                            Remover
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-3 col-4">
                                        <div className="align-Itens-center row">
                                            <div className="d-flex justify-content-end justify-content-md-center col-md-8 order-md-0 order-1">
                                                <div>
                                                    <div className="input-group input-group-sm">
                                                        {carrinho && produtoCarrinho.quantidade > 1 &&
                                                            <>
                                                                <button type="button" className="px-2 border-300 btn btn-outline-secondary btn-sm" onClick={(e) => decrementValue(produtoCarrinho.produto.id)}>-</button>
                                                            </>
                                                        }
                                                        <input min="1" type="number" className="text-center px-2 input-spin-none form-control" onChange={(e) => atualizarQuantidade(produtoCarrinho, e.target.value)} value={produtoCarrinho.quantidade} readOnly style={{ width: "50px" }} />
                                                        <button type="button" className="px-2 border-300 btn btn-outline-secondary btn-sm" onClick={(e) => incrementValue(produtoCarrinho.produto.id)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end ps-0 mb-2 mb-md-0 text-600 col-md-4 order-md-1 order-0">
                                                {toBRLCurrency(produtoCarrinho.estoque.preco_vendido)}
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                        })}
                        <div className="fw-bold gx-card mx-0 row">
                            <div className="py-2 text-end text-900 col-md-8 col-9">Total</div>
                            <div className="px-0 col">
                                <div className="gx-card mx-0 row">
                                    <div className="py-2 d-none d-md-block text-center col-md-7">{carrinho && carrinho.length} (Itens)
                                    </div>
                                    <div className="text-end py-2 text-nowrap px-x1 col-md-5 col-12">{valorTotalFormatado().formattedNumber}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="f bg-light d-flex justify-content-end card-footer">
                        <div className="checkout btn btn-primary btn-sm" onClick={validar}>Finalizar</div></div>

                </div>
            </div>
        </>
    )

}