import React from 'react';
import Image from 'next/image'
import Link from 'next/link';

// Icons
import iconPhone from "/public/icons/iconPhone.svg"
import iconFacebook from "/public/icons/iconFacebook.svg"
import iconInstagram from "/public/icons/iconInstagram.svg"
import iconLink from "/public/icons/iconLink.svg"
import iconMapPin from "/public/icons/iconMapPin.svg"

function Footer() {
    return (
        <footer className="bg-azulBase h-min py-30 text-cinza10 text-center mt-90">
            <div className='max-w-footer mx-30'>
                <div className='text-center'>
                    <p className='font-semibold text-subtitulo'>Dúvidas Frequentes</p>
                </div>
                <div className='flex items-center justify-center pt-2.5 space-x-10 text-paragrafo'>
                    <Link href="" id='rodape'>Como renovar a matrícula?</Link>
                    <Link href="">Aproveitamento de disciplinas</Link>
                    <Link href="">Transferência interna</Link>
                </div>

                <div className='flex items-center justify-center'>
                    <hr className='border-t-1 my-20 w-4/6'></hr>
                </div>

                <div className='flex justify-center items-start space-x-30'>
                    <div className='flex justify-center items-start'>
                        <Image src={iconPhone} alt="Ícone de telefone" />
                        <p className='pl-2.5'>(81) 3411-3200</p>
                    </div>
                    <div className='flex justify-center items-start'>
                        <Image src={iconMapPin} alt="Ícone de localização" />
                        <Link href={"https://maps.app.goo.gl/jLVVHQ4T4yPws8Ud9"} target='_blank' className='flex flex-col items-center justify-center'>
                            <p className='pl-2.5'>Av. Sebastião Rodrigues da Costa, s/n - São Pedro,</p>
                            <p>Belo Jardim - PE, 55145-065</p>
                        </Link>
                    </div>
                    <div className='flex justify-center items-start space-x-2'>
                        <Link href="" target="_blank">
                            <Image src={iconInstagram} alt="Link para Instagram fo IFPE" />
                        </Link>
                        <Link href="" target="_blank">
                            <Image src={iconFacebook} alt="Link para Facebook do IFPE" />
                        </Link>
                        <Link href="https://portal.ifpe.edu.br/belo-jardim/" target="_blank">
                            <Image src={iconLink} alt="Ícone de Link para site do IFPE Campus BElo Jardim" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;