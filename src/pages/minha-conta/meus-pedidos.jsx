import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import MenuCliente from "@/components/Client/MenuCliente";
import Loading from "@/components/Loading";
import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import arte from "../../../public/1-3.c61791ccd7918b53df6e.jpg";
import Link from "next/link";
import axios from "axios";
import { ContextHelper } from "@/helpers/contexts";
import { toBRLCurrency, formatDateFromLaravel } from "@/components/Editor/control";
import Pagination from 'react-bootstrap/Pagination';
import { useRouter } from "next/navigation";

export default function MeusPedidos() {
    const [loading, setLoading] = useState(true);
    const [detalhePedido, setDetalhePedido] = useState(false);
    const [pedidos, setPedidos] = useState();
    const [links, setLinks] = useState();
    const [currentLink, setCurrentLink] = useState(`${process.env.NEXT_PUBLIC_API_URL}listar-pedidos-cliente/:id`)
    const [currentPage, setCurrentPage] = useState(1)
    const [itensPedido, setItensPedido] = useState();
    const [lastPage, setLastPage] = useState();
    const [detalhesPedido, setDetalhesPedidp] = useState();
    

    const [numPedido, setNumPedido] = useState()

    const { dadosPerfil } = useContext(ContextHelper);

    const router = useRouter()

    useEffect(() => {
        let token = localStorage.getItem('tokenCliente');
        if (!token) {
            router.push("/");

            return 0;
        }

    }, []);

    useEffect(() => {
        if (numPedido) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}lista-itens-pedido/${numPedido.id_pedido}/${numPedido.numero_pedido}`)
                .then((response) => {
                    setItensPedido(prevState => response.data)
                })
                .catch((error) => {
                    //console.log(error.response)
                })

        }

    }, [numPedido])


    useEffect(() => {
        const id = localStorage.getItem("_id_id_")

        if (currentLink == null || undefined) {
            setCurrentLink(prevState => `${process.env.NEXT_PUBLIC_API_URL}listar-pedidos-cliente/:id`)

            return;
        }

        axios.get(`${currentLink.replace(/:id/, id)}`)
            .then((response) => {
                //console.log(response.data.links)
                setLinks(response.data.links)
                setCurrentPage(response.data.currentPage)
                setPedidos(response.data.data)
                setLastPage(response.data.last_page)
            })
            .catch((error) => {
                //console.log(error.response)
            })


    }, [currentLink])

    return (
        <>
            {/* { loading ? (<Loading />) : '' } */}
            <Head>
                <title>Meus Pedidos</title>
            </Head>
            <Menu />
            <main className="main">
                <section className="body-cliente">
                    <div className="container">
                        <MenuCliente />
                        <div className="cliente">
                            <section className="user">
                                <div className="user-profile-container-site">
                                    <div className="user-personal-data-container-site">
                                        <div className="col-12 text-center">
                                            <h2>Meus Pedidos</h2>
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
                                                                            <th scope="col">#</th>
                                                                            <th scope="col">Data</th>
                                                                            <th scope="col">Método</th>
                                                                            <th scope="col">Valor Total	</th>
                                                                            <th scope="col">Status</th>
                                                                            <th className="text-center" scope="col"> Ação </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {pedidos && pedidos.map((item, key) => {
                                                                            let valor = parseFloat(item.custo_total) + parseFloat(item.custo_frete);
                                                                            return (
                                                                                <tr key={key}>
                                                                                    <td>{item.numero_pedido}</td>
                                                                                    <td>{formatDateFromLaravel(item.created_at)}</td>
                                                                                    <td>{item.forma_pgmt.toUpperCase()}</td>
                                                                                    <td>{toBRLCurrency(valor).formattedNumber}</td>
                                                                                    <td>{item.sit_pedido}</td>
                                                                                    <td className="d-flex justify-content-end">
                                                                                        <button type="button" className="me-2 btn btn-success" style={{ fontSize: '10px' }}>NOTA FISCAL</button>
                                                                                        <button type="button" className="me-2 btn btn-warning" style={{ fontSize: '10px' }}>RASTREIO</button>
                                                                                        <button
                                                                                            type="button"
                                                                                            className="me-2 btn btn-info"
                                                                                            style={{ fontSize: '10px' }}
                                                                                            onClick={() => {

                                                                                                setNumPedido({
                                                                                                    "id_pedido": item.id,
                                                                                                    "numero_pedido": item.numero_pedido,

                                                                                                })

                                                                                                setDetalhesPedidp({
                                                                                                    "endereco": item.endereco,
                                                                                                    "pagmt": item.forma_pgmt
                                                                                                })
                                                                                                setDetalhePedido(prevState => true);

                                                                                            }}
                                                                                        >
                                                                                            VER PEDIDO
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                                <Pagination>
                                                                    {links && links.map((item, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <Pagination.Item
                                                                                    style={{
                                                                                        backgroundColor: currentPage && currentPage == item.label ? "lightgrey" : ""
                                                                                    }}
                                                                                    onClick={() => setCurrentLink(item.url)}
                                                                                >
                                                                                    {item.label.replace("&raquo;", "").replace("&laquo;", "")}
                                                                                </Pagination.Item>
                                                                            </div>

                                                                        )
                                                                    })}
                                                                </Pagination>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <Modal
                                show={detalhePedido}
                                onHide={() => setDetalhePedido(false)}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">Detalhe do pedido</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="d-flex"><b>Endereço: </b>
                                        <span className="px-2">
                                            {detalhesPedido && detalhesPedido.endereco.logradouro}, Nº: {detalhesPedido && detalhesPedido.endereco.numero}, {detalhesPedido && detalhesPedido.endereco.cidade}, {detalhesPedido && detalhesPedido.endereco.estado}
                                        </span></div>
                                    <div className="d-flex"><b>Status</b> <span className="px-2"> Aguardando Coleta da Transportadora</span></div>
                                    <div className="d-flex"><b>Forma De Pagamento</b><span className="px-2">{detalhesPedido && detalhesPedido.pagmt}</span></div>
                                    <hr />
                                    <div>
                                        <div className="table-responsive table-overview">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Imagem</th>
                                                        <th scope="col">Arte</th>
                                                        <th scope="col">Criador</th>
                                                        <th scope="col">valor</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {itensPedido && itensPedido.map((item, index) =>
                                                        <tr key={`item-${index}`}>
                                                            <td><Image src={item.produto.cover} alt="imagem" width={100} height={100} /></td>
                                                            <td>{item.produto.nome}</td>

                                                            <td>
                                                                {item.id_artista == null
                                                                    ? <span>Grudou</span>
                                                                    : <Link href={`artista/${item.id_artista}`}>Luzars</Link>
                                                                }
                                                            </td>
                                                            <td>{toBRLCurrency(item.total).formattedNumber}</td>

                                                        </tr>

                                                    )}

                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    )
}
