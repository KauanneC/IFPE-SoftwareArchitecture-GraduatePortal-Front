import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import NavAcessibilidade from '@/components/navAcessibilidade';
import NavBar from '@/components/navBar/egresso';
import Footer from '@/components/footer';
import imgHeader from '/public/icons/imgHeader.svg';
import CardEvent from '@/components/cardEvento';
import CheckAuth from '@/components/checkAuth/checkAuth';

import iconNoEvents from '/public/icons/iconNoEvents.svg';

import { getEvents } from "../../../../utils/apiEvents/api";

export default function Eventos() {

    const [editedEvents, setEditedEvents] = useState([]);

    const [expandidoArray, setExpandidoArray] = useState(Array(editedEvents.length).fill(false));

    const handleToggleExpansao = (index) => {
        setExpandidoArray((prevState) => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
        });
    };

    const handleToggleReducao = (index) => {
        setExpandidoArray((prevState) => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;
        });
    };

    useEffect(() => {
        getEvents().then((data) => {
            setEditedEvents(data.data);
        });
    });

    return (
        <CheckAuth allowedAccess={["egress"]}>
            <main>
                <header>
                    <NavAcessibilidade />
                    <NavBar />
                    <Image src={imgHeader} alt="Imagem de alunos se formando" className='w-screen' />
                </header>
                <section id='conteudo' className='flex flex-col items-center justify-center mt-30 space-y-100 mx-120'>
                    <h1 className='font-semibold text-azulBase text-tituloPrincial'>Acompanhe nossos eventos!</h1>
                    {editedEvents.length === 0 ? (
                        <div className='flex flex-col space-y-15 items-center justify-center'>
                            <Image src={iconNoEvents} alt="Imagem de um calendário" />
                            <p className='text-pretoTexto text-tituloSessão'>No momento não há eventos</p>
                        </div>
                    ) : (
                        <div className='grid gap-x-30 gap-y-30 grid-cols-3'>
                            {editedEvents.map((event, index) => (
                                <div key={index} className='w-full'>
                                    <CardEvent
                                        key={event.id}
                                        name={event.name}
                                        date={event.date}
                                        hour={event.hour}
                                        modality={event.modality}
                                        place={event.place}
                                        description={event.description}
                                        expandido={expandidoArray[index]}
                                        onToggleExpansao={() => handleToggleExpansao(index)}
                                        onToggleReducao={() => handleToggleReducao(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
                <footer>
                    <Footer />
                </footer>
            </main>
        </CheckAuth>
    );
}
