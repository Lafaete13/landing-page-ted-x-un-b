'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

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
          
          {/* LINKS DE NAVEGAÇÃO */}
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
        
        {/* Esquerda: Imagem deslocada mais para o topo */}
        <div className="w-full md:w-1/2 bg-white relative overflow-hidden min-h-[35vh] md:min-h-[85vh]">
          <img 
            src="/mao-8.png" 
            alt="Mãos segurando figura geométrica" 
            /* Adicionamos -translate-y-4 (mobile) e md:-translate-y-8 (desktop) para forçar a imagem a subir um pouco mais */
            className="absolute inset-0 w-full h-full object-cover object-[100%_0%] scale-110 -translate-y-4 md:-translate-y-20 block" 
          />
        </div>

        {/* Direita: Textos ajustados */}
        <div className="w-full md:w-1/2 bg-[#b2b2b2] flex flex-col justify-start pt-10 pb-12 px-8 md:pt-40 lg:pt-64 md:px-12 lg:px-16">
          <div className="w-full max-w-3xl">
            
            {/* Título Principal */}
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

            {/* Nota da Licença TED: Fonte diminuída e cor suavizada */}
            <p className="text-xs md:text-sm text-black/70 font-normal mt-8">
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
      <footer className="w-full bg-white text-black py-8 px-6 md:px-12 border-t border-gray-300">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* BLOCO 1: Logos (UnB, Realização, Fomento) */}
          <div className="flex-1 flex justify-center md:justify-start w-full">
            <img 
              src="/Ativo 23-8.png" 
              alt="Marcas Realização e Fomento" 
              className="w-full max-w-3xl h-auto object-contain" 
            />
          </div>
          
          {/* BLOCO 2: Contato e Licença */}
          <div className="flex flex-col items-center text-center shrink-0">
            {/* Ícone do Instagram (com 'invert' para ficar preto no fundo branco) */}
            <a 
              href="https://www.instagram.com/unb.tedx?psln=MWsxcmh2aW51NHdoNA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-1 hover:opacity-70 transition-opacity"
              aria-label="Instagram TEDx UnB"
            >
              <img 
                src="/IG-8.png" 
                alt="Instagram" 
                className="h-8 w-8 object-contain invert" 
              />
            </a>

            <span className="font-bold text-sm md:text-base">Dúvidas | Suporte</span>
            <span className="text-sm md:text-base">unb.tedx@gmail.com</span>
            
            <p className="text-[9px] md:text-[10px] leading-tight font-medium mt-3 max-w-[220px]">
              Este evento TEDx é uma iniciativa independente, realizada sob licença da TED.
            </p>
          </div>
          
        </div>
      </footer>

      {/* MODAL DE MINI-BIO */}
      {activeSpeaker && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeBio}
        >
          <div 
            className="bg-[#ececec] text-black rounded-2xl p-6 md:p-8 max-w-lg w-full relative max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-black/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão Fechar */}
            <button 
              onClick={closeBio}
              className="absolute top-4 right-4 text-black/60 hover:text-black p-1 rounded-full hover:bg-black/5 transition-colors z-20"
              aria-label="Fechar biografia"
            >
              <X size={22} />
            </button>

            {/* Conteúdo com rolagem se a tela for muito pequena */}
            <div className="overflow-y-auto pr-1 flex flex-col items-center text-center custom-scrollbar">
              
              {/* Foto do Palestrante sem corte redondo e sem borda */}
              {activeSpeaker.imagemSrc && (
                <div className="w-24 md:w-28 mb-4 shrink-0">
                  <img 
                    src={activeSpeaker.imagemSrc} 
                    alt={activeSpeaker.nome} 
                    className="w-full h-auto object-contain block" 
                  />
                </div>
              )}

              {/* Nome */}
              <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight text-black shrink-0">
                {activeSpeaker.nome}
              </h3>

              {/* Bio ajustada */}
              <p className="text-[13px] md:text-[15px] leading-snug md:leading-relaxed text-black/80 font-normal whitespace-pre-line">
                {activeSpeaker.descricao}
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}