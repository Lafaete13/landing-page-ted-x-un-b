'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import {
  ArrowRight,
  Check,
  Download,
  Ticket,
  X,
} from 'lucide-react'

const qrPattern = [
  '1111111001011111111', '1000001011011000001', '1011101001011011101',
  '1011101010011011101', '1011101001111011101', '1000001010101000001',
  '1111111010101111111', '0000000011010000000', '1010111010010110101',
  '0110100111101001010', '1101011100110111011', '0011010011011100100',
  '1011101110100101110', '0000000010111010010', '1111111011001110101',
  '1000001000110011100', '1011101011010110111', '1011101000101001001',
  '1011101011110110100', '1000001010011101011', '1111111011100110010',
]

function QrCode() {
  return (
    <div className="qr-frame" aria-label="QR Code do ingresso">
      <div className="qr-code">
        {qrPattern.map((row, rowIndex) => row.split('').map((cell, cellIndex) => (
          <span key={`${rowIndex}-${cellIndex}`} className={cell === '1' ? 'qr-dark' : 'qr-light'} />
        )))}
      </div>
    </div>
  )
}

export default function IngressosPage() {
  const [tipoParticipante, setTipoParticipante] = useState<'aluno' | 'externo'>('aluno')
  const [submitted, setSubmitted] = useState(false)
  const [attendeeName, setAttendeeName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalIngressos, setTotalIngressos] = useState<number>(0)
  
  const ticketRef = useRef<HTMLDivElement>(null)

  const [scale, setScale] = useState(1)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 462) {
        setScale((window.innerWidth - 32) / 430)
      } else {
        setScale(1)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function carregarContagem() {
      try {
        const res = await fetch('https://landing-page-ted-x-un-b.onrender.com/api/ingressos/total')
        const data = await res.json()
        if (res.ok && data.total !== undefined) {
          setTotalIngressos(data.total)
        }
      } catch (err) {
        console.error("Erro ao buscar total de ingressos", err)
      }
    }
    carregarContagem()
  }, [])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    const confirmation = String(form.get('confirmation') || '')
    const cpfValue = String(form.get('cpf') || '').trim()

    if (email !== confirmation) {
      setEmailError('Os e-mails precisam ser iguais.')
      return
    }
    setEmailError('')

    const payload = {
      nome_completo: String(form.get('name')),
      email: email,
      cpf: cpfValue !== '' ? cpfValue : null,
      tipo_participante: tipoParticipante,
      eh_aluno_unb: tipoParticipante === 'aluno',
      matricula: tipoParticipante === 'aluno' ? String(form.get('registration')) : null,
    }

    try {
      setLoading(true)
      const res = await fetch('https://landing-page-ted-x-un-b.onrender.com/api/ingressos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.detail || 'Erro ao realizar inscrição.')
        return
      }

      setQrCodeUrl(data.qr_code_base64)
      setAttendeeName(payload.nome_completo)
      setSubmitted(true)
      setTotalIngressos((prev) => prev + 1)

      setTimeout(async () => {
        if (!ticketRef.current) return;
        try {
          const canvas = await html2canvas(ticketRef.current, {
            backgroundColor: '#ffffff',
            scale: 3, 
            useCORS: true,
            logging: false,
          });

          const arquivoBase64 = canvas.toDataURL('image/png', 0.9);
          console.log("Canvas gerado com sucesso, disparando e-mail...");

          fetch('/api/enviar-ingresso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              nome: payload.nome_completo,
              emailDestino: payload.email,
              arquivoBase64: arquivoBase64
            })
          });
        } catch (err) {
          console.error("Erro interno no processo de captura/envio:", err);
        }
      }, 800); 

    } catch (error) {
      alert('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
    } finally {
      setLoading(false)
    }
  }

  async function downloadTicketPNG() {
    if (!ticketRef.current) return
    window.scrollTo(0, 0)
    
    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: '#ffffff',
      scale: 3, 
      useCORS: true,
      logging: false,
    })

    const link = document.createElement('a')
    link.download = `ingresso-tedx-unb-${attendeeName.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png', 1.0)
    link.click()
  }

  async function downloadTicketPDF() {
    if (!ticketRef.current) return
    window.scrollTo(0, 0)

    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: '#ffffff',
      scale: 3,
      useCORS: true,
      logging: false,
    })

    const imgData = canvas.toDataURL('image/png', 1.0)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [430, 515], 
    })

    pdf.addImage(imgData, 'PNG', 0, 0, 430, 515)
    pdf.save(`ingresso-tedx-unb-${attendeeName.toLowerCase().replace(/\s+/g, '-')}.pdf`)
  }

  const renderTicketLayout = (isForCapture: boolean) => (
    <div
      ref={isForCapture ? ticketRef : null}
      style={{
        position: 'relative',
        width: '430px', 
        height: '515px', 
        margin: '0',
        fontFamily: 'Inter, Arial, sans-serif',
        color: '#000',
        userSelect: 'none',
        backgroundColor: '#fff', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        boxSizing: 'border-box'
      }}
    >
      <img
        src="/ingresso-template.png"
        alt="Template Ingresso TEDx"
        style={{ width: '430px', height: '515px', display: 'block', objectFit: 'cover' }}
      />

      {/* MUDE O TOP DESTE BLOCO PARA 85px */}
      <div style={{
        position: 'absolute',
        top: '85px', // <-- AQUI! Mudou de 108px para 85px
        left: '0',
        width: '430px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between', 
        padding: '0 34px',
        color: '#111',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', width: '120px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Data:</div>
          <div style={{ fontSize: '38px', fontWeight: '900', lineHeight: '1', margin: '10px 0' }}>19</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', lineHeight: '1.1' }}>Novembro<br />2026</div>
        </div>
        <div style={{ textAlign: 'center', width: '120px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Horário:</div>
          <div style={{ fontSize: '38px', fontWeight: '900', lineHeight: '1', margin: '10px 0' }}>14h</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Credenciamento</div>
        </div>
        <div style={{ textAlign: 'center', width: '120px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Local:</div>
          <div style={{ fontSize: '11px', fontWeight: 'bold', lineHeight: '1.25', marginTop: '12px' }}>Centro de<br />Excelência<br />em Turismo</div>
          <div style={{ fontSize: '10px', marginTop: '4px', fontWeight: '500' }}>CET - UnB</div>
        </div>
      </div>

      {/* CAIXA DE NOME CORRIGIDA */}
      <div
        style={{
          position: 'absolute',
          top: '208px', 
          left: '129px',
          width: '275px',
          height: '28px', // Altura fixa de segurança para a fonte não cortar
          display: 'flex',
          alignItems: 'center', 
          textAlign: 'left',
          color: '#111',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          margin: 0,
          padding: 0,
        }}
      >
        <span style={{ fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', lineHeight: 'normal' }}>
          {attendeeName}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '285px', 
          left: '150px',
          backgroundColor: '#fff',
          padding: '8px',
          borderRadius: '12px',
          border: '1px solid #e5e5e5',
          width: '130px', 
          height: '130px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {qrCodeUrl ? (
          <img
            src={qrCodeUrl}
            alt="QR Code do Ingresso"
            style={{ width: '114px', height: '114px', display: 'block', borderRadius: '4px' }}
          />
        ) : (
          <div style={{ width: '114px', height: '114px', overflow: 'hidden' }}>
            <QrCode />
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: '18px', left: '26px', fontSize: '14px', fontWeight: 'bold', color: '#111' }}>
        UnB
      </div>
      <div style={{ position: 'absolute', bottom: '18px', right: '26px', fontSize: '14px', fontWeight: 'bold', color: '#111' }}>
        2026
      </div>
    </div>
  )

  return (
    <div className="antialiased flex flex-col min-h-screen bg-[#b2b2b2]">
      <nav className="w-full bg-black py-6 px-6 md:px-12 z-50 border-b border-gray-800">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white leading-none cursor-pointer">
                <span className="text-[#e8474a] font-black">TEDx</span><br />
                <span className="font-normal text-gray-300">Universidade<br />de Brasília</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:gap-6 text-white font-medium text-sm md:text-base">
            <Link href="/" className="hover:text-[#e8474a] transition-colors pr-4 md:pr-6 border-r border-gray-700">Sobre</Link>
            <span className="font-bold text-[#e8474a]">Ingressos</span>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center py-12 px-4 md:px-8">
        <section className="w-full max-w-xl">
          {!submitted ? (
            <form className="registration-card" onSubmit={handleSubmit}>
              <div className="card-heading">
                <div className="ticket-icon" style={{ color: '#e8474a', borderColor: '#e8474a' }}>
                  <Ticket size={21} />
                </div>
                <div>
                  <p className="card-kicker" style={{ color: '#e8474a' }}>A entrada é gratuita</p>
                  <h2>Garanta seu ingresso</h2>
                  <p style={{ fontSize: '0.9rem', color: '#f3f4f6', marginTop: '6px', fontWeight: '600', letterSpacing: '0.3px' }}>
                    🔥 <strong style={{ color: '#e8474a', fontSize: '1rem' }}>{totalIngressos}</strong> ingressos já emitidos!
                  </p>
                </div>
              </div>
              <p className="card-intro">Preencha seus dados para viver essa conversa sobre futuros.</p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button
                  type="button"
                  onClick={() => setTipoParticipante('aluno')}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '8px',
                    border: tipoParticipante === 'aluno' ? '2px solid #e8474a' : '1px solid #333',
                    backgroundColor: tipoParticipante === 'aluno' ? 'rgba(232, 71, 74, 0.18)' : '#181818',
                    color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  Aluno UnB
                </button>
                <button
                  type="button"
                  onClick={() => setTipoParticipante('externo')}
                  style={{
                    flex: 1, padding: '12px', borderRadius: '8px',
                    border: tipoParticipante === 'externo' ? '2px solid #e8474a' : '1px solid #333',
                    backgroundColor: tipoParticipante === 'externo' ? 'rgba(232, 71, 74, 0.18)' : '#181818',
                    color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s ease',
                  }}
                >
                  Comunidade Externa
                </button>
              </div>

              <div className="form-grid">
                <label>Nome completo<input name="name" type="text" placeholder="Como podemos te chamar?" required /></label>
                <label>CPF (opcional para certificado)<input name="cpf" type="text" placeholder="000.000.000-00" /></label>
                <label>E-mail<input name="email" type="email" placeholder="voce@email.com" required /></label>
                <label>Confirmar e-mail<input name="confirmation" type="email" placeholder="Digite seu e-mail novamente" required onChange={() => setEmailError('')} /></label>
                {tipoParticipante === 'aluno' && (
                  <label>Matrícula UnB<input name="registration" type="text" placeholder="Sua matrícula" required /></label>
                )}
              </div>

              {emailError && <p className="form-error" role="alert">{emailError}</p>}

              <button className="submit-button" type="submit" disabled={loading} style={{ marginTop: '20px', backgroundColor: '#e8474a' }}>
                {loading ? 'Gerando ingresso...' : <>Garantir meu ingresso <ArrowRight size={18} /></>}
              </button>
              <p className="privacy-note"><span style={{ color: '#e8474a' }}>⌁</span> Seus dados serão usados apenas para o credenciamento do evento.</p>
            </form>
          ) : (
            <div className="success-card" role="status">
              <button className="close-button" onClick={() => setSubmitted(false)} aria-label="Fechar confirmação"><X size={19} /></button>
              <div className="success-check" style={{ backgroundColor: '#e8474a' }}><Check size={23} /></div>
              <p className="card-kicker" style={{ color: '#e8474a' }}>Ingresso confirmado</p>
              <h2>Nos vemos no TEDx!</h2>
              <p className="success-copy">Seu ingresso gratuito está reservado. Baixe seu ticket abaixo e apresente no credenciamento.</p>
              
              <div style={{ backgroundColor: 'rgba(232, 71, 74, 0.1)', padding: '12px 16px', borderRadius: '8px', margin: '16px 0', border: '1px solid #e8474a', textAlign: 'left' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.85rem', fontWeight: 'bold', color: '#e8474a' }}>⚠️ Olhou o e-mail e não achou?</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#ccc', lineHeight: '1.4' }}>
                  Enviamos o ingresso no seu e-mail agora mesmo! Caso não esteja na Caixa de Entrada, dê uma olhada na pasta de <strong>Spam</strong> ou <strong>Lixo Eletrônico</strong>.
                </p>
              </div>
              
              <div style={{
                width: '100%',
                position: 'relative',
                height: `${scale * 515}px`, 
                marginBottom: '20px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  marginLeft: '-215px',
                  transform: `scale(${scale})`, 
                  transformOrigin: 'top center',
                  width: '430px', 
                }}>
                  {renderTicketLayout(false)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', width: '100%' }}>
                <button className="download-button" onClick={downloadTicketPNG} style={{ flex: 1 }}>
                  <Download size={17} /> Baixar PNG
                </button>
                <button className="download-button" onClick={downloadTicketPDF} style={{ flex: 1, backgroundColor: '#222', borderColor: '#444' }}>
                  <Download size={17} /> Baixar PDF
                </button>
              </div>

              <div className="notice" style={{ borderLeftColor: '#e8474a', backgroundColor: 'rgba(232, 71, 74, 0.08)' }}>
                <strong style={{ color: '#e8474a' }}>Importante</strong>
                <p>O credenciamento será iniciado às 14h no CET/UnB. Chegue com antecedência para validar seu ingresso antes do início das apresentações às 15h.</p>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* O INGRESSO FANTASMA CORRIGIDO: position fixed no topo para o html2canvas não quebrar */}
      <div style={{ position: 'fixed', top: 0, left: 0, zIndex: -9999, opacity: 0.01, pointerEvents: 'none' }}>
        {renderTicketLayout(true)}
      </div>

      <footer className="w-full bg-white text-black py-8 px-6 md:px-12 border-t border-gray-300">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 flex justify-center md:justify-start w-full">
            <img src="/Ativo 23-8.png" alt="Marcas Realização e Fomento" className="w-full max-w-3xl h-auto object-contain" />
          </div>
          <div className="flex flex-col items-center text-center shrink-0">
            <a href="https://www.instagram.com/unb.tedx" target="_blank" rel="noopener noreferrer" className="mb-1 hover:opacity-70 transition-opacity">
              <img src="/IG-8.png" alt="Instagram" className="h-8 w-8 object-contain invert" />
            </a>
            <span className="font-bold text-sm md:text-base">Dúvidas | Suporte</span>
            <span className="text-sm md:text-base">unb.tedx@gmail.com</span>
          </div>
        </div>
      </footer>
    </div>
  )
}