import React from "react";
import Image from "next/image";
import Link from "next/link";

// Icons
import ImgHeader from "/public/icons/imgHeader.svg";
import ImgHome from '/public/icons/imgHome.svg';

// Components
import NavBar from "@/components/navBar/docente/page";
import NavAcessibilidade from "@/components/navAcessibilidade";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <main className="flex flex-col bg-fundo font-cabin w-full min-h-screen">
            <header>
                <NavAcessibilidade/>
                <NavBar/>
            </header>
            <section className="flex-grow">
                <div>
                    <Image src={ImgHeader} alt="Imagem de fundo" className="w-full"/>
                </div>
                <div className="mx-120">
                    <h1 className="text-azulBase text-tituloPrincial font-semibold mt-30">Bem-vindo, Docente!</h1>
                    <div className="mt-15">
                        <p className="text-pretoTexto text-subtitulo">É um prazer tê-lo em nosso Portal de Egressos. Como membro ativo da equipe docente, você desempenha um papel crucial na formação de profissionais de engenharia de software. Este espaço foi projetado não apenas para os ex-alunos, mas também para você, que contribui diariamente para o crescimento acadêmico e profissional de nossos estudantes.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-30 mt-100">
                        <div className="col-span-2 ml-60">
                            <h2 className="text-azulBase text-tituloPrincial font-semibold">Promova Eventos e Oportunidades</h2>
                            <p className="text-pretoTexto text-subtitulo mt-15">Aproveite a capacidade de adicionar eventos e editais diretamente no portal. Crie oportunidades únicas para que os egressos se envolvam, compartilhando conhecimentos e experiências valiosas com nossos estudantes e outros ex-alunos.</p>
                        </div>
                        <div className="mr-60">
                            <Image src={ImgHome} alt="Imagem representando um formando"/>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </main>
    )
}