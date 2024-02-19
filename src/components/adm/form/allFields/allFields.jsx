import React, { useEffect, useState } from "react";
import Image from "next/image";
import { removeFormFields, getAllFormFields } from "../../../../../utils/apiForm/api";

// Icons
import iconTrash from "/public/icons/iconTrash.svg";
import iconAttetion from "/public/icons/iconAttetion.svg"
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"
import noFields from "/public/icons/noFields.svg"

// Components
import Popup from "@/components/popUp/popup";

export default function AllFields({ formType, hasFields, setHasFields }) {
    const [fields, setFields] = useState([]);
    const [warningPopup, setWarningPopup] = useState(false);
    const [sucessDeletPopup, setSucessDeletPopup] = useState(false);
    const [deleteSucessPopup, setDeleteSucessPopup] = useState(false);
    const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
    const { visible, setVisible } = useState(false);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        if (hasFields) {
            getAllFormFields(formType).then((response) => {
                setFields(response || []);
                setLoader(false);
                console.log(fields);
            });
        }
    }, [hasFields, formType]);

    const handleDeleteClick = (id) => {
        setWarningPopup(false);
        setLoading(true);
        removeFormFields(id)
            .then((response) => {
                if (response.statusCode === 200) {
                    setLoading(false);
                    setWarningPopup(false);
                    setSucessDeletPopup(true);
                } else {
                    alert("Erro ao deletar campo!");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function handleOpenDeletePopup(id) {
        setId(id);
        setWarningPopup(true);
    };

    const handleCancelPopup = () => {
        setWarningPopup(false);
    };

    const handleReload = () => {
        window.location.reload();
    };

    if (fields.statusCode !== 404) {
        return (
            <div>
                {loader ? (
                    <div className="flex flex-col items-center justify-center my-50">
                        <div class="spinner" />
                    </div>
                ) : (
                    fields.map((field, index) => (
                        <div>
                            <div className="flex-grow">
                                <div className="bg-fundo mt-15 rounded-10 py-30 px-60">
                                    <div className="flex gap-10 items-center">
                                        <input
                                            type="text"
                                            name="question"
                                            value={field.question}
                                            disabled
                                            className="bg-fundo outline-none text-pretoTexto pl-10 pr-30 font-regular font-semibold text-paragrafo w-full"
                                        />
                                        <button onClick={() => handleOpenDeletePopup(field.id)}>
                                            <Image src={iconTrash} alt="Ícone de lixeira" />
                                        </button>
                                    </div>
                                    {field.type === 'text' && (
                                        <input
                                            type="text"
                                            placeholder="Resposta do Egresso"
                                            id="nome"
                                            className="bg-fundo w-full border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo pl-10 font-regular mt-15"
                                            disabled
                                        />
                                    )}
                                    {field.type === 'radio' && (
                                        <div>
                                            {field.options && field.options.length > 0 && (
                                                field.options.map((option, index) => (
                                                    <div key={index} className="flex gap-10 mt-15">
                                                        <div className="flex w-full">
                                                            <input
                                                                type="radio"
                                                                name={`radioOptions_${field.id}`}
                                                                disabled
                                                                onChange={() => handleRadioChange(field.id, option)}
                                                            />
                                                            <input
                                                                type="text"
                                                                value={option.question}
                                                                disabled
                                                                className="w-full bg-inherit outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                            {field.other === 'Outros:' && (
                                                <div className="flex gap-10 mt-15">
                                                    <div className="flex w-full">
                                                        <input
                                                            type="radio"
                                                            name="radioOptions"
                                                            value="other"
                                                            className="mr-10"
                                                            disabled
                                                        />
                                                        <label>Outros:</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Resposta do Egresso"
                                                            disabled
                                                            className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {field.type === 'checkbox' && (
                                        <div>
                                            {field.options.map((option, index) => (
                                                <div className="flex gap-10 mt-15">
                                                    <div className="flex w-full">
                                                        <input type="checkbox" name="checkboxOptions" value={index} disabled />
                                                        <input
                                                            type="text"
                                                            value={option.question}
                                                            disabled
                                                            className="w-full bg-inherit outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            {field.other === 'Outros:' && (
                                                <div className="flex gap-10 mt-15">
                                                    <div className="flex w-full">
                                                        <input
                                                            type="checkbox"
                                                            name="radioOptions"
                                                            value="other"
                                                            className="mr-10"
                                                            disabled
                                                        />
                                                        <label>Outros:</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Resposta do Egresso"
                                                            disabled
                                                            className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {warningPopup && (
                    <Popup isOpen={warningPopup}>
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                        <div className="flex justify-center">
                            <button onClick={() => handleDeleteClick(id)} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                            <button onClick={handleCancelPopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                        </div>
                    </Popup>
                )}
                {sucessDeletPopup && (
                    <Popup isOpen={sucessDeletPopup}>
                        <Image src={iconSucess} alt="" />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Excluído</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">O campo foi excluído com sucesso</p>
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
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
    } else {
        return (
            <div>
                {loader ? (
                    <div className="flex flex-col items-center justify-center my-50">
                        <div class="spinner" />
                    </div>
                ) : (
                    hasFields && (
                        <div className="flex flex-col items-center justify-center">
                            <Image className="mt-90" src={noFields} alt="Ícone representando que não tem campos no formulário" />
                            <p className="text-tituloSessão text-cinza05 text-center mt-15 mb-90">Ainda não há campos no formulário. <br></br> Comece agora!</p>
                        </div>
                    )
                )}
            </div>
        )
    }
}
