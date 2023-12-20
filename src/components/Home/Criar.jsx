import { BiSolidRightArrow } from "react-icons/bi";
import Link from "next/link";
export default function CriarPedido() {
  return (
    <>

      <section className="bg-dark" data-bs-theme="light">
        <div
          className="bg-holder overlay"
          style={{
            backgroundImage: "url(../assets/img/generic/bg-2.jpg)",
            backgroundPosition: "center top"
          }}
        />
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <p className="fs-3 fs-sm-4 text-white">
                Desperte sua criatividade com a GRUDOU!
                <br /> Crie seus adesivos personalizados conosco e dê vida às suas
                ideias. Seu design, sua expressão, nossa impressão de alta
                qualidade.
              </p>
              <Link className="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" href="/editor" alt="Criar agora">
                Criar agora
                <BiSolidRightArrow className='ms-2' style={{ fontSize: '14px' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}