import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import IconVoltar from "/public/icons/iconVoltar.svg";
import ImgLogin from "/public/icons/imgLogin.svg";
import IconSenha from "/public/icons/iconSenha.svg";
import IconSee from "/public/icons/iconSee.svg";
import IconUnsee from "/public/icons/iconUnsee.svg";

import { changePasswordForgot } from "../../../../utils/apiForgotPassword/api";

export default function PrimeiroAcesso() {

    const [code, setCode] = useState("");

    const [email, setEmail] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordTouched, setPasswordTouched] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordTouched(true);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setConfirmPasswordTouched(true);
    };

    const isPasswordValid = () => {
        if (!passwordTouched || password === "") {
            return true;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isPasswordMatching = () => {
        if (!confirmPasswordTouched || confirmPassword === "") {
            return true;
        } else {
            return password === confirmPassword;
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    const renderLoading = () => {
        return (
            <div className="flex flex-col items-center justify-center mt-5">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-azulBase"></div>
                <p className="text-legenda text-azulBase mt-2">Carregando...</p>
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];

        if (password.trim() === '' || confirmPassword.trim() === '' || email.trim() === '' || code.trim() === '') {
            errors.push("Preencha os campos");
        }

        if (!isPasswordValid()) {
            errors.push("A senha deve ter pelo menos 8 caracteres, 1 número, 1 caractere especial e 1 letra maiúscula");
        }

        if (!isPasswordMatching()) {
            errors.push("As senhas não coincidem");
        }

        if (errors.length > 0) {
            if (errors.length > 0) {
                let errorMessage = errors.join(" e ");
                Swal.fire({
                    icon: "error",
                    iconColor: "#991D39",
                    title: "Ops...",
                    text: errorMessage,
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#242B63",
                });
            }
            return;
        }

        setLoading(true);

        try {

            const data = {
                email: email,
                password: password,
                code: code,
            };

            console.log('Dados enviados para a API:', data);

            const response = await changePasswordForgot(data);

            if (response && response.statusCode === 200) {
                setLoading(false);
                console.log("Senha alterada com sucesso!");
                Swal.fire({
                    icon: "success",
                    iconColor: "#20771B",
                    title: "Sucesso!",
                    text: "Senha alterada com sucesso!",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#242B63",
                }).then((result) => {
                    setLoading(false);
                    if (result.isConfirmed) {
                        router.push('/user/login');
                    }
                });
            } else {
                setLoading(false);
                console.error('Erro ao alterar a senha:', response);
                Swal.fire({
                    icon: "error",
                    iconColor: "#991D39",
                    title: "Ops...",
                    text: "Erro ao alterar a senha!",
                    confirmButtonText: "Tentar novamente",
                    confirmButtonColor: "#242B63",
                });
            }
        } catch (error) {
            setLoading(false);
            console.error('Erro ao fazer requisição:', error.message);
            Swal.fire({
                icon: "error",
                iconColor: "#991D39",
                title: "Ops...",
                text: "Erro ao alterar a senha!",
                confirmButtonText: "Tentar novamente",
                confirmButtonColor: "#242B63",
            });
        }

        setLoading(false);
    };

    return (
        <main>
            <section className="flex flex-row h-screen">
                <div className="w-4/6">
                    <Image src={ImgLogin} className="object-cover h-screen w-full" alt="Imagem de alunos se formando" />
                </div>
                <div className="w-3/6 flex flex-col justify-center px-60">
                    <div className="min-w-min">
                        <button onClick={handleBack}>
                            <Image src={IconVoltar} alt="Voltar" className="mb-30" />
                        </button>
                    </div>
                    <h1 className="font-semibold text-azulBase text-tituloDestaque mb-60">Nova senha</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full relative text-paragrafo mt-30">
                            <label className="block absolute top-1/2 transform -translate-y-1/2 left-2">
                                <Image src={IconSenha} alt="Ícone de senha" />
                            </label>
                            <input
                                className={`w-full px-2 h-10 pl-9 text-pretoTexto border-b-2 border-cinza07 focus:outline-none text-input required`}
                                placeholder="Email"
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="w-full relative text-paragrafo mt-30">
                            <label className="block absolute top-1/2 transform -translate-y-1/2 left-2">
                                <Image src={IconSenha} alt="Ícone de senha" />
                            </label>
                            <input
                                className={`w-full px-2 h-10 pl-9 text-pretoTexto border-b-2 border-cinza07 focus:outline-none text-input required`}
                                placeholder="Código de acesso"
                                onChange={handleCodeChange}
                            />
                        </div>
                        <div className="w-full relative text-paragrafo mt-30">
                            <label className="block absolute top-1/2 transform -translate-y-1/2 left-2">
                                <Image src={IconSenha} alt="Ícone de senha" />
                            </label>
                            <input
                                className={`w-full px-2 h-10 pl-9 text-pretoTexto border-b-2 border-cinza07 focus:outline-none text-input required ${isPasswordMatching() && isPasswordValid() ? '' : 'border-red-500'}`}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Nova senha"
                                onChange={handlePasswordChange}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-10 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <Image src={IconSee} alt="Ícone para ver a senha" />
                                ) : (
                                    <Image src={IconUnsee} alt="Ícone para ocultar a senha" />
                                )}
                            </div>
                        </div>
                        <div className="absolute">
                            {!isPasswordValid() && passwordTouched && (
                                <p className="text-red-500 text-legenda mt-1">A senha deve ter pelo menos 8 caracteres, 1 número, 1 caractere especial e 1 letra maiúscula</p>
                            )}
                            {!isPasswordMatching() && passwordTouched && (
                                <p className="text-red-500 text-legenda mt-1">As senhas não coincidem</p>
                            )}
                        </div>
                        <div className="w-full relative text-paragrafo mt-30">
                            <label className="block absolute top-1/2 transform -translate-y-1/2 left-2">
                                <Image src={IconSenha} alt="Ícone de senha" />
                            </label>
                            <input
                                className={`w-full px-2 h-10 pl-9 text-pretoTexto border-b-2 border-cinza07 focus:outline-none text-input required ${isPasswordMatching() ? '' : 'border-red-500'}`}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirme nova senha"
                                onChange={handleConfirmPasswordChange}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-10 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? (
                                    <Image src={IconSee} alt="Ícone para ver a senha" />
                                ) : (
                                    <Image src={IconUnsee} alt="Ícone para ocultar a senha" />
                                )}
                            </div>
                        </div>
                        <div className="absolute">
                            {!isPasswordMatching() && confirmPasswordTouched && (
                                <p className="text-red-500 text-legenda mt-1">As senhas não coincidem</p>
                            )}
                        </div>
                        <div>
                            {loading ? (
                                renderLoading()
                            ) : (
                                <button type="submit" className="bg-azulBase mt-30 py-10 text-cinza10 text-sub font-semibold rounded-lg w-full transition-transform transform hover:scale-105 active:bg-azulEscuro">
                                    Alterar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}
