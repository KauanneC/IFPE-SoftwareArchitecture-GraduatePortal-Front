import React, { useState, useEffect } from "react";
import Image from "next/image";

// Icons
import ImgHeader from "/public/icons/imgHeader.svg";

// Components
import NavAcessibilidade from "@/components/navAcessibilidade";
import NavBar from "@/components/navBar/adm/page";
import Footer from "@/components/footer";
import Card from "@/components/adm/egressos/card";

// API
import { getUsersByProfile } from "../../../../utils/apiUser/api";

export default function egressos() {
    const [egress, setEgress] = useState([]);
    const [teacher, setTeacher] = useState([]);
    const [coordinator, setCoordinator] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState("egress");

    useEffect(() => {
        getUsersByProfile("egress").then((data) => {
            setEgress(data.data.users);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getUsersByProfile("teacher").then((data) => {
            setTeacher(data.data.users);
            setLoading(false);
        });;
    }, []);

    useEffect(() => {
        getUsersByProfile("coordinator").then((data) => {
            setCoordinator(data.data.users);
            setLoading(false);
        });
    }, []);


    const handleProfileFilter = (profile) => {
        setSelectedProfile(profile);
    };

    const renderUserCards = () => {
        switch (selectedProfile) {
            case 'teacher':
                if (teacher.length === 0) {
                    return (
                        <div className="flex flex-col items-center mt-40 justify-center" id="conteudo">
                            <p className="mt-15 text-cinza05 text-tituloSessão">Não há docentes cadastrados no momento</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="flex flex-col gap-30 w-full mx-45">
                            {teacher.map((user) => (
                                <Card key={user.email} name={user.name} id={user.id} profile={"teacher"} />
                            ))}
                        </div>
                    );
                }
            case 'coordinator':
                if (coordinator.length === 0) {
                    return (
                        <div className="flex flex-col items-center mt-40 justify-center" id="conteudo">
                            <p className="mt-15 text-cinza05 text-tituloSessão">Não há coordenadores cadastrados no momento</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="flex flex-col gap-30 w-full mx-45">
                            {coordinator.map((user) => (
                                <Card key={user.email} name={user.name} id={user.id} profile={"coordinator"} />
                            ))}
                        </div>
                    )
                }
            case 'egress':
                if (egress.length === 0) {
                    return (
                        <div className="flex flex-col items-center mt-40 justify-center" id="conteudo">
                            <p className="mt-15 text-cinza05 text-tituloSessão">Não há egressos cadastrados no momento</p>
                        </div>
                    )
                } else {
                    return (
                        <div className="flex flex-col gap-30 w-full mx-45">
                            {egress.map((user) => (
                                <Card key={user.email} name={user.name} id={user.id} profile={"egress"} />
                            ))}
                        </div>
                    )
                }
                default:
                return null;
        }
    };

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
                <div className='flex items-center py-8'>
                    <h1 className="font-semibold text-azulBase text-center text-tituloPrincial flex-grow">Usuários</h1>
                </div>
                <div className="flex justify-end mr-160 mb-30">
                    <select
                        id="profileFilter"
                        onChange={(e) => handleProfileFilter(e.target.value)}
                        value={selectedProfile || ""}
                        className="flex outline-none rounded-10 pr-10 bg-inherit border-1 border-azulBase text-pretoTexo p-10"
                    >
                        <option value="egress">Egressos</option>
                        <option value="teacher">Docentes</option>
                        <option value="coordinator">Coordenadores</option>
                    </select>
                </div>
                <div className="flex flex-wrap items-start mx-120 justify-center" id="conteudo">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center my-50">
                            <div class="spinner" />
                        </div>
                    ) : (
                        renderUserCards()
                    )}
                </div>
            </section>
            <div id="rodape">
                <Footer />
            </div>
        </main>
    )
}