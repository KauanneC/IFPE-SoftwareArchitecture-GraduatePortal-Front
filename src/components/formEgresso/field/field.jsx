import React from "react";

export default function Field({ field }) {
    if (field.type === 'text') {
        return (
            <input
                type="text"
                placeholder="Digite aqui"
                id="nome"
                className="bg-fundo w-full border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo pl-10 font-regular mt-15"
            />
        )
    } else if (field.type === 'radio') {
        return (
            <div>
                {field.options.map((option, index) => (
                    <div className="flex gap-10 mt-15">
                        <div className="flex w-full">
                            <input type="radio" name="radioOptions3" />
                            <label className="w-full bg-inherit outline-none text-pretoTexto text-paragrafo font-regular ml-10">{option.question}</label>
                        </div>
                    </div>
                ))}
                {field.other === 'Outros:' && (
                    <div className="flex gap-10 mt-15">
                        <div className="flex w-full">
                            <input
                                type="radio"
                                name="radioOptions2"
                                value="other"
                                className="mr-10"
                            />
                            <label>Outros:</label>
                            <input
                                type="text"
                                placeholder="Digite aqui"
                                className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    } else if (field.type === 'checkbox') {
        return (
            <div>
                {field.options.map((option, index) => (
                    <div className="flex gap-10 mt-15">
                        <div className="flex w-full">
                            <input type="checkbox" name="checkboxOptions" />
                            <input
                                type="text"
                                className="w-full bg-inherit outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                            />
                        </div>
                    </div>
                ))}
                {field.other === 'Outros:' && (
                    <div className="flex gap-10 mt-15">
                        <div className="flex w-full">
                            <input
                                type="checkbox"
                                name="radioOptions1"
                                value="other"
                                className="mr-10"
                            />
                            <label>Outros:</label>
                            <input
                                type="text"
                                placeholder="Digite aqui"
                                className="w-full bg-inherit border-b-1 border-cinza07 outline-none text-pretoTexto text-paragrafo font-regular ml-10"
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}