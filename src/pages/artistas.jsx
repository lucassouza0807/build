import BuscaArtista from "@/components/Busca/BuscaArtista";
import CardArtista from "@/components/Card/CardArtista";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";

export default function artistas() {
    return (
        <>
            <Head>
                <title>
                    Artista
                </title>
            </Head>
            <Menu />
            <main className="main">
                <div className="container pt-7">
                    <div className="artistas-container">
                        <BuscaArtista />
                        <div className="container">
                        <CardArtista />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}