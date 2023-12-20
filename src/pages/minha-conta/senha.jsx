import Senha from "@/components/Client/Senha";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import { useEffect } from "react";

export default function SenhaCliente() {
    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0;
        }
    }, []);

    
    return (
        <>
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente-perfil">
                            <Senha />
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}