import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import NavAcessibilidade from '@/components/navAcessibilidade';
import NavBar from '@/components/navBar/egresso';
import Footer from '@/components/footer';
import imgHeader from '/public/icons/imgHeader.svg';
import imgHome from '/public/icons/imgHome.svg';
import CheckAuth from '@/components/checkAuth/checkAuth';

const breakpoints = {
	mobile: 640,
};

export default function Home() {
	const [windowWidth, setWindowWidth] = useState(null);

	useEffect(() => {
		function handleWindowResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleWindowResize);

		handleWindowResize();

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	const mxSection = windowWidth && windowWidth < breakpoints.mobile ? 'mx-30' : 'mx-120';
	const mxDiv = windowWidth && windowWidth < breakpoints.mobile ? 'mx-0' : 'mx-40';

	return (
		<CheckAuth allowedAccess={["egress"]}>
			<main>
				<header>
					<NavAcessibilidade />
					<NavBar />
					<Image src={imgHeader} alt="Imagem de alunos se formando" className='w-screen' />
				</header>
				<section id='conteudo' className={`mt-30 space-y-100 ${mxSection}`}>
					<div className='space-y-15'>
						<h1 className='font-semibold text-azulBase text-tituloPrincial'>Portal do Egresso</h1>
						<p className='text-pretoTexto text-paragrafo font-normal'>Bem-vindo ao nosso Portal de Egressos! Este é o lugar onde antigos alunos se reúnem para compartilhar conquistas, estabelecer conexões e aproveitar recursos exclusivos. Esteja você começando sua carreira ou já trilhou um longo caminho, nossa comunidade está aqui para apoiá-lo. Junte-se a nós e continue fazendo parte da história da nossa instituição.</p>
					</div>
					<div className={`flex flex-row space-x-30 ${mxDiv}`}>
						<div className='flex flex-col items-center justify-center space-y-15'>
							<h1 className='font-semibold text-azulBase text-tituloPrincial'>Participe!</h1>
							<p className='text-pretoTexto text-paragrafo font-normal'>Bem-vindo ao nosso Portal de Egressos! Este é o lugar onde antigos alunos se reúnem para compartilhar conquistas, estabelecer conexões e aproveitar recursos exclusivos. Esteja você começando sua carreira ou já trilhou um longo caminho, nossa comunidade está aqui para apoiá-lo. Junte-se a nós e continue fazendo parte da história da nossa instituição.</p>
							<button className='bg-azulBase py-10 px-30 text-cinza10 font-semibold rounded-lg transition-transform transform hover:scale-105 active:bg-azulEscuro'>
								<Link href={'../egresso/form'}>Responder Formulário</Link>
							</button>
						</div>
						<Image src={imgHome} alt="Imagem de aluno recebendo diploma" />
					</div>
				</section>
				<footer>
					<Footer />
				</footer>
			</main>
		</CheckAuth>
	);
}
