
import Image from "next/image";
import image from "../../../public/1-3.c61791ccd7918b53df6e.jpg";
import { LuPaintbrush } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
export default function BuscaArtista() {
    const [criadores, setCriadores] = useState(null);
    const buscaCriador = async (e) => {
        e.preventDefault()
        let nome = e.target.nome;

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}busca-criador`, {nome: nome.value})
            .then(response => {
                setCriadores(response.data)
            })
            .catch(error => console.log(error));

    }
    return (
        <>
            <div className="busca-artista">
                <div className="titulo-busca-artista"> <LuPaintbrush /> Encontre um artista </div>
                <div className="busca-artista-dados">
                    <form onSubmit={(e) => buscaCriador(e)}>
                        <div className="input-artista">
                            <input type="text" placeholder="Digita o nome do artista que deseja ver" name="nome" />
                            <button type="submit"><CiSearch /></button>
                        </div>
                    </form>
                    <div className="artistas-resultados">
                        {criadores && criadores.map((criado) => {
                            return(
                                <Link href={`/artista/${criado.id}`} key={`busca-criador-${criado.id}`} alt={criado.nome}>
                                <div className="card-artista-busca">
                                    <div className="imagem-artista-busca"><Image src={image} alt="artista" /></div>
                                    <div className="info-artista-busca">{criado.nome}</div>
                                </div>
                                </Link>
                            )
                        })}
                        
                    </div>
                </div>
            </div>
        </>
    )
}