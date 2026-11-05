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
      <nav className="w-full bg-black py-4 px-4 md:px-12 z-50 border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-bold text-white leading-none">
              <span className="text-[#e8474a] font-black">TEDx</span><br />
              <span className="font-normal text-gray-300">Universidade<br />de Brasília</span>
            </h1>
          </div>
          
          {/* LINKS DE NAVEGAÇÃO (Ajustados para não cortar no celular) */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 text-white font-medium text-xs sm:text-sm md:text-base">
            <a href="#sobre" className="hover:text-[#e8474a] transition-colors pr-2 sm:pr-4 md:pr-6 border-r border-gray-700">Sobre</a>
            <a href="#palestrantes" className="hover:text-[#e8474a] transition-colors pr-2 sm:pr-4 md:pr-6 border-r border-gray-700">Palestrantes</a>
            <a href="#informacoes" className="hover:text-[#e8474a] transition-colors pr-2 sm:pr-4 md:pr-6 border-r border-gray-700">Informações</a>
            <Link href="/ingressos" className="font-bold text-[#e8474a] hover:text-white transition-colors">
              Ingressos
            </Link>
          </div>

        </div>
      </nav>

      {/* SECÇÃO HERO (SOBRE) */}
      <main id="sobre" className="w-full flex flex-col md:flex-row bg-[#b2b2b2] items-stretch border-b border-black">
        
      {/* Esquerda: Imagem deslocada para cima */}
        <div className="w-full md:w-1/2 bg-white relative overflow-hidden min-h-[35vh] md:min-h-[85vh]">
          <img 
            src="/mão-8.png" 
            alt="Mãos segurando figura geométrica" 
            className="absolute inset-0 w-full h-full object-cover object-[130%_40%] scale-110 block" 
          />
        </div>

        {/* Direita: Textos ajustados com título em duas linhas */}
        <div className="w-full md:w-1/2 bg-[#b2b2b2] flex flex-col justify-start pt-10 pb-12 px-8 md:pt-40 lg:pt-64 md:px-12 lg:px-16">
          <div className="w-full max-w-3xl">
            
            {/* Título Principal (Forçado estritamente em DUAS linhas) */}
            <h2 className="text-4xl md:text-3xl font-normal leading-[1] tracking-tight mb-8 text-black">
              <span className="font-black block text-black">Vários Futuros:</span>
              <span className="block font-normal mt-1">Pluriverso de Narrativas Fundadoras</span>
            </h2>
            
            {/* Bloco de Texto Contínuo */}
            <p 
              className="text-black text-[20px] lg:text-[20px] leading-[1] mb-0"
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
      <section id="palestrantes" className="relative w-full bg-[#b2b2b2] pt-8 pb-12 flex-grow overflow-hidden border-b border-black">
        <div className="w-full relative min-h-[35vh] md:min-h-[55vh] flex flex-col justify-center">
          
          {/* Título fixado na esquerda */}
          <h2 className="text-[15px] md:text-[30px] font-black tracking-tight text-black relative pl-[5%] mb-2 md:mb-0 md:absolute md:top-4 md:left-[5%] md:pl-0 z-20">
            Palestrantes:
          </h2>

          {/* DESKTOP: Caminho centralizado */}
          <div className="hidden md:flex justify-center w-full pt-12 lg:pt-2">
            <div className="path-wrapper w-full max-w-[65vw] lg:max-w-[65vw] mx-auto relative">
              <img src="/caminho-8.png" alt="Caminho colorido" className="w-full h-auto block mx-auto" />
              
              {/* LILÁS: Djaine Damiati */}
              <img 
                src="/prof-8.png" 
                onClick={() => openBio(
                  'Djaine Damiati', 
                  'Doutora em Ciências Sociais e Mestre em Comunicação Midiática pela UNESP, com estágio de doutorado no Instituto de Ciências Sociais (ICS) da Universidade de Lisboa. Realizou estágio de pós-doutorado na Faculdade de Educação (FE - UnB) com pesquisa na área de políticas públicas em educação aberta e tecnologias para o bem comum. Atualmente é pesquisadora da Cátedra UNESCO em Educação Aberta e Tecnologias para o Bem Comum (UnB), onde atua no projeto Limiar - Laboratório de Futuros. É professora na Universidade IDP (Brasília) e professora substituta na Faculdade de Comunicação (FAC - UnB).', 
                  '/prof-8.png'
                )} 
                className="absolute pos-prof cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Djaine Damiati" 
              />
              
              {/* MARROM: Pompeu & Gas Oliveira */}
              <img 
                src="/meninos-8.png" 
                onClick={() => openBio(
                  'Pompeu & Gas Oliveira', 
                  'Comunicólogos pela UnB e criadores de conteúdo. Atuam na pesquisa e documentação de linguagens e culturas. São fundadores do BlaBlaLab, um laboratório que descomplica a ciência da comunicação por meio do audiovisual. Seus conteúdos já impactaram milhões de pessoas e foram compartilhados em diversos colégios e universidades.', 
                  '/meninos-8.png'
                )} 
                className="absolute pos-meninos cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Pompeu & Gas Oliveira" 
              />
              
              {/* VERDE: Rubenilson Cerqueira */}
              <img 
                src="/rubs-8.png" 
                onClick={() => openBio(
                  'Rubenilson Cerqueira', 
                  'Doutor em Educação pela UnB, internacionalista, pesquisador e educador. Cursou toda a educação básica na rede pública e defende a democratização educacional superior. Em 2015, co-fundou com três amigos da UnB o Galt Vestibulares, cursinho popular que já impactou mais de 3.800 estudantes e mobiliza cerca de 140 voluntários atualmente. Possui trajetória como professor universitário e formador, atuou como consultor de políticas educacionais na UNESCO/MEC (2025–2026). Alumnus de Brasília sem Fronteiras e YLAI, ambos nos EUA, une pesquisa e transformação social para ampliar o acesso à educação superior gratuita, democrática e de qualidade e permitir que jovens protagonizem futuros historicamente negados.', 
                  '/rubs-8.png'
                )} 
                className="absolute pos-rubs cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Rubenilson Cerqueira" 
              />
              
              {/* ROSA: Ingrid Garritano */}
              <img 
                src="/ingrid-8.png" 
                onClick={() => openBio(
                  'Ingrid Garritano', 
                  'Ingrid Garritano é professora formada pela Universidade de Brasília (UnB) e pós-graduada em Gestão de Projetos em Sydney, na Austrália. É fundadora da Quartzo Organiza, onde atua com educação em gestão do tempo e estratégias de organização da rotina. Seu trabalho envolve o desenvolvimento de uma metodologia própria de produtividade, com aplicação de conceitos da neurociência. Ao longo de sua trajetória, já acompanhou mais de 600 alunas em 10 países.', 
                  '/ingrid-8.png'
                )} 
                className="absolute pos-ingrid cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Ingrid Garritano" 
              />

              {/* VERMELHO: Rapha Baggas */}
              <img 
                src="/Rapha-8.png" 
                onClick={() => openBio(
                  'Rapha Baggas', 
                  'Rapha Baggas é designer, diretor de arte e ilustrador. Sua prática é fundamentada em uma forte trajetória acadêmica: formado em Design pela UFBA, com extensão na Universidade de Aveiro (Portugal) e mestrado em Tecnopolítica no Design pela UnB.\n\nCentradas na crítica social, as criações de Baggas utilizam recursos semióticos para sintetizar, de forma ácida e vibrante, as questões mais urgentes do nosso tempo. Sua presença nas redes sociais é marcada por crônicas visuais ágeis aos acontecimentos diários. Isso estabelece um diálogo ativo com o público: o espectador não é passivo, mas instigado a investigar e relembrar fatos para interpretar suas imagens. Dessa forma, seu trabalho pictográfico se consolida como uma expressão potente e atual de resistência política e cultural.', 
                  '/Rapha-8.png'
                )} 
                className="absolute pos-rapha cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Rapha Baggas" 
              />

              {/* AMARELO: Damaris Chamorro */}
              <img 
                src="/Damaris-8.png" 
                onClick={() => openBio(
                  'Damaris Chamorro', 
                  'Mulher andina. Artista migrante, agente cultural e pesquisadora. Doutoranda em Direitos Humanos e Cidadania (UnB), mestre em Psicologia Clínica e Cultura (UnB, 2022) e psicóloga (Peru, 2011). Pesquisa mulheres migrantes hispanofalantes em espaços físicos e virtuais. Trabalha com palhaçaria hospitalar desde 2010 e atualmente integra coletivos de palhaços em Brasília.', 
                  '/Damaris-8.png'
                )} 
                className="absolute pos-damaris cursor-pointer hover:scale-105 transition-transform duration-300 drop-shadow-xl z-10" 
                alt="Damaris Chamorro" 
              />
            </div>
          </div>

          {/* MOBILE: Grelha de fotos */}
          <div className="grid grid-cols-2 gap-6 md:hidden place-items-center mt-4 px-[5%]">
            <img 
              src="/prof-8.png" 
              onClick={() => openBio(
                'Djaine Damiati', 
                'Doutora em Ciências Sociais e Mestre em Comunicação Midiática pela UNESP, com estágio de doutorado no Instituto de Ciências Sociais (ICS) da Universidade de Lisboa. Realizou estágio de pós-doutorado na Faculdade de Educação (FE - UnB) com pesquisa na área de políticas públicas em educação aberta e tecnologias para o bem comum. Atualmente é pesquisadora da Cátedra UNESCO em Educação Aberta e Tecnologias para o Bem Comum (UnB), onde atua no projeto Limiar - Laboratório de Futuros. É professora na Universidade IDP (Brasília) e professora substituta na Faculdade de Comunicação (FAC - UnB).', 
                '/prof-8.png'
              )} 
              className="w-[35vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Djaine Damiati" 
            />
            <img 
              src="/meninos-8.png" 
              onClick={() => openBio(
                'Pompeu & Gas Oliveira', 
                'Comunicólogos pela UnB e criadores de conteúdo. Atuam na pesquisa e documentação de linguagens e culturas. São fundadores do BlaBlaLab, um laboratório que descomplica a ciência da comunicação por meio do audiovisual. Seus conteúdos já impactaram milhões de pessoas e foram compartilhados em diversos colégios e universidades.', 
                '/meninos-8.png'
              )} 
              className="w-[42vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Pompeu & Gas Oliveira" 
            />
            <img 
              src="/rubs-8.png" 
              onClick={() => openBio(
                'Rubenilson Cerqueira', 
                'Doutor em Educação pela UnB, internacionalista, pesquisador e educador. Cursou toda a educação básica na rede pública e defende a democratização educacional superior. Em 2015, co-fundou com três amigos da UnB o Galt Vestibulares, cursinho popular que já impactou mais de 3.800 estudantes e mobiliza cerca de 140 voluntários atualmente. Possui trajetória como professor universitário e formador, atuou como consultor de políticas educacionais na UNESCO/MEC (2025–2026). Alumnus de Brasília sem Fronteiras e YLAI, ambos nos EUA, une pesquisa e transformação social para ampliar o acesso à educação superior gratuita, democrática e de qualidade e permitir que jovens protagonizem futuros historicamente negados.', 
                '/rubs-8.png'
              )} 
              className="w-[35vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Rubenilson Cerqueira" 
            />
            <img 
              src="/ingrid-8.png" 
              onClick={() => openBio(
                'Ingrid Garritano', 
                'Ingrid Garritano é professora formada pela Universidade de Brasília (UnB) e pós-graduada em Gestão de Projetos em Sydney, na Austrália. É fundadora da Quartzo Organiza, onde atua com educação em gestão do tempo e estratégias de organização da rotina. Seu trabalho envolve o desenvolvimento de uma metodologia própria de produtividade, com aplicação de conceitos da neurociência. Ao longo de sua trajetória, já acompanhou mais de 600 alunas em 10 países.', 
                '/ingrid-8.png'
              )} 
              className="w-[35vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Ingrid Garritano" 
            />
            <img 
              src="/Rapha-8.png" 
              onClick={() => openBio(
                'Rapha Baggas', 
                'Rapha Baggas é designer, diretor de arte e ilustrador. Sua prática é fundamentada em uma forte trajetória acadêmica: formado em Design pela UFBA, com extensão na Universidade de Aveiro (Portugal) e mestrado em Tecnopolítica no Design pela UnB.\n\nCentradas na crítica social, as criações de Baggas utilizam recursos semióticos para sintetizar, de forma ácida e vibrante, as questões mais urgentes do nosso tempo. Sua presença nas redes sociais é marcada por crônicas visuais ágeis aos acontecimentos diários. Isso estabelece um diálogo ativo com o público: o espectador não é passivo, mas instigado a investigar e relembrar fatos para interpretar suas imagens. Dessa forma, seu trabalho pictográfico se consolida como uma expressão potente e atual de resistência política e cultural.', 
                '/Rapha-8.png'
              )} 
              className="w-[35vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Rapha Baggas" 
            />
            <img 
              src="/Damaris-8.png" 
              onClick={() => openBio(
                'Damaris Chamorro', 
                'Mulher andina. Artista migrante, agente cultural e pesquisadora. Doutoranda em Direitos Humanos e Cidadania (UnB), mestre em Psicologia Clínica e Cultura (UnB, 2022) e psicóloga (Peru, 2011). Pesquisa mulheres migrantes hispanofalantes em espaços físicos e virtuais. Trabalha com palhaçaria hospitalar desde 2010 e atualmente integra coletivos de palhaços em Brasília.', 
                '/Damaris-8.png'
              )} 
              className="w-[35vw] cursor-pointer active:scale-95 transition-transform" 
              alt="Damaris Chamorro" 
            />
          </div>
        </div>
      </section>
      {/* SECÇÃO INFORMAÇÕES */}
      <section id="informacoes" className="w-full bg-[#b2b2b2] px-4 md:px-8 py-16 border-b border-black">
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
      
      {/* RODAPÉ */}
      <footer className="w-full bg-black text-white py-10 px-6 md:px-12 border-t border-black">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-sm">
          
          {/* BLOCO 1: Realização */}
          <div className="flex flex-col gap-3">
            <span className="font-normal text-xs uppercase tracking-widest text-gray-400">Realização:</span>
            
            <div className="flex items-start">
              {/* Imagem única com todas as marcas integradas */}
              <img 
                src="/logo-8.png" 
                alt="Realização: Instituto Latinoamerica, Ministério da Cultura e Universidade de Brasília" 
                className="h-12 md:h-25 w-auto object-contain" 
              />
            </div>
          </div>
          
          {/* BLOCO 2: Instagram + Dúvidas / Suporte */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <a 
              href="https://www.instagram.com/unb.tedx?psln=MWsxcmh2aW51NHdoNA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-2 hover:opacity-80 transition-opacity"
              aria-label="Instagram TEDx UnB"
            >
              <img 
                src="/IG-8.png" 
                alt="Instagram" 
                className="h-7 w-7 object-contain" 
              />
            </a>

            <span className="font-bold text-base text-white">Dúvidas | Suporte</span>
            <span className="text-base mt-0.5 text-gray-300">unb.tedx@gmail.com</span>
          </div>
          
          {/* BLOCO 3: Nota da Licença TED */}
          <div className="text-left md:text-right max-w-xs text-xs leading-relaxed text-gray-400">
            Este evento TEDx é uma iniciativa independente, realizada sob licença da TED.
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