import { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { celular } from "@/helpers/validacao";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
export default function ParaEmpresa() {

    const [telefone, setTelefone] = useState();
    const [videoModal, setVideoModal] = useState(false);

    function telefoneCelular(value) {
        setTelefone(celular(value));
    }

    const enviarContato = async (dados) => {
        dados.preventDefault();
        let email = dados.target.email.value;
        let nome = dados.target.nome.value;
        let razao = dados.target.empresa.value;
        let celular = dados.target.celular.value;
        let verificaNome = nome.split(" ");

        let dadosFormulario = { nome: nome, email: email, celular: celular, razao_social: razao }

        if (!verificaNome[1]) {
            toast.error("Digita o nome e o sobrenome", {
                theme: 'light',
                position: "bottom-right"
            });
            return;
        } else {

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}envio-dados`, dadosFormulario)
                .then((response) => {
                    toast.success("Email enviado com sucesso", {
                        theme: 'light',
                        position: "bottom-right"
                    });
                })
                .catch((error) => {
                    toast.error("Falha ao entra em contato com a nossa equipe", {
                        theme: 'light',
                        position: "bottom-right"
                    });
                });

        }

    }

    return (
        <>
            <div className="top-empresa">
                <div className="info-top">
                    <h1>Mais valor para sua empresa</h1>
                    <div className="line-top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="437" height="34" viewBox="0 0 487 34" fill="none">
                        <path d="M4 30C73.6307 10.3798 266.914 -17.0885 483 30" stroke="black" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                    </div>
                    <p className="info">
                        Let's make your work more organize and easily using the Taskio Dashboard with many of the latest featuresin managing work every day.
                    </p>
                    <div className="btn-empresa">
                        <Link className="btn btn-success cadastre-se" href="cadastro" alt="cadastro">Cadastre-se</Link>
                        <div alt="Ver video" onClick={() => setVideoModal(true)} className="video-play"><CiPlay1 /> Ver video</div>
                    </div>
                </div>
                <div className="image-top"></div>
            </div>
            <div className="empresas-clientes">
                <div className="title-empresas">As empresas que confiam em nossos serviços e produtos</div>
                <div className="logo-empresas"></div>
            </div>
            <div className="valores-infos">
                <div className="preco-dados">
                    <h2>Preço mínimo, impacto gigante</h2>
                    <p>Qual o valor de 1 Sticker? Para o seu negócio, alguns centavos, para um cliente ou colaborador que ganhou como presente, não tem preço.</p>
                    <div className="btn-cadastre">
                        <Link className="btn btn-success cadastre-se" href="cadastro" alt="cadastro">Cadastre-se</Link>
                    </div>
                </div>
                <div className="info-vantagens">
                    <div className="info-vantagem">
                        <div className="icon"><FaCheck /></div>
                        <div className="info-dados">
                            <div className="title-vantagem">Alta durabilidade</div>
                            <div className="p-vantagem">Materiais de altíssima qualidade e feitos para durar</div>
                        </div>
                    </div>
                    <div className="info-vantagem">
                        <div className="icon"><FaCheck /></div>
                        <div className="info-dados">
                            <div className="title-vantagem">Cores mais vivas</div>
                            <div className="p-vantagem">Até 16 milhões de cores a seu dispor</div>
                        </div>
                    </div>
                    <div className="info-vantagem">
                        <div className="icon"><FaCheck /></div>
                        <div className="info-dados">
                            <div className="title-vantagem">Tecnologia de ponta</div>
                            <div className="p-vantagem">Equipamentos de última geração adequados para cada material</div>
                        </div>
                    </div>
                    <div className="info-vantagem">
                        <div className="icon"><FaCheck /></div>
                        <div className="info-dados">
                            <div className="title-vantagem">À prova d’água</div>
                            <div className="p-vantagem">Opções de materiais que não desbotam ao contato com a água</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="facilidades">
                <div className="exclusivo-empresa">
                    <h2>Facilidades exclusivas para empresas:</h2>
                    <div className="exclusivo-topicos">
                        <div className="topico">
                            <div className="icon"><FaCheck /></div>
                            <div className="p-topico">Prazo de entrega diferenciado</div>
                        </div>
                        <div className="topico">
                            <div className="icon"><FaCheck /></div>
                            <div className="p-topico">Atendimento exclusivo</div>
                        </div>
                        <div className="topico">
                            <div className="icon"><FaCheck /></div>
                            <div className="p-topico">Opção de pagamento faturado</div>
                        </div>
                        <div className="topico">
                            <div className="icon"><FaCheck /></div>
                            <div className="p-topico">Amostras</div>
                        </div>
                        <div className="topico">
                            <div className="icon"><FaCheck /></div>
                            <div className="p-topico">Garantias especiais</div>
                        </div>
                    </div>
                    <div className="btn-cadastre">
                        <Link className="btn btn-success cadastre-se" href="cadastro" alt="cadastro">Cadastre-se</Link>
                    </div>
                </div>
                <div className="image-exclusivo">

                </div>
            </div>
            <div className="contato-empresa p-7 card mb-7 mt-5">
                <h2>Entre em contato com a nossa equipe</h2>
                <form method="post" onSubmit={(e) => enviarContato(e)}>
                    <label className="form-label">Nome</label>
                    <input type="text" className="form-control" name="nome" placeholder="Digita o seu nome completo" required />
                    <label className="form-label">Nome da empresa</label>
                    <input type="text" className="form-control" name="empresa" placeholder="Digita o seu nome da empresa" required />
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Digita o seu email" required />
                    <label className="form-label">Celular</label>
                    <input type="tel" className="form-control" name="celular" placeholder="Digita o seu número do celular" onChange={(e) => telefoneCelular(e.target.value)} value={telefone} required />
                    <label className="form-label">Mensagem</label>
                    <textarea name="menssagem" id="" cols="30" className="form-control" rows="10" placeholder="Digita a mensagem"></textarea>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success mt-3" type="submit" name="enviar">Enviar</button>
                    </div>
                </form>
            </div>

            <Modal
                show={videoModal}
                onHide={() => setVideoModal(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Video de apresentação</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column align-items-center justify-content-center">

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
