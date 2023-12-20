import Footer from "@/components/Footer";
import Head from "next/head";
import Menu from "@/components/Menu";
import Link from "next/link";
import { BsFillCalendarFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { LiaHashtagSolid } from "react-icons/lia";
import Image from "next/image";
import { dataAtualFormatada } from "@/helpers/data";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Tag(props) {
    const { data } = props;
    const router = useRouter();
    const [posts, setPosts] = useState();
    const [pagina, setPagina] = useState();
    const [currentPage, setCurrentPage] = useState(process.env.NEXT_PUBLIC_API_URL + "lista-tag-post/" + data.id + "?page=1");

    useEffect(() => {

        const postsApi = async () => {
            axios.get(currentPage !== null ? currentPage : process.env.NEXT_PUBLIC_API_URL + "lista-tag-post/" + data.id).then((response) => {
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
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}busca-post-tag`, {
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
            <title>
                {data.nome}
            </title>
        </Head>
            <Menu />
            <main className="main" id="top">
                <div className="container">
                    <div className="pt-7">

                        <div className="router"><Link href="/" alt="Home">Home</Link> &gt; Blog da GRUDOU &gt; {data.nome}</div>
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
                    <Pagination>
                        {pagina && pagina.map((item, index) => {

                            return (
                                <div
                                    className="pagination"
                                    key={index}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setCurrentPage(item.url)}
                                >
                                    <Pagination.Item>{item.label.replace("&raquo;", "").replace("&laquo;", "")}</Pagination.Item>
                                </div>

                            )
                        })}
                    </Pagination>
                </div>

            </main>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { tag } = context.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tag-link/${tag}`)

    const data = await res.json();

    if (!data) {
        return {
            redirect: {
                path: "/"
            }
        }
    }

    return {
        props: {
            data: data
        }
    }
}