import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import DadosEmpresa from "@/components/Client/DadosEmpresa";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

export default function EmpresaCliente() {
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0;
        }

        profileData().then((data) => {
            setLoading(false);
        });
    }, []);
    return (
        <>
            {loading ? (<Loading />) : ''}
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="container-cliente">
                            <DadosEmpresa />
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}


const profileData = async () => {
    let token = localStorage.getItem('tokenCliente');
        if (token) {

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}pessoa-perfil`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
        
            const data = await res.json();
            return data;
        }
       
}
