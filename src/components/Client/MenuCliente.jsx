import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { AiOutlineRight, AiOutlineUser, } from "react-icons/ai";
import { CiShoppingBasket } from "react-icons/ci"
import { BiLogOutCircle } from "react-icons/bi";
import { TiContacts } from 'react-icons/ti';
import { BsCashCoin } from 'react-icons/bs';
import { LiaUserTieSolid } from 'react-icons/lia';
import { RiLockPasswordLine } from 'react-icons/ri';
import { PiPaintBrushBroadDuotone } from "react-icons/pi";
import { FiMapPin } from 'react-icons/fi';
import { toast } from "react-toastify";
import { ContextHelper } from "@/helpers/contexts";

export default function MenuCliente() {
    const [menuLateral, setMenuLateral] = useState();
    const [count, setCount] = useState();
    const { countPerfil } = useContext(ContextHelper)

    const [ativo, setAtivo] = useState("");
    useEffect(() => {
        if(location.pathname){
            setAtivo(location.pathname)
        }
    }, [])
    const logout = async (e) => {
        let token = localStorage.getItem('tokenCliente');
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
            router.push("/");
        }).catch(error => {
            localStorage.removeItem("tokenUser");
            router.push("/");
        });
    }
    return (
        <>
            <nav className={`sidebar ${menuLateral ? '' : 'close'}`}>

                <div className="menu-sidebar toggle" onClick={() => { setMenuLateral(!menuLateral) }}>
                    <AiOutlineRight />
                </div>

                <div className="menu-bar">
                    <div className="menu-cliente">

                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link href="/minha-conta" className={`${ativo == '/minha-conta' ? 'ativo' : ''}`} alt="minha conta">
                                    <AiOutlineUser className="icon" />
                                    <span className="text nav-text">Dados Básicos</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link href="/minha-conta/senha" className={`${ativo == '/minha-conta/senha' ? 'ativo' : ''}`} alt="senha">
                                    <RiLockPasswordLine className="icon" />
                                    <span className="text nav-text">Senha</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link href="/minha-conta/meus-pedidos" className={`${ativo == '/minha-conta/meus-pedidos' ? 'ativo' : ''}`} alt="meus pedidos">
                                    <CiShoppingBasket className="icon" />
                                    <span className="text nav-text">Meus Pedidos</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link href="/minha-conta/minhas-artes" className={`${ativo == '/minha-conta/minhas-artes' ? 'ativo' : ''}`} alt="minhas artes">
                                    <PiPaintBrushBroadDuotone className="icon" />
                                    <span className="text nav-text">Minhas Arte</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link href="/minha-conta/meus-enderecos" className={`${ativo == '/minha-conta/meus-enderecos' ? 'ativo' : ''}`} alt="meus endereços">
                                    <FiMapPin className="icon" />
                                    <span className="text nav-text">Meus Endereços</span>
                                </Link>
                            </li>
                            {countPerfil && countPerfil.length > 14 ? (
                            <li className="nav-link">
                                <Link href="/minha-conta/dados-da-empresa" className={`${ativo == '/minha-conta/dados-da-empresa' ? 'ativo' : ''}`} alt="dados da empresa">
                                    <LiaUserTieSolid className="icon" />
                                    <span className="text nav-text">Dados da Empresa</span>
                                </Link>
                            </li>

                            ) : '' }
                            <li className="nav-link">
                                <Link href="/minha-conta/contatos" className={`${ativo == '/minha-conta/contatos' ? 'ativo' : ''}`} alt="contatos">
                                    <TiContacts className="icon" />
                                    <span className="text nav-text">Contatos</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link href="/minha-conta/conta-bancaria" className={`${ativo == '/minha-conta/conta-bancaria' ? 'ativo' : ''}`} alt="conta bancaria">
                                    <BsCashCoin className="icon" />
                                    <span className="text nav-text">Conta Bancaria</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link href="" onClick={e => logout(e)} alt="sair">
                                    <BiLogOutCircle className="icon" />
                                    <span className="text nav-text">Sair</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}