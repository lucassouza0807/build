import "@/styles/globals.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axios from "axios";

import { ContextHelper } from "@/helpers/contexts";
export default function App({ Component, pageProps }) {

  const [dadosPerfil, setDadosDoPerfil] = useState();
  const [countPerfil, setCountPerfil] = useState();
  const [isChanged, setIsChanged] = useState(null);
  const [isLoading, setIsLoading] = useState();
  const [results, setResults] = useState({});

  useEffect(() => {

    const awaitToken = async () => {
      let token = localStorage.getItem('tokenCliente');

      if (token) {

        return new Promise(async (resolve, reject) => {
          await axios.get(`${process.env.NEXT_PUBLIC_API_URL}pessoa-perfil`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }).then((response) => {
            setDadosDoPerfil(prevState => response.data);
            setCountPerfil(prevState => response.data.cpfcnpj);

            resolve()
            
          }).catch(error => {
            reject({
              "message": "Erro ao obter token"
            })
          });

        })


      }
    }

    awaitToken().then((data) => {}).catch((error) =>{});

  }, []);

  return (
    <>
      <ContextHelper.Provider value={{ isLoading, setIsLoading, dadosPerfil, setDadosDoPerfil, countPerfil, setCountPerfil, isChanged, setIsChanged, results, setResults }}>
        <Component {...pageProps} />
        <ToastContainer />
      </ContextHelper.Provider>
    </>
  )
}
