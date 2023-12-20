import { ContextHelper } from "@/helpers/contexts";
import { useEffect, useState, useContext } from "react";
import { HiOutlineShoppingBag, } from "react-icons/hi";
import { AiOutlineSearch, AiOutlineRise, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";



export const Entra = async (e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const senha = e.target.senha.value;
    
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}pessoa-entrar`, {
        email: email,
        senha: senha
    }).then((response) => {
        const token = JSON.stringify(response.data.authorization.token);
        localStorage.setItem('tokenCliente', token.replace(/"/g, ''));
        setDadosDoPerfil(response.data.pessoa);
        router.push('/');
        toast.success('Usuário logado com sucesso', {
            theme: "light",
            position: "bottom-right"
        });
    }).catch(error => {
        toast.error(error.response.data.error, {
            theme: "light",
            position: "bottom-right"
        });
    }).catch(error => {
        toast.error('Erro na conexão com o servidor', {
            theme: "light",
            position: "bottom-right"
        });
    })
};

