import Head from "next/head";
import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import Footer from "@/components/Footer";
import Template from "@/components/Arte/Template";
import Imagens from "@/components/Arte/Imagens";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdicionaraArte() {
    const [categoria, setCategoria] = useState();
    const [subCategoria, setSubCategoria] = useState()

    const router = useRouter()
 
    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');

        if (!token) {
            router.push("/");

            return 0;
        }

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}categorias`)
            .then((response) => {
                setCategoria(response.data.data)
            })

    }, [])
    const adicionarArte = async (e) => {

    }
    const subCategorias = (e) => {
        const sub = e.target.value
        if(sub != 0){

            axios.get(`${process.env.NEXT_PUBLIC_API_URL}subcategorias/${sub}`)
                .then((response) => {
                    setSubCategoria(response.data)
                })   
        }else{
            setSubCategoria()
        }
    }
    return (
        <>
            <Head>
                <title>Adicionar arte</title>
            </Head>
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <div className="container">
                                <div className="row flex-center ">
                                    <div className="col-sm-10 col-md-8 col-xxl-4">
                                        <div className="card">
                                            <div className="card-body p-4 p-sm-5">
                                                <div className="row flex-between-center mb-2">
                                                    <div className="col-12 text-center">
                                                        <h5>Adicionar Arte</h5>
                                                    </div>
                                                </div>
                                                <form onSubmit={(e) => adicionarArte(e)}>
                                                    <div className="mb-3"><input className="form-control" type="text" name="nome" placeholder="Digita o o nome da arte" /></div>
                                                    <div className="mb-3 d-flex">
                                                        <select onChange={(e) => subCategorias(e)} className="form-select" type="text" name="categoria" placeholder="Selecione a Categoria">
                                                            <option value="">Selecione a categoria</option>
                                                            {categoria && categoria.map((item) => {
                                                                if (item.id_categoria == 0) {
                                                                    return (<option key={`pai-${item.id}`} value={item.id} >{item.categoria}</option>
                                                                    )
                                                                }
                                                            })}
                                                        </select>
                                                        <select className="form-select" type="text" name="subcategoria" placeholder="Selecione a Subcategoria">
                                                            <option value="0">Selecione a Subcategoria</option>
                                                            {subCategoria && subCategoria.map((item) => {
                                                                if (item.id_categoria > 0) {
                                                                    return (<option key={`pai-${item.id}`} value={item.id} >{item.categoria}</option>
                                                                    )
                                                                }
                                                            })}
                                                        </select>
                                                    </div>
                                                    <Template />
                                                    <Imagens />

                                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Enviar</button></div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}