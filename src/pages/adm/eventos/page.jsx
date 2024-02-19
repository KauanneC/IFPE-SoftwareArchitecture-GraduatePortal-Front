"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Components 
import NavBar from "@/components/navBar/adm/page";
import Footer from "@/components/footer";
import NavAcessibilidade from "@/components/navAcessibilidade/index";
import Card from "@/components/adm/eventos/card";
import CheckAuth from "@/components/checkAuth/checkAuth";

// Images
import ImgHeader from "/public/icons/imgHeader.svg";
import noEvents from "/public/icons/noEvents.svg";

// API
import { getEvents } from "../../../../utils/apiEvents/api";

export default function Eventos() {
    const [editedEvents, setEditedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvents().then((data) => {
            setEditedEvents(data.data);
            setLoading(false);
        });
    }, []);

    if (!editedEvents) {
        return (
            <CheckAuth allowedAccess={["coordinator"]}>
                <main className="flex flex-col bg-fundo w-full min-h-screen font-cabin">
                    <header>
                        <NavAcessibilidade />
                        <div id="navmenu">
                            <NavBar />
                        </div>
                    </header>
                    <section className="flex-grow">
                        <Image className="w-full" src={ImgHeader}></Image>
                        <div className='items-center py-8 grid'>
                            <h1 className="font-semibold text-azulBase text-center text-tituloPrincial flex-grow">Acompanhe nossos eventos!</h1>
                            <Link href="./form/page" className="absolute right-32">
                                <button className="px-15 py-5 transition-transform transform hover:scale-105 border-2 border-azulBase rounded-10 text-center text-azulBase font-semibold">
                                    Editar Eventos
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center mt-40 justify-center" id="conteudo">
                            <Image src={noEvents} />
                            <p className="mt-15 text-cinza05 text-tituloSessão">Não há eventos no momento</p>
                        </div>
                    </section>
                    <footer id="rodape">
                        <Footer />
                    </footer>
                </main>
            </CheckAuth>
        )
    }

    return (
        <main className="flex flex-col bg-fundo w-full min-h-screen font-cabin">
            <header>
                <NavAcessibilidade />
                <div id="navmenu">
                    <NavBar />
                </div>
            </header>
            <section className="flex-grow">
                <Image className="w-full" src={ImgHeader}></Image>
                <div className='items-center py-8 grid'>
                    <h1 className="font-semibold text-azulBase text-center text-tituloPrincial flex-grow">Acompanhe nossos eventos!</h1>
                    <Link href="./form/page" className="absolute right-32">
                        <button className="px-15 py-5 transition-transform transform hover:scale-105 border-2 border-azulBase rounded-10 text-center text-azulBase font-semibold">
                            Editar Eventos
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row flex-wrap items-start mx-120 gap-30 justify-center" id="conteudo">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center my-50">
                            <div class="spinner" />
                        </div>
                    ) : (
                        editedEvents.map((event) => (
                            <Card
                                key={event.id}
                                name={event.name}
                                date={event.date}
                                hour={event.hour}
                                modality={event.modality}
                                place={event.place}
                                description={event.description}
                            />
                        ))
                    )}
                </div>
            </section>
            <footer id="rodape">
                <Footer />
            </footer>
        </main>
    )
}