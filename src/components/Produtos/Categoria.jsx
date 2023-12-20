import ProdutoImg from "../../../public/1-3.c61791ccd7918b53df6e.jpg"
import Image from "next/image"
import Link from "next/link"
import { AiFillHeart, AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoBagAddOutline } from "react-icons/io"
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { ProductContext } from "@/pages/produtos";
import { ContextHelper } from "@/helpers/contexts";
import axios from "axios";


export const Categoria = ({ ...props }) => {
    const [count, setCount] = useState()

    const { categoria, sub_categoria } = props.items

    //console.log(props.items)

    if (!sub_categoria) {
        return (
            <Link
                className="text-500"
                href={`/categoria/${categoria.url}`}
            >
                {categoria && categoria.categoria}
            </Link>
        )
    }

    return (
        <>
            <Link
                className="text-500"
                href={categoria ? `categoria/${categoria.url}` : "/categorias"}
            >
                {categoria && categoria.categoria}
            </Link>
            <span className="text-500">
                {" "}&amp;{" "}
            </span>
            <Link
                className="text-500"
                href={categoria ? `/categoria/${sub_categoria.url}` : "/categoria"}
            >
                {categoria && sub_categoria.categoria}
            </Link>
        </>
    )
}