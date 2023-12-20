import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Checkout from "@/components/Shop/Checkout";
import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ContextHelper } from "@/helpers/contexts";

export default function Finalizar() {
    const router = useRouter();
    const [enderecoData, setEnderecoData] = useState({});

    const { dadosPerfil } = useContext(ContextHelper);

    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push({
                pathname: "/login",
                query: {
                    callback: "/finalizar" 
                }
            });
        }
        if (dadosPerfil) {
            enderecoDados(dadosPerfil.id).then((data) => {
                setEnderecoData(data);
            });
        }
    }, [dadosPerfil]);

    if (dadosPerfil !== null) {
        return (
            <>
                <Head>
                    <title>Finalizar o pedido</title>
                </Head>

                <Menu />
                <main className="main">
                    <div className="container pt-7 mb-7">
                        <Checkout enderecoData={enderecoData} />
                    </div>
                </main>
                <Footer />
            </>
        )

    }
}

const enderecoDados = async (clienteInfo) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}enderecos-cliente/${clienteInfo}`)

    const data = await res.json();
    return data;
}