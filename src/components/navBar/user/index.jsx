import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavBar() {
    const router = useRouter(); // Obtenha a rota atual

    return (
        <div id='navmenu' className="bg-fundo px-30 py-4 justify-between flex">
            <div className="space-x-30 w-min">
                <Link href="/" className={`text-azulBase ${router.pathname === '/' ? 'border-b-2 border-azulBase' : ''}`}>Home</Link>
                <Link href="/user/eventos" className={`text-azulBase ${router.pathname === '/user/eventos' ? 'border-b-2 border-azulBase' : ''}`}>Eventos</Link>
                <Link href="/user/editais" className={`text-azulBase ${router.pathname === '/user/editais' ? 'border-b-2 border-azulBase' : ''}`}>Editais</Link>
            </div>
            <div className='w-min'>
                <button className='bg-azulBase pb-1 py-0.5 px-15 text-cinza10 rounded-lg transition-transform transform hover:scale-105 active:bg-azulEscuro'>
                    <Link href="/user/login">Entrar</Link>
                </button>
            </div>
        </div>
    );
}

export default NavBar;
