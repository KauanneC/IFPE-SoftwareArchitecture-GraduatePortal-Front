import React from "react";
import Image from "next/image";

import NavBar from "@/components/navBar/adm/page";
import NavAcessibilidade from "@/components/navAcessibilidade";
import IconVoltar from "/public/icons/iconVoltar.svg";

export default function Title() {
    
    const handleBack = () => {
        window.history.back();
    };

    return (
        <main className="flex flex-col bg-cinza10 font-cabin">
            <header>
                <NavAcessibilidade />
                <NavBar />
            </header>
            <section className="flex">
                <button onClick={handleBack} className="flex mt-30 ml-60 mr-40">
                    <Image src={IconVoltar} />
                </button>
                <div className="w-full mr-120 bg-fundo justify-center text-center mt-30 border-t-10 border-azulForm px-60 py-30 rounded-10">
                    <h1 className="font-semibold text-tituloSessão text-azulBase">Acompanhamento de Egressos do Curso de Engenharia de Software - IFPE Campus Belo Jardim</h1>
                </div>
            </section>
        </main>
    )
}