import Slider from "react-slick";
import Image from "next/image";
import galeriaImage from "../../../public/assets/img/icons/spot-illustrations/50.png"
import Link from "next/link";
export default function Galeria() {
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
    const galerias = [
        { id: 1, nome: 'galeria1', image: galeriaImage, slug: 'galeria1' },
        { id: 2, nome: 'galeria2', image: galeriaImage, slug: 'galeria2' },
        { id: 3, nome: 'galeria3', image: galeriaImage, slug: 'galeria3' },
        { id: 4, nome: 'galeria4', image: galeriaImage, slug: 'galeria4' },
        { id: 5, nome: 'galeria5', image: galeriaImage, slug: 'galeria5' },
        { id: 6, nome: 'galeria6', image: galeriaImage, slug: 'galeria6' },
        { id: 7, nome: 'galeria7', image: galeriaImage, slug: 'galeria7' },
        { id: 8, nome: 'galeria8', image: galeriaImage, slug: 'galeria8' },
        { id: 9, nome: 'galeria9', image: galeriaImage, slug: 'galeria9' },
        { id: 10, nome: 'galeria10', image: galeriaImage, slug: 'galeria10' },
        { id: 11, nome: 'galeria11', image: galeriaImage, slug: 'galeria11' },
        { id: 12, nome: 'galeria12', image: galeriaImage, slug: 'galeria12' },
        { id: 13, nome: 'galeria13', image: galeriaImage, slug: 'galeria13' }
    ];

    return (
        <>
            <section className="carousel-home">
                <div className="container">
                    <div className="row text-center">
                        <div className="col">
                            <h1 className="fs-2 fs-sm-4 fs-md-5">Galeria de adesivos</h1>
                            <p className="lead">
                                Se a inspiração está tímida, percorra nossa galeria repleta de
                                adesivos criados colaborativamente. Uma vastidão de ideias espera
                                por você, cada adesivo contando uma história, cada design uma
                                porta para um novo mundo.
                            </p>
                        </div>
                    </div>
                    <Slider {...settings}>
                        {galerias.map((item, key) => {
                            return (
                                <div key={`galeria-${item.id}`} className="col-md col-lg-4 col-xl-4 ps-lg-4">
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