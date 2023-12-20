import { useContext, useEffect } from "react"
import { ProdutoContextSlug } from "@/pages/produto/[produto]"
import { BsFillCartPlusFill } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi";
import ProdutoImg from "../../../public/1-3.c61791ccd7918b53df6e.jpg"
import { useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { BiCustomize } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/router";
import { Categoria } from "./Categoria";

export default function Details() {
    const { data } = useContext(ProdutoContextSlug);
    const tags = data.produto.keywords.split(" ");
    const filtered_tags = tags.filter(item => item !== "");
    const [mainImage, setMainImage] = useState({
        src: data.produto.cover
    });

    const [categoria, setCategoria] = useState();

    const router = useRouter();

    const toBRLCurrency = (number) => {
        const formattedNumber = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(number);

        return formattedNumber

    }

    const imgs = data.produto.src_imagens.split(", ");

    const [sizeState, setSizeState] = useState({
        with: 100,
        height: 100,

    });

    useEffect(() => {
        var img = document.getElementById('img');
        //or however you get a handle to the IMG
        var width = img.clientWidth;
        var height = img.clientHeight;

        setSizeState(prevState => ({
            width: width - width * 0.70,
            height: height - width * 0.70
        }))

    }, [])

   
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="router">
                        <Link href="/" alt="Home">Home</Link> &gt;
                        <Link href="/produtos" alt="Home">Produtos</Link>  &gt;
                        <Link href={`/${categoria && categoria.categoria}`} alt="Home">{categoria && categoria.categoria}</Link>  &gt;
                        {categoria && categoria.subCategoria ?
                            <>
                                <Link href={`/${categoria && categoria.subCategoria}`} alt="Home">{categoria && categoria.subCategoria}</Link> &gt;
                            </>
                            : <></>

                        }

                    </div>
                    <div className="row">
                        <div className="mb-4 mb-lg-0 col-lg-6">
                            <div className="img-cssl">
                                <div className="img-carroussel">
                                    {imgs.map((url, index) =>
                                        <Image
                                            onClick={() => setMainImage({ src: url })}
                                            key={index}
                                            src={url}
                                            width={100}
                                            height={100}
                                            alt="product media"
                                            className="imgs-crrs img-fluid"
                                        //style={{}}
                                        />
                                    )}
                                </div>
                                <div>
                                    <Image
                                        id="img"
                                        width={500}
                                        height={500}
                                        src={mainImage.src}
                                        alt={mainImage?.alt ?? "img"}
                                        className=" w-100 h-100 rounded img-fluid"
                                    />
                                </div>
                                {/*   <span className="position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2 badge rounded-pill bg-success">
                                    New
                                </span> */}
                            </div>
                        </div>
                        <div className="resp_divd-flex flex-column justify-content-between col-lg-6">
                            <h5>{data.produto.nome}</h5>
                            {categoria &&
                                <Categoria id={data.produto.id} categoria={data.categoria.categoria} />

                            }
                            <div className="fs--2 mb-3 d-inline-block">
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
                                {/*                                 <span className="ms-1 text-600">(6)</span>
 */}                            </div>
                            <p className="fs--1">
                                {data.produto.descricao}
                            </p>
                            <h4 className="d-flex align-items-center">
                                <span className="text-warning me-2">{toBRLCurrency(data.estoque.preco_vendido)}</span>
                                <span className="me-1 fs--1 text-500">
                                    {/*  <del className="me-1">{toBRLCurrency(data.preco_vendido)}</del> */}
                                    {/* <strong>-50%</strong> */}
                                </span>
                            </h4>
                            {/*   <p className="fs--1 mb-1">
                                <span>Shipping Cost:</span>
                                <strong> $20</strong>
                            </p> */}
                            <p className="fs--1">
                                Estoque: <strong className="text-success">Disponível</strong>
                            </p>
                            <p className="fs--1 mb-3">
                                Tags:
                                {filtered_tags !== null && filtered_tags.map((item, key) =>
                                    <a
                                        key={key}
                                        className="ms-2"
                                        href={`/categoria/${item}`}
                                    >
                                        {item},
                                    </a>

                                )}
                            </p>
                            <div className="row details">
                                <div className="comprar px-x px-md-3 col-auto">
                                    <button
                                        onClick={() => {
                                            localStorage.setItem("stickerToCustomize", data.produto.cover)
                                            localStorage.removeItem("is_editing_now")
                                            router.push({
                                                pathname: "/editor",
                                                query: {
                                                    "sticker_url": data.produto.cover
                                                }
                                            })
                                        }}
                                        type="button"
                                        className="">
                                        <BiCustomize className="mx-2" />
                                        <span
                                            className="d-sm-inline-block ml-4">
                                            Customize este produto
                                        </span>
                                    </button>
                                </div>
                                <div className="comprar px-x px-md-3 col-auto">
                                    <button>
                                        <HiOutlineShoppingBag className="mx-2" />
                                        <span className="d-sm-inline-block ml-4">Adicionar ao carrinho</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="mt-4">
                                <div className="nav nav-tabs" role="tablist">
                                    <div className="nav-item">
                                        <a
                                            role="tab"
                                            data-rr-ui-event-key="description"
                                            id="react-aria4189177765-32-tab-description"
                                            aria-controls="react-aria4189177765-32-tabpane-description"
                                            aria-selected="true"
                                            className="ps-0 cursor-pointer outline-none nav-link active"
                                            tabIndex={0}
                                            href="#"
                                        >
                                            Descrição
                                        </a>
                                    </div>

                                    {/*  <div className="nav-item">
                                        <a
                                            role="tab"
                                            data-rr-ui-event-key="specifications"
                                            id="react-aria4189177765-32-tab-specifications"
                                            aria-controls="react-aria4189177765-32-tabpane-specifications"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="px-2 px-md-3 cursor-pointer outline-none nav-link"
                                            href="#"
                                        >
                                            Especificações
                                        </a>
                                    </div> */}
                                    {/*  <div className="nav-item">
                                        <a
                                            role="tab"
                                            data-rr-ui-event-key="reviews"
                                            id="react-aria4189177765-32-tab-reviews"
                                            aria-controls="react-aria4189177765-32-tabpane-reviews"
                                            aria-selected="false"
                                            tabIndex={-1}
                                            className="px-2 px-md-3 cursor-pointer outline-none nav-link"
                                            href="#"
                                        >
                                            Reviews
                                        </a>
                                    </div> */}
                                </div>
                                <div className="tab-content">
                                    <div
                                        role="tabpanel"
                                        id="react-aria4189177765-32-tabpane-description"
                                        aria-labelledby="react-aria4189177765-32-tab-description"
                                        className="fade tab-pane active show"
                                    >
                                        <div className="mt-3">
                                            <div className="" dangerouslySetInnerHTML={{ __html: data.produto.long_description }} />
                                        </div>
                                    </div>
                                    {/* <div
                                        role="tabpanel"
                                        id="react-aria4189177765-32-tabpane-specifications"
                                        aria-labelledby="react-aria4189177765-32-tab-specifications"
                                        className="fade tab-pane"
                                    >
                                        <table className="fs--1 mt-3 table">
                                            <tbody>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Processor
                                                    </td>
                                                    <td>2.3GHz quad-core Intel Core i5</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Memory
                                                    </td>
                                                    <td>8GB of 2133MHz LPDDR3 onboard memory</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Brand Name
                                                    </td>
                                                    <td>Apple</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Model
                                                    </td>
                                                    <td>Mac Book Pro</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Display
                                                    </td>
                                                    <td>
                                                        13.3-inch (diagonal) LED-backlit display with IPS
                                                        technology
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Storage
                                                    </td>
                                                    <td>512GB SSD</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Graphics
                                                    </td>
                                                    <td>Intel Iris Plus Graphics 655</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Weight
                                                    </td>
                                                    <td>7.15 pounds</td>
                                                </tr>
                                                <tr>
                                                    <td className="bg-100" style={{ width: "30%" }}>
                                                        Finish
                                                    </td>
                                                    <td>Silver, Space Gray</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div> */}
                                    {/*    <div
                                        role="tabpanel"
                                        id="react-aria4189177765-32-tabpane-reviews"
                                        aria-labelledby="react-aria4189177765-32-tab-reviews"
                                        className="fade tab-pane"
                                    >
                                        <div className="mt-3 row">
                                            <div className="mb-4 mb-lg-0 col-lg-6">
                                                <div>
                                                    <div className="mb-1">
                                                        <span
                                                            style={{ display: "inline-block", direction: "ltr" }}
                                                            className="fs--1"
                                                        >
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
                                                        </span>
                                                        <span className="ms-3 text-dark fw-semi-bold">
                                                            Awesome support, great code 😍
                                                        </span>
                                                    </div>
                                                    <p className="fs--1 mb-2 text-600">
                                                        By Drik Smith • October 14, 2019
                                                    </p>
                                                    <p className="mb-0">
                                                        You shouldn't need to read a review to see how nice and
                                                        polished this theme is. So I'll tell you something you
                                                        won't find in the demo. After the download I had a
                                                        technical question, emailed the team and got a response
                                                        right from the team CEO with helpful advice.
                                                    </p>
                                                    <hr className="my-4" />
                                                </div>
                                                <div>
                                                    <div className="mb-1">
                                                        <span
                                                            style={{ display: "inline-block", direction: "ltr" }}
                                                            className="fs--1"
                                                        >
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
                                                        </span>
                                                        <span className="ms-3 text-dark fw-semi-bold">
                                                            Outstanding Design, Awesome Support
                                                        </span>
                                                    </div>
                                                    <p className="fs--1 mb-2 text-600">
                                                        By Liane • December 14, 2019
                                                    </p>
                                                    <p className="mb-0">
                                                        This really is an amazing template - from the style to
                                                        the font - clean layout. SO worth the money! The demo
                                                        pages show off what Bootstrap 4 can impressively do.
                                                        Great template!! Support response is FAST and the team
                                                        is amazing - communication is important.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="ps-lg-5 col-lg-6">
                                                <form className="">
                                                    <h5 className="mb-3">Write your Review</h5>
                                                    <div className="mb-3">
                                                        <label className="mb-0 form-label">Rating:</label>
                                                        <span
                                                            style={{ display: "inline-block", direction: "ltr" }}
                                                            className="d-block fs-3"
                                                        >
                                                            <span
                                                                style={{
                                                                    cursor: "pointer",
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
                                                            <span
                                                                style={{
                                                                    cursor: "pointer",
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
                                                            <span
                                                                style={{
                                                                    cursor: "pointer",
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
                                                            <span
                                                                style={{
                                                                    cursor: "pointer",
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
                                                            <span
                                                                style={{
                                                                    cursor: "pointer",
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
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Name:</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Email:</label>
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Review:</label>
                                                        <textarea
                                                            rows={3}
                                                            type="text"
                                                            className="form-control"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}