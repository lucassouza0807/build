import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextHelper } from "@/helpers/contexts";
import Image from "next/image";
import avatar from "../../../public/avatar-1.jpg";
import { FaCamera } from "react-icons/fa";
import { useDropzone } from 'react-dropzone';
const { v4: uuidv4 } = require('uuid');
import { sizes } from "@/helpers/validacao";

export default function Perfil() {
    const { dadosPerfil, setDadosDoPerfil } = useContext(ContextHelper)

    const [dadosAtualizado, setDadosAtualizado] = useState();
    const [img, setImg] = useState();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg']
        },

        onDrop: async acceptedFiles => {
            const img = acceptedFiles[0];
            setImg(acceptedFiles[0]);

            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            reader.onload = async () => {
                const bin_img = reader.result;
                const x = {
                    cover: false,
                    index: img.path,
                    base_64: bin_img,
                    type: img.type.replace('image/', ''),
                    name: uuidv4()
                };

                try {
                    const response = await axios.post("http://localhost:3030/upload.php", { imagens: [x] });
                    // Faça o que for necessário com a resposta do servidor
                    const imagem = response.data.src[0];
                    setDadosAtualizado(dadosAtualizado => ({
                        ...dadosAtualizado,
                        ['foto']: imagem
                    }));
                } catch (error) {
                    console.error(error);
                }
                
            };
            if(acceptedFiles[0]){
                reader?.readAsDataURL(img);
              }

        }

    });

    const editarPessoa = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('tokenCliente');
  
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}editar-pessoa/${dadosPerfil.id}`, dadosAtualizado, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
        .then((response) => {
            setDadosDoPerfil(response.data.fresh);
            toast.success(`Dados do atualizado com sucesso`, {
                theme: 'light',
                position: "bottom-right"
            });
        }).catch(error => {1
            const e = error.response.data.errors;
            Object.keys(e).map(i => {
                toast.error(e[`${i}`][0].replace("campo", " "), {
                    theme: 'light',
                    position: "bottom-right"
                });
            });
        });
        
    }
    const handleDadosChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setDadosAtualizado(dadosAtualizado => ({
            ...dadosAtualizado,
            [key]: value
        }));
    }

    return (
        <>
            <Head>
                <title>Meu perfil</title>
            </Head>
            <div className="container">
                <div className="row flex-center ">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-12 text-center">
                                        <h5>Dados básicos</h5>
                                    </div>
                                </div>
                                <form onSubmit={(e) => editarPessoa(e)}>
                                    <div className="mb-3 d-flex justify-content-center pefil-pessoa">
                                        <div className="avatar avatar-5xl d-flex">
                                            <label htmlFor="foto-pessoa">
                                                <div className="foto-perfil"><p><FaCamera /></p></div>
                                                <input type="file" name="foto-pessoa" id="foto-pessoa" {...getInputProps()} />
                                            </label>
                                            {dadosPerfil && dadosPerfil.foto ? (
                                                <Image sizes={sizes} width={100} height={100} className="rounded-circle" src={img ? URL.createObjectURL(img) : dadosPerfil.foto} alt="foto de perfil" />
                                            ) : (
                                                <Image sizes={sizes} width={100} height={100} className="rounded-circle" src={img ? URL.createObjectURL(img) : avatar} alt="foto de perfil" />
                                            )}

                                        </div>
                                    </div>
                                    <div className="mb-3"><input className="form-control" type="text" name="nome" placeholder="Digita o seu nome" onChange={(e) => { handleDadosChange(e) }} defaultValue={dadosPerfil ? dadosPerfil.nome : ''} /></div>
                                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Digita o email" onChange={(e) => { handleDadosChange(e) }} defaultValue={dadosPerfil ? dadosPerfil.email : ''} /></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Atualizar</button></div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}