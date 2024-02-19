import React, { useState } from "react";

// Components
import StepDadosPessoais from "./steps/stepDadosPessoais";
import StepAcademico from "./steps/stepAcademico";
import StepProfissional from "./steps/stepProfissional";
import StepFeedback from "./steps/stepFeedback";
import Footer from "@/components/footer";

export default function FormAdministrator() {

    const[ cont, setCont ] = useState(0); // Contador de telas

    const arrayScreens = [
        <StepDadosPessoais cont={cont} setCont={setCont} />,
        <StepAcademico cont={cont} setCont={setCont} />,
        <StepProfissional cont={cont} setCont={setCont} />,
        <StepFeedback cont={cont} setCont={setCont} />,
    ]

    return (
        <main className="flex flex-col min-h-screen bg-cinza10 font-cabin">
            <section className="flex-grow">
                {arrayScreens[cont]} {/* Renderiza a tela 0 */}
            </section>
            <Footer />
        </main>
    )
}