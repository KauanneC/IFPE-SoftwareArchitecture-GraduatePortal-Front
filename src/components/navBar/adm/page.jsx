import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';


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
        <div id='navmenu' className="bg-fundo py-4 justify-between flex">
            <div className="w-ful flex gap-30">
                <Link href="/adm/home/page" className={`text-azulBase ml-30 ${router.pathname === '/adm/home/page' ? 'border-b-2 border-azulBase' : ''}`}>Home</Link>
                <Link href="/adm/eventos/page" className={`text-azulBase  ${router.pathname === '/adm/eventos/page' ? 'border-b-2 border-azulBase' : ''}`}>Eventos</Link>
                <Link href="/adm/editais/page" className={`text-azulBase ${router.pathname === '/adm/editais/page' ? 'border-b-2 border-azulBase' : ''}`}>Editais</Link>
                <Link href="/adm/form/page" className={`text-azulBase ${router.pathname === '/adm/form/page' ? 'border-b-2 border-azulBase' : ''}`}>Formulário</Link>
                <Link href="/adm/egressos/page" className={`text-azulBase ${router.pathname === '/adm/egressos/page' ? 'border-b-2 border-azulBase' : ''}`}>Usuários</Link>
                <Link href="/adm/newUser/page" className={`text-azulBase ${router.pathname === '/adm/newUser/page' ? 'border-b-2 border-azulBase' : ''}`}>Novo Usuário</Link>
            </div>
            <div className='justify-center flex mr-30 gap-30'>
                <button>
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
