import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import iconLogOut from '/public/icons/iconLogOut.svg'
import profile from '/public/icons/profile.svg'

function NavBar() {
    const router = useRouter(); // Rota atual

    return (
        <div id='navmenu' className="bg-fundo py-4 justify-between flex">
            <div className="flex w-ful gap-30">
                <Link href="/docente/home/page" className={`text-azulBase ml-30 ${router.pathname === '/docente/home/page' ? 'border-b-2 border-azulBase' : ''}`}>Home</Link>
                <Link href="/docente/eventos/page" className={`text-azulBase ${router.pathname === '/docente/eventos/page' ? 'border-b-2 border-azulBase' : ''}`}>Adicionar Eventos</Link>
                <Link href="/docente/editais/page" className={`text-azulBase ${router.pathname === '/docente/editais/page' ? 'border-b-2 border-azulBase' : ''}`}>Adicionar Editais</Link>
            </div>
            <div className='justify-center flex mr-30 gap-30'>
                <button>
                    <Image src={profile} alt="Sair" />
                </button>
                <button>
                    <Image src={iconLogOut} alt="Sair" />
                </button>
            </div>
        </div>
    );
}

export default NavBar;
