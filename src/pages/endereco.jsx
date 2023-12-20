import EnderecoCadastro from "@/components/Authentication/EnderecoCadastro";
import Head from "next/head";

export default function Endereco() {
    return(
        <>
        <Head>
            <title>Cadastra o endereço</title>
        </Head>
            <EnderecoCadastro />
        </>
    )
}