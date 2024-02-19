"use client"
import React, { useState } from "react";

export default function Card({ id, name, date, hour, modality, place, description }) {
    const [expanded, setExpanded] = useState(false);

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    function formatarData(dataString) {
        // Criar um objeto de data a partir da string fornecida
        const data = new Date(dataString);
        let dataFormatada;
    
        // Obter o dia, mês e ano
        const dia = data.getDate();
        const mes = data.getMonth() + 1; // Os meses em JavaScript começam do zero, então adicionamos 1
        const ano = data.getFullYear();
    
        if (mes < 10) {
            dataFormatada = `${dia}/0${mes}/${ano}`;
        } else {
            dataFormatada = `${dia}/${mes}/${ano}`;
        }
        
        return dataFormatada;
    }
    

    return (
        <div className={`w-400 bg-white rounded-10 border-t-10 border-azulForm drop-shadow border ${expanded ? 'max-h-auto' : ''}`}>
            <h2 className="text-pretoTexto font-bold text-tituloSessão text-center mt-30">{name}</h2>
            <div className="flex flex-col mt-15 mx-20 gap-10">
                <div className="flex flex-row gap-5">
                    <p className="font-semibold text-azulBase">Data:</p>
                    <p className="text-pretoTexto text-paragrafo">{formatarData(date)}</p>
                </div>
                <div className="flex flex-row gap-5">
                    <p className="font-semibold text-azulBase">Horário:</p>
                    <p className="text-pretoTexto text-paragrafo">{hour}</p>
                </div>
                <div className="flex flex-row gap-5">
                    <p className="font-semibold text-azulBase">Modalidade:</p>
                    <p className="text-pretoTexto text-paragrafo">{modality}</p>
                </div>
                <div className="flex flex-row gap-5">
                    <p className="font-semibold text-azulBase">Local:</p>
                    <p className="text-pretoTexto text-paragrafo">{place}</p>
                </div>
                <div className="break-words flex flex-row gap-5 mb-30">
                    <p className="font-semibold text-azulBase">Descrição:</p>
                    <div className="text-pretoTexto text-paragrafo break-words">
                        {description.length > 90 ? (
                            <div>
                                <p className="leading-snug">
                                    {expanded ? description : `${description.slice(0, 60)}...`}
                                </p>
                                <button
                                    className='text-azulBase text-paragrafo font-semibold'
                                    onClick={handleToggleExpand}
                                >
                                    {expanded ? 'Ver menos' : 'Ver mais'}
                                </button>
                            </div>
                        ) : (
                            <p>{description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}