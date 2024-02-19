import React from "react";
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';

import NavAcessibilidade from '@/components/navAcessibilidade';
import NavBar from '@/components/navBar/egresso';
import Footer from '@/components/footer';
import AllFormFields from '@/components/formEgresso/allFormFields';

import iconVoltar from '/public/icons/iconVoltar.svg';
import iconDadosPessoaisBlue from '/public/icons/iconDadosPessoaisBlue.svg';
import iconAcademicoBlue from '/public/icons/iconAcademicoBlue.svg';
import iconProfissionalBlue from '/public/icons/iconProfissionalBlue.svg';
import iconFeedbackBlue from '/public/icons/iconFeedbackBlue.svg';
import iconNext from '/public/icons/iconNext.svg';

export default function FormStep04(props) {
    const { cont, setCont, step, stepStep } = props;
    const [hasFields, setHasFields] = useState(true);

    const categorieChangeAnt = () => {
        setCont(cont - 1);
    };

    const [showAlertVoltar, setShowAlertVoltar] = useState(false);
    const [showAlertEnviar, setShowAlertEnviar] = useState(false);
    const [showAlertSucesso, setShowAlertSucesso] = useState(false);
    const [showAlertErro, setShowAlertErro] = useState(false);

    const handleShowAlertVoltar = () => {
        setShowAlertVoltar(true);
    };

    const handleShowAlertEnviar = () => {
        setShowAlertEnviar(true);
    };

    const handleShowAlertSucesso = () => {
        setShowAlertSucesso(true);
    };

    const handleShowAlertErro = () => {
        setShowAlertErro(true);
    };

    if (showAlertVoltar) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Os dados não serão salvos!',
            icon: 'warning',
            iconColor: '#C18031',
            confirmButtonColor: '#991D39',
            cancelButtonColor: '#666666',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/egresso/home";
            } else {
                setShowAlertVoltar(false);
            }
        })
    }

    if (showAlertEnviar) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Verifique se todos os campos foram preenchidos corretamente!',
            icon: 'warning',
            iconColor: '#C18031',
            confirmButtonColor: '#20771B',
            cancelButtonColor: '#666666',
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            showConfirmButton: true,
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                handleShowAlertErro();
            } else {
                setShowAlertEnviar(false);
            }
        })
    }

    if (showAlertSucesso) {
        Swal.fire({
            title: 'Sucesso!',
            text: 'O fomrulário foi enviado com sucesso!',
            icon: 'success',
            iconColor: '#20771B',
            confirmButtonColor: '#20771B',
            confirmButtonText: 'Voltar para a página inicial',
            showConfirmButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/egresso/home";
            } else {
                setShowAlertSucesso(false);
            }
        })
    }

    if (showAlertErro) {
        Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao enviar o formulário!',
            icon: 'error',
            iconColor: '#991D39',
            confirmButtonColor: '#242B63',
            confirmButtonText: 'Tentar novamente',
        }).then(() => {
            setShowAlertErro(false);
        })
    }

    return (
        <main className="bg-cinza10">
            <header>
                <NavAcessibilidade />
                <NavBar />
            </header>
            <section id="conteudo" className='mt-30 space-y-15 mx-120 items-center justify-center flex flex-col'>
                {/* Título Form */}
                <div className="bg-fundo w-full py-30 px-60 rounded-lg border-t-8 border-azulForm">
                    <h1 className='font-semibold text-azulBase text-tituloSessão text-center'>Acompanhamento de Egressos do Curso de Engenharia de Software - IFPE Campus Belo Jardim</h1>
                </div>
                {/* Navegação Form */}
                <div className="bg-fundo w-full py-30 px-60 rounded-lg space-x-20 flex flex-row items-center justify-center">
                    <div className="items-center justify-center flex flex-col space-y-5">
                        <Image src={iconDadosPessoaisBlue} alt="Página 1: dados pessoais" />
                        <p className='text-azulBase text-subtitulo font-normal'>Dados Pessoais</p>
                    </div>
                    <div>
                        <Image src={iconNext} alt="Próxima página: Acadêmico" />
                    </div>
                    <div className="items-center justify-center flex flex-col space-y-5">
                        <Image src={iconAcademicoBlue} alt="Página atual: Acadêmico" />
                        <p className='text-azulBase text-subtitulo font-normal'>Acadêmico</p>
                    </div>
                    <div>
                        <Image src={iconNext} alt="Próxima página: Profissional" />
                    </div>
                    <button className="items-center justify-center flex flex-col space-y-5" onClick={categorieChangeAnt}>
                        <Image src={iconProfissionalBlue} alt="Página 3: Profissional" />
                        <p className='text-azulBase text-subtitulo font-normal'>Profissional</p>
                    </button>
                    <div>
                        <Image src={iconNext} alt="Próxima página: Feedback" />
                    </div>
                    <div className="items-center justify-center flex flex-col space-y-5">
                        <Image src={iconFeedbackBlue} alt="Página 4: feedback" />
                        <p className='text-azulBase text-subtitulo font-normal'>Feedback</p>
                    </div>
                </div>
                {/* Form */}
                <div className="flex flex-col w-full rounded-lg gap-30">
                    <div>
                        <AllFormFields formType={'feedback'} hasFields={hasFields} setHasFields={setHasFields} />
                    </div>
                    {/* Botão */}
                    {hasFields && (
                        <div className="justify-center items-center flex gap-30">
                            <button className="bg-azulBase py-10 px-30 text-cinza10 font-semibold rounded-lg transition-transform transform hover:scale-105 active:bg-azulEscuro" >
                                Próximo
                            </button>
                            <button className='bg-azulBase py-10 px-30 text-cinza10 font-semibold rounded-lg transition-transform transform hover:scale-105 active:bg-azulEscuro'>
                                Voltar
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <footer>
                <Footer />
            </footer>
        </main>
    )
}