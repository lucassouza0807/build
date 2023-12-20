import Login from "@/components/Authentication/Login";
import Head from "next/head";
import { useRouter } from "next/router";
import { ContextHelper } from "@/helpers/contexts";
import { useContext } from "react";

export default function Entra(){
    const router = useRouter()
    const { callback } =  router.query;

    const { dadosPerfil} = useContext(ContextHelper);

    return(
        <>
        <Head>
            <title>Entrar</title>
        </Head>
        <Login />
        </>
    )
}