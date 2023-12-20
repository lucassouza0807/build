import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import ParaEmpresa from "@/components/ParaEmpresa";
import Head from "next/head";

export default function Empresas() {

    return (
        <>
            <Head>
                <title>Para Empresas</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <div className="container pt-7">
                    <ParaEmpresa />
                </div>
            </main>
            <Footer />
        </>
    )
}