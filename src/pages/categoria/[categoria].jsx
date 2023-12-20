import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import ProdutosIndex from "@/components/Produtos/ProdutosIndex";
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Form, Card, Modal, Row, Dropdown, Accordion } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import numeral from 'numeral';
import { toBRLCurrency } from "@/components/Editor/control";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { ProductContext } from "../produtos";
import { MenuLateral } from "../produtos";


export default function Categoria({ ...props }) {
    //const [currentPage, setCurrentPage] = useState(0);
    const { results } = props;
    const router = useRouter();
    const [perPage, setPerPage] = useState(10);

    const { links, current_page, data, last_page, total } = results.dados;
    const { range } = results

    return (
        <>
            <Head>
                <title>Lista de artes</title>
            </Head>
            <ProductContext.Provider value={{ links, current_page, data, last_page, total, range, setPerPage, perPage }} >
                <Menu />
                <main className="main">
                    <div className="pt-7">
                        <div className="index-products">
                            <div className="card menu-lat">
                                <MenuLateral />
                            </div>
                            <ProdutosIndex />
                        </div>
                    </div>
                </main>
                <Footer />
            </ProductContext.Provider>
        </>

    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { filtros, per_page, page, categoria } = query
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/catalogo-estoque?per_page=${per_page}&page=${page}&categoria=${categoria}`);
    const data = await res.json();

    return {
        props: {
            results: data,
            d: query

        }
    }
} 