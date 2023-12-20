import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";

export default function TrabalheConosco() {
    return (
        <>
            <Head>
                <title>Trabalhe Conosco</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <div className="container pt-7">
                    <h1 className="text-center">Trabalhe conosco</h1>
                    <form action="" className="bg-white p-3 mb-4 rounded">
                    <div className="mb-3 form-group">
                        <label>Envia o seu curriculo aqui em PDF</label>
                        <input className="form-control " type="file" />
                    </div>
                    <button type="button" className="btn btn-primary">Enviar</button>

                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}