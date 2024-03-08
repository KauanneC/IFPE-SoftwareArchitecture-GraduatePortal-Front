import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/navBar/adm/page";
import NavAcessibilidade from "@/components/navAcessibilidade";
import Footer from "@/components/footer";
import CheckAuth from "@/components/checkAuth/checkAuth";
import { useState } from 'react';

// Image
import IconHome from '../../../../public/icons/tutorial/iconHome.svg'
import IconEvents from '../../../../public/icons/tutorial/iconEvents.svg'
import IconNotice from '../../../../public/icons/tutorial/iconNotice.svg'
import IconForm from '../../../../public/icons/tutorial/iconForm.svg'
import IconFormResponse from '../../../../public/icons/tutorial/iconFormResponse.svg'
import IconAddUser from '../../../../public/icons/tutorial/iconAddUser.svg'

import ImageHome from '../../../../public/assets/image.png'
import Eventos from '../../../../public/assets/eventos.png'
import Editais from '../../../../public/assets/editais.png'
import Formulario from '../../../../public/assets/formulario.png'
import Usuarios from '../../../../public/assets/usuarios.png'
import NovoUsuario from '../../../../public/assets/novoUsuario.png'

export default function TutorialPage() {
    const [expandedCard, setExpandedCard] = useState(null);

    const handleCardClick = (cardId) => {
        if (expandedCard === cardId) {
            setExpandedCard(null);
        } else {
            setExpandedCard(cardId);
        }
    };

    return (
        <CheckAuth allowedAccess={["coordinator"]}>
            <main className="flex flex-col bg-fundo w-full min-h-screen font-cabin">
                <header>
                    <NavAcessibilidade />
                    <div id="navmenu" className="border-b-2">
                        <NavBar />
                    </div>
                </header>
                <section className="flex flex-col mt-8 mx-160 gap-3">
                    <div className="flex ">
                        <div className={`flex w-64 m-4 border-2 border-[#584fa0] rounded-lg overflow-hidden transition-all duration-300 ${expandedCard === 1 ? 'flex-grow justify-start' : 'justify-center'}`}>
                            <div className="flex flex-col p-6 items-center text-center">
                                <Image src={IconHome}/>
                                <h3 className="text-lg font-semibold mt-5">Home</h3>
                                <p className="mt-2">{expandedCard === 1 ? '' : 'Tenha uma breve noção do sistema.'}</p>
                                <button onClick={() => handleCardClick(1)} className="mt-5 bg-azulBase text-white px-4 py-2 rounded-md text-sm">{expandedCard === 1 ? 'Voltar' : 'Expandir'}</button>
                            </div>
                            {expandedCard === 1 && (
                                <div className="flex-start p-4 bg-fundo">
                                    <p>Acesso rápido a funcionalidades principais</p>
                                    <Image src={ImageHome}/>
                                </div>
                            )}
                        </div>
                        <div className={`flex w-64 m-4 border-2 border-[#3ABFC1] rounded-lg overflow-hidden transition-all duration-300 ${expandedCard === 2 ? 'flex-grow justify-start' : 'justify-center'}`}>
                            <div className="flex flex-col p-6 items-center text-center">
                                <Image src={IconEvents}/>
                                <h3 className="text-lg font-semibold mt-5">Eventos</h3>
                                <p className="mt-2">{expandedCard === 2 ? '' : 'Visualize, adicione e edite eventos.'}</p>
                                <button onClick={() => handleCardClick(2)} className="mt-5 bg-azulBase text-white px-4 py-2 rounded-md text-sm">{expandedCard === 2 ? 'Voltar' : 'Expandir'}</button>
                            </div>
                            {expandedCard === 2 && (
                                <div className="flex-start p-4 bg-fundo">
                                    <p className="mb-3">Botão para criar novo evento e a opção de modificar eventos existentes.</p>
                                    <Image src={Eventos}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <div className={`flex w-64 m-4 border-2 border-[#FCB140] rounded-lg overflow-hidden transition-all duration-300 ${expandedCard === 3 ? 'flex-grow justify-start' : 'justify-center'}`}>
                            <div className="flex flex-col p-6 items-center text-center">
                                <Image src={IconNotice}/>
                                <h3 className="text-lg font-semibold mt-5">Editais</h3>
                                <p className="mt-2">{expandedCard === 3 ? '' : 'Visualize e adicione novos editais.'}</p>
                                <button onClick={() => handleCardClick(3)} className="mt-5 bg-azulBase text-white px-4 py-2 rounded-md text-sm">{expandedCard === 3 ? 'Voltar' : 'Expandir'}</button>
                            </div>
                            {expandedCard === 3 && (
                                <div className="flex-start p-4 bg-fundo">
                                    <p className="mb-3">Botão para adicionar novo edital e excluir</p>
                                    <Image src={Editais}/>
                                </div>
                            )}
                        </div>
                        <div className={`flex w-64 m-4 border-2 border-[#1E8DA9] rounded-lg overflow-hidden transition-all duration-300 ${expandedCard === 4 ? 'flex-grow justify-start' : 'justify-center'}`}>
                            <div className="flex flex-col p-6 items-center text-center">
                                <Image src={IconForm}/>
                                <h3 className="text-lg font-semibold mt-5">Formulário</h3>
                                <p className="mt-2">{expandedCard === 4 ? '' : 'Crie um formulário totalmente personalizado.'}</p>
                                <button onClick={() => handleCardClick(4)} className="mt-5 bg-azulBase text-white px-4 py-2 rounded-md text-sm">{expandedCard === 4 ? 'Voltar' : 'Expandir'}</button>
                            </div>
                            {expandedCard === 4 && (
                                <div className="flex-start p-4 bg-fundo">
                                    <p className="mb-3">Ferramenta para criar um novo campo no formulário e opções de tipo de pergunta</p>
                                    <Image src={Formulario}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <div className={`flex w-64 m-4 border-2 border-[#EE5F28] rounded-lg overflow-hidden transition-all duration-300 ${expandedCard === 5 ? 'flex-grow justify-start' : 'justify-center'}`}>
                            <div className="flex flex-col p-6 items-center text-center">
                                <Image src={IconFormResponse}/>
                                <h3 className="text-lg font-semibold mt-5">Usuários</h3>
                                <p className="mt-2">{expandedCard === 5 ? '' : 'Visualize e gerencie usuários.'}</p>
                                <button onClick={() => handleCardClick(5)} className="mt-5 bg-azulBase text-white px-4 py-2 rounded-md text-sm">{expandedCard === 5 ? 'Voltar' : 'Expandir'}</button>
                            </div>
                            {expandedCard === 5 && (
                                <div className="flex-start p-4 bg-fundo">
                                    <p className="mb-3">Lista de todos os usuários registrados e acesso as respostas dos usuário do tipo egresso</p>
                                    <Image src={Usuarios}/>
                                </div>
                            )}
                        </div>
                        <div className={`flex w-64 m-4 border-2 border-[#126794] rounded-lg overflow-hidden transition-all duration-300 ${expandedCard === 6 ? 'flex-grow justify-start' : 'justify-center'}`}>
                            <div className="flex flex-col p-6 items-center text-center">
                                <Image src={IconAddUser}/>
                                <h3 className="text-lg font-semibold mt-5">Novo Usuário</h3>
                                <p className="mt-2">{expandedCard === 6 ? '' : 'Adicione um novo usuário à plataforma.'}</p>
                                <button onClick={() => handleCardClick(6)} className="mt-5 bg-azulBase text-white px-4 py-2 rounded-md text-sm">{expandedCard === 6 ? 'Voltar' : 'Expandir'}</button>
                            </div>
                            {expandedCard === 6 && (
                                <div className="flex-start p-4 bg-fundo">
                                    <p className="mb-3">Campos para inserir dados do novo usuário e botão para enviar as informações e adicionar o usuário.</p>
                                    <Image src={NovoUsuario}/>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <footer id="rodape" className="mt-auto">
                    <Footer />
                </footer>
            </main>
        </CheckAuth>
    )
}