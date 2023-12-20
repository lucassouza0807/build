import Image from "next/image";
import Link from "next/link";
import produtoImage from "../../../public/1-3.c61791ccd7918b53df6e.jpg";
import Slider from "react-slick";
import { HiOutlineShoppingBag, } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CardArtista() {

    const [criador, setCriador] = useState(null);

    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 10000,
        responsive: [
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
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
   
    useEffect(() => {
        const criadores = async () =>{
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}lista-criadores`)
            .then(response => {
                setCriador(response.data.data)
            })
            .catch(error => console.log(error));
        }
        criadores()
    }, [])
    return (
        <>
        {criador && criador.map((artista, key) => {

           return(<div key={`artista-${artista.id}`} className="card-artista">
                <div className="info-artista">
                    <div className="image-artista">
                        <Image width={200} height={200} src={artista.foto} alt="Artista"/>
                    </div>
                    <div className="perfil-artista">{artista.nome} <p><Link href={`/artista/${artista.id}`} alt="Perfil">Ver perfil</Link></p></div>
                </div>
                <div className="hr-top">
                </div>
                    <Slider {...settings} className="sliede-artes">
                        {produtos.map((item, key) => {
                            return (
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
                            )
                        })}
                    </Slider>
            </div>)
        })}
        </>
    )
}