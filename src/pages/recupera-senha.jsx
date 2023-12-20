import Footer from "@/components/Footer";
import Menu from "@/components/Menu";
import axios from "axios";
import Head from "next/head";
import { toast } from "react-toastify";

export default function recuperaSenha(){
    const enviarLink = async (e) => {
        e.preventDefault();
        let email = e.target.email;
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}recuperar-senha`, {email: email.value, url: 'http://localhost:3005/alterar-senha'})
        .then((response) => {
            toast.success("Link enviado com sucesso.", {
                theme: "light",
                position: "bottom-right"
            });
        })
        .catch(error => {
            toast.error(error.response.data.message, {
                theme: 'light',
                position: "bottom-right"
            });
        })
    } 
    return(
        <>
        <Head>
            <title>Recupera senha</title>
        </Head>
        <Menu />
            <div className="container pt-7 mb-8">
                <div className="row flex-center ">
                    <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card">
                            <div className="card-body p-4 p-sm-5">
                                <div className="row flex-between-center mb-2">
                                    <div className="col-12 text-center">
                                        <h5>Digita o email</h5>
                                    </div>
                                </div>
                                <form onSubmit={(e) => enviarLink(e)}>
                                    <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Digita o email" required /></div>
                                    <div className="mb-3"><button className="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Enviar</button></div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}