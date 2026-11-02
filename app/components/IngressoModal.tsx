'use client'

import { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react' // Instale se necessário: pnpm add qrcode.react
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'

interface IngressoProps {
  nome: string
  ingressoId: string
}

export default function IngressoModal({ nome, ingressoId }: IngressoProps) {
  const ingressoRef = useRef<HTMLDivElement>(null)

  const baixarPDF = async () => {
    if (!ingressoRef.current) return
    const canvas = await html2canvas(ingressoRef.current, { scale: 3 })
    const imgData = canvas.toDataURL('image/jpeg', 1.0)
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    })

    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height)
    pdf.save(`Ingresso_TEDxUnB_${nome.replace(/\s+/g, '_')}.pdf`)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      {/* Container com a arte de fundo */}
      <div
        ref={ingressoRef}
        style={{
          position: 'relative',
          width: '450px',
          height: '540px',
          backgroundImage: 'url(/ingresso-template.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontFamily: 'sans-serif',
          color: '#000',
        }}
      >
        {/* Nome do Participante (Posicionado em INGRESSO DE:) */}
        <div
          style={{
            position: 'absolute',
            top: '235px',
            left: '30px',
            right: '30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#111',
            textTransform: 'uppercase',
          }}
        >
          {nome}
        </div>

        {/* QR Code Dinâmico (Posicionado no centro cinza) */}
        <div
          style={{
            position: 'absolute',
            top: '280px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <QRCodeSVG value={ingressoId} size={150} />
        </div>
      </div>

      {/* Botão para Baixar */}
      <button
        onClick={baixarPDF}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: '#eb0028',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        <Download size={20} /> Baixar Ingresso PDF
      </button>
    </div>
  )
}