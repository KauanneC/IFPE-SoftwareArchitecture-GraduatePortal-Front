import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import iconTrash from "/public/icons/iconTrash.svg"
import iconAttetion from "/public/icons/iconAttetion.svg"
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"
import noEvents from "/public/icons/noEvents.svg"
import iconFile from "/public/icons/iconFile.svg"

// Components
import Popup from "@/components/popUp/popup";

// API
import { removeNotice, getNotice } from "../../../../../utils/apiNotice/api";

export default function allEditais() {
    const [notices, setNotices] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [sucessPopupOpen, setSucessPopupOpen] = useState(false);
    const [deleteSucessPopup, setDeleteSucessPopup] = useState(false);
    const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getNotice().then((data) => {
            setNotices(data.data);
            setLoader(false);
        });
    }, []);

    function handleOpenDeletePopup(id) {
        setId(id);
        setDeletePopup(true);
    }

    const handleCloseDeletePopup = () => {
        setDeletePopup(false);
    };

    const handleCancelClick = () => {
        setCancelPopupOpen(false);
    };

    const handleOpenCancelClick = () => {
        setCancelPopupOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeletePopup(false);
        setLoading(true);
        removeNotice(id)
            .then((response) => {
                if (response.statusCode === 200) {
                    setLoading(false);
                    setDeleteSucessPopup(true);
                } else {
                    alert("Erro ao excluir os usuários!")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    const handleReload = () => {
        window.location.reload();
    }

    if (!notices) {
        return (
            <div>
                {loader ? (
                    <div className="flex flex-col items-center justify-center my-50">
                        <div class="spinner" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center mt-90 justify-center" id="conteudo">
                        <Image src={noEvents} alt="Ícone de um calendário com um x no meio"/>
                        <p className="mt-15 text-cinza05 text-tituloSessão">Não há editais no momento</p>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div>
            {loader ? (
                <div className="flex flex-col items-center justify-center my-50 mt-30">
                    <div class="spinner" />
                </div>
            ) : (
                notices.map((notice, index) => (
                    <div className="bg-fundo px-60 py-30 rounded-10 mt-15">
                        <div className="w-full">
                            <div>
                                <div className="flex gap-10 items-center justify-between">
                                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Título de Edital</p>
                                    <button onClick={() => handleOpenDeletePopup(notice.id)}>
                                        <Image src={iconTrash} alt="Ícone de lixeira" />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Digite o título do edital"
                                    name="title"
                                    value={notice.title}
                                    disabled
                                    className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                                />
                            </div>
                            <div className="mt-30">
                                <p className="font-semibold text-subtitulo text-pretoTexto">Nome do Pdf</p>
                                <p className="mb-15 text-cinza04">Atenção: Nome sem espaços ou caracteres especiais</p>
                                <input
                                    type="text"
                                    placeholder="Digite o nome do pdf"
                                    name="pdfName"
                                    value={notice.pdfName}
                                    disabled
                                    className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                                />
                            </div>
                            <div className="mt-30">
                                <p className="font-semibold text-subtitulo text-pretoTexto mb-15">PDF</p>
                                <label className="text-pretoTexto border border-cinza04 rounded-8 inline-flex items-center gap-10 shadow-md px-15 py-10">
                                    <Image src={iconFile} alt="Ícone para upload de um arquivo" />
                                    <p>{notice.pdfName}.pdf</p>
                                </label>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {deletePopup && (
                <Popup isOpen={deletePopup} onClose={handleCloseDeletePopup}>
                    <Image src={iconAttetion} alt="Ícone de exclamação"/>
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                    <div className="flex justify-center">
                        <button onClick={() => handleDeleteClick(id)} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                        <button onClick={handleCloseDeletePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                    </div>
                </Popup>
            )}
            {sucessPopupOpen && (
                <Popup isOpen={sucessPopupOpen}>
                    <Image src={iconSucess} alt="Ícone de sucesso"/>
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Atualizado</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O edital foi atualizado com sucesso</p>
                    <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                </Popup>
            )}
            {deleteSucessPopup && (
                <Popup isOpen={deleteSucessPopup}>
                    <Image src={iconSucess} alt="Ícone de sucesso"/>
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Excluído</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O edital foi excluído com sucesso</p>
                    <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                </Popup>
            )}
            {cancelPopupOpen && (
                <Popup isOpen={cancelPopupOpen} onClose={handleCancelClick}>
                    <Image src={iconAttetion} alt="Ícone de exclamação"/>
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                    <div className="flex justify-center">
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                        <button onClick={handleCancelClick} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                    </div>
                </Popup>
            )}
            {loading && (
                <Popup isOpen={loading}>
                    <div className="flex flex-col items-center justify-center my-50">
                        <div class="spinner" />
                    </div>
                </Popup>
            )}
        </div>
    )
}