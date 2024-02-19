import React, { useEffect, useState } from "react";
import Image from "next/image";

// Icons
import iconTrash from "/public/icons/iconTrash.svg";
import iconAttetion from "/public/icons/iconAttetion.svg"
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"
import noEvents from "/public/icons/noEvents.svg";

// Components
import Popup from "@/components/popUp/popup";

// API
import { updateEvents, removeEvents, getEvents } from "../../../../../utils/apiEvents/api";

export default function allEvents() {
    const [editedEvents, setEditedEvents] = useState([]);
    const [deletePopup, setDeletePopup] = useState(false);
    const [sucessPopupOpen, setSucessPopupOpen] = useState(false);
    const [deleteSucessPopup, setDeleteSucessPopup] = useState(false);
    const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEvents().then((data) => {
            setEditedEvents(data.data);
        });
    }, []);

    const handleEventInputChange = (index, fieldName, value) => {
        setEditedEvents((prevState) => {
            const updateEvents = [...prevState];
            updateEvents[index] = {
                ...updateEvents[index],
                [fieldName]: value,
            };
            return updateEvents;
        });
    };

    const handleEnviarClick = (id, eventData) => {
        updateEvents(id, eventData)
            .then((response) => {
                if (response.statusCode === 200) {
                    setSucessPopupOpen(true);
                } else {
                    alert("Erro ao atualizar o usuário!")
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
        removeEvents(id)
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

    function autoExpandTextArea(element) {
        element.style.height = 'auto'; // Redefine a altura para automática
        element.style.height = element.scrollHeight + 'px'; // Define a altura com base no conteúdo
    };

    const handleReload = () => {
        window.location.reload();
    }

    if (!editedEvents) {
        return (
            <div className="flex flex-col items-center mt-90 justify-center" id="conteudo">
                <Image src={noEvents} />
                <p className="mt-15 text-cinza05 text-tituloSessão">Não há eventos no momento</p>
            </div>
        )
    }

    return (
        <div>
            {editedEvents.map((events, index) => (
                <div className="bg-fundo px-60 py-30 rounded-10 mt-15">
                    <div className="w-full">
                        <div>
                            <div className="flex justify-between items-start">
                                <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Nome do Evento</p>
                                <button onClick={() => handleOpenDeletePopup(events.id)}>
                                    <Image src={iconTrash} alt="Ícone de lixeira" />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Digite o nome do evento"
                                name="name"
                                value={events.name}
                                onChange={(e) => { handleEventInputChange(index, "name", e.target.value) }}
                                className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                            />
                        </div>
                        <div className="flex justify-between mt-30">
                            <div className="w-445">
                                <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Data</p>
                                <input
                                    type="date"
                                    name="date"
                                    value={events.date}
                                    onChange={(e) => { handleEventInputChange(index, "date", e.target.value) }}
                                    className="bg-inherit border border-cinza07 rounded-10 p-10 outline-none"
                                />
                            </div>
                            <div className="w-445">
                                <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Horário</p>
                                <input
                                    type="time"
                                    name="hour"
                                    value={events.hour}
                                    onChange={(e) => { handleEventInputChange(index, "hour", e.target.value) }}
                                    className="bg-inherit border border-cinza07 rounded-10 p-10 outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-30">
                            <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Modalidade</p>
                            <div>
                                <input
                                    type="radio"
                                    name={`modality-${index}`}
                                    value="Presencial"
                                    checked={events.modality === "Presencial"}
                                    onChange={(e) => { handleEventInputChange(index, "modality", e.target.value) }}
                                />
                                <label className="ml-10 text-pretoTexto">Presencial</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name={`modality-${index}`}
                                    value="Online"
                                    checked={events.modality === "Online"}
                                    onChange={(e) => { handleEventInputChange(index, "modality", e.target.value) }}
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
                                value={events.place}
                                onChange={(e) => { handleEventInputChange(index, "place", e.target.value) }}
                                className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                            />
                        </div>
                        <div className="mt-30">
                            <p className="font-semibold text-subtitulo text-pretoTexto mb-15">Descrição</p>
                            <textarea
                                type="text"
                                placeholder="Digite a descrição"
                                name="description"
                                value={events.description}
                                onChange={(e) => {
                                    handleEventInputChange(index, "description", e.target.value)
                                    autoExpandTextArea(e.target);
                                }}
                                className="bg-inherit w-full outline-none border-b-1 border-cinza07 pl-10 text-paragrafo text-cinza07"
                            />
                        </div>
                        <div className="flex mt-30 justify-center gap-30">
                            <div className="inline-block bg-verdeButton rounded-10 text-white text-paragrafo py-10 px-30">
                                <button onClick={() => handleEnviarClick(events.id, events)}>Salvar</button>
                            </div>
                            <div className="inline-block bg-vermelhoButton rounded-10 text-white text-paragrafo py-10 px-30">
                                <button onClick={handleOpenCancelClick}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {deletePopup && (
                <Popup isOpen={deletePopup} onClose={handleCloseDeletePopup}>
                    <Image src={iconAttetion} />
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
                    <Image src={iconSucess} />
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Atualizado</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O evento foi atualizado com sucesso</p>
                    <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                </Popup>
            )}
            {deleteSucessPopup && (
                <Popup isOpen={deleteSucessPopup}>
                    <Image src={iconSucess} />
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Excluído</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O evento foi excluído com sucesso</p>
                    <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                </Popup>
            )}
            {cancelPopupOpen && (
                <Popup isOpen={cancelPopupOpen} onClose={handleCancelClick}>
                    <Image src={iconAttetion} />
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