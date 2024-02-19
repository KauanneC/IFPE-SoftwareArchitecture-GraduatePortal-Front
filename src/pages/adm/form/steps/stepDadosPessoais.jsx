import React, { useState } from "react";
import Image from "next/image";

// Icon
import dadosPessoais from "/public/icons/iconDadosPessoaisBlue.svg"
import dadosAcademicos from "/public/icons/iconAcademicoWhite.svg"
import dadosProfissionais from "/public/icons/iconProfissionalWhite.svg"
import feedback from "/public/icons/iconFeedbackWhite.svg"
import arrow from "/public/icons/arrow.svg"

// Components
import Title from "@/components/adm/form/title/Title";
import AddCampo from "@/components/adm/form/addCampo/addCampo";
import AllFields from "@/components/adm/form/allFields/allFields";


export default function StepDadosPessoais(props) {
    const {cont, setCont} = props;
    const [campos, setCampos] = useState([]);
    const [hasFields, setHasFields] = useState(true);

    const categorieChange = () => {
        setCont(cont + 1);
    };

    const adicionarCampo = () => {
        setCampos([...campos, { id: Date.now() }]);
        setHasFields(false);
    };

    return (
        <main>
            <header>
                <Title />
            </header>
            <section className="mx-120">
                <div className="flex flex-wrap justify-center gap-20 bg-fundo mt-15 rounded-10 px-60 py-30">
                    <button className="flex flex-col items-center gap-5">
                        <Image src={dadosPessoais} alt="Ícone representando dados pessoais"></Image>
                        <p className="font-regular text-subtitulo text-azulBase">Dados Pessoais</p>
                    </button>
                    <Image src={arrow}></Image>
                    <button className="flex flex-col items-center gap-5" onClick={categorieChange}>
                        <Image src={dadosAcademicos} alt="Ícone representando dados acadêmicos"></Image>
                        <p className="font-regular text-subtitulo text-azulBase">Acadêmico</p>
                    </button>
                    <Image src={arrow}></Image>
                    <button className="flex flex-col items-center gap-5">
                        <Image src={dadosProfissionais} alt="Ícone representando dados profissionais"></Image>
                        <p className="font-regular text-subtitulo text-azulBase">Profissional</p>
                    </button>
                    <Image src={arrow}></Image>
                    <button className="flex flex-col items-center gap-5">
                        <Image src={feedback} alt="Ícone representando feedback"></Image>
                        <p className="font-regular text-subtitulo text-azulBase">Feedback</p>
                    </button>
                </div>
                <div className="flex bg-azulBase text-white text-center justify-center w-175 h-42 rounded-10 mt-15 mx-auto my-auto">
                    <button onClick={adicionarCampo}>Adicionar Campo</button>
                </div>
                <div>
                    {campos.map((campo) => (
                        <AddCampo props={"dados-pessoais"}/>
                    ))}

                    <AllFields formType={'dados-pessoais'} hasFields={hasFields} setHasFields={setHasFields}/> 
                </div>
                <div className="flex items-center justify-center">
                    <div className="inline-block bg-azulBase rounded-10 text-white mt-15">
                        <button onClick={categorieChange} className="py-10 px-20">Próximo</button>
                    </div>
                </div>
            </section>
        </main>
    )
}