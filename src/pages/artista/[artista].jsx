import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import produtoImage from "../../../public/1-3.c61791ccd7918b53df6e.jpg";
import { HiOutlineShoppingBag, } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ArtistaPerfil(props) {
    const router = useRouter();

    const { data } = props;
    
    const produtos = [
        { id: 1, nome: 'produto1', image: produtoImage, slug: 'produto1' },
        { id: 2, nome: 'produto2', image: produtoImage, slug: 'produto2' },
        { id: 3, nome: 'produto3', image: produtoImage, slug: 'produto3' },
        { id: 4, nome: 'produto4', image: produtoImage, slug: 'produto4' },
        { id: 5, nome: 'produto5', image: produtoImage, slug: 'produto5' },
        { id: 6, nome: 'produto6', image: produtoImage, slug: 'produto6' },
        { id: 7, nome: 'produto7', image: produtoImage, slug: 'produto7' },
        { id: 8, nome: 'produto8', image: produtoImage, slug: 'produto8' },
        { id: 9, nome: 'produto9', image: produtoImage, slug: 'produto9' },
        { id: 10, nome: 'produto10', image: produtoImage, slug: 'produto10' },
        { id: 11, nome: 'produto11', image: produtoImage, slug: 'produto11' },
        { id: 12, nome: 'produto12', image: produtoImage, slug: 'produto12' },
        { id: 13, nome: 'produto13', image: produtoImage, slug: 'produto13' }
    ];
    return (
        <>
            <Head>
                <title>
                   {data.nome}
                </title>
            </Head>
            <Menu />
            <main className="main">
                <div className="container pt-7 mb-7">
                    <div className="perfil-artista-info">
                        <div className="image-artista"><Image src={produtoImage} alt="Artista"/></div>
                        <div className="info-artista">
                            <div className="nome-artista">{data.nome}</div>
                            <p>Quantidade de arte: 15</p>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="pb-0 card-body">
                            <div className="row">
                                    {produtos.map((item, key) => {
                                        return (
                                            <div className="mb-4 col-lg-4 col-md-6">
                                                <div key={`arte-produto-${item.id}`} className="d-flex flex-column rounded-1 h-100 p-3">
                                                    <div className="overflow-hidden">
                                                        <div className="position-relative rounded-top overflow-hidden">
                                                            <Link
                                                                className="d-block image-arte"
                                                                href="/e-commerce/product/product-details/TN000005"
                                                            >
                                                                <Image
                                                                    src={item.image}
                                                                    alt="Logitech G305 Gaming Mouse"
                                                                    className="h-100 w-100 fit-cover rounded-top"
                                                                />
                                                            </Link>
                                                            <span className="position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2 badge rounded-pill bg-success">
                                                                New
                                                            </span>
                                                        </div>
                                                        <div className="p-3">
                                                            <h5 className="fs-0">
                                                                <a
                                                                    className="text-dark"
                                                                    href="/e-commerce/product/product-details/TN000005"
                                                                >
                                                                    Logitech G305 Gaming Mouse
                                                                </a>
                                                            </h5>
                                                            <p className="fs--1 mb-3">
                                                                <a className="text-500" href="/e-commerce/product/product-grid#!">
                                                                    Computer &amp; Accessories
                                                                </a>
                                                            </p>
                                                            <h5 className="fs-md-2 text-warning mb-0 d-flex align-items-center mb-3">
                                                                $47.5<del className="ms-2 fs--1 text-500">$95</del>
                                                            </h5>

                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center px-3">

                                                        <button type="button" className="me-2 btn btn-falcon-default btn-sm">
                                                            <FaRegHeart />

                                                        </button>
                                                        <button type="button" className="btn btn-falcon-default btn-sm">
                                                            <HiOutlineShoppingBag style={{ fontSize: "1rem", cursor: "pointer" }} />
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}


export async function getServerSideProps(context) {
    const { artista } = context.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}perfil-criador/${artista}`);
    const data = await res.json();

    if (data == undefined || data == null || !data || data.not_found == true) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data: data,
            
        }
    }
}