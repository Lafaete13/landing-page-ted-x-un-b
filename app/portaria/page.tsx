'use client'

import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw, Lock } from 'lucide-react'

const SENHA_PORTARIA = 'tedx2026' // Defina a senha de acesso da portaria aqui

interface ResultadoValidation {
  valido: boolean
  status: 'SUCESSO' | 'ALERTA' | 'ERRO'
  mensagem: string
  participante?: string
}

function QrScanner({ onScan }: { onScan: (decodedText: string) => void }) {
  const scannerRef = useRef<Html5Qrcode | null>(null)

  useEffect(() => {
    const element = document.getElementById('reader')
    if (!element) return

    element.innerHTML = ''

    const html5QrCode = new Html5Qrcode('reader')
    scannerRef.current = html5QrCode

    let active = true

    html5QrCode
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (active) {
            active = false
            html5QrCode
              .stop()
              .then(() => onScan(decodedText))
              .catch(() => onScan(decodedText))
          }
        },
        () => {}
      )
      .catch((err) => {
        console.warn('Erro ao acessar câmera:', err)
      })

    return () => {
      active = false
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [onScan])

  return <div id="reader" style={{ width: '100%', minHeight: '300px' }} />
}

export default function PortariaPage() {
  const [autenticado, setAutenticado] = useState(false)
  const [senhaInput, setSenhaInput] = useState('')
  const [erroSenha, setErroSenha] = useState(false)

  const [resultado, setResultado] = useState<ResultadoValidation | null>(null)
  const [loading, setLoading] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (senhaInput === SENHA_PORTARIA) {
      setAutenticado(true)
      setErroSenha(false)
    } else {
      setErroSenha(true)
    }
  }

  async function validarIngresso(ingressoId: string) {
    setLoading(true)
    try {
      const res = await fetch(`https://landing-page-ted-x-un-b.onrender.com/api/validar/${ingressoId.trim()}`, {
  method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) {
        setResultado({
          valido: false,
          status: 'ERRO',
          mensagem: data.detail || 'Ingresso inválido ou não encontrado.',
        })
      } else {
        setResultado(data)
      }
    } catch (error) {
      setResultado({
        valido: false,
        status: 'ERRO',
        mensagem: 'Erro de conexão com o servidor FastAPI.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Tela de bloqueio por senha
  if (!autenticado) {
    return (
      <main style={{ minHeight: '100vh', backgroundColor: '#111', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#222', padding: '32px', borderRadius: '16px', maxWidth: '380px', width: '100%', textAlign: 'center', border: '1px solid #333' }}>
          <div style={{ backgroundColor: '#333', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={24} color="#e5e7eb" />
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px' }}>Acesso Restrito</h1>
          <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>Digite a senha da portaria para acessar o scanner do TEDx UnB.</p>
          
          <input
            type="password"
            placeholder="Senha de acesso"
            value={senhaInput}
            onChange={(e) => setSenhaInput(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#111', color: '#fff', fontSize: '1rem', marginBottom: '12px', boxSizing: 'border-box' }}
            required
          />
          
          {erroSenha && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '12px' }}>Senha incorreta. Tente novamente.</p>}

          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#eb0028', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
            Entrar na Portaria
          </button>
        </form>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#111', color: '#fff', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>TEDx UnB — Controladoria de Entrada</h1>
        <p style={{ color: '#888' }}>Aponte a câmera para o QR Code do participante</p>
      </header>

      {!resultado ? (
        <div style={{ width: '100%', maxWidth: '450px', background: '#222', padding: '16px', borderRadius: '12px' }}>
          <QrScanner onScan={validarIngresso} />
          {loading && <p style={{ textAlign: 'center', marginTop: '12px' }}>Validando ingresso...</p>}
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            maxWidth: '450px',
            padding: '32px',
            borderRadius: '16px',
            textAlign: 'center',
            backgroundColor: resultado.valido
              ? '#064e3b'
              : resultado.status === 'ALERTA'
              ? '#78350f'
              : '#7f1d1d',
            border: `2px solid ${
              resultado.valido ? '#10b981' : resultado.status === 'ALERTA' ? '#f59e0b' : '#ef4444'
            }`,
          }}
        >
          {resultado.valido ? (
            <CheckCircle2 size={64} color="#10b981" style={{ margin: '0 auto 16px' }} />
          ) : resultado.status === 'ALERTA' ? (
            <AlertTriangle size={64} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
          ) : (
            <XCircle size={64} color="#ef4444" style={{ margin: '0 auto 16px' }} />
          )}

          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
            {resultado.mensagem}
          </h2>

          {resultado.participante && (
            <p style={{ fontSize: '1.2rem', marginTop: '12px' }}>
              Participante: <strong>{resultado.participante}</strong>
            </p>
          )}

          <button
            onClick={() => setResultado(null)}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <RefreshCw size={18} /> Escanear Próximo Ingresso
          </button>
        </div>
      )}
    </main>
  )
}