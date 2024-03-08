import React, {useState} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Swal from 'sweetalert2';


import iconLogOut from '/public/icons/iconLogOut.svg'
import profile from '/public/icons/profile.svg'
import Popup from "@/components/popUp/popup"
import iconAttetion from "/public/icons/iconAttetion.svg"

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
        return (
            <>
                {showAlertLogOut && (
                    <Popup isOpen={showAlertLogOut} >
                        <Image src={iconAttetion} />
                        <h1 className="text-azulBase text-subtitulo font-semibold mt-15 mb-15">Tem certeza?</h1>
                        <p className="font-semibold text-pretoTexto text-paragrafo mb-15">Você irá sair da sua conta</p>
                        <div className="flex justify-center">
                            <button className="inline-block bg-azulBase text-white rounded-10 py-5 px-15 mr-15"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    console.log(localStorage);
                                    window.location.href = "/";
                                }}
                            >Sim</button>
                            <button className="inline-block bg-azulBase text-white rounded-10 py-5 px-15"
                                onClick={() => {
                                    setShowAlertLogOut(false);
                                }}
                            >Não</button>
                        </div>
                    </Popup >
                    )
                }
            </>
        );
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
                <Link href="/adm/tutorial/page" className={`text-azulBase ${router.pathname === '/adm/tutorial/page' ? 'border-b-2 border-azulBase' : ''}`}>Tutorial da Plataforma</Link>
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
