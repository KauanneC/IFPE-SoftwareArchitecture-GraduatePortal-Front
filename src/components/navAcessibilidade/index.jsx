import React from 'react'
import Link from 'next/link';


const navAcessibilidade = () => {
    return (
        <nav className='bg-azulBase py-5'>
            <div className='flex text-cinza10 text-legenda space-x-30 mx-30'>
                <Link href="#conteudo" className='flex'>
                    Ir para o conteúdo
                </Link>
                <Link href="#navmenu" className='flex'>
                    Ir para o menu de navegação
                </Link>
                <Link href="#rodape" className='flex'>
                    Ir para o rodapé
                </Link>
            </div>
        </nav>
    )
}

export default navAcessibilidade