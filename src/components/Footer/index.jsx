import { BsFacebook, BsMedium } from "react-icons/bs";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";
import Link from "next/link";
export default function Footer() {
    return (
        <>
            <footer>
                <section className="bg-dark pt-8 pb-4" data-bs-theme="light">
                    <div className="container">
                        <div className="position-absolute btn-back-to-top bg-dark">
                            <a className="text-600" href="#banner" data-bs-offset-top={0}>
                                <span className="fas fa-chevron-up" data-fa-transform="rotate-45" />
                            </a>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <h5 className="text-uppercase text-white opacity-85 mb-3">
                                    Nossa missão
                                </h5>
                                <p className="text-600">
                                    "A missão da GRUDOU é transformar a criatividade de nossos
                                    clientes em adesivos personalizados através de uma plataforma
                                    intuitiva. Nos dedicamos a entregar qualidade, simplificar a
                                    compra e fomentar confiança, contribuindo para a expressão pessoal
                                    e comunicação visual eficaz."
                                </p>
                                <p>Acompanhe-nos pelas redes sociais:</p>
                                <div className="icon-group mt-4">
                                    <a className="icon-item bg-white text-facebook" href="#!">
                                        <BsFacebook className="font-footer-media" />
                                    </a>
                                    <a className="icon-item bg-white text-twitter" href="#!">
                                        <RiTwitterXFill />
                                    </a>
                                    <a className="icon-item bg-white text-google-plus" href="#!">
                                        <AiFillGooglePlusCircle className="font-footer-media" />
                                    </a>
                                    <a className="icon-item bg-white text-linkedin" href="#!">
                                        <BiLogoLinkedin className="font-footer-media" />
                                    </a>
                                    <a className="icon-item bg-white" href="#!">
                                        <BsMedium className="font-footer-media" />
                                    </a>
                                </div>
                            </div>
                            <div className="col ps-lg-6 ps-xl-8">
                                <div className="row mt-5 mt-lg-0">
                                    <div className="col-12 col-md-6">
                                        <h5 className="text-uppercase text-white opacity-85 mb-3">
                                            GRUDOU
                                        </h5>
                                        <ul className="list-unstyled">
                                            <li className="mb-1">
                                                <Link alt="Sobre nós" className="link-600" href="/sobre-nos">
                                                    Sobre nós
                                                </Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link alt="Contato" className="link-600" href="/contato">
                                                    Contato
                                                </Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link alt="Trabalhe conosco" className="link-600" href="/trabalhe-conosco">
                                                    Trabalhe Conosco
                                                </Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link alt="Blog" className="link-600" href="/blog">
                                                    Blog
                                                </Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link alt="Termos de Uso" className="link-600" href="/termos-de-uso">
                                                    Termos de Uso
                                                </Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link alt="Política de Privacidade" className="link-600" href="/politica-de-privacidade">
                                                    Política de Privacidade
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col mt-md-0">
                                        <h5 className="text-uppercase text-white opacity-85 mb-3">
                                            GRUPO PRINT.NET
                                        </h5>
                                        <ul className="list-unstyled">
                                            <li>
                                                <h5 className="fs-0 mb-0">
                                                    <b>Matriz:</b>{" "}
                                                </h5>
                                                <p className="text-600 opacity-50">
                                                    Av. Francisco Matarazzo, 404 Sala 102 - Água Branca
                                                    <br />
                                                    São Paulo - SP CEP: 05001-000
                                                    <br />
                                                    CNPJ: 26.644.106/0001-11
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end of .container*/}
                </section>

                <section className="py-0 bg-dark" data-bs-theme="light">
                    <div>
                        <hr className="my-0 text-600 opacity-25" />
                        <div className="container py-3">
                            <div className="row justify-content-between fs--1">
                                <div className="col-12 col-sm-auto text-center">
                                    <p className="mb-0 text-600 opacity-85">
                                        Grupo Print.net®
                                        <span className="d-none d-sm-inline-block">|</span>
                                        <br className="d-sm-none" /> 2023{" "}
                                        <a className="text-white opacity-85" href="https://print.net">
                                            Todos os Direitos reservados
                                        </a>
                                    </p>
                                </div>
                                <div className="col-12 col-sm-auto text-center">
                                    <p className="mb-0 text-600 opacity-85">v0.01</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    )
}