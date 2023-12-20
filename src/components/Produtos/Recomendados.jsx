import Slider from "react-slick";
import Image from "next/image";
import produtoImage from "../../../public/assets/img/icons/spot-illustrations/50.png"
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";


export default function Recomendados(props) {
    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 1000,
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

    useEffect(() => {

    }, [])
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
            <section className="carousel-home">
                <div className="container">

                    <Slider {...settings} >
                        {produtos.map((item, key) => {
                            return (
                                <div key={`produto-home-${item.id}`} className="col-md col-lg-4 col-xl-4 ps-lg-4">
                                    <Link alt={item.nome} href={item.slug}>
                                        <Image
                                            className="img-fluid px-6 px-md-0"
                                            src={item.image}
                                            alt={item.nome}
                                        />
                                    </Link>
                                </div>
                            )
                        })}

                    </Slider>
                </div>

            </section>

        </>
    )
}