import Menu from "@/components/Menu"
import Footer from "@/components/Footer"
import { useRouter } from "next/router"
import Head from "next/head"
import Details from "@/components/Produtos/Details"
import { createContext } from "react"
import Recomendados from "@/components/Produtos/Recomendados"
import { redirect } from 'next/navigation'

export const ProdutoContextSlug = createContext();

export default function Produto(props) {

    const { data } = props;


    return (
        <>
            <Head>
                {/* <title>{data.produto.nome}</title> */}
               {/*  <meta name="keywords" content={data.produto.keywords} /> */}
            </Head>
            <Menu />
            <main className="pt-5">
                <ProdutoContextSlug.Provider value={{ data }} >
                    <Details />
                    <div className="recomendados">
                        <Recomendados />
                    </div>
                </ProdutoContextSlug.Provider>
            </main>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { produto } = context.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}catalogo/${produto}`);
    const data = await res.json();

    if (data == undefined || data == null || !data || data.not_found == true) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            data: data,
            
        }
    }
}