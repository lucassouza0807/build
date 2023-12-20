import ProdutoImg from "../../../public/1-3.c61791ccd7918b53df6e.jpg"
import Image from "next/image"
import Link from "next/link"
import { AiFillHeart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoBagAddOutline } from "react-icons/io"
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { ProductContext } from "@/pages/produtos";
import { ContextHelper } from "@/helpers/contexts";
import axios from "axios";
import { Categoria } from "./Categoria";
import { toBRLCurrency } from "../Editor/control";

export default function ProdutosIndex(props) {
    const [isFavorite, setIsFavorite] = useState({ id: "", value: false })
    const [favorites, setFavorites] = useState(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [produto, setProduto] = useState([])
    const [order, setOrder] = useState();

    const { data, current_page, links, last_page, setPerPage, perPage } = useContext(ProductContext);
    const { isChanged, setIsChanged } = useContext(ContextHelper);

    const router = useRouter();
    const { query } = router;

    const handleFavorite = (id) => {
        const favoritos = [];

        if (localStorage.getItem("favoritos")) {
            let f = JSON.parse(localStorage.getItem("favoritos"));

            let index = f.indexOf(id);

            if (f.includes(id)) {
                if (index !== -1) {
                    f.splice(index, 1);

                    localStorage.setItem("favoritos", JSON.stringify(f));

                    setIsChanged(!isChanged);

                    return 0;
                }
            }

            f.push(id);

            const fav = [...new Set(f)];

            localStorage.setItem("favoritos", JSON.stringify(fav));

            setIsChanged(!isChanged)

            return 0;
        }

        favoritos.push(id);

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }

    useEffect(() => {
        if (router.pathname == "/categoria/[categoria]") {
            router.push({
                pathname: `${router.query.categoria}`,
                query: {
                    page: currentPage
                }
            })

            return
        }

        router.push({
            pathname: router.pathname,
            query: {
                page: currentPage
            }
        })
    }, [currentPage])

    const handleCarrinho = (item) => {
        const favoritos = [];

        if (localStorage.getItem("itens_carrinho")) {
            let f = JSON.parse(localStorage.getItem("itens_carrinho"));

            let index = f.indexOf(item.produto.id);

            f.push(item.produto.id);

            const fav = [...new Set(f)];

            localStorage.setItem("itens_carrinho", JSON.stringify(fav));

            setIsChanged(!isChanged)

            return 0;
        }

        favoritos.push(item.produto.id);

        localStorage.setItem("itens_carrinho", JSON.stringify(favoritos));
    }

    useEffect(() => {

        if (localStorage.getItem("favoritos")) {
            setFavorites({ "favoritos": JSON.parse(localStorage.getItem("favoritos")) });
        }

    }, [isChanged])

    const incrementValue = () => {
        const value = parseInt(query.page) || 1;
        const newValue = value + 1;

        router.push({
            pathname: router.pathname,
            query: { ...query, page: newValue },
        });
    };



    const only_pages = links.filter(item => item.url !== null);

    const handleOrder = (order) => {
        setOrder(order)
        if (order == "z-a") {
            data.sort((a, b) => {
                const nameA = a.produto.nome.toLowerCase();
                const nameB = b.produto.nome.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });

            data.reverse()
        }

        if (order == "a-z") {
            data.sort((a, b) => {
                const nameA = a.produto.nome.toLowerCase();
                const nameB = b.produto.nome.toLowerCase();

                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });

        }

        if (order == "price_cresc") {
            data.sort((a, b) => a.estoque.preco_vendido - b.estoque.preco_vendido)
            //data.reverse()
        }

        if (order == "price_desc") {
            data.sort((a, b) => a.estoque.preco_vendido - b.estoque.preco_vendido)
            data.reverse()
        }

    }

    return (
        <>
            <div className="container-fluid">

                <div className="content">

                    <div className="mb-3 card">
                        <div className="card-body">
                            <div className="flex-between-center row">
                                <div className="d-flex align-items-center mb-2 mb-sm-0 col-sm-auto">
                                    <select
                                        onClick={(e) => setPerPage(e.target.value)}
                                        className="form-select form-select-sm"
                                        style={{ maxWidth: "4.875rem" }}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <h6 className="mb-0 ms-2">Mostrando 1-6 of 9 Produtos</h6>
                                </div>
                                <div className="col-sm-auto">
                                    <div className="gx-2 align-items-center row">
                                        <div className="col-auto">
                                            <div className="gx-2 row">
                                                <div className="col-auto">
                                                    <small>Ordenar por:</small>
                                                </div>
                                                <div className="col-auto">
                                                    <div className="input-group input-group-sm">
                                                        <select onClick={(e) => handleOrder(e.target.value)} className="pe-5 form-select">
                                                            <option value="price_cresc">
                                                                Preço crescente
                                                            </option>
                                                            <option value="price_desc">Preço decrescente</option>
                                                            <option value="a-z">A-Z</option>
                                                            <option value="z-a">Z-A</option>
                                                        </select>
                                                        <button
                                                            type="button"
                                                            className="border border-300 text-700 input-group-text btn btn-link"
                                                        >
                                                            <svg
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                data-prefix="fas"
                                                                data-icon="sort-amount-up"
                                                                className="svg-inline--fa fa-sort-amount-up fa-w-16 "
                                                                role="img"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 512 512"
                                                            >
                                                                <path
                                                                    fill="currentColor"
                                                                    d="M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pe-0 col-auto">
                                            <Link
                                                className="text-600 px-1"
                                                href="/e-commerce/product/product-list"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    data-prefix="fas"
                                                    data-icon="list-ul"
                                                    className="svg-inline--fa fa-list-ul fa-w-16 "
                                                    role="img"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 512 512"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card prod">
                        <div className="pb-0 card-body">
                            <div className="row">
                                {data.map((item, key) => {
                                    return (
                                        <div key={key} index={0} className="mb-4 col-lg-3 col-md-6">
                                            <div className="d-flex flex-column justify-content-between border rounded-1 h-100 pb-3">
                                                <div className="overflow-hidden">
                                                    <div className="position-relative rounded-top overflow-hidden">
                                                        <Link
                                                            className="d-block h-sm-100"
                                                            href={`/produto/${item.produto.url}`}
                                                        >
                                                            <Image
                                                                src={item.produto.cover}
                                                                alt={item.produto.nome}
                                                                width={500}
                                                                height={500}
        
                                                                quality={100}
                                                                loading="lazy"
                                                                className="h-100 w-100 fit-cover rounded-top"
                                                            />
                                                        </Link>
                                                        {/*  <span className="position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2 badge rounded-pill bg-success">
                                                        New
                                                    </span> */}
                                                    </div>
                                                    <div className="p-3">
                                                        <h5 className="fs-0">

                                                            <Link
                                                                className="text-dark"
                                                                href={"produto"}
                                                            >
                                                                {item.produto.nome}
                                                            </Link>
                                                        </h5>
                                                        <p className="fs--1 mb-3">
                                                            <Categoria
                                                                items={item}
                                                                
                                                            />

                                                        </p>
                                                        <h5 className="fs-md-2 text-warning mb-0 d-flex align-items-center mb-3">
                                                            {toBRLCurrency(item.estoque.preco_vendido).formattedNumber}
                                                            <del className="ms-2 fs--1 text-500">{toBRLCurrency(item.estoque.preco_compra).formattedNumber}</del>
                                                        </h5>

                                                        <p className="fs--1 mb-1">
                                                            Estoque: <strong className="text-success">Disponivel</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center px-3">
                                                    {/*   <div className="flex-1">
                                                    <span style={{ display: "inline-block", direction: "ltr" }}>
                                                        <span
                                                            style={{
                                                                cursor: "inherit",
                                                                display: "inline-block",
                                                                position: "relative"
                                                            }}
                                                        >
                                                            <span style={{ visibility: "hidden" }}>
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-300"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    position: "absolute",
                                                                    overflow: "hidden",
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: "100%"
                                                                }}
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-warning"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        <span
                                                            style={{
                                                                cursor: "inherit",
                                                                display: "inline-block",
                                                                position: "relative"
                                                            }}
                                                        >
                                                            <span style={{ visibility: "hidden" }}>
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-300"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    position: "absolute",
                                                                    overflow: "hidden",
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: "100%"
                                                                }}
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-warning"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        <span
                                                            style={{
                                                                cursor: "inherit",
                                                                display: "inline-block",
                                                                position: "relative"
                                                            }}
                                                        >
                                                            <span style={{ visibility: "hidden" }}>
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-300"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    position: "absolute",
                                                                    overflow: "hidden",
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: "100%"
                                                                }}
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-warning"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        <span
                                                            style={{
                                                                cursor: "inherit",
                                                                display: "inline-block",
                                                                position: "relative"
                                                            }}
                                                        >
                                                            <span>
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-300"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    position: "absolute",
                                                                    overflow: "hidden",
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: "50%"
                                                                }}
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-warning"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        <span
                                                            style={{
                                                                cursor: "inherit",
                                                                display: "inline-block",
                                                                position: "relative"
                                                            }}
                                                        >
                                                            <span>
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-300"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                            <span
                                                                style={{
                                                                    display: "inline-block",
                                                                    position: "absolute",
                                                                    overflow: "hidden",
                                                                    top: 0,
                                                                    left: 0,
                                                                    width: "0%"
                                                                }}
                                                            >
                                                                <svg
                                                                    aria-hidden="true"
                                                                    focusable="false"
                                                                    data-prefix="fas"
                                                                    data-icon="star"
                                                                    className="svg-inline--fa fa-star fa-w-18 text-warning"
                                                                    role="img"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                >
                                                                    <path
                                                                        fill="currentColor"
                                                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span className="ms-1">(6)</span>
                                                </div> */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleFavorite(item.id)}
                                                        className="me-2 btn btn-falcon-default btn-sm"
                                                    >
                                                        {favorites && favorites.favoritos.includes(item.id) ? (<AiFillHeart style={{ color: "red" }} />) : (<AiOutlineHeart />)}
                                                    </button>
                                                    <button onClick={() => handleCarrinho(item)} type="button" className="btn btn-falcon-default btn-sm">
                                                        <HiOutlineShoppingBag />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="d-flex justify-content-center bg-light mt-n1 card-footer">
                            {/* <div>
                                <button
                                    onClick={decrementValue}
                                    type="button"
                                    disabled=""
                                    trigger="focus"
                                    className={`me-2 btn btn-falcon-default btn-sm${query.page <= 1 ? " d-none" : ""}`}
                                >

                                    <AiOutlineLeft />
                                </button>
                            </div> */}
                            <ul className="pagination mb-0">
                                {only_pages.map((item, key) =>
                                    <li key={key} className="active" onClick={() => setCurrentPage(prevState => item.label)}>

                                        <button
                                            type="button"
                                            className="page me-2 btn btn-falcon-default btn-sm"
                                        >
                                            {item.label}
                                        </button>
                                    </li>

                                )}
                            </ul>
                            {/*  <div>
                                <button
                                    onClick={incrementValue}
                                    type="button"
                                    trigger="focus"
                                    className={`btn btn-falcon-default btn-sm ${query.page == last_page ? " d-none" : ""}`}
                                >

                                    <AiOutlineRight />
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {

    return {
        props: {
            nome: "lucas"
        }
    }
}