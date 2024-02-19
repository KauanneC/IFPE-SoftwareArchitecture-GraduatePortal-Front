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
                        <div className="grid grid-cols-3 gap-30 mt-100" id="conteudo">
                            <div className="col-span-2 ml-60">
                                <h2 className="text-azulBase text-tituloPrincial font-semibold" id="conteudo">Gerencie Egressos e Recursos</h2>
                                <p className="text-pretoTexto text-subtitulo mt-15">Além de adicionar eventos e editais, você pode criar formulários específicos para os egressos. Visualize e gerencie os egressos cadastrados no portal, analise suas respostas de forma detalhada e exporte os dados para PDF, proporcionando uma visão abrangente do progresso de nossa comunidade.</p>
                                <div className="flex items-center justify-center">
                                    <div className="inline-block mt-15 bg-azulBase px-30 py-10 text-white rounded-10 transition-transform transform hover:scale-105">
                                        <Link href="../form/page">
                                            <button>Editar Formulário</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mr-60">
                                <Image src={ImgHome} alt="Imagem representando um formando"/>
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