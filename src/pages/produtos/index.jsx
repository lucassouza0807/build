import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import ProdutosIndex from "@/components/Produtos/ProdutosIndex";
import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Form, Card, Modal, Row, Dropdown, Accordion } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import numeral from 'numeral';
import { toBRLCurrency } from "@/components/Editor/control";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

export const ProductContext = createContext();

export const MenuLateral = ({ ...props }) => {

    const router = useRouter();
    const { total, range, data, setPage, perPage } = useContext(ProductContext);
    const [filter, setFilter] = useState([]);
    const [categorias, setCategorias] = useState()

    const { q, filtros } = router.query

    const [activeSection, setActiveSection] = useState(null);

    const [priceRange, setPriceRange] = useState([range.min, range.max]); // Initial price range
    const max = parseFloat(range.max)
    const min = parseFloat(range.min)

    const handleSliderChange = (value) => {
        setPriceRange(value);
    };

    const handleRemoveFilter = (f_to_remove) => {
        const uncheck_box = document.getElementById(f_to_remove.categoria)

        const n_filter = filter.filter(el => el.id !== f_to_remove.id)

        uncheck_box.checked = false;

        setFilter(prevFilter => [...n_filter]);

    }

    const toggleAccordion = (sectionNumber) => {
        setActiveSection((prevSection) => (prevSection === sectionNumber ? null : sectionNumber));
        const arrow = document.getElementById(`arrow-${sectionNumber}`);

        if (activeSection == sectionNumber) {
            arrow.classList.remove("arrow-180")

            arrow.classList.add("arrow-normal")

            return 0;
        }

        arrow.classList.add("arrow-180")

    };


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}listar-categorias`)
            .then((response) => {
                setCategorias(response.data)
            })
            .catch((error) => {

            })
    }, [])


    useEffect(() => {
        const IDS = []


        if (router.pathname == "/categoria/[categoria]") {
            if (filter) {
                filter.map((item, index) => IDS.push(item.id))
                router.push({
                    pathname: `${router.query.categoria}`,
                    query: {
                        q: q,
                        filtros: IDS.join(),
                        per_page: perPage
                    }
                })
            }
            return
        }

        if (filter) {
            filter.map((item, index) => IDS.push(item.id))
            router.push({
                pathname: router.pathname,
                query: {
                    q: q,
                    filtros: IDS.join(),
                    per_page: perPage
                }
            })
        }

    }, [filter, perPage])

    useEffect(() => {
       /*  const price_range_bar = document.getElementsByClassName("slider");

        //price_range_bar[0].id = "price_bar"

        const price_bar = document.getElementById("price_bar")

        price_bar.addEventListener("mouseup", () => {
            data.reverse()
        })
 */
    }, [priceRange])


    const handleFilter = (e, item) => {
        if (e.target.checked == true) {
            //const n_duplicates = filter.filter((el => el.categoria == item.categoria))
            setFilter(prevState => [...prevState, { ...item }])

            //console.log(n_duplicates)

            return 0;
        }

        const n_duplicates = filter.filter((el => el.id !== item.id))
        setFilter(prevState => [...n_duplicates])


    }

   
     return (
        <>
            <div className="filter_menu p-3">
                {q &&
                    <div className="mb-3">
                        <strong className="">Você pesquisou por: {q}</strong>
                    </div>

                }
                {filter.length >= 1 &&
                    <>
                        <div>
                            <p>Seus filtros</p>
                            <div className="filter-box">
                                {filter.map((item, index) =>
                                    <div
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleRemoveFilter(item)}
                                        id={`${item.categoria}-${index}`}
                                        className="applied_filters"
                                        key={index}
                                    >
                                        <span>{item.categoria}</span>
                                        <span>
                                            <IoCloseSharp />
                                        </span>
                                    </div>
                                )}

                            </div>
                        </div>
                    </>

                }
                <div className="filter_cat">
                    <div>
                        <div className="accordeon-n-bootstrap">
                            <div className="accrdx">
                                <div className="accordeon-n-bootstrap-title">
                                    <div className="d-flex flex-row">
                                        <div className="ft d-flex flex-row" onClick={() => toggleAccordion("price-range")}>
                                            Preço
                                            <div className="mx-3">
                                                <IoIosArrowDown id={`arrow-price-range`} className="arrow" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`accordeon-n-bootstrap-section ${activeSection === "price-range" ? 'activex' : ''}`} id={`section`}>
                                        <p>Intervalo de preco</p>
                                        <p> {toBRLCurrency(priceRange[0]).formattedNumber} - {toBRLCurrency(priceRange[1]).formattedNumber}</p>
                                        <Slider
                                            className="slider"
                                            id="slider"
                                            min={min}
                                            max={max}
                                            range
                                            step={0.50}
                                            value={priceRange}
                                            pushable={true}
                                            onChange={handleSliderChange}
                                        />
                                    </div>
                                </div>
                                <div className="accordeon-n-bootstrap-title">
                                    <div className="d-flex flex-row">
                                        <div className="ft d-flex flex-row" onClick={() => toggleAccordion("categoria")}>
                                            Categorias
                                            <div className="mx-3">
                                                <IoIosArrowDown id={`arrow-categoria`} className="arrow" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`accordeon-n-bootstrap-section ${activeSection === "categoria" ? 'activex' : ''}`} id={`section`}>
                                        {categorias && categorias.map((item, index) =>
                                            <div key={index} >
                                                <div className="cat_opt" >
                                                    <Form.Check id={item.categoria} value={item.categoria} onClick={(e) => handleFilter(e, item)} />
                                                    <Form.Label className="mx-2">
                                                        <span className="title-f">
                                                            {item.categoria}
                                                        </span>
                                                    </Form.Label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    ) 
}
export default function Produtos({ ...props }) {
    //const [currentPage, setCurrentPage] = useState(0);
    const { results } = props;
    const router = useRouter();
    const [perPage, setPerPage] = useState(10);

    const { links, current_page, data, last_page, total } = results.dados;
    const { range } = results
    
    return (
        <>
            <Head>
                <title>Lista de artes</title>
            </Head>
            <ProductContext.Provider value={{ links, current_page, data, last_page, total, range, setPerPage, perPage }} >
                <Menu />
                <main className="main">
                    <div className="pt-7">
                        <div className="index-products">
                            <div className="card menu-lat">
                                <MenuLateral />
                            </div>
                            <ProdutosIndex />
                        </div>
                    </div>
                </main>
                <Footer />
            </ProductContext.Provider>
        </>

    )
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { filtros, per_page, page } = query
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}catalogo-estoque?categorias=${filtros}&per_page=${per_page}$page=${page}`);
    const data = await res.json();

    return {
        props: {
            results: data,
            d: query

        }
    }
} 