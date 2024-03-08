"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import ImgHeader from "/public/icons/imgHeader.svg";
import noEvents from "/public/icons/noEvents.svg";

// Components
import NavBar from "@/components/navBar/adm/page";
import NavAcessibilidade from "@/components/navAcessibilidade";
import Card from "@/components/adm/editais/card";
import Footer from "@/components/footer";
import CheckAuth from "@/components/checkAuth/checkAuth";

// API
import { getNotice } from "../../../../utils/apiNotice/api";

export default function editais() {
    const [editedNotice, setEditedNotice] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getNotice().then((data) => {
            setEditedNotice(data.data);
            setLoading(false);
        });
    }, []);

    if (!editedNotice) {
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
                                    Editar Editais
                                </button>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center mt-40 justify-center" id="conteudo">
                            <Image src={noEvents} />
                            <p className="mt-15 text-cinza05 text-tituloSessão">Não há editais no momento</p>
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
        <main className="flex flex-col w-full min-h-screen bg-fundo font-cabin">
            <header>
                <NavAcessibilidade />
                <div id="navmenu">
                    <NavBar />
                </div>
            </header>
            <section className="flex-grow">
                <div>
                    <Image className="w-full" src={ImgHeader}></Image>
                </div>
                <div className='items-center py-8 grid'>
                    <h1 className="font-semibold text-azulBase text-center text-tituloPrincial flex-grow">Acompanhe os editais!</h1>
                    <Link href="./form/page" className="absolute right-32">
                        <button className="px-15 py-5 transition-transform transform hover:scale-105 border-2 border-azulBase rounded-10 text-center text-azulBase font-semibold">
                            Editar Editais
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row flex-wrap mx-120 gap-30 justify-center" id="conteudo">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center my-50">
                            <div class="spinner" />
                        </div>
                    ) : (
                        editedNotice.map((notice) => (
                            <Card
                                key={notice.id}
                                title={notice.title}
                                pdfName={notice.pdfName}
                                link={notice.link}
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