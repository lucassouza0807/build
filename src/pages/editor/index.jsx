import Footer from "@/components/Footer";
import ProdutosIndex from "@/components/Produtos/ProdutosIndex";
import { createContext, useEffect, useState } from "react";
import EditorComponent from "@/components/Editor/Editor";
import Menu from "@/components/Menu";
import { useRouter } from "next/router";
import axios from "axios"

export const MeusProjetos = () => {
    return (
        <>
            <div className="meus-projeto">
                dasd
            </div>
        </>
    )
}
export default function Token({ ...props }) {
    const { results } = props;
    const router = useRouter();
    
    return (
        <>
            <Menu />
            <main className="editor-component mb-6">
                <EditorComponent />
            </main>
            <Footer />
        </>

    )
}
