import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import ImgHeader from "/public/icons/imgHeader.svg";
import ImgHome from '/public/icons/imgHome.svg';

// Components
import NavBar from "@/components/navBar/adm/page";
import NavAcessibilidade from "@/components/navAcessibilidade";
import Footer from "@/components/footer";
import CheckAuth from "@/components/checkAuth/checkAuth";

import AtalhoEvents from '/public/icons/atalhoEvents.svg';
import AtalhoNotice from '/public/icons/atalhoNotice.svg';
import AtalhoForm from '/public/icons/atalhoForm.svg';
import AtalhoFormResponse from '/public/icons/atalhoFormResponse.svg';

export default function Home() {
    return (
        <CheckAuth allowedAccess={["coordinator"]}>
            <main className="flex flex-col bg-fundo font-cabin w-full min-h-screen">
                <header>
                    <NavAcessibilidade/>
                    <div id="navmenu">
                        <NavBar/>
                    </div>
                </header>
                <section className="flex-grow">
                    <div>
                        <Image src={ImgHeader} alt="Imagem de fundo" className="w-full"/>
                    </div>
                    <div className="mx-120">
                        <h1 className="text-azulBase text-tituloPrincial font-semibold mt-30">Bem-vindo, Coordenador!</h1>
                        <div className="mt-15">
                            <p className="text-pretoTexto text-subtitulo">Você está no controle, guiando o curso da engenharia de software em nossa instituição. Este Portal de Egressos é uma extensão de sua liderança, proporcionando uma visão abrangente das realizações de nossos ex-alunos e fortalecendo os laços que unem nossa comunidade.</p>
                        </div>
                        <div className="flex gap-30 mt-100" id="conteudo">
                            <div className="col-span-2 ml-60">
                                <h2 className="text-azulBase text-tituloPrincial font-semibold" id="conteudo">Gerencie Egressos e Recursos</h2>
                                <p className="text-pretoTexto text-subtitulo mt-15">Além de adicionar eventos e editais, você pode criar formulários específicos para os egressos. Visualize e gerencie os egressos cadastrados no portal, analise suas respostas de forma detalhada e exporte os dados para PDF, proporcionando uma visão abrangente do progresso de nossa comunidade.</p>
                            </div>
                            <div className="mr-60 shadow-lg bg-[#F3F3F3] flex-grow w-auto">
                                <p className="bg-azulBase text-fundo rounded-t-10 text-center py-3 font-semibold text-lg">Atalhos</p>
                                <div className="mt-15 ml-7 flex gap-4 w-400">
                                    <div className="flex justify-center items-center text-center w-72">
                                        <Link href="../eventos/form/page">
                                            <button className="bg-azulBase p-2 rounded-10">
                                                <Image className="bg-azulBase w-30 h-30" src={AtalhoEvents}></Image>
                                            </button>
                                            <p className="mt-1 text-sm">Editar Eventos</p>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center items-center text-center w-72">
                                        <Link href="../editais/form/page">
                                            <button className="bg-azulBase p-2 rounded-10">
                                                <Image className="bg-azulBase w-30 h-30" src={AtalhoNotice}></Image>
                                            </button>
                                            <p className="mt-1 text-sm">Adicionar Edital</p>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center items-center text-center w-72">
                                        <Link href="../form/page">
                                            <button className="bg-azulBase p-2 rounded-10">
                                                <Image className="bg-azulBase w-30 h-30" src={AtalhoForm}></Image>
                                            </button>
                                            <p className="mt-1 text-sm">Editar Formulário</p>
                                        </Link>
                                    </div>
                                    <div className="flex justify-center items-center text-center w-72 mr-8">
                                        <Link href="../egressos/page">
                                            <button className="bg-azulBase p-2 rounded-10">
                                                <Image className="bg-azulBase w-30 h-30" src={AtalhoFormResponse}></Image>
                                            </button>
                                            <p className="mt-1 text-sm">Resposta do Egresso</p>
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                <footer id="rodape">
                    <Footer/>
                </footer>
            </main>
        </CheckAuth>
    )
}