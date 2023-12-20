import Footer from "@/components/Footer";
import Head from "next/head";
import Menu from "@/components/Menu";
import Link from "next/link";
import { BsFillCalendarFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { LiaHashtagSolid } from "react-icons/lia";
import Image from "next/image";
import capaImage from "../../public/1-3.c61791ccd7918b53df6e.jpg";
import { dataAtualFormatada } from "@/helpers/data";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
export default function Blog() {
    const [posts, setPosts] = useState();
    const [pagina, setPagina] = useState();
    const [currentPage, setCurrentPage] = useState(process.env.NEXT_PUBLIC_API_URL + "lista-posts?page=1");

    useEffect(() => {
        const postsApi = async () => {

            axios.get(currentPage !== null ? currentPage : process.env.NEXT_PUBLIC_API_URL + "lista-posts").then((response) => {
                setPosts(response.data.data);
                setPagina(response.data.links);
                
            }).catch(error => {
                //console.log(error);
            });
        }
        postsApi();
    }, [currentPage]);

    const BuscaPost = async (e) => {
        e.preventDefault();
        let busca = e.target.busca.value;
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}busca-post`, {
            "titulo": busca
        }).then(response => {
            setPosts(response.data.data);
            setPagina(response.data.links);

        }).catch(error => {
            //console.log(error);
        })
    }
    return (
        <>
            <Head>
                <title>Blog</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <div className="container">
                    <div className="pt-7">

                        <div className="router"><Link href="/" alt="Home">Home</Link> &gt; Blog da GRUDOU</div>
                        <div className="blog">
                            <div className="blog-post">

                                {posts && posts.map((post) => {
                                    return (
                                        <div className="card-blog" key={`post-${post.id}`}>
                                            <div className="capa-blog">{/* <Image src={post.capa} alt={post.titulo} /> */}</div>
                                            <div className="info-blog">
                                                <div className="titulo-blog">{post.titulo}</div>
                                                <div className="data-blog"><BsFillCalendarFill /> {dataAtualFormatada(post.created_at)}</div>
                                                <div className="detalhe-blog">{post.seo_descricao}</div>
                                                <div className="button-blog">
                                                    <Link href={`/post/${post.url}`} alt={post.titulo}>
                                                        <button className="btn btn-info">Ler mais</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                            <div className="blog-tags">
                                <form action="" method="post" onSubmit={(e) => {BuscaPost(e)}}>
                                    <div className="group-blog">
                                        <input type="text" placeholder="O que você procura?" name="busca"/>
                                        <button type="submit"><BiSearchAlt /></button>
                                    </div>
                                </form>
                                <div className="tags-info">
                                    <Link href="/tags" alt="tags"><span><LiaHashtagSolid />Tags</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex w-100 justify-content-center mb-4">
                    <nav aria-label="post">
                        <ul className="pagination">
                        {pagina && pagina.map((item, index) => {
                            return(
                                <li className="page-item">
                                    <Link alt="anterior" 
                                    className={`page-link ${item.active == true ? 'active' : ''}`} 
                                    key={index}
                                    onClick={() => setCurrentPage(prevState => item.url)}
                                    href="#">
                                    {item.label.replace("&raquo;", "").replace("&laquo;", "")}
                                    </Link>
                                </li>
                            )
                        })}
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer />
        </>
    )
}