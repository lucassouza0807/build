import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import Head from "next/head";
import Link from "next/link";
export default function Termos() {
    return (
        <>
            <Head>
                <title>Termos de uso</title>
            </Head>
            <Menu />
            <main className="main" id="top">
                <section className="term-of-use">
                    <div className="container-site">
                        <div className="term-user">
                            <div className="router"><Link href="./" alt="Home">Home</Link> &gt; Termos de uso</div>
                            <h4>TERMOS DE SERVIÇO E USO DO SITE</h4>

                            <div className="term">
                                <div className="col-sm-12 col-md-12 col-lg-12 aos-init aos-animate" data-aos="fade-right" data-aos-delay="100">
                                    <h3>TERMOS DE USO</h3>
                                    <p>A <Link href="/" alt="empresa">GRUDOU</Link> está comprometido com a conscientização de seus usuários, por isso, apresentamos nossos termos de serviço, que tem por objetivo esclarecer as condições para uso deste site. Ao visitar a <aLink href="/" alt="empresa">www.grudou.com.br</aLink>, você aceita as práticas descritas neste termo de serviço.</p>
                                </div>                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}