'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Speaker {
  nome: string
  descricao: string
  imagemSrc: string
}

export default function Home() {
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null)

  function openBio(nome: string, descricao: string, imagemSrc: string) {
    setActiveSpeaker({ nome, descricao, imagemSrc })
  }

  function closeBio() {
    setActiveSpeaker(null)
  }

  return (
    <div className="antialiased flex flex-col min-h-screen">
      {/* BARRA DE NAVEGAÇÃO SUPERIOR */}
      <nav className="w-full bg-ted-gradient py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center z-50">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-gray-800 leading-none">
            <span className="text-red-600 font-black">TEDx</span><br />
            <span className="font-normal text-gray-700">Universidade<br />de Brasília</span>
          </h1>
        </div>
        
        <div className="flex gap-6 md:gap-10 text-black font-medium text-sm md:text-base">
          <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
          <a href="#palestrantes" className="hover:text-white transition-colors">Palestrantes</a>
          <a href="#informacoes" className="hover:text-white transition-colors">Informações</a>
          <Link href="/ingressos" className="font-bold hover:text-white transition-colors">
            Ingressos
          </Link>
        </div>
      </nav>

      {/* SECÇÃO HERO (SOBRE) */}
      <main id="sobre" className="w-full flex flex-col md:flex-row">
        {/* Esquerda: Fundo Branco + Mãos fluidas */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-start p-4 md:p-8 min-h-[50vh] md:min-h-[70vh]">
          <img 
            src="/mão-8.png" 
            alt="Mãos segurando figura geométrica" 
            className="w-full max-w-full h-auto object-contain object-left" 
          />
        </div>

        {/* Direita: Fundo Cinza + Texto */}
        <div className="w-full md:w-1/2 bg-[#b5b5b5] flex flex-col justify-center p-8 lg:p-16 md:min-h-[70vh]">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-black">
            Vários Futuros:<br />
            <span className="font-medium text-3xl lg:text-4xl xl:text-5xl">Pluriverso de<br />Narrativas Fundadoras</span>
          </h2>
          
          <div className="text-black/80 text-base lg:text-lg mb-12 space-y-4 max-w-xl">
            <p>Pensar sobre os futuros é um exercício constante do presente.</p>
            <p>Mas que futuros são esses que sonhamos construir?</p>
            <p>Das culturas ancestrais que firmam resistência aos espaços de produção dos saberes acadêmicos, propomos um diálogo atemporal para refletir e imaginar os tempos, suas nuances e potências por meio de narrativas pluriversas.</p>
          </div>
        </div>
      </main>
      
      {/* SECÇÃO PALESTRANTES */}
      <section id="palestrantes" className="w-full bg-[#b5b5b5] px-4 md:px-8 pt-16 pb-12 flex-grow">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-12 text-black text-left">
            Palestrantes:
          </h2>

          {/* DESKTOP: O Caminho com fotos interativas */}
          <div className="hidden md:flex justify-center w-full">
            <div className="path-wrapper">
              <img src="/caminho-8.png" alt="Caminho colorido" className="w-full h-auto block" />
              
              <img 
                src="/prof-8.png" 
                onClick={() => openBio('Professora', 'Doutora em narrativas pluriversas e ancestralidade.', '/prof-8.png')} 
                className="absolute pos-prof cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Professora" 
              />
              
              <img 
                src="/meninos-8.png" 
                onClick={() => openBio('Os Meninos', 'Criadores de projetos de impacto social.', '/meninos-8.png')} 
                className="absolute pos-meninos cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Dupla" 
              />
              
              <img 
                src="/rubs-8.png" 
                onClick={() => openBio('Rubens', 'Especialista em inovação e arquitetura de futuros.', '/rubs-8.png')} 
                className="absolute pos-rubs cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Rubens" 
              />
              
              <img 
                src="/ingrid-8.png" 
                onClick={() => openBio('Ingrid', 'Pesquisadora focada em ecossistemas digitais.', '/ingrid-8.png')} 
                className="absolute pos-ingrid cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Ingrid" 
              />
            </div>
          </div>

          {/* MOBILE: Grelha de fotos */}
          <div className="grid grid-cols-2 gap-8 md:hidden place-items-center">
            <img 
              src="/prof-8.png" 
              onClick={() => openBio('Professora', 'Doutora em narrativas pluriversas e ancestralidade.', '/prof-8.png')} 
              className="w-[40vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Professora" 
            />
            <img 
              src="/meninos-8.png" 
              onClick={() => openBio('Os Meninos', 'Criadores de projetos de impacto social.', '/meninos-8.png')} 
              className="w-[50vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Dupla" 
            />
            <img 
              src="/rubs-8.png" 
              onClick={() => openBio('Rubens', 'Especialista em inovação e arquitetura de futuros.', '/rubs-8.png')} 
              className="w-[40vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Rubens" 
            />
            <img 
              src="/ingrid-8.png" 
              onClick={() => openBio('Ingrid', 'Pesquisadora focada em ecossistemas digitais.', '/ingrid-8.png')} 
              className="w-[40vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Ingrid" 
            />
          </div>
        </div>
      </section>

      {/* SECÇÃO INFORMAÇÕES */}
      <section id="informacoes" className="w-full bg-[#b5b5b5] px-4 md:px-8 py-16">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-normal mb-12 text-black">
            Informações:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-black mb-16">
            {/* Data */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-xl">Data:</h3>
              </div>
              <p className="font-bold text-sm">Dia 19 de<br />Novembro 2026</p>
            </div>
            
            {/* Horário */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-xl">Horário:</h3>
              </div>
              <ul className="font-bold text-sm list-disc pl-5">
                <li>14h Credenciamento</li>
                <li>15h Início das atividades</li>
              </ul>
            </div>
            
            {/* Localização */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-bold text-xl">Localização:</h3>
              </div>
              <p className="font-bold text-sm">Centro de Excelência<br />em Turismo (CET/UnB)</p>
            </div>
          </div>

          {/* Botão para redirecionar para a página de Ingressos */}
          <div className="flex justify-center pb-12">
            <Link 
              href="/ingressos" 
              className="bg-[#eb0028] text-white font-bold text-sm md:text-base px-8 py-4 tracking-wider hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 uppercase"
            >
              Garantir meu ingresso &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      {/* RODAPÉ */}
      <footer className="w-full bg-footer-gradient py-12 px-4 md:px-8 border-t border-black/10">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-black text-sm">
          <div className="flex flex-col items-center md:items-start gap-6">
            <span className="font-normal text-xs uppercase tracking-widest">Realização:</span>
            <div className="flex flex-col items-center md:items-start gap-6">
              <img src="/logo-8.png" alt="Logos Instituto Latinoamerica e Ministério da Cultura" className="h-20 md:h-24 object-contain" />
              <img src="/unb-8.png" alt="Logo Universidade de Brasília" className="h-16 md:h-20 object-contain" />
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span className="font-bold text-base">Dúvidas | Suporte</span>
            <span className="text-base mt-1">unb.tedx@gmail.com</span>
          </div>
          
          <div className="text-center md:text-right max-w-xs text-xs leading-relaxed">
            Este evento TEDx é uma iniciativa independente,<br />realizada sob licença da TED.
          </div>
        </div>
      </footer>

      {/* MODAL DE MINI-BIO */}
      {activeSpeaker && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex flex-col items-center justify-center p-6 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeBio}
        >
          <div 
            className="bg-[#e5e5e5] rounded-xl p-8 w-[90%] max-w-sm relative shadow-2xl text-black border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeBio} 
              className="absolute top-4 right-5 text-black/50 hover:text-red-600 text-3xl transition-colors font-light"
            >
              &times;
            </button>
            
            <div className="flex flex-col items-center text-center mt-2">
              <img 
                src={activeSpeaker.imagemSrc} 
                alt={activeSpeaker.nome} 
                className="w-32 h-auto mb-5 drop-shadow-md rounded-full" 
              />
              <h3 className="text-2xl font-black tracking-tight mb-2">{activeSpeaker.nome}</h3>
              <p className="text-black/70 leading-relaxed text-sm">{activeSpeaker.descricao}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}