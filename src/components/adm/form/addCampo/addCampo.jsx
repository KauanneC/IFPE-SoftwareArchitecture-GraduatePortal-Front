import React, { useState } from "react";
import Image from "next/image";

// Icons
import iconTrash from "/public/icons/iconTrash.svg"
import iconDelete from "/public/icons/iconDelete.svg"
import iconAttetion from "/public/icons/iconAttetion.svg"
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"

// Components
import Dropdown from "@/components/adm/form/menu/menu";
import Popup from "@/components/popUp/popup";

// API
import { createFields } from "../../../../../utils/apiForm/api";

export default function AddCampo({ props }) {
    const [selectedOption, setSelectedOption] = useState('text'); // Opções do menu
    const [radioOptions, setRadioOptions] = useState([{ question: 'Opção 1' }]); // Opções do tipo radios
    const [checkboxOptions, setCheckboxOptions] = useState([{ question: 'Opção 1' }]); // Opções do tipo radios
    const [showOtherOption, setShowOtherOption] = useState(false);
    const [showOtherOptionCheck, setShowOtherOptionCheck] = useState(false);
    const [otherOptionText, setOtherOptionText] = useState("");
    const [otherOptionCheckbox, setOtherOptionCheckbox] = useState("");
    const [cancelPopup, setCancelPopup] = useState(false);
    const [sucessPopup, setSucessPopup] = useState(false);
    const [warningsPopupOpen, setWarningsPopupOpen] = useState(false);
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(false);

    const [dados, setDados] = useState({
        formType: props,
        question: "",
        type: "text",
        options: [],
        other: null,
    });


    const handleOptionChange = (option) => {
        setSelectedOption(option);
        // Adicione lógica para atualizar o estado 'dados' com atributos específicos
        switch (option) {
            case "text":
                setDados((prevState) => ({
                    ...prevState,
                    options: null,
                }));
                break;
            case "radio":
            case "checkbox":
                setDados((prevState) => ({
                    ...prevState,
                    options: [{ question: 'Opção 1' }],
                }));
                break;
            default:
                break;
        };

        setSelectedOption(option);

        setRadioOptions([{ question: 'Opção 1' }]); // Redefine as opções de rádio para um estado inicial
        setShowOtherOption(false);
        setOtherOptionText(""); // Limpa o texto da opção "Outros"

        setCheckboxOptions([{ question: 'Opção 1' }]);
        setShowOtherOptionCheck(false);
        setOtherOptionCheckbox("");
    };

    const handleRemoveRadioOption = (index) => {
        const updatedOptions = [...radioOptions];
        updatedOptions.splice(index, 1);
        setRadioOptions(updatedOptions);
        dados.options=updatedOptions;
    };

    const handleRemoveCheckOption = (index) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions.splice(index, 1);
        setCheckboxOptions(updatedOptions);
        dados.options=updatedOptions;
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setDados({
            ...dados,
            [name]: value,
        });
    };

    const handleEnviarClick = () => {
        const newWarnings = [];
        if (dados.question === "") {
            newWarnings.push("O campo 'Pergunta' é obrigatório");
        };

        if (newWarnings.length > 0) {
            setWarnings(newWarnings);
            setWarningsPopupOpen(true);
        } else {
            setLoading(true);
            createFields(dados)
                .then((response) => {
                    if (response.statusCode === 200) {
                        setLoading(false);
                        setSucessPopup(true)
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

    const handleAddOption = () => {
        const newOption = { question: `Opção ${radioOptions.length + 1}` };
        setRadioOptions([...radioOptions, newOption]);
    };

    const handleAddCheckbox = () => {
        const newOption = { question: `Opção ${checkboxOptions.length + 1}` };
        setCheckboxOptions([...checkboxOptions, newOption]);
    };

    const handleOptionQuestionChange = (index, value) => {
        const updatedOptions = [...radioOptions];
        updatedOptions[index].question = value;
        setRadioOptions(updatedOptions);

        const newDados = { ...dados };

        // Se a opção já existe, atualize a pergunta; caso contrário, adicione uma nova opção
        if (index < newDados.options.length) {
            newDados.options[index] = { ...newDados.options[index], question: value };
        } else {
            newDados.options.push({ question: value });
        }

        newDados.type = "radio";

        // Atualize o estado com a nova cópia
        setDados(newDados);
    };

    const handleCheckboxQuestionChange = (index, value) => {
        const updatedOptions = [...checkboxOptions];
        updatedOptions[index].question = value;
        setCheckboxOptions(updatedOptions);

        const newDados = { ...dados };

        // Se a opção já existe, atualize a pergunta; caso contrário, adicione uma nova opção
        if (index < newDados.options.length) {
            newDados.options[index] = { ...newDados.options[index], question: value };
        } else {
            newDados.options.push({ question: value });
        }

        newDados.type = "checkbox";

        // Atualize o estado com a nova cópia
        setDados(newDados);
    };

    const handleClickSave = () => {
        setCancelPopup(true);
    };

    const handleShowOtherOption = () => {
        setShowOtherOption(true);

        setRadioOptions((prevOptions) => [...prevOptions]);
        setDados((prevDados) => ({
            ...prevDados,
            options: [...prevDados.options],
            other: "Outros:",
        }));
    };

    const handleShowOtherCheck = () => {
        setShowOtherOptionCheck(true);

        setCheckboxOptions((prevOptions) => [...prevOptions]);
        setDados((prevDados) => ({
            ...prevDados,
            options: [...prevDados.options],
            other: "Outros:",
        }));
    };

    const handleRemoveOtherOption = () => {
        setShowOtherOption(false);
        setOtherOptionCheckbox(""); // Limpa o valor quando removido
    };

    const handleClosePopup = () => {
        setCancelPopup(false);
        setWarningsPopupOpen(false);
    };

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div>
            <div className="flex-grow">
                <div className="bg-fundo mt-15 rounded-10 py-30 px-60">
                    <div className="flex gap-10 items-center">
                        <input
                            type="text"
                            placeholder="Digite aqui a pergunta"
                            name="question"
                            value={dados.question}
                            onChange={(e) => { handleFieldChange(e) }}
                            className="bg-fundo outline-none text-pretoTexto pl-10 pr-30 font-regular font-semibold text-paragrafo w-full"
                        />
                        <Dropdown value={selectedOption} onOptionChange={handleOptionChange} />
                    </div>
                    {selectedOption === 'text' && (
                        <input
                            type="text"
                            placeholder="Resposta do Egresso"
                            id="nome"
                            className="bg-fundo w-full border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo pl-10 font-regular mt-15"
                            disabled
                        />
                    )}
                    {selectedOption === 'radio' && (
                        <div>
                            {radioOptions.map((option, index) => (
                                <div className="flex gap-10 mt-15">
                                    <div className="flex w-full">
                                        <input type="radio" name="radioOptions" value={index} disabled />
                                        <input
                                            type="text"
                                            value={option.question}
                                            onChange={(e) => handleOptionQuestionChange(index, e.target.value)}
                                            className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                        />
                                    </div>
                                    <button className="ml-10" onClick={() => handleRemoveRadioOption(index)}>
                                        <Image src={iconDelete} alt="Ícone de x" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {showOtherOption && (
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
                                    value={otherOptionCheckbox}
                                    disabled
                                    className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                />
                            </div>
                            <button className="ml-10" onClick={handleRemoveOtherOption}>
                                <Image src={iconDelete} alt="Ícone de x" />
                            </button>
                        </div>
                    )}
                    <div className="flex items-center gap-10">
                        {selectedOption === 'radio' && (
                            <div className="flex bg-azulBase text-white text-center justify-center rounded-10 py-5 px-10 mt-15 text-legenda">
                                <button onClick={handleAddOption}>Adicionar Opção</button>
                            </div>
                        )}
                        {selectedOption === 'radio' && (
                            <div className="flex bg-azulBase text-white text-center justify-center rounded-10 py-5 px-10 mt-15 text-legenda">
                                <button onClick={handleShowOtherOption}>Adicionar Outros</button>
                            </div>
                        )}
                    </div>
                    {selectedOption === 'checkbox' && (
                        <div>
                            {checkboxOptions.map((option, index) => (
                                <div className="flex gap-10 mt-15">
                                    <div className="flex w-full">
                                        <input type="checkbox" name="checkboxOptions" value={index} disabled />
                                        <input
                                            type="text"
                                            value={option.question}
                                            onChange={(e) => handleCheckboxQuestionChange(index, e.target.value)}
                                            className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                                        />
                                    </div>
                                    <button className="ml-10" onClick={() => handleRemoveCheckOption(index)}>
                                        <Image src={iconDelete} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {showOtherOptionCheck && (
                        <div className="flex gap-10 mt-15">
                            <div className="flex w-full">
                                <input
                                    type="checkbox"
                                    name="checkboxOptions"
                                    value={dados.other}
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
                            <button className="ml-10" onClick={handleRemoveOtherOption}>
                                <Image src={iconDelete} alt="Ícone de x" />
                            </button>
                        </div>
                    )}
                    <div className="flex items-center gap-10">
                        {selectedOption === 'checkbox' && (
                            <div className="flex bg-azulBase text-white text-center justify-center rounded-10 py-5 px-10 mt-15 text-legenda">
                                <button onClick={handleAddCheckbox}>Adicionar Opção</button>
                            </div>
                        )}
                        {selectedOption === 'checkbox' && (
                            <div className="flex bg-azulBase text-white text-center justify-center rounded-10 py-5 px-10 mt-15 text-legenda">
                                <button onClick={handleShowOtherCheck}>Adicionar Outros</button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-10 mt-30">
                        <div className="inline-block bg-verdeButton rounded-10 text-center text-white">
                            <button onClick={handleEnviarClick} className="px-15 py-10">Salvar</button>
                        </div>
                        <div className="inline-block bg-vermelhoButton rounded-10 text-center text-white">
                            <button onClick={handleClickSave} className="px-15 py-10">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
            {cancelPopup && (
                <Popup isOpen={cancelPopup}>
                    <Image src={iconAttetion} alt="Ícone de atenção" />
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Essa ação não poderá ser desfeita</p>
                    <div className="flex justify-center">
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Sim</button>
                        <button onClick={handleClosePopup} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Não</button>
                    </div>
                </Popup>
            )}
            {sucessPopup && (
                <Popup isOpen={sucessPopup}>
                    <Image src={iconSucess} alt="Ícone de sucesso" />
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Sucesso!</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Campo criado com sucesso!</p>
                    <div className="flex justify-center">
                        <button onClick={handleReload} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
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
    );
}