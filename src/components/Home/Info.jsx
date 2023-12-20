export default function InfoHome() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="row justify-content-center text-center">
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <h1 className="fs-2 fs-sm-4 fs-md-5">
                                Facilidade e praticidade com poucos cliques
                            </h1>
                            <p className="lead">
                                Veja como é simples criar e receber sues adesivos com a GRUDOU.
                            </p>
                        </div>
                    </div>
                    <div className="row flex-center mt-8">
                        <div className="col-md col-lg-5 col-xl-4 ps-lg-6">
                            <img
                                className="img-fluid px-6 px-md-0"
                                src="../assets/img/icons/spot-illustrations/50.png"
                                alt=""
                            />
                        </div>
                        <div className="col-md col-lg-5 col-xl-4 mt-4 mt-md-0">
                            <h5 className="text-danger">
                                <span className="far fa-lightbulb me-2" />
                                CRIAÇÃO
                            </h5>
                            <h3>Editor de adesivos </h3>
                            <p>
                                Acesse o editor em nosso site e use a criatividade para montar
                                seus adesivos. Você também pode usar um dos modelos para se
                                inspirar e modificar como quiser.
                            </p>
                        </div>
                    </div>
                    <div className="row flex-center mt-7">
                        <div className="col-md col-lg-5 col-xl-4 pe-lg-6 order-md-2">
                            <img
                                className="img-fluid px-6 px-md-0"
                                src="../assets/img/icons/spot-illustrations/49.png"
                                alt=""
                            />
                        </div>
                        <div className="col-md col-lg-5 col-xl-4 mt-4 mt-md-0">
                            <h5 className="text-info">
                                {" "}
                                <span className="far fa-object-ungroup me-2" />
                                CONFIRMAÇÃO
                            </h5>
                            <h3>A certeza que você receberá o que pediu</h3>
                            <p>
                                Confirme os adesivos que criou em nosso editor: tipo de papel,
                                quantidade, e tipo de corte.
                            </p>
                        </div>
                    </div>
                    <div className="row flex-center mt-7">
                        <div className="col-md col-lg-5 col-xl-4 ps-lg-6">
                            <img
                                className="img-fluid px-6 px-md-0"
                                src="../assets/img/icons/spot-illustrations/48.png"
                                alt=""
                            />
                        </div>
                        <div className="col-md col-lg-5 col-xl-4 mt-4 mt-md-0">
                            <h5 className="text-success">
                                <span className="far fa-paper-plane me-2" />
                                PEDIDO
                            </h5>
                            <h3>Os detalhes finais...</h3>
                            <p>
                                Informe dados de entrega e escolha a opção de pagamento desejada.
                                Agora é com a GRUDOU!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}