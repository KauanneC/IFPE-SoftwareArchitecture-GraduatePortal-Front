"use client"
import React, { useState } from "react"; // Importe o useState corretamente
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"; // Importe o useRouter corretamente
import Swal from "sweetalert2";
import jwt from 'jsonwebtoken';

import IconVoltar from "/public/icons/iconVoltar.svg";
import ImgLogin from "/public/icons/imgLogin.svg";
import IconUser from "/public/icons/iconUser.svg";
import IconSenha from "/public/icons/iconSenha.svg";
import IconSee from "/public/icons/iconSee.svg";
import IconUnsee from "/public/icons/iconUnsee.svg";
import iconSucess from "/public/icons/iconSucess.svg"
import iconError from "/public/icons/iconError.svg"
import Popup from "@/components/popUp/popup";

// API
import { authenticate } from "../../../../utils/apiLogin/api";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [sucessPopupOpen, setSucessPopupOpen] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleBack = () => {
        window.history.back();
    };

    const router = useRouter();

    const renderLoading = () => {
        return (
            <div className="flex flex-col items-center justify-center my-50">
                <div class="spinner" />
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            setLoading(false);
            setErrorPopupOpen(true);
            // Swal.fire({
            //     icon: "error",
            //     iconColor: '#991D39',
            //     title: "Ops...",
            //     text: "Por favor, preencha todos os campos!",
            //     confirmButtonText: "Ok",
            //     confirmButtonColor: "#242B63",
            // });
            return;
        }

        try {
            const data = {
                email: email,
                password: password,
            };

            const response = await authenticate(data);

            if (response && response.statusCode === 200) {
                const token = response.data.token;

                localStorage.setItem('token', token);

                Swal.fire({
                    icon: "success",
                    iconColor: '#20771B',
                    title: "Sucesso!",
                    text: "Login realizado com sucesso!",
                    confirmButtonText: "Ok",
                    confirmButtonColor: "#242B63",
                })
                .then((result) => {
                    setLoading(false);
                    if (result.isConfirmed) {
                        const decoded = jwt.decode(token);
                        if (decoded) {
                            console.log('decoded:', decoded)
                            let redirectPath = '';
                            if (decoded.profile === 'coordinator' || decoded.profile === 'egress' || decoded.profile === 'teacher') {
                                if (decoded.primaryAcess === true) {
                                    if (decoded.profile === 'coordinator') {
                                        redirectPath = '/adm/home/page';
                                    } else if (decoded.profile === 'egress') {
                                        redirectPath = '/egresso/home';
                                    } else if (decoded.profile === 'teacher') {
                                        redirectPath = '/docente/home/page';
                                    }
                                } else if (decoded.primaryAcess === false) {
                                    redirectPath = '/user/primeiroAcesso';
                                }
                                router.push(redirectPath);
                            } else {
                                console.error('Erro na autenticação:', response);
                                setErrorPopupOpen(true);
                                // Swal.fire({
                                //     icon: "error",
                                //     iconColor: '#991D39',
                                //     title: "Ops...",
                                //     text: "Email e/ou senha incorretos!",
                                //     confirmButtonText: "Tentar novamente",
                                //     confirmButtonColor: "#242B63",
                                // });
                            }
                        }
                    }
                });
            } else if (!handleBack) {
                console.error('Erro na autenticação:', response);
                setLoading(false);
                setErrorPopupOpen(true);
                // Swal.fire({
                //     icon: "error",
                //     iconColor: '#991D39',
                //     title: "Ops...",
                //     text: "Email e/ou senha incorretos!",
                //     confirmButtonText: "Tentar novamente",
                //     confirmButtonColor: "#242B63",
                // });
            } else {
                console.error('Erro na autenticação:', response);
                setLoading(false);
                setErrorPopupOpen(true);
                // Swal.fire({
                //     icon: "error",
                //     iconColor: '#991D39',
                //     title: "Ops...",
                //     text: "Email e/ou senha incorretos!",
                //     confirmButtonText: "Tentar novamente",
                //     confirmButtonColor: "#242B63",
                // });
            }
        } catch (error) {
            console.error('Erro ao fazer requisição:', error.message);
            setLoading(false);
            setErrorPopupOpen(true);
            // Swal.fire({
            //     icon: "error",
            //     iconColor: '#991D39',
            //     title: "Ops...",
            //     text: "Erro ao fazer requisição!",
            //     confirmButtonText: "Tentar novamente",
            //     confirmButtonColor: "#242B63",
            // });
        }
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
                    <h1 className="font-semibold text-azulBase text-tituloDestaque mb-100">Login</h1>
                    <form onSubmit={handleSubmit} className="space-y-30">
                        <div className="w-full relative text-paragrafo">
                            <label className="block absolute top-1/2 transform -translate-y-1/2 left-2">
                                <Image src={IconUser} alt="Ícone de usuário" />
                            </label>
                            <input
                                className="w-full px-2 h-10 pl-9 text-pretoTexto border-b-2 border-cinza07 focus:outline-none text-input required"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="w-full relative text-paragrafo">
                            <label className="block absolute top-1/2 transform -translate-y-1/2 left-2">
                                <Image src={IconSenha} alt="Ícone de senha" />
                            </label>
                            <input
                                className="w-full px-2 h-10 pl-9 text-pretoTexto border-b-2 border-cinza07 focus:outline-none text-input required"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Senha"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-10 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <Image src={IconSee} alt="Ícone para ver a senha" />
                                ) : (
                                    <Image src={IconUnsee} alt="Ícone para ocultar a senha" />
                                )}
                            </div>
                            <p className="right-0 absolute">
                                <Link href="/user/forgotPassword" className="text-paragrafo text-azulBase">Esqueci minha senha</Link>
                            </p>
                        </div>
                        <div>
                            {loading ? (
                                renderLoading()
                            ) : (
                                <button type="submit" className="bg-azulBase mt-10 py-10 text-cinza10 text-sub font-semibold rounded-lg w-full transition-transform transform hover:scale-105 active:bg-azulEscuro">
                                    Entrar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </section>
            {errorPopupOpen && (
                <Popup isOpen={errorPopupOpen}>
                    <Image src={iconError} />
                    <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Algo deu errado</h1>
                    <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Email e/ou senha incorretos!</p>
                    <div className="flex justify-center">
                        <button onClick={() => setErrorPopupOpen(false)} className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15">Tentar novamente</button>
                    </div>
                </Popup>
            )}
            {sucessPopupOpen && (
                    <Popup isOpen={sucessPopupOpen}>
                        <Image src={iconSucess} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Sucesso!</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Login realizado com sucesso!</p>
                        <button className="inline-block bg-azulBase text-white rounded-10 py-5 px-15">Ok</button>
                    </Popup>
                )}
        </main>
    )
}
