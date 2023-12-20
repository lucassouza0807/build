import { BiSolidRightArrow } from "react-icons/bi";
import Typed from 'react-typed';
import Link from "next/link";
export default function Topo() {
  return (
    <>
      <section className="py-0 overflow-hidden" id="banner" data-bs-theme="light">
        <div
          className="bg-holder overlay"
          style={{
            backgroundImage: "url(../assets/img/generic/bg-2.jpg)",
            backgroundPosition: "center bottom"
          }}
        />
        <div className="container">
          <div className="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
            <div className="col-md-11 col-lg-8 col-xl-4 pb-7 pb-xl-9 text-center text-xl-start">
              <h1 className="text-white fw-light">
                Mais{" "}
                <span className="typed-text fw-bold">
                  <Typed
                    strings={[
                      'qualidade',
                      'durabilidade',
                      'elegância',
                      'modernidade',
                      'flexibilidade',
                      'criatividade',
                    ]}
                    typeSpeed={100}
                    backSpeed={50}
                    backDelay={1000}
                    loop
                    showCursor
                    style={{
                      fontWeight: '600',
                    }}
                  />
                </span>
                <br />
                para seus adesivos
              </h1>
              <p className="lead text-white opacity-75">
                <b>Fácil, intuitivo e rápido!</b>
                <br />
                Você mesmo pode criar seus adesivos em nosso site e receber aonde
                quiser.
                <br />
                <b>Comprou, chegou, GRUDOU!</b>
              </p>
              <Link
                className="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2"
                href="/editor"
              >
                Criar agora
                <BiSolidRightArrow className='ms-2' style={{ fontSize: '14px' }} />
              </Link>
            </div>
            <div className="col-xl-7 offset-xl-1 align-self-end mt-4 mt-xl-0">
              <a
                className="img-landing-banner rounded"
                href="https://prium.github.io/falcon/v3.18.0/index.html"
              >
                <img
                  className="img-fluid d-dark-none"
                  src="../assets/img/generic/Stickers-provisorios-1.avif"
                  alt=""
                />
                <img
                  className="img-fluid d-light-none"
                  src="../assets/img/generic/Stickers-provisorios-1.avif"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}