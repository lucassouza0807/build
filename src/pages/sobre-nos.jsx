import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";
import Link from "next/link";
import ProdutoImg from "../../public/1-3.c61791ccd7918b53df6e.jpg"
import Image from "next/image";
export default function SobreNos() {
    return (
        <>
            <Head>
                <title>Sobre nós</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <section className="about-section">
                    <div className="container-site">
                        <div className="about-company">
                            <div className="router"><Link href="./" alt="Home">Home</Link> &gt; Sobre nós</div>
                            <div className="about-info">
                                <div className="img-about"><Image src={ProdutoImg} alt="Nossa empresa" /></div>
                                <div className="about">
                                    <h2>Sobre nós</h2>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis non voluptatem, sequi iusto nesciunt eligendi laborum debitis atque praesentium aliquam a minima assumenda repudiandae tenetur facilis vitae tempora consequuntur officia.

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