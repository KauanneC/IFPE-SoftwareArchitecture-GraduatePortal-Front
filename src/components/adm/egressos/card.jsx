import React, { useState } from "react";
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
import { removeUser } from "../../../../utils/apiUser/api";

export default function card({ name, profile, id }) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteSucessPopup, setDeleteSucessPopup] = useState(false);
    const [cancelPopupOpen, setCancelPopupOpen] = useState(false);

    const handleDeleteClick = (id) => {
        setLoading(true);
        setDeletePopup(false);
        removeUser(id)
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

    const handleOpenDelete = () => {
        setDeletePopup(true);
    };

    const handleReload = () => {
        window.location.reload();
    };

    const handleClosePopup = () => {
        setDeletePopup(false);
    }

    if (profile === "egress") {
        return (
            <div className="w-full">
                <div className="flex justify-between bg-white w-full border border-t-10 border-azulForm rounded-10 h-90 shadow-lg px-30 pb-30 pt-20">
                    <h1 className="font-bold text-subtitulo">{name}</h1>
                    <div className="flex items-center justify-center gap-30">
                        <button className="inline-block bg-azulBase rounded-10 text-white font-semibold text-legenda px-15 py-5">Ver Formulário</button>
                        <button onClick={handleOpenDelete}>
                            <Image src={iconTrash} />
                        </button>
                    </div>
                </div>
                {deletePopup && (
                    <Popup isOpen={deletePopup}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza que deseja excluir o usuário?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                        <div className="flex justify-center">
                            <button onClick={() => handleDeleteClick(id)} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleClosePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
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
                {deleteSucessPopup && (
                    <Popup isOpen={deleteSucessPopup}>
                        <Image src={iconSucess} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Excluído</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O usuário foi excluído com sucesso</p>
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                    </Popup>
                )}
            </div>
        )
    }
    if (profile === "coordinator") {
        return (
            <div className="w-full">
                <div className="flex justify-between bg-white w-full border border-t-10 border-azulForm rounded-10 h-90 shadow-lg px-30 pb-30 pt-20">
                    <h1 className="font-bold text-subtitulo">{name}</h1>
                    <div className="flex items-center justify-center gap-30">
                        <button onClick={handleOpenDelete}>
                            <Image src={iconTrash} />
                        </button>
                    </div>
                </div>
                {deletePopup && (
                    <Popup isOpen={deletePopup}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza que deseja excluir o usuário?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                        <div className="flex justify-center">
                            <button onClick={() => handleDeleteClick(id)} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleClosePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
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
                {deleteSucessPopup && (
                    <Popup isOpen={deleteSucessPopup}>
                        <Image src={iconSucess} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Excluído</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O usuário foi excluído com sucesso</p>
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                    </Popup>
                )}
            </div>
        )
    }
    if (profile === "teacher") {
        return (
            <div className="w-full">
                <div className="flex justify-between bg-white w-full border border-t-10 border-azulForm rounded-10 h-90 shadow-lg px-30 pb-30 pt-20">
                    <h1 className="font-bold text-subtitulo">{name}</h1>
                    <div className="flex items-center justify-center gap-30">
                        <button onClick={handleOpenDelete}>
                            <Image src={iconTrash} />
                        </button>
                    </div>
                </div>
                {deletePopup && (
                    <Popup isOpen={deletePopup}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza que deseja excluir o usuário?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                        <div className="flex justify-center">
                            <button onClick={() => handleDeleteClick(id)} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleClosePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
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
                {deleteSucessPopup && (
                    <Popup isOpen={deleteSucessPopup}>
                        <Image src={iconSucess} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Excluído</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O usuário foi excluído com sucesso</p>
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                    </Popup>
                )}
            </div>
        )
    }
}