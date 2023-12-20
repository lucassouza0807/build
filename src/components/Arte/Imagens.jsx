
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { MdDeleteOutline } from 'react-icons/md'
import cloudUpload from "../../assets/img/icons/cloud-upload.svg"
import { getSize } from "@/helpers/utils";
import { AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
export default function Imagens(){
    const [files, setFiles] = useState([]);

    const [capaSelecionada, setCapaSelecionada] = useState(null)
    const capa = (e) => {
        setCapaSelecionada(e)
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg']
        },

        onDrop: acceptedFiles => {
            const newFiles = acceptedFiles.filter(file => !files.find(existingFile => existingFile.name === file.name));

            setFiles([
                ...files,
                ...newFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            ]);
        }
    });

    const handleRemove = path => {
        setFiles(files.filter(file => file.path !== path));
    };

    return(
        <>
        <div className="mb-3">
            <div className="mb-3">
                <div className="bg-light">
                    <div {...getRootProps({ className: 'dropzone-area py-6' })}>
                        <input name="produto_imagem" {...getInputProps()} />
                        <div className=" d-flex justify-content-center">
                            <img src={cloudUpload} alt="" width={25} className="me-2" />
                            <p className="fs-0 mb-0 text-700">Escolha as imagens</p>
                        </div>
                    </div>
                    <div>
                        {files.map((file, key) => {
                            return (<div
                                className="d-flex py-3 border-bottom btn-reveal-trigger align-items-center"
                                key={file.path}
                            >
                                <img
                                    className="rounded"
                                    width={40}
                                    height={40}
                                    src={file.preview}
                                    alt={file.path}
                                />

                                <div
                                    className="ms-3 flex-1 justify-content-between align-items-center"
                                >
                                    <div>
                                        <h6>{file.path}</h6>
                                        <div className="position-relative align-items-center">
                                            <p className="mb-0 fs--1 text-400 line-height-1">
                                                <strong>{getSize(file.size)}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-2 py-2 cursor-pointer" onClick={(e) => capa(file.path)}>
                                    {capaSelecionada == file.path ? (<AiTwotoneStar />) : (<AiOutlineStar />)}
                                </div>
                                <div className="m-2 py-2 cursor-pointer text-danger" onClick={() => handleRemove(file.path)}>
                                    <MdDeleteOutline />
                                </div>

                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}