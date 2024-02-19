import React, { useState } from "react";
import Image from "next/image";

// Icons
import IconVoltar from "/public/icons/iconVoltar.svg";

// Components
import NavBar from "@/components/navBar/adm/page";
import Footer from "@/components/footer";
import NavAcessibilidade from "@/components/navAcessibilidade/index";
import AddEvento from "@/components/adm/eventos/addEventos/addEvento";
import AllEvents from "@/components/adm/eventos/allEvents/allEvents";
import CheckAuth from "@/components/checkAuth/checkAuth";

export default function EventosForm() {
    const [campos, setCampos] = useState([]);

    const adicionarCampo = () => {
        setCampos([...campos, { id: Date.now() }]);
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <CheckAuth allowedAccess={["coordinator"]}>
            <main className="flex flex-col bg-cinza10 w-full min-h-screen font-cabin">
                <header>
                    <NavAcessibilidade />
                    <NavBar />
                </header>
                <section className="flex flex-grow">
                    <button onClick={handleBack} className="flex mt-30 ml-60">
                        <Image src={IconVoltar} />
                    </button>
                    <div className="flex flex-col mr-120 ml-40 w-full">
                        <div className="flex w-full mt-30 bg-fundo border-azulForm border-t-10 rounded-10 px-60 py-30 text-center justify-center">
                            <h1 className="font-semibold text-tituloSessão text-azulBase">Edição de Eventos</h1>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="inline-block mt-15 bg-azulBase text-white rounded-10 px-30 py-10">
                                <button onClick={adicionarCampo}>Adicionar Evento</button>
                            </div>
                        </div>
                        <div>
                            {campos.map((campo) => (
                                <AddEvento />
                            ))}
                        </div>
                        <div>
                            <AllEvents />
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </CheckAuth>
    )
}