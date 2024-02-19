import React from "react";
import Image from "next/image";
import { saveAs } from "file-saver";

// Icons
import iconPdf from "/public/icons/iconPdf.svg";

export default function card({ title, pdfName, nomeArquivo, link}) {

    const handleDownload = () => {
        const pdfUrl = link;
        saveAs(pdfUrl, nomeArquivo); // Nome do arquivo
    }

    return (
        <div className="flex flex-col justify-center items-center w-400 h-185 border-t-10 border-azulForm border rounded-10 bg-white drop-shadow">
            <h1 className="text-pretoTexto font-bold text-tituloSessão">{title}</h1>
            <button className="flex justify-center items-center gap-15 mt-20" onClick={handleDownload}>
                <Image className="" src={iconPdf}></Image>
                Acessar Edital
            </button>
        </div>
    )
}