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
    <div className="antialiased flex flex-col min-h-screen bg-[#b2b2b2]">
      {/* BARRA DE NAVEGAÇÃO SUPERIOR */}
      <nav className="w-full bg-black py-6 px-6 md:px-12 z-50 border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white leading-none">
              <span className="text-[#e8474a] font-black">TEDx</span><br />
              <span className="font-normal text-gray-300">Universidade<br />de Brasília</span>
            </h1>
          </div>
          
          {/* LINKS DE NAVEGAÇÃO */}
          <div className="flex items-center gap-4 md:gap-6 text-white font-medium text-sm md:text-base">
            <a href="#sobre" className="hover:text-[#e8474a] transition-colors pr-4 md:pr-6 border-r border-gray-700">Sobre</a>
            <a href="#palestrantes" className="hover:text-[#e8474a] transition-colors pr-4 md:pr-6 border-r border-gray-700">Palestrantes</a>
            <a href="#informacoes" className="hover:text-[#e8474a] transition-colors pr-4 md:pr-6 border-r border-gray-700">Informações</a>
            <Link href="/ingressos" className="font-bold text-[#e8474a] hover:text-white transition-colors">
              Ingressos
            </Link>
          </div>
        </div>
      </nav>

      {/* SECÇÃO HERO (SOBRE) */}
      <main id="sobre" className="w-full flex flex-col md:flex-row bg-[#a6a6a6] items-stretch">
        
        {/* Esquerda: Imagem Expandida */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-0 overflow-hidden min-h-[45vh] md:min-h-[85vh]">
          <img 
            src="/mão-8.png" 
            alt="Mãos segurando figura geométrica" 
            className="w-full h-full object-cover object-center block" 
          />
        </div>

        {/* Direita: Textos ajustados */}
        {/* Adicionado um padding-top muito maior (md:pt-40 lg:pt-64) para empurrar o texto bem para baixo */}
        <div className="w-full md:w-1/2 bg-[#a6a6a6] flex flex-col justify-start pt-10 pb-12 px-8 md:pt-40 lg:pt-64 md:px-12 lg:px-16">
          
          {/* Caixa de texto levemente mais larga (max-w-2xl) para garantir que o título caiba sem quebrar */}
          <div className="w-full max-w-2xl 2xl:max-w-3xl">
            
            {/* Título Principal (Ajustado para text-5xl/4xl para caber em duas linhas) */}
            <h2 className="text-4xl md:text-4xl font-normal leading-[1.1] tracking-tight mb-8 text-black">
              <span className="font-black block text-black">Vários Futuros:</span>
              <span className="block font-normal mt-1">Pluriverso de Narrativas Fundadoras</span>
            </h2>
            
            {/* Bloco de Texto Contínuo */}
            <p 
              className="text-black text-[20px] lg:text-[20px] leading-[1.4] mb-10"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Pensar sobre os futuros é um exercício constante do presente.<br />
              Mas que futuros são esses que sonhamos construir?<br />
              Das culturas ancestrais que firmam resistência aos espaços de produção dos saberes acadêmicos, propomos um diálogo atemporal para refletir e imaginar os tempos, suas nuances e potências por meio de narrativas pluriversas.
            </p>

            {/* Nota da Licença TED */}
            <p className="text-sm md:text-base lg:text-lg text-black font-normal mt-6">
              Este evento TEDx é uma iniciativa independente, realizada sob licença da TED.
            </p>
            
          </div>
        </div>
      </main>
      
      {/* SECÇÃO PALESTRANTES */}
      <section id="palestrantes" className="relative w-full bg-[#a6a6a6] pt-10 pb-16 flex-grow overflow-hidden">
        <div className="w-full relative min-h-[40vh] md:min-h-[70vh] flex flex-col justify-center">
          
          {/* Título fixado na esquerda */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black relative pl-[5%] mb-4 md:mb-0 md:absolute md:top-6 md:left-[5%] md:pl-0 z-20">
            Palestrantes:
          </h2>

          {/* DESKTOP: Caminho centralizado perfeitamente no meio da tela */}
          <div className="hidden md:flex justify-center w-full pt-16 lg:pt-4">
            
            {/* O 'mx-auto' centraliza este bloco. Se quiser diminuir o tamanho da imagem, diminua o max-w-[65vw] */}
            <div className="path-wrapper w-full max-w-[65vw] lg:max-w-[57vw] mx-auto relative">
              
              {/* A imagem também leva 'mx-auto' para garantir o centro */}
              <img src="/caminho-8.png" alt="Caminho colorido" className="w-full h-auto block mx-auto" />
              
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
          <div className="grid grid-cols-2 gap-8 md:hidden place-items-center mt-6 px-[5%]">
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
      <section id="informacoes" className="w-full bg-[#b2b2b2] px-4 md:px-8 py-16">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-normal mb-12 text-black">
            Informações:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-black mb-16 max-w-4xl mx-auto">
            {/* Data */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e8474a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="font-bold text-xl">Data:</h3>
              </div>
              <p className="font-bold text-sm">Dia 19 de<br />Novembro 2026</p>
            </div>
            
            {/* Horário */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e8474a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-bold text-xl">Horário:</h3>
              </div>
              <ul className="font-bold text-sm text-center space-y-1">
                <li>14h Credenciamento</li>
                <li>15h Início das atividades</li>
              </ul>
            </div>
            
            {/* Localização */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <div className="flex items-center gap-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e8474a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-bold text-xl">Localização:</h3>
              </div>
              <p className="font-bold text-sm">Centro de Excelência<br />em Turismo (CET/UnB)</p>
            </div>
          </div>

          {/* Botão de Ingresso */}
          <div className="flex justify-center pb-12">
            <Link 
              href="/ingressos" 
              className="bg-[#e8474a] text-white font-bold text-sm md:text-base px-8 py-4 tracking-wider hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 uppercase"
            >
              Garantir meu ingresso &rarr;
            </Link>
          </div>
        </div>
      </section>
      
      {/* RODAPÉ COM LOGOS EM COLUNA */}
      <footer className="w-full bg-black text-white py-12 px-6 md:px-12 border-t border-gray-800">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
          
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-normal text-xs uppercase tracking-widest text-gray-400">Realização:</span>
            <div className="flex flex-col items-center md:items-start gap-4">
              <img 
                src="/logo-8.png" 
                alt="Ministério da Cultura" 
                className="h-10 md:h-12 w-auto object-contain" 
              />
              <img 
                src="/unb-8.png" 
                alt="Universidade de Brasília" 
                className="h-6 md:h-7 w-auto object-contain" 
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span className="font-bold text-base text-white">Dúvidas | Suporte</span>
            <span className="text-base mt-1 text-gray-300">unb.tedx@gmail.com</span>
          </div>
          
          <div className="text-center md:text-right max-w-xs text-xs leading-relaxed text-gray-400">
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
              className="absolute top-4 right-5 text-black/50 hover:text-[#e8474a] text-3xl transition-colors font-light"
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