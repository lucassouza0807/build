import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import Loading from "@/components/Loading";
import Head from "next/head";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import Image from "next/image";
import arte from "../../../public/1-3.c61791ccd7918b53df6e.jpg"
import { useRouter } from "next/navigation";

export default function MinhasArtes() {
    const router = useRouter()
    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0
        }

    }, []);


    return (
        <>
            <Head>
                <title>Meus Pedidos</title>
            </Head>
            <Menu />
            <main className="main">
                <section className="body-cliente mb-3">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <section className="user">
                                <div className="user-profile-container-site ">
                                    <div className="user-personal-data-container-site">
                                        <div className="col-12 text-center">
                                            <h3>Minhas artes</h3>
                                        </div>
                                        <div className="btn-adicionar">
                                            <Link href="/editor" alt="Criar Arte" className="btn btn-success">Criar nova arte</Link>
                                        </div>
                                        <div className="lista">
                                            <div className="p-0 card-body">
                                                <div className="tab-content">
                                                    <div
                                                        role="tabpanel"
                                                        id="react-aria736874926-9-tabpane-preview"
                                                        aria-labelledby="react-aria736874926-9-tab-preview"
                                                        className="fade tab-pane active show"
                                                    >
                                                        <div>
                                                            <div className="table-responsive">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">Arte</th>
                                                                            <th scope="col">Titulo</th>
                                                                            <th scope="col">Valor </th>
                                                                            <th scope="col">Status</th>
                                                                            <th scope="col"> Ação </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        <tr key={`pedidos-4`}>
                                                                            <td><Image src={arte} alt="imagem" width={100} height={100} /></td>
                                                                            <td>Titulo da nova arte</td>
                                                                            <td>R$ 57,44</td>
                                                                            <td className="text-warning">Aguardando</td>
                                                                            <td>
                                                                                <button type="button" className="d-flex btn btn-info" style={{ fontSize: '15px' }}><FiEdit /></button>
                                                                            </td>
                                                                        </tr>
                                                                        <tr key={`pedidos-4`}>
                                                                            <td><Image src={arte} alt="imagem" width={100} height={100} /></td>
                                                                            <td>Nova IA</td>
                                                                            <td>R$ 57,44</td>
                                                                            <td className="text-success">Aprovado</td>
                                                                            <td>
                                                                                <button type="button" className="d-flex btn btn-info" style={{ fontSize: '15px' }}><FiEdit /></button>
                                                                            </td>
                                                                        </tr><tr key={`pedidos-4`}>
                                                                            <td><Image src={arte} alt="imagem" width={100} height={100} /></td>
                                                                            <td>Arte</td>
                                                                            <td>R$ 57,44</td>
                                                                            <td className="text-danger">Reprovado</td>
                                                                            <td>
                                                                                <button type="button" className="d-flex btn btn-info" style={{ fontSize: '15px' }}><FiEdit /></button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}