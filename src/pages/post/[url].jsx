import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import Link from 'next/link';
import Head from 'next/head';
import { BsFillCalendarFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { LiaHashtagSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { dataAtualFormatada } from '@/helpers/data';
import axios from 'axios';
export default function Post(props) {
    const { data } = props;

    const [tags, setTags] = useState();
    const [api, setApi] = useState();
    useEffect(() => {
        
        const tagsApi = async () => {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}tag-post/${data.id}`).then((response) => {
                setTags(response.data);
                setApi()
            }).catch(error => {
                //console.log(error);
            });
    
        }
        tagsApi()
    }, [api])
    return (
        <>
            <Head>
                <title>{data.titulo}</title>
            </Head>
            <Menu />
            <main className="main">
                <div className="container pt-7">
                    <div className="router"><Link href="/" alt="Home">Home</Link> &gt; <Link href="/blog" alt="Home">Blog da GRUDOU</Link>  &gt; {data.titulo}</div>

                    <div className="blog">
                        <div className="blog-post">

                            <div className="card-blog">
                                <div className="info-blog">
                                    <div className="titulo-blog">{data.titulo}</div>
                                    <div className="data-blog"><BsFillCalendarFill /> {dataAtualFormatada(data.created_at)}</div>
                                    <div className="detalhe-blog">{data.descricao}</div>

                                </div>
                            </div>

                        </div>
                        <div className="blog-tags">
                            {/* <form action="" method="post">
                                <div className="group-blog">
                                    <input type="text" placeholder="O que você procura?" />
                                    <button><BiSearchAlt /></button>
                                </div>
                            </form> */}
                            <div className="tags-post">
                                {tags && tags.map((tag) => {

                                return(<Link href={`/tag/${tag.url}`} alt="tags" key={`tag-post-${tag.id}`}><span><LiaHashtagSolid />{tag.nome}</span></Link>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { url } = context.query;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post/${url}`)

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