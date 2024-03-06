import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import iconAttetion from "/public/icons/iconAttetion.svg"
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"

// Components
import Popup from "@/components/popUp/popup";

// API
import { createEvents } from "../../../../../utils/apiEvents/api";

export default function AddEvento() {
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

    const [eventos, setEventos] = useState({
        name: "",
        date: "",
        hour: "",
        modality: "",
        place: "",
        description: "",
    });

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setEventos({
            ...eventos,
            [name]: value,
        });
    };

    const handleEnviarClick = () => {
        const newWarnings = [];
        if (eventos.name === "") {
            newWarnings.push("O nome do evento é obrigatório");
        };

        if (eventos.date === "") {
            newWarnings.push("A data do evento é obrigatória");
        } else {
            const data = new Date(eventos.date);
            const today = new Date();

            if (data < today) {
                newWarnings.push("A data do evento não pode ser anterior à data atual");
            };
        };

        if (eventos.hour === "") {
            newWarnings.push("O horário do evento é obrigatório");
        };

        if (eventos.modality === "") {
            newWarnings.push("A modalidade do evento é obrigatória");
        };

        if (eventos.place === "") {
            newWarnings.push("O local do evento é obrigatório");
        };

        if (eventos.description === "") {
            newWarnings.push("A descrição do evento é obrigatória");
        };

        if (newWarnings.length > 0) {
            setWarnings(newWarnings);
            setWarningsPopupOpen(true);
            setPopupOpen(false);
        } else {
            setPopupOpen(false);
            setLoading(true);
            createEvents(eventos,token)
                .then((response) => {
                    if (response.statusCode === 200) {
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
        };
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
    };

    const handleCloseSucessPopup = () => {
        setSucessPopupOpen(false);
    };

    const handleCloseWarningsPopup = () => {
        setWarningsPopupOpen(false);
    };

    const handleReload = () => {
        window.location.reload();
    }

    return (
        <div className="bg-fundo px-60 py-30 rounded-10 mt-15">
            <div className="w-full">
                <div>
                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Nome do Evento</p>
                    <input
                        type="text"
                        placeholder="Digite o nome do evento"
                        name="name"
                        value={eventos.name}
                        onChange={(e) => { handleFieldChange(e) }}
                        className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                    />
                </div>
                <div className="flex justify-between mt-30">
                    <div className="w-445">
                        <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Data</p>
                        <input
                            type="date"
                            name="date"
                            value={eventos.date}
                            onChange={(e) => { handleFieldChange(e) }}
                            className="bg-inherit border border-cinza07 rounded-10 p-10 outline-none"
                        />
                    </div>
                    <div className="w-445">
                        <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Horário</p>
                        <input
                            type="time"
                            name="hour"
                            value={eventos.hour}
                            onChange={(e) => { handleFieldChange(e) }}
                            className="bg-inherit border border-cinza07 rounded-10 p-10 outline-none"
                        />
                    </div>
                </div>
                <div className="mt-30">
                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Modalidade</p>
                    <div>
                        <input
                            type="radio"
                            name="modality"
                            value="Presencial"
                            checked={eventos.modality === "Presencial"}
                            onChange={(e) => { handleFieldChange(e) }}
                        />
                        <label className="ml-10 text-pretoTexto">Presencial</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="modality"
                            value="Online"
                            checked={eventos.modality === "Online"}
                            onChange={(e) => { handleFieldChange(e) }}
                        />
                        <label className="ml-10 text-pretoTexto">Online</label>
                    </div>
                </div>
                <div className="mt-30">
                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Local</p>
                    <input
                        type="text"
                        placeholder="Digite o local ou link"
                        name="place"
                        value={eventos.place}
                        onChange={(e) => { handleFieldChange(e) }}
                        className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                    />
                </div>
                <div className="mt-30">
                    <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Descrição</p>
                    <input
                        type="text"
                        placeholder="Digite a descrição"
                        name="description"
                        value={eventos.description}
                        onChange={(e) => { handleFieldChange(e) }}
                        className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                    />
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
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                    </Popup>
                )}
                {cancelPopupOpen && (
                    <Popup isOpen={cancelPopupOpen} onClose={handleCloseCancel}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Os dados não serão salvos</p>
                        <div className="flex justify-center">
                            <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleCloseCancel} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                        </div>
                    </Popup>
                )}
                {errorPopupOpen && (
                    <Popup isOpen={errorPopupOpen} onClose={handleCloseErrorPopup}>
                        <Image src={iconError} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Algo deu errado</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O evento não foi criado</p>
                        <div className="flex justify-center">
                            <button onClick={handleCloseErrorPopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Tentar novamente</button>
                            <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Cancelar</button>
                        </div>
                    </Popup>
                )}
                {warningsPopupOpen && (
                    <Popup isOpen={warningsPopupOpen} onClose={handleCloseWarningsPopup}>
                        <Image src={iconError} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Algo deu errado</h1>
                        <ul className="flex flex-col text-vermelhoButton gap-5">
                            {warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                            ))}
                        </ul>
                        <div className="flex justify-center mt-15">
                            <button onClick={handleCloseWarningsPopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Tentar novamente</button>
                            <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Cancelar</button>
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