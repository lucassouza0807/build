import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Link from 'next/link';
import Head from 'next/head';
import { LiaHashtagSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Tags() {
    const [tags, setTags] = useState();

    useEffect(() => {
        const tagsApi = async () => {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}lista-tags`).then((response) => {
                setTags(response.data)
            }).catch(error => {
                //console.log(error);
            });
        }
        tagsApi();
    }, [])
    return (
        <>
            <Head>
                <title>Tags</title>
            </Head>
            <Menu />
            <main className="main">
                <div className="container pt-7">
                    <div className="router"><Link href="/" alt="Home">Home</Link> &gt; <Link href="/blog" alt="Home">Blog da GRUDOU</Link>  &gt; Tags</div>
                    <div className="tags-list">
                        {tags && tags.map((tag, key) => {
                            return(
                        <div className="tag" key={`tag-${tag.id}`}>
                            <Link href={`/tag/${tag.url}`} alt="tag"><span><LiaHashtagSolid />{tag.nome}</span></Link>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}