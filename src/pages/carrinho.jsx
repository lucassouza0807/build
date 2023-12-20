import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Carrinho from "@/components/Shop/Carrinho";
import Head from "next/head";
import { ContextHelper } from "@/helpers/contexts";
import { useContext } from "react";

export default function Compra() {

    const { dadosPerfil} = useContext(ContextHelper)

    return (
        <>
            <Head>
                <title>Minhas compras</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <Carrinho dadosPerfil={dadosPerfil} />
            </main>
            <Footer />
        </>
    )
}