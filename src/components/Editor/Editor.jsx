import React, { useContext, useState, useCallback, useRef } from 'react'
import { fabric } from 'fabric';
import { CiBaseball, CiZoomIn, CiZoomOut } from "react-icons/ci";
import { CiLock, CiUnlock } from "react-icons/ci";
import { PiPaintBrushBroadDuotone } from "react-icons/pi";
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react'
import { useDropzone } from 'react-dropzone'
import { FaEye } from "react-icons/fa";
import { useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import Image from 'next/image';
import Menu from '../Menu';
import { AiFillCloseCircle } from "react-icons/ai";
import { BsCloudUpload, BsCardImage } from "react-icons/bs";
import { handleDiscount } from '@/helpers/discountHelper';
import { deleteIcon, cloneIcon, deleteObject, cloneObject, renderIcon, SVGS, imagens, toBRLCurrency } from './control';
import { FiLayers } from "react-icons/fi";
import { BsBox } from "react-icons/bs";
import { BiImages } from "react-icons/bi";
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button, Card, Col, Row, Form, ButtonGroup } from 'react-bootstrap';
import { FaWindowClose } from "react-icons/fa";
import { ContextHelper } from "@/helpers/contexts";
import { toast } from "react-toastify";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditorComponent = () => {
    const [tabs, setTabs] = useState("imagens");
    const [colorPick, setColorPick] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");
    const { editor, onReady } = useFabricJSEditor();
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState(false)
    const [zoom, setZoom] = useState();
    const [selectedLayer, setSelectedLayer] = useState(0);
    const [activeObjects, setAcitiveObjects] = useState();
    const [projects, setProjects] = useState();
    const [acitveProject, setActiveProject] = useState();
    const [unitPrice, setUnitPrice] = useState(29);
    const [cartCount, setCartCount] = useState(1);
    const [toEditNow, setToEditoNow] = useState();

    const { dadosPerfil, setDadosDoPerfil, countPerfil, isChanged, results, setResults } = useContext(ContextHelper)

    const canvas = new fabric.Canvas("c");
    const zoomRef = useRef();
    const backgroundColor = "#272c33";
    const router = useRouter();
    const { sticker_url } = router.query;

    canvas.includeDefaultValues = false;

    const saveProject = (e) => {
        e.preventDefault();

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}salvar-projeto`, {
            id: dadosPerfil.id,
            canvas_json: localStorage.getItem("editor_state"),
            nome_projeto: e.target.nome_projeto.value
        })
            .then((response) => {

                localStorage.setItem("client_project_name", JSON.stringify(response.data.fresh_project.nome_projeto));
                localStorage.setItem("editor_state", JSON.stringify(response.data.fresh_project.canvas_json))


                setActiveProject(JSON.parse(localStorage.getItem("editor_state")));

                toast.success('Projeto salvo', {
                    theme: "light",
                    position: "bottom-right"
                });

                setShowModal(false)

            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const makeObjectFreezable = (index) => {
        const objectToFreeze = editor?.canvas.item([parseInt(index)]);

        objectToFreeze.set({
            selectable: objectToFreeze.selectable == true ? false : true,
        })

        setAcitiveObjects(editor?.canvas.getObjects());

        editor?.canvas.renderAll();
    }

    const makeObjectVisible = (index) => {
        const objectToFreeze = editor?.canvas.item([parseInt(index)]);

        objectToFreeze.set({
            visible: objectToFreeze.visible == true ? false : true
        })

        setAcitiveObjects(editor?.canvas.getObjects());

        editor?.canvas.renderAll();
    }

    const selectObject = (index) => {
        setSelectedLayer(index)

        const selectObject = editor?.canvas.item([parseInt(index)]);

        if (selectObject) {
            editor?.canvas.setActiveObject(selectObject);

            setAcitiveObjects(editor?.canvas.getObjects());

            editor?.canvas.renderAll();

        }
    }

    const deleteObjectById = (index) => {
        //console.log(index)
        const objectToDelete = editor?.canvas.item(parseInt(index))

        editor?.canvas.remove(objectToDelete);

        setAcitiveObjects(editor?.canvas.getObjects());

        editor?.canvas.renderAll();
    }

    //Canvas funções nativas
    const addText = () => {

        const text = new fabric.Textbox("Difite seu texto", {
            width: 200,
            //render: renderIcon(cloneIcon)
        })

        text.set({
            "custom": {
                type: "text",
                src: "/"
            }
        })

        editor?.canvas.add(text)
        editor?.canvas.renderAll()
    }

    const onAddCircle = () => {
        editor?.addCircle()
    }
    const onAddRectangle = () => {
        editor?.addRectangle()
    }

    /**Upload de imagens */
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.svg']
        },

        onDrop: acceptedFiles => {

            acceptedFiles.forEach((file) => {
                const reader = new FileReader()

                reader.onabort = () => console.log('file reading was aborted')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = () => {
                    // Do whatever you want with the file contents
                    const bin_img = reader.result;

                    axios.post("api/upload", {
                        base_64: bin_img,
                        type: file.type.replace("image/", ""),
                        name: file.name
                    })
                        .then((response) => {
                        })
                        .catch((error) => {
                            //console.log(error)
                        })
                }

                const binary = reader.readAsDataURL(file);

            })


            setFiles([
                ...files,
                ...acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            ]);

        }

    });

    const handleZoom = (e) => {
        const zoom = e.target.value / 100;
        editor?.canvas.setZoom(zoom);

    }

    const handleZoomLess = (e) => {
        let zoom = editor?.canvas.getZoom()

        const zoom_index = zoom -= zoom * 0.20;

        if (zoom_index <= 0.5) {
            editor?.canvas.setZoom(0.5)
            zoomRef.current.value = 0.5 * 100;
            return 0;
        }

        zoomRef.current.value = zoom_index * 100;
        editor?.canvas.setZoom(zoom_index);
    }

    const handleZoomPlus = (e) => {
        let zoom = editor?.canvas.getZoom()
        const zoom_index = zoom += zoom * 0.20;

        const max_index = 1 * 250;

        if (zoom_index >= max_index) {
            editor?.canvas.setZoom(max_index)

            return 0;
        }

        zoomRef.current.value = zoom_index * 100;
        editor?.canvas.setZoom(zoom_index);
    }

    const onUpload = async () => {
        setUploadStatus("Uploading....");
        const formData = new FormData();
        files.forEach((image, key) => {
            formData.append("file", image.preview);
        });

        try {
            axios.post('http://127.0.0.1:8000/api/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                })
                .catch((error) => {
                    //console.log(error.response)
                })
                ;

            setUploadStatus("upload successful");
        } catch (error) {
            //console.log(error.response)
            setUploadStatus("Upload failed..");
        }
    };

    //Adiciona imagens ao ao canvas
    const addImg = (img_url) => {
        fabric.Image.fromURL(img_url, function (oImg) {


            oImg.scaleToWidth(150);
            oImg.scaleToHeight(150);

            oImg.set("custom", {
                src: "/" + img_url,
                type: "img"
            })

            editor?.canvas.add(oImg);
        });

    }



    const addImgFromUpload = (img_url) => {
        fabric.Image.fromURL(img_url, function (oImg) {
            oImg.scaleToWidth(150);
            oImg.scaleToHeight(150);

            oImg.set("custom", {
                src: img_url,
                type: "img"
            })

            editor?.canvas.add(oImg);
        });

    }

    function deleteObject(eventData, transform) {
        var target = transform.target;
        var canvas = target.canvas;
        canvas.remove(target);
        canvas.requestRenderAll();

        setAcitiveObjects(editor?.canvas.getObjects());

        editor?.canvas.renderAll();
    }

    const bringToFront = () => {
        let activeObj = editor?.canvas.getActiveObject();
        activeObj && editor?.canvas.bringToFront(activeObj).discardActiveObject(activeObj).renderAll();
    }

    const bringToBack = () => {
        let activeObj = editor?.canvas.getActiveObject();
        activeObj && editor?.canvas.sendToBack(activeObj).discardActiveObject(activeObj).renderAll();
    }

    //Salva o estado do objeto
    const saveState = () => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}  `);
        const x = editor?.canvas.getActiveObject();
        const j = JSON.stringify(editor?.canvas.toJSON(["custom"]));

        localStorage.setItem("editor_state", j);
    }

    const loadState = () => {
        const savedCanvasState = JSON.parse(localStorage.getItem("editor_state"));

        editor?.canvas.loadFromJSON(savedCanvasState, function () {
            canvas.renderAll();

        })

    }

    //Gerenciador de cores
    const handleColor = (e) => {

        const object = editor?.canvas.getActiveObject()._objects;
        const keys = Object.keys(editor?.canvas.getActiveObject())
        const diff_object = editor?.canvas.getActiveObject();

        if (keys.includes("_objects")) {
            object[e.target.id].fill = e.target.value;
            editor?.canvas.getActiveObject().set({
                fill: e.target.value
            })

            editor?.canvas.renderAll();

            return 0;

        }

        editor?.canvas.renderAll();

    }

    //Reseta o canvas
    const resetState = () => {
        localStorage.removeItem("editor_state")
        editor?.canvas.clear();
    }

    /**
     * Le um arquivo SVG podendo extrair suas propriedades
     */
    const addSVG = (svg_url) => {
        fabric.loadSVGFromURL(svg_url, (obj, options) => {
            const ob = fabric.util.groupSVGElements(obj, options);

            ob.set("custom", {
                type: "svg",
                src: "/" + svg_url
            })
            ob.scale(0.15);

            editor?.canvas.add(ob).renderAll();

        })
    }

    /**
     * Salva os campos pernonalizados do objeto
     * quando ele é clonado ou excluido
     */
    fabric.Object.prototype.toObject = (function (toObject) {
        return function (propertiesToInclude) {
            propertiesToInclude = (propertiesToInclude || []).concat(
                ["custom"] // Aqui passa os campos personalzados
            );
            return toObject.apply(this, [propertiesToInclude]);
        };
    })(fabric.Object.prototype.toObject);


    const showProjects = () => {
        setShowModal(true)
        if (dadosPerfil) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}ler-projetos/${dadosPerfil.id}`)
                .then((response) => {
                    setProjects(response.data.projetos)
                })
                .catch((error) => {
                    setProjects(null)
                })

        }
    }

/* 
    useEffect(() => {
        const sticker = localStorage.getItem("stickerToCustomize")
        if (sticker) {
            setToEditoNow(sticker)
            localStorage.setItem("is_editing_now", true)

        }

        if (localStorage.getItem("cartCount")) {
            setCartCount(parseInt(localStorage.getItem("cartCount")))
        }

        fabric.Image.fromURL(toEditNow, function (img) {
            img.center()
            img.scaleToWidth(150);
            img.scaleToHeight(150);
            img.set({

                custom: {
                    "src": sticker_url,
                    type: "img"
                }
            })
            editor?.canvas.add(img);

            editor?.canvas.renderAll();
        });




    }, [toEditNow])
 */

    useEffect(() => {
        /**
         * Carrega os SVGs e os adiciona ao canvas
         * é obrigatorio passar como argumento 
         * nas funções fabric.Object.Protorype.controls
         */
        const deleteImg = document.createElement('img');//Obrigatio 
        const cloneImg = document.createElement("img");//Obrigatorio
        deleteImg.src = deleteIcon;//Obrigatorio
        cloneImg.src = cloneIcon;//Obrigatorio
        const zoom = document.getElementById("zoom")


        /**
         * Clona o objeto selecionado
         */

        fabric.Object.prototype.controls.clone = new fabric.Control({
            x: -0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: -16,
            cursorStyle: 'pointer',
            mouseUpHandler: cloneObject,
            render: renderIcon(cloneImg),//Argumento da imagem passa aqui caso seja invalido o codigo vai quebrar
            cornerSize: 15
        });

        /**
         * Desativa o cache do objeto
         * Deixando a pagina mais perfomatica
         */
        fabric.Object.prototype.objectCaching = false;
        /**
         * Exclui o objeto selecionado
         */
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon(deleteImg),//Argumento da imagem passa aqui caso seja invalido o codigo vai quebrar
            cornerSize: 15
        });

        //Controles de texto
        //Clona o texto
        fabric.Textbox.prototype.controls.clone = new fabric.Control({
            x: -0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: -16,
            cursorStyle: 'pointer',
            mouseUpHandler: cloneObject,
            render: renderIcon(cloneImg),//Argumento da imagem passa aqui caso seja invalido o codigo vai quebrar
            cornerSize: 15
        });

        //Deleta o texto
        fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteObject,
            render: renderIcon(deleteImg),//Argumento da imagem passa aqui caso seja invalido o codigo vai quebrar
            cornerSize: 15
        });
        /**
         * Salva os estado do elemento selecionado 
         * quando o move.
         */

        editor?.canvas.on("selection:created", (ob) => {
            setColorPick(null)
            const x = editor?.canvas.getActiveObject();
            const j = JSON.stringify(editor?.canvas.toJSON(["custom"]));

            const key = Object.keys(editor?.canvas.getActiveObject())

            if (key.includes("custom")) {
                if (x.custom.type == "svg") {

                    setColorPick(x._objects)

                    return 0;
                }

            }

            localStorage.setItem("editor_state", j);
        })

        editor?.canvas.on("selection:updated", (ob) => {
            setColorPick(null)
            const x = editor?.canvas.getActiveObject();
            const j = JSON.stringify(editor?.canvas.toJSON(["custom"]));
            const key = Object.keys(editor?.canvas.getActiveObject())

            if (key.includes("custom")) {
                if (x.custom.type == "svg") {

                    setColorPick(x._objects)

                    return 0;
                }

            }

            localStorage.setItem("editor_state", j);

        })

        editor?.canvas.on("selection:cleared", () => {
            setColorPick(null)
        })

        editor?.canvas.on("after:render", () => {

        });

        editor?.canvas.on("object:moving", () => {
            const j = JSON.stringify(editor?.canvas.toJSON(["custom"]));
            localStorage.setItem("editor_state", j);
            const x = editor?.canvas.getActiveObject();

        })

        /**
         * Salva o estado do elemento 
         * quando ele é adicionado
         */
        editor?.canvas.on("object:added", (obj) => {

            setAcitiveObjects(editor?.canvas.getObjects())

            const j = JSON.stringify(editor?.canvas.toJSON(["custom"]));
            localStorage.setItem("editor_state", j);


        })

        editor?.canvas.on('mouse:wheel', function (opt) {
            var delta = opt.e.deltaY;
            var zoom = canvas.getZoom();
            zoom *= 0.999 ** delta;


            if (zoom > 20) zoom = 20;
            if (zoom < 0.01) zoom = 0.01;
            editor?.canvas.setZoom(zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();
        })



    }, [editor, canvas, activeObjects]);

    const Entra = async (e) => {
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

            toast.success('Usuário logado com sucesso', {
                theme: "light",
                position: "bottom-right"
            });
        }).catch((error) => {
            //console.log(error)
            toast.error(error.response.data.error, {
                theme: "light",
                position: "bottom-right"
            });
        }).catch((error) => {
            toast.error('Erro na conexão com o servidor', {
                theme: "light",
                position: "bottom-right"
            });
        })
    };

    useEffect(() => {

        if (dadosPerfil) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}ler-projetos/${dadosPerfil.id}`)
                .then((response) => {
                })
                .catch((error) => {
                })
        }

    }, [saveProject])


    return (
        <div className='editor-main pt-6'>
            <div className="controls">
                <div className='ctr-btns'>
                    <span>{acitveProject ? localStorage.getItem("client_project_name") : "Novo projeto"}</span>
                    <button onClick={loadState}>Carregar</button>
                    {/*                     <button onClick={saveState}>Salvar</button>
 */}                    <button onClick={addText}>Texto</button>
                    {/*                     <button onClick={resetState}>Resetar</button>
 */}                 {/*    <button onClick={bringToFront}>Puxar para frente</button>
                    <button onClick={bringToBack}>Puxar para trás</button> */}
                    {!dadosPerfil && <button onClick={showProjects}>Salvar</button>}

                </div>
                <div className='cart-sticker'>
                    <span>Desconto</span>
                    <span>{toBRLCurrency(handleDiscount((unitPrice * cartCount), cartCount).price_with_discount).formattedNumber}</span>
                </div>
            </div>
            <div className='editor-full-size'>
                <div className='editor'>
                    <div className='tool'>
                        <div className="tabs">
                            {/* Resumo do produto */}
                            <button
                                className='text-center'
                                style={{
                                    backgroundColor: tabs == "produto" ? "#3f4652" : ""
                                }}
                                onClick={() => setTabs("produto")}>
                                <BsBox className='icon-editor' />
                                <span >Produto</span>
                            </button>
                            {/* Botão que seta as opções imagens */}
                            <button
                                className='text-center'
                                style={{
                                    backgroundColor: tabs == "imagens" ? "#3f4652" : ""
                                }}
                                onClick={() => setTabs("imagens")}>
                                <BiImages className='icon-editor' />
                                <span >Imagens</span>
                            </button>
                            {/* Botão que seta as opções de forma */}
                            <button
                                className='text-center'
                                style={{
                                    backgroundColor: tabs == "formas" ? "#3f4652" : ""
                                }}
                                onClick={() => setTabs("formas")}>
                                <BsBox className='icon-editor' />
                                <span >Templates</span>
                            </button>
                            {/* Botão que seta as opções de camadas */}
                            <button
                                style={{
                                    backgroundColor: tabs == "camadas" ? "#3f4652" : ""
                                }}
                                className='text-center'
                                onClick={() => setTabs("camadas")}
                            >
                                <FiLayers className='icon-editor' />
                                <span>Camadas</span>
                            </button>
                            {/* Botão que ativa o upload */}
                            <button
                                style={{
                                    backgroundColor: tabs == "upload" ? "#3f4652" : ""
                                }}
                                className='text-center'
                                onClick={() => setTabs("upload")}
                            >
                                <BsCardImage className='icon-editor' />
                                <span>upload</span>
                            </button>
                        </div>
                        <div className="opt">
                            {tabs == "produto" &&
                                <div className='produtos'>
                                    <div className='i mb-3 text-center mt-2'>Detalhes do produto</div>
                                    <div className='meterials'>
                                        <Form>
                                            <div className='mb-3'>Material</div>
                                            <Form.Select onClick={e => setUnitPrice(e.target.value)}>
                                                <option value={31}>Material 1</option>
                                                <option value={32}>Material 2</option>
                                                <option value={28}>Material 3</option>
                                                <option value={32}>Material 4</option>
                                            </Form.Select>
                                        </Form>
                                        <hr />
                                    </div>
                                    <div className="qtd-sticker text-center">
                                        <div className='mb-3'>
                                            <span>Quantidade</span>
                                        </div>
                                        <div className='qtd'>
                                            {cartCount == 1 &&
                                                <FaCircleMinus
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                />
                                            }
                                            {cartCount > 1 &&
                                                <FaCircleMinus
                                                    onClick={() => {
                                                        setCartCount(cartCount - 1);
                                                        localStorage.setItem("cartCount", cartCount - 1)
                                                    }}
                                                    style={{
                                                        cursor: "pointer"
                                                    }}
                                                />

                                            }
                                            <span>{cartCount}</span>
                                            <FaCirclePlus
                                                onClick={() => {
                                                    setCartCount(cartCount + 1);
                                                    localStorage.setItem("cartCount", cartCount + 1)
                                                }}
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            {tabs == "imagens" &&
                                <>
                                    <span className='i m-3 text-center'>Imagens</span>
                                    <div className="imagens-upload">
                                        {imagens.map((img, key) =>
                                            <button
                                                onClick={() => addImg(img.src)}
                                                key={key}
                                                className='btn-img' >
                                                <Image
                                                    src={"/" + img.src}
                                                    alt={img.image_name}
                                                    width={70}
                                                    height={70}
                                                />
                                            </button>
                                        )}

                                    </div>
                                </>
                            }
                            {tabs == "formas" &&
                                <>
                                    <span className='m-3 color-black text-center'>Templates</span>
                                    <div className="template-upload">

                                        {SVGS.map((img, key) =>
                                            <button
                                                onClick={() => addSVG(img.src)}
                                                key={key}
                                                className='btn-img' >
                                                <Image
                                                    src={"/" + img.src}
                                                    alt={img.image_name}
                                                    width={50}
                                                    height={50}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </>
                            }
                            {tabs == "camadas" &&
                                <>
                                    <span className='m-3 color-black text-center'>Camadas</span>
                                    {activeObjects && activeObjects.map((img, key) => {
                                        if (img.custom.type == "text") {
                                            return (

                                                <button
                                                    key={key}
                                                    value={key}
                                                    className='btn-layer layers' >
                                                    {
                                                        img.text
                                                    }
                                                </button>
                                            )
                                        }
                                        if (img.custom.type == "img" || img.custom.type == "svg") {
                                            return (
                                                <div
                                                    onClick={() => selectObject(key)}
                                                    style={{
                                                        backgroundColor:
                                                            key == selectedLayer
                                                                ? backgroundColor
                                                                : ""
                                                    }}

                                                    key={key}
                                                    value={key}
                                                    className='btn-layer layers' >

                                                    <Image
                                                        src={img.custom.src.replace("/blob:", "/")}
                                                        alt={img.custom.src}
                                                        width={50}
                                                        height={50}
                                                    />
                                                    {/*                                                     <input className="layer_label" type='text' defaultValue={`Camada ${key}`} />
 */}                                                    <div className="layer_controls">
                                                        {img.visible == true
                                                            ?
                                                            <FaEye
                                                                onClick={() => makeObjectVisible(key)}
                                                                className='mx-2' />
                                                            :
                                                            <FaRegEyeSlash
                                                                onClick={() => makeObjectVisible(key)}
                                                                className='mx-2'
                                                            />

                                                        }
                                                        {img.selectable == true
                                                            ?
                                                            <CiLock
                                                                onClick={() => makeObjectFreezable(key)}
                                                                className="mx-2" />
                                                            : <CiUnlock
                                                                onClick={() => makeObjectFreezable(key)}
                                                                className="mx-2"
                                                            />

                                                        }
                                                        <IoCloseCircleOutline
                                                            onClick={() => deleteObjectById(key)}
                                                            className="delete-layer mx-2" />
                                                    </div>
                                                </div>

                                            )

                                        }
                                    }
                                    )}
                                </>
                            }
                            {tabs == "upload" &&
                                < div className='upload-area'>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <p>Arraste a imagem aqui ...</p> :
                                                <div className='drop-zone' >
                                                    <div className="upload-icon">
                                                        <BsCloudUpload />
                                                    </div>
                                                    <div>Clique ou solte sua arte aqui</div>
                                                </div>
                                        }
                                    </div>
                                    <div className="image-scroll">
                                        {files && files.map((img, key) =>
                                            <div
                                                className='images-from-user'
                                                onClick={() => addImgFromUpload(img.preview)}
                                                key={key}>
                                                <Image
                                                    src={img.preview}
                                                    width={50}
                                                    height={50}
                                                    alt='sdasd'
                                                />
                                            </div>
                                        )}

                                    </div>
                                </div>

                            }
                        </div>
                    </div>

                    <div className='free-area'>
                        <FabricJSCanvas className='editor-area m-2' id="c" onReady={onReady} />
                        <div className='zoom-area'>
                            <div className='zoom-radio'>
                                <div>
                                    <CiZoomOut onClick={handleZoomLess} />
                                </div>
                                <div className='radio-zoom'>
                                    <Form.Range ref={zoomRef} onChange={handleZoom} defaultValue={editor?.canvas.getZoom() * 100} id="zoom" name="zoom" min="50" max="250" />
                                </div>
                                <div>
                                    <CiZoomIn onClick={handleZoomPlus} />
                                </div>

                            </div>
                        </div>
                    </div>

                    {colorPick &&
                        <>
                            <div className="color-pick">
                                <p className='text-center'>Cores</p>
                                {colorPick && colorPick.map((item, key) =>
                                    <div key={key}>
                                        <input id={key} onChange={handleColor} type='color' defaultValue={item.fill} />
                                    </div>
                                )
                                }

                            </div>
                        </>

                    }

                </div>
            </div>

            <Modal size='md' show={showModal}>
                <Modal.Header>
                    Salve seu projeto
                    <FaWindowClose
                        onClick={() => setShowModal(false)}
                        style={{ color: "red", cursor: "pointer" }}
                    />
                </Modal.Header>
                {!dadosPerfil &&
                    <Modal.Body>
                        <p>Para salvar seu projeto você precisa estar logado para salvar seu projeto!</p>
                        <Form onSubmit={Entra}>
                            <Row>
                                <div className="col-auto fs--1 text-600">
                                    <span><
                                        Link href="cadastro" alt="criar conta">criar conta</Link>
                                    </span>
                                </div>
                            </Row>
                            <Row className='mb-2'>
                                <Col >
                                    <Form.Label>
                                        Email:
                                    </Form.Label>
                                    <Form.Control id="email" name="email" type='email' placeholder='Digite seu Email' />
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Form.Label>
                                        Senha:
                                    </Form.Label>
                                    <Form.Control name="senha" id="senha" type='password' placeholder='Digite sua senha' />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type='submit'>Login</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>

                }

                {dadosPerfil &&
                    <Modal.Body>
                        {/*  {newProject == false &&
                            <Row className='p-3'>
                                <Form.Label>
                                    Salvar em projeto existente
                                </Form.Label>
                                <Form.Select>
                                    <option id="0" name="0">Seleceione seu projeto</option>
                                    {projects && projects.map((project, index) =>
                                        <option key={index} value={project.nome_projeto}>{project.nome_projeto}</option>
                                    )}
                                </Form.Select>
                            </Row>

                        } */}


                        <Form method='post' onSubmit={saveProject}>
                            <Row>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nome do projeto</Form.Label>
                                    <Form.Control id="nome_projeto" name="nome_projeto" type="text" placeholder="Nome do projeto" />
                                </Form.Group>
                            </Row>
                            <Col>
                                <Button type='submit'>Salvar</Button>
                            </Col>
                        </Form>
                        {/* <Row>
                            {newProject == false &&
                                <Col>
                                    <Button onClick={() => setNewProject(true)}>Novo projeto</Button>
                                </Col>

                            }
                        </Row> */}
                    </Modal.Body>
                }
            </Modal>
        </div>

    )
}

export default EditorComponent