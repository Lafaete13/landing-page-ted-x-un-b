'use client'

import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Download,
  MapPin,
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

function InfoItem({ icon: Icon, label, children }: { icon: typeof CalendarDays; label: string; children: React.ReactNode }) {
  return (
    <div className="info-item">
      <div className="info-icon"><Icon size={18} strokeWidth={1.8} /></div>
      <div><span>{label}</span><strong>{children}</strong></div>
    </div>
  )
}

export default function Page() {
  const [isStudent, setIsStudent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [attendeeName, setAttendeeName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const ticketRef = useRef<HTMLDivElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const email = String(form.get('email') || '')
    const confirmation = String(form.get('confirmation') || '')

    if (email !== confirmation) {
      setEmailError('Os e-mails precisam ser iguais.')
      return
    }
    setEmailError('')

    const payload = {
      nome_completo: String(form.get('name')),
      email: email,
      data_nascimento: String(form.get('birthdate')),
      eh_aluno_unb: isStudent,
      curso: isStudent ? String(form.get('course')) : null,
      matricula: isStudent ? String(form.get('registration')) : null,
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
    } catch (error) {
      alert('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
    } finally {
      setLoading(false)
    }
  }

  // Função para baixar como Imagem PNG
  async function downloadTicketPNG() {
    if (!ticketRef.current) return

    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    const link = document.createElement('a')
    link.download = `ingresso-tedx-unb-${attendeeName.toLowerCase().replace(/\s+/g, '-')}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  // Função para baixar como arquivo PDF
  async function downloadTicketPDF() {
    if (!ticketRef.current) return

    const canvas = await html2canvas(ticketRef.current, {
      scale: 3,
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 3, canvas.height / 3],
    })

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 3, canvas.height / 3)
    pdf.save(`ingresso-tedx-unb-${attendeeName.toLowerCase().replace(/\s+/g, '-')}.pdf`)
  }

  return (
    <main className="site-shell">
      <div className="background-glow" aria-hidden="true" />
      <header className="topbar">
        <div className="tedx-mark"><b>TED</b><span>x</span></div>
        <div className="topbar-label">Universidade de Brasília <i /></div>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Um evento para imaginar novos caminhos</p>
          <h1>TEDx <em>Universidade</em><br />de Brasília</h1>
          <p className="hero-description">Pensar sobre os futuros e propor um diálogo atemporal para refletir e imaginar os tempos, suas nuances e potências por meio de narrativas pluriversas.</p>
          <div className="event-details">
            <InfoItem icon={CalendarDays} label="Data">Dia 19</InfoItem>
            <InfoItem icon={Clock3} label="Horário">Credenciamento às 14h <small>|</small> Início às 15h</InfoItem>
            <InfoItem icon={MapPin} label="Local">Centro de Excelência em Turismo <small>(CET/UnB)</small></InfoItem>
          </div>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>IDEAS<br /><b>WORTH</b><br />SPREADING</span><i>×</i></div>
      </section>

      <section className="registration-section" id="inscricao">
        {!submitted ? (
          <form className="registration-card" onSubmit={handleSubmit}>
            <div className="card-heading">
              <div className="ticket-icon"><Ticket size={21} /></div>
              <div><p className="card-kicker">A entrada é gratuita</p><h2>Garanta seu ingresso</h2></div>
            </div>
            <p className="card-intro">Preencha seus dados para viver essa conversa sobre futuros.</p>
            <div className="form-grid">
              <label>Nome completo<input name="name" type="text" placeholder="Como podemos te chamar?" required /></label>
              <label>E-mail<input name="email" type="email" placeholder="voce@email.com" required /></label>
              <label>Confirmar e-mail<input name="confirmation" type="email" placeholder="Digite seu e-mail novamente" required onChange={() => setEmailError('')} /></label>
              <label>Data de nascimento<input name="birthdate" type="date" required /></label>
            </div>
            {emailError && <p className="form-error" role="alert">{emailError}</p>}
            <label className="student-toggle">
              <input type="checkbox" checked={isStudent} onChange={(event) => setIsStudent(event.target.checked)} />
              <span className="fake-check">{isStudent && <Check size={13} />}</span>
              <span>Sou aluno da UnB</span>
              <small>Opcional</small>
            </label>
            {isStudent && (
              <div className="student-fields">
                <label>Curso<input name="course" type="text" placeholder="Ex.: Comunicação Social" required /></label>
                <label>Matrícula<input name="registration" type="text" placeholder="Sua matrícula" required /></label>
              </div>
            )}
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? 'Gerando ingresso...' : <>Garantir meu ingresso <ArrowRight size={18} /></>}
            </button>
            <p className="privacy-note"><span>⌁</span> Seus dados serão usados apenas para o credenciamento do evento.</p>
          </form>
        ) : (
          <div className="success-card" role="status">
            <button className="close-button" onClick={() => setSubmitted(false)} aria-label="Fechar confirmação"><X size={19} /></button>
            <div className="success-check"><Check size={23} /></div>
            <p className="card-kicker">Ingresso confirmado</p>
            <h2>Nos vemos no TEDx!</h2>
            <p className="success-copy">Seu ingresso gratuito está reservado. Apresente este ticket no credenciamento.</p>
            
            {/* Modelo do Ingresso baseado na Arte Oficial da Fernanda */}
            <div
              ref={ticketRef}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '430px',
                height: '520px',
                backgroundImage: 'url(/ingresso-template.jpeg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                margin: '0 auto',
                fontFamily: 'sans-serif',
              }}
            >
              {/* Nome do Participante abaixo de "INGRESSO DE:" */}
              <div
                style={{
                  position: 'absolute',
                  top: '235px',
                  left: '32px',
                  right: '32px',
                  fontSize: '1.15rem',
                  fontWeight: 'bold',
                  color: '#111',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {attendeeName}
              </div>

              {/* QR Code Dinâmico centralizado na área do ticket */}
              <div
                style={{
                  position: 'absolute',
                  top: '280px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="QR Code do Ingresso"
                    style={{ width: '145px', height: '145px', display: 'block' }}
                  />
                ) : (
                  <QrCode />
                )}
              </div>
            </div>

            {/* Botões para download em PNG ou PDF */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', width: '100%' }}>
              <button className="download-button" onClick={downloadTicketPNG} style={{ flex: 1 }}>
                <Download size={17} /> Baixar PNG
              </button>
              <button className="download-button" onClick={downloadTicketPDF} style={{ flex: 1, backgroundColor: '#222', borderColor: '#444' }}>
                <Download size={17} /> Baixar PDF
              </button>
            </div>

            <div className="notice">
              <strong>Importante</strong>
              <p>O credenciamento será iniciado às 14h no CET/UnB. Chegue com antecedência para validar seu ingresso antes do início das apresentações às 15h.</p>
            </div>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="unb-logo">UnB<span>★</span></div>
          <div className="footer-divider" />
          <div className="tedx-footer">TED<span>x</span></div>
        </div>
        <p>Precisa de ajuda? Fale com a gente<br /><a href="mailto:suporte@tedxunb.com.br">suporte@tedxunb.com.br</a></p>
        <span className="footer-year">© 2026 TEDx UnB</span>
      </footer>
    </main>
  )
}