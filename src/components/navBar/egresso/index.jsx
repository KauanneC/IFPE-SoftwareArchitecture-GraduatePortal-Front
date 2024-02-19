import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import Swal from 'sweetalert2';
import jwt from 'jsonwebtoken';

import iconLogOut from '/public/icons/iconLogOut.svg'
import profile from '/public/icons/profile.svg'

function NavBar() {
    const router = useRouter(); // Rota atual

    const [showAlertLogOut, setShowAlertLogOut] = useState(false);
    const [showAlertProfile, setShowAlertProfile] = useState(false);

    const handleShowAlertLogOut = () => {
        setShowAlertLogOut(true);
    };

    const handleShoeAlertProfile = () => {
        setShowAlertProfile(true);
    };

    const getCode = () => {
        const token = localStorage.getItem("token");
        const decodedToken = jwt.decode(token);
        return decodedToken.code;
    }

    if (showAlertLogOut) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você irá sair da sua conta',
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
                localStorage.removeItem("token");
                console.log(localStorage);
                window.location.href = "/";
            } else {
                setShowAlertLogOut(false);
            }
        })
    }

    if (showAlertProfile) {
        Swal.fire({
            title: 'Perfil',
            html: `<p>Este é o seu código de acesso: <strong>${getCode()}</strong></p><br>
            <p>Guarde para caso precise alterar sua senha!</p>`, 
            icon: 'info',
            iconColor: '#242B63',
            confirmButtonColor: '#242B63',
            confirmButtonText: 'Ok',
            showConfirmButton: true,
            showCancelButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                setShowAlertProfile(false);
            }
        })
    }

    return (
        <div id='navmenu' className="bg-fundo px-30 py-4 justify-between flex">
            <div className="space-x-30 w-min">
                <Link href="/egresso/home" className={`text-azulBase ${router.pathname === '/egresso/home' ? 'border-b-2 border-azulBase' : ''}`}>Home</Link>
                <Link href="/egresso/eventos" className={`text-azulBase ${router.pathname === '/egresso/eventos' ? 'border-b-2 border-azulBase' : ''}`}>Eventos</Link>
                <Link href="/egresso/editais" className={`text-azulBase ${router.pathname === '/egresso/editais' ? 'border-b-2 border-azulBase' : ''}`}>Editais</Link>
                <Link href="/egresso/form" className={`text-azulBase ${router.pathname === '/egresso/form' ? 'border-b-2 border-azulBase' : ''}`}>Formulário</Link>
            </div>
            <div className='justify-center flex space-x-30'>
                <button onClick={handleShoeAlertProfile}>
                    <Image src={profile} alt="Sair" />
                </button>
                <button onClick={handleShowAlertLogOut}>
                    <Image src={iconLogOut} alt="Sair" />
                </button>
            </div>
        </div>
    );
}

export default NavBar;
