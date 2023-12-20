import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

import { useState, useEffect, useContext } from "react"
import Banco from "@/components/Client/Banco";
import MenuCliente from "@/components/Client/MenuCliente";
import Loading from "@/components/Loading";
import { ContextHelper } from "@/helpers/contexts";

export default function DadosBancario() {

    const [menuLateral, setMenuLateral] = useState();
    const [loading, setLoading] = useState(true);
    const [banco, setBancoData] = useState({})


    const { dadosPerfil } = useContext(ContextHelper)

    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0;
        }
        
        if (dadosPerfil) {
            bancoData(dadosPerfil.id).then((response) => {
                setBancoData(response);
                setLoading(false);
            });
        }
    }, [dadosPerfil]);
    return (
        <>
            {loading ? (<Loading />) : ''}

            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <Banco dadosBanco={banco} />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

const bancoData = async (clienteInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}banco/${clienteInfo}`)

    const data = await res.json();
    return data;
}