import Head from 'next/head'

import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import { useRef, useEffect } from 'react';
import Destaque from '@/components/Home/Destaque';
import InfoHome from '@/components/Home/Info';
import Galeria from '@/components/Home/Galeria';
import CriarPedido from '@/components/Home/Criar';
import Topo from '@/components/Home/Topo';

export default function Home() {
  const typedTextRef = useRef(null);
  useEffect(() => {
    const typed = typedTextRef.current;

    if (typed) {
      // Inicia a animação após a montagem do componente
      typed.start();
    }
  }, []);

  return (
    <>
      <Head>

        <title>GRUDOU - Para empresas</title>

      </Head>
      <Menu />
      <main className="main" id="top">
        <Topo />
        <Destaque />
        <InfoHome />
        <Galeria />
        <CriarPedido />
      </main>
      <Footer />
    </>
  )
}
