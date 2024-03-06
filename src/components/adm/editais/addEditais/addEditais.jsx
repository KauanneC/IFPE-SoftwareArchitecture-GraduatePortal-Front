import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import iconAttetion from "/public/icons/iconAttetion.svg"
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"
import iconFile from "/public/icons/iconFile.svg"

// Components
import Popup from "@/components/popUp/popup";

// API
import { createNotice } from "../../../../../utils/apiNotice/api";

export default function AddEditais() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [sucessPopupOpen, setSucessPopupOpen] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);
    const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
    const [warningsPopupOpen, setWarningsPopupOpen] = useState(false);
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        localStorage.getItem("token") && setToken(localStorage.getItem("token"));
    },[])

    const [editais, setEdiatis] = useState({
        title: "",
        pdfName: "",
    });

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setEdiatis({
            ...editais,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleEnviarClick = () => {
        const newWarnings = [];
        if (!editais.title) {
            newWarnings.push("O título é obrigatório");
        };
        if (!editais.pdfName) {
            newWarnings.push("O nome do pdf é obrigatório");
        };
        if (!selectedFile) {
            newWarnings.push("O arquivo é obrigatório");
        };
        if (newWarnings.length > 0) {
            setWarnings(newWarnings);
            setWarningsPopupOpen(true);
            setPopupOpen(false);
        } else {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("title", editais.title);
            formData.append("pdfName", editais.pdfName);
    
            setLoading(true)
            setPopupOpen(false)
            createNotice(formData, token)
                .then((response) => {
                    if (response.statusCode === 201) {
                        setLoading(false);
                        setSucessPopupOpen(true);
                    } else {
                        setLoading(false);
                        setErrorPopupOpen(true);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    };

    const handleErrorPopup = () => {
        setErrorPopupOpen(true);
    };

    const handleCloseErrorPopup = () => {
        setErrorPopupOpen(false);
    };

    const handleCancelClick = () => {
        setCancelPopupOpen(true);
    };

    const handleCloseCancel = () => {
        setCancelPopupOpen(false);
    };

    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setWarningsPopupOpen(false);
    };

    const handleCloseSucessPopup = () => {
        setSucessPopupOpen(false);
    };

    const handleCancelReload = () => {
        window.location.reload();
    };

    return (
        <div className="bg-fundo px-60 py-30 rounded-10 mt-15">
            <div className="w-full">
                <div>
                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Título de Edital</p>
                    <input
                        type="text"
                        placeholder="Digite o título do edital"
                        name="title"
                        value={editais.title}
                        onChange={(e) => { handleFieldChange(e) }}
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
                        value={editais.pdfName}
                        onChange={(e) => { handleFieldChange(e) }}
                        className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                    />
                </div>
                <div className="mt-30">
                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">PDF</p>
                    <label className="transition-transform transform hover:scale-105 text-pretoTexto border border-cinza04 rounded-8 inline-flex items-center gap-10 shadow-md px-15 py-10">
                        <Image src={iconFile} alt="Ícone para upload de um arquivo" />
                        {selectedFile ? (
                            <span>Arquivo Selecionado</span>
                        ) : (
                            <span>Selecione um arquivo</span>
                        )}
                        <input type="file" name="file" accept=".pdf" className="bg-inherit hidden" onChange={handleFileChange} />
                    </label>
                </div>
                <div className="flex mt-30 justify-center gap-30">
                    <div className="inline-block bg-verdeButton rounded-10 text-white text-paragrafo py-10 px-30">
                        <button onClick={handleOpenPopup}>Salvar</button>
                    </div>
                    <div className="inline-block bg-vermelhoButton rounded-10 text-white text-paragrafo py-10 px-30">
                        <button onClick={handleCancelClick}>Cancelar</button>
                    </div>
                </div>
                {isPopupOpen && (
                    <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Ao salvar o evento será automaticamente publicado.</p>
                        <div className="flex justify-center">
                            <button onClick={handleEnviarClick} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleClosePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                        </div>
                    </Popup>
                )}
                {sucessPopupOpen && (
                    <Popup isOpen={sucessPopupOpen} onClose={handleCloseSucessPopup}>
                        <Image src={iconSucess} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Publicado</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O evento foi publicado com sucesso</p>
                        <button onClick={handleCancelReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                    </Popup>
                )}
                {cancelPopupOpen && (
                    <Popup isOpen={cancelPopupOpen} onClose={handleCloseCancel}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Os dados não serão salvos</p>
                        <div className="flex justify-center">
                            <button onClick={handleCancelReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleCloseCancel} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                        </div>
                    </Popup>
                )}
                {errorPopupOpen && (
                    <Popup isOpen={errorPopupOpen}>
                        <Image src={iconError} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Algo deu errado</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O evento não foi criado</p>
                        <div className="flex justify-center">
                            <button onClick={handleCloseErrorPopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Tentar novamente</button>
                            <button onClick={handleCancelReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Cancelar</button>
                        </div>
                    </Popup>
                )}
                {warningsPopupOpen && (
                    <Popup isOpen={warningsPopupOpen}>
                        <Image src={iconError} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Algo deu errado</h1>
                        <ul className="flex flex-col text-vermelhoButton gap-5">
                            {warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                            ))}
                        </ul>
                        <div className="flex justify-center mt-15">
                            <button onClick={handleClosePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Tentar novamente</button>
                            <button onClick={handleCancelReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Cancelar</button>
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
        </div>
    )
}