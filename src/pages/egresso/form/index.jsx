import React, { useState } from "react";

import StepDadosPessoais from "./steps/stepDadosPessoais";
import StepAcademico from "./steps/stepAcademico";
import StepProfissional from "./steps/stepProfissional";
import StepFeedback from "./steps/stepFeedback";
import CheckAuth from "../../../components/checkAuth/checkAuth";

export default function FormEgresso() {

    const [cont, setCont] = useState(0); // Contador de telas

    const arrayScreens = [
        <StepDadosPessoais cont={cont} setCont={setCont} />,
        <StepAcademico cont={cont} setCont={setCont} />,
        <StepProfissional cont={cont} setCont={setCont} />,
        <StepFeedback cont={cont} setCont={setCont} />,
    ]

    return (
        <CheckAuth allowedAccess={["egress"]} >
            <main className="flex flex-col bg-cinza10 min-h-screen">
                <section className="flex-grow">
                    {arrayScreens[cont]} {/* Renderiza a tela 0 */}
                </section>
            </main>
        </CheckAuth>
    )
}