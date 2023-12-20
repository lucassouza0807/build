import { useEffect, useState, useContext } from "react";
import { HiOutlineShoppingBag, } from "react-icons/hi";
import { AiOutlineSearch, AiOutlineRise, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { ContextHelper } from "@/helpers/contexts";
import Image from "next/image";

export default function Menu() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState();
    const [showPerfil, setShowPerfil] = useState();
    const [height, setHeight] = useState(false);
    const [bgNav, setBgNav] = useState();
    const [menu, setMenu] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const { dadosPerfil, setDadosDoPerfil, countPerfil, isChanged, results, setResults } = useContext(ContextHelper)
    const logout = async (e) => {
        let token = localStorage.getItem('tokenCliente');
        setDadosDoPerfil();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}pessoa-sair`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: 1000
        }).then((response) => {
            localStorage.removeItem("tokenCliente");
            toast.success(`Usuário desconectado com sucesso`, {
                theme: "light",
                position: "bottom-right"
            });
            //router.push("/");
        }).catch(error => {
            localStorage.removeItem("tokenUser");
            //router.push("/");
        });
    }


    const Entra = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const senha = e.target.senha.value;
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}pessoa-entrar`, {
            email: email,
            senha: senha
        }).then((response) => {
            const token = JSON.stringify(response.data.authorization.token);
            localStorage.setItem('tokenCliente', token.replace(/"/g, ''));
            localStorage.setItem("_id_id_", response.data.pessoa.id)
            setDadosDoPerfil(response.data.pessoa);
            toast.success('Usuário logado com sucesso', {
                theme: "light",
                position: "bottom-right"
            });
        }).catch(error => {
            toast.error(error.response.data.error, {
                theme: "light",
                position: "bottom-right"
            });
        }).catch(error => {
            toast.error('Erro na conexão com o servidor', {
                theme: "light",
                position: "bottom-right"
            });
        })
    };

    const [allData, setAllData] = useState([])

    const fetchData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}produtos`)
        const data = await res.json()

        setAllData(data)

    }

    useEffect(() => {
        fetchData();

    }, [])

    const refreshToken = async () => {
        if (localStorage.getItem("tokenCliente")) {
            setInterval(() => {
                axios.put(`${process.env.NEXT_PUBLIC_API_URL}pessoa-atualizar`, {}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('tokenCliente')}`
                    }
                }).then(response => {
                    localStorage.setItem("tokenCliente", response.data);
                })


            }, 1000 * 60 * 60 * 2);
        }
    }

    useEffect(() => {
        refreshToken();

        const nav = document.getElementById("nav");
        const pop_up = document.getElementById("pop_up");
        const apps = document.getElementById("apps");
        const login_trigger = document.getElementById("login_trigger");
        const login_div = document.getElementById("login_div");
        const busca = document.getElementById("busca");
        const suggest = document.getElementById("sugestions");
        const result_list = document.getElementById("results_list")

        if (localStorage.getItem("itens_carrinho")) {
            const cart_itens = JSON.parse(localStorage.getItem("itens_carrinho"));
            setCartCount(prevState => cart_itens.length);
        }

        if (window.location.pathname == '/') {
            window.addEventListener("scroll", (event) => {
                const scroll = window.scrollY;
                if (scroll > 200) {
                    setBgNav("nv_in");
                }
                if (scroll < 100) {
                    setBgNav("nv_out");
                }

            })
        }
        if (window.location.pathname != '/') {
            setBgNav("nv_in");
        }

        busca.addEventListener("focusin", (e) => {
            suggest.style.display = "flex";
        })

        window.addEventListener("click", (e) => {
            if (!suggest.contains(e.target) && !busca.contains(e.target)) {
                suggest.style.display = "none";
            }
        })

        busca.addEventListener("input", (e) => {
            const value = e.target.value;

            if (value.length >= 3) {
                setResults(prevState => allData.filter((item) => item.produto.nome.toLowerCase().includes(e.target.value.toLowerCase())));

            }

            if (value == "" || value.length < 3) {
                setResults()
            }

        });

        window.addEventListener("click", (e) => {
            if (result_list.contains(e.target)) {
                suggest.style.display = "flex";
            }
        });

        window.addEventListener("click", (e) => {
            if (!login_trigger.contains(e.target) && !login_div.contains(e.target)) {
                setShowLogin(false)
                setShowPerfil(false)
            }
        })

        window.addEventListener("click", (e) => {
            if (!pop_up.contains(e.target) && !apps.contains(e.target)) {
                setShow(false)
            }


        })
        if (window.location.pathname == "") {

            window.addEventListener("scroll", (event) => {
                const scroll = window.scrollY;

                if (scroll > 200) {
                    setHeight(false)
                    setBgNav("nv_in");
                }
                if (scroll < 100) {
                    setBgNav("nv_out");
                }
            })
        }


    }, [show, height, isChanged])

    return (
        <>
            <nav
                id="nav"
                className={`nv_responsive nv ${bgNav} navbar navbar-standard navbar-expand-lg fixed-top navbar-dark ${menu ? "nv_in" : ""}`}
            >
                <div className="container">
                    <Link className="navbar-brand" href="/">
                        <span className="text-white dark__text-white">GRUDOU</span>
                    </Link>
                    <div className="menu">
                        <div className="lupinha" >
                            <AiOutlineSearch onClick={() => setHeight(!height)} style={{ fontSize: "1.4rem", height: "50px", cursor: "pointer" }} />
                        </div>
                        <Link href="/carrinho" className="carrinho">
                            <HiOutlineShoppingBag style={{ fontSize: "1.4rem", height: "50px", cursor: "pointer" }} />
                            {cartCount >= 1 &&
                                <span className="badge text-bg-info">{cartCount}</span>
                            }
                        </Link>
                        <button
                            className="navbar-toggler collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarStandard"
                            aria-controls="navbarStandard"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            onClick={() => setMenu(!menu)}
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div className={`nav-list-mobile  ${menu ? 'active' : ''}`} id="navbarStandard">
                        <div className="close_btn">
                            <AiOutlineClose onClick={() => setMenu(!menu)} />
                        </div>
                        <ul className="navbar-nav active ms-auto responsive_bar">
                            <div className="not_appear">
                                <li className="nav-item" role="button">
                                    <div onClick={() => setHeight(!height)} className="nav-link">
                                        <AiOutlineSearch style={{ fontSize: '1.4rem' }} />
                                    </div>
                                </li>
                            </div>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link"
                                    href="/editor"
                                    role="button"
                                    id="dashboards"
                                >
                                    Personalizar
                                </Link>{" "}
                            </li>
                            {/* Galeria */}
                            <li className="nav-item dropdown">
                                <div
                                    onClick={() => setShow(!show)}
                                    className="nav-link dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    id="apps"
                                >
                                    Galeria
                                </div>
                                <div
                                    className={`dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0 ${show == true ? "show" : ""}`}
                                    aria-labelledby="apps"
                                >
                                    <div id="pop_up" className="card d-block navbar-card-app shadow-none dark__bg-1000">
                                        <div className="card-body scrollbar max-h-dropdown">
                                            <img
                                                className="img-dropdown"
                                                src="../assets/img/icons/spot-illustrations/authentication-corner.png"
                                                width={130}
                                                alt=""
                                            />
                                            <div className="row">
                                                <div className="col-6 col-md-4">
                                                    <div className="nav flex-column">
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/calendar.html"
                                                        >
                                                            Calendar
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/chat.html"
                                                        >
                                                            Chat
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/kanban.html"
                                                        >
                                                            Kanban
                                                        </Link>
                                                        <p className="nav-link text-700 mb-0 fw-bold">
                                                            Social
                                                        </p>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/social/feed.html"
                                                        >
                                                            Feed
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/social/activity-log.html"
                                                        >
                                                            Activity log
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/social/notifications.html"
                                                        >
                                                            Notifications
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/social/followers.html"
                                                        >
                                                            Followers
                                                        </Link>
                                                        <p className="nav-link text-700 mb-0 fw-bold">
                                                            Support Desk
                                                        </p>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/support-desk/table-view.html"
                                                        >
                                                            Table view
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/support-desk/card-view.html"
                                                        >
                                                            Card view
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/support-desk/contacts.html"
                                                        >
                                                            Contacts
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/support-desk/contact-details.html"
                                                        >
                                                            Contact details
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/support-desk/tickets-preview.html"
                                                        >
                                                            Tickets preview
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/support-desk/quick-links.html"
                                                        >
                                                            Quick links
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-md-4">
                                                    <div className="nav flex-column">
                                                        <p className="nav-link text-700 mb-0 fw-bold">
                                                            E-Learning
                                                        </p>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-learning/course/course-list.html"
                                                        >
                                                            Course list
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-learning/course/course-grid.html"
                                                        >
                                                            Course grid
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-learning/course/course-details.html"
                                                        >
                                                            Course details
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-learning/course/create-a-course.html"
                                                        >
                                                            Create a course
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-learning/student-overview.html"
                                                        >
                                                            Student overview
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-learning/trainer-profile.html"
                                                        >
                                                            Trainer profile
                                                        </Link>
                                                        <p className="nav-link text-700 mb-0 fw-bold">
                                                            Events
                                                        </p>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/events/create-an-event.html"
                                                        >
                                                            Create an event
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/events/event-detail.html"
                                                        >
                                                            Event detail
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/events/event-list.html"
                                                        >
                                                            Event list
                                                        </Link>
                                                        <p className="nav-link text-700 mb-0 fw-bold">
                                                            Email
                                                        </p>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/email/inbox.html"
                                                        >
                                                            Inbox
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/email/email-detail.html"
                                                        >
                                                            Email detail
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/email/compose.html"
                                                        >
                                                            Compose
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-md-4">
                                                    <div className="nav flex-column">
                                                        <p className="nav-link text-700 mb-0 fw-bold">
                                                            E-Commerce
                                                        </p>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/product/product-list.html"
                                                        >
                                                            Product list
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/product/product-grid.html"
                                                        >
                                                            Product grid
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/product/product-details.html"
                                                        >
                                                            Product details
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/product/add-product.html"
                                                        >
                                                            Add product
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/orders/order-list.html"
                                                        >
                                                            Order list
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/orders/order-details.html"
                                                        >
                                                            Order details
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/customers.html"
                                                        >
                                                            Customers
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/customer-details.html"
                                                        >
                                                            Customer details
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/shopping-cart.html"
                                                        >
                                                            Shopping cart
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/checkout.html"
                                                        >
                                                            Checkout
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/billing.html"
                                                        >
                                                            Billing
                                                        </Link>
                                                        <Link
                                                            className="nav-link py-1 link-600 fw-medium"
                                                            href="https://prium.github.io/falcon/v3.18.0/app/e-commerce/invoice.html"
                                                        >
                                                            Invoice
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link"
                                    href="/para-empresas"
                                    role="button"
                                    id="pagess"
                                >
                                    Para empresas
                                </Link>
                            </li>
                            {dadosPerfil ? '' : (

                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        href="/cadastro"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Registrar
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item dropdown">

                                {dadosPerfil ? (
                                    <>
                                        <div
                                            onClick={() => setShowPerfil(!showPerfil)}
                                            className="nav-link dropdown-toggle"
                                            id="login_trigger"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >{dadosPerfil.nome}</div>
                                        <div id="login_div" className={`dropdown-menu dropdown-caret dropdown-menu-end dropdown-menu-card ${showPerfil == true ? "show" : ""}`}>
                                            <div className="card shadow-none navbar-card-login">
                                                <div className="card-body fs--1 p-4 fw-normal">
                                                    <div className="row text-start justify-content-between align-items-center mb-2">
                                                        <Link href="/minha-conta" alt="Minha conta">Minha conta</Link>
                                                        <Link href="/minha-conta/senha" alt="Senha">Senha</Link>
                                                        <Link href="/minha-conta/meus-pedidos" alt="meus pedidos">Meus Pedidos</Link>
                                                        <Link href="/minha-conta/minhas-artes" alt="minhas artes">Minhas Artes</Link>

                                                        <Link href="/minha-conta/meus-enderecos" alt="Meus Endereços">Meus Endereços</Link>
                                                        {countPerfil && countPerfil.length > 14 ? (<Link href="/minha-conta/dados-da-empresa" alt="Dados da Empresa">Dados da Empresa</Link>) : ''}
                                                        <Link href="/minha-conta/contatos" alt="Contatos">Contatos</Link>
                                                        <Link href="/minha-conta/conta-bancaria" alt="Conta Bancaria">Conta Bancaria</Link>
                                                        <Link href="" onClick={e => logout(e)} alt="Sair">Sair</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            onClick={() => setShowLogin(!showLogin)}
                                            className="nav-link dropdown-toggle"
                                            id="login_trigger"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Login
                                        </div>
                                        <div
                                            id="login_div"
                                            className={`dropdown-menu dropdown-caret dropdown-menu-end dropdown-menu-card ${showLogin == true ? "show" : ""}`}
                                        >
                                            <div className="card shadow-none navbar-card-login">
                                                <div className="card-body fs--1 p-4 fw-normal">
                                                    <div className="row text-start justify-content-between align-items-center mb-2">
                                                        <div className="col-auto">
                                                            <h5 className="mb-0">Login</h5>
                                                        </div>
                                                        <div className="col-auto">
                                                            <p className="fs--1 text-600 mb-0">
                                                                ou{" "}
                                                                <Link href="/cadastro">
                                                                    Criar uma conta
                                                                </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <form onSubmit={e => Entra(e)}>
                                                        <div className="mb-3">
                                                            <input
                                                                className="form-control"
                                                                type="email"
                                                                placeholder="E-mail"
                                                                name="email"
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <input
                                                                className="form-control"
                                                                type="password"
                                                                placeholder="Senha"
                                                                name="senha"
                                                            />
                                                        </div>
                                                        <div className="row flex-between-center">
                                                            <div className="col-auto">
                                                                <div className="form-check mb-0">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id="modal-checkbox"
                                                                    />
                                                                    <label
                                                                        className="form-check-label mb-0"
                                                                        htmlFor="modal-checkbox"
                                                                    >
                                                                        Lembrar
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <Link
                                                                    className="fs--1"
                                                                    href="/recupera-senha"
                                                                >
                                                                    Esqueceu a senha?
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <button
                                                                className="btn btn-primary d-block w-100 mt-3"
                                                                type="submit"
                                                                name="submit"
                                                            >
                                                                Login
                                                            </button>
                                                        </div>
                                                    </form>


                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </li>
                            <div className="not_appear">

                                <li className="nav-item">
                                    <Link href="/carrinho" className="nav-link carrinho">
                                        <HiOutlineShoppingBag style={{ fontSize: '1.4rem' }} />
                                        {cartCount >= 1 &&
                                            <span className="badge text-bg-info">{cartCount}</span>
                                        }
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="accordion" className={`accordion ${height ? 'active' : ''}`}>
                <div className="pesquisa container">
                    <form action="produtos" method="GET">
                        <div className="form">
                            <input id="busca" type="text" name="q" placeholder="Buscar em grudou.com " autoComplete="off" />
                            <button className="submt_btn">
                                <AiOutlineSearch className="lupa text-white mx-3" />
                            </button>
                        </div>
                        <div id="sugestions" className="sugestions">
                            <div id="results_list" className="results">
                                <span style={{ color: "white", marginBottom: "10px" }}>Resultados: </span>
                                {results && results.length > 0 &&
                                    <>
                                        {results.map((item, key) =>
                                            <Link
                                                href={`/produto/${item.produto.url}`}
                                                className="busca-container"
                                                key={`busca-${key}`}
                                                style={{ marginBottom: "10px" }}
                                            >
                                                <div className="avatar avatar-3xl">
                                                    <Image
                                                        className="rounded-circle"
                                                        src={item.produto.cover}
                                                        width={50}
                                                        height={50}

                                                    />

                                                </div>

                                                <span className="mx-4" style={{ color: "white" }} key={key}>{item.produto.nome}</span>
                                            </Link>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}