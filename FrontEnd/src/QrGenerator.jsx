import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode'

const samples = [
  { code: 'US', label: 'United States' }
]

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

export default function QrGenerator() {
  const [images, setImages] = useState({})

  useEffect(() => {
    let mounted = true
    async function gen() {
      const out = {}
      for (const s of samples) {
        const payload = s.code
        try {
          const size = 800
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          const ctx = canvas.getContext('2d')

          // nice gradient background
          const g = ctx.createLinearGradient(0, 0, size, size)
          g.addColorStop(0, '#06b6d4')
          g.addColorStop(1, '#0366d6')
          ctx.fillStyle = g
          ctx.fillRect(0, 0, size, size)

          // white card
          const pad = 56
          const cardSize = size - pad * 2
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = 'rgba(2,6,23,0.14)'
          ctx.shadowBlur = 24
          roundedRect(ctx, pad, pad, cardSize, cardSize, 24)
          ctx.fill()
          ctx.shadowBlur = 0

          // generate QR data URL
          const qrSize = Math.floor(cardSize * 0.72)
          const qrDataUrl = await QRCode.toDataURL(payload, { width: qrSize, margin: 1, color: { dark: '#0b2545', light: '#ffffff' } })
          const img = await new Promise((res, rej) => {
            const i = new Image()
            i.onload = () => res(i)
            i.onerror = rej
            i.src = qrDataUrl
          })
          const qrX = pad + Math.floor((cardSize - qrSize) / 2)
          const qrY = pad + Math.floor((cardSize - qrSize) / 2)
          ctx.drawImage(img, qrX, qrY, qrSize, qrSize)

          // overlay small circular logo at center (keeps scannable)
          const logoSize = Math.floor(qrSize * 0.18)
          const logoX = pad + (cardSize / 2) - (logoSize / 2)
          const logoY = pad + (cardSize / 2) - (logoSize / 2)
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 6, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#0366d6'
          ctx.beginPath()
          ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'white'
          ctx.font = `${Math.floor(logoSize * 0.45)}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(payload, logoX + logoSize / 2, logoY + logoSize / 2)

          out[s.code] = canvas.toDataURL('image/png')
        } catch (e) {
          console.error('QR gen error', e)
        }
      }
      if (mounted) setImages(out)
    }
    gen()
    return () => { mounted = false }
  }, [])

  function download(code) {
    const data = images[code]
    if (!data) return
    const a = document.createElement('a')
    a.href = data
    a.download = `${code}-styled-qr.png`
    a.click()
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Styled QR (scanable)</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {samples.map(s => (
          <div key={s.code} style={{ background: '#fff', padding: 12, borderRadius: 12, textAlign: 'center', boxShadow: '0 6px 20px rgba(2,6,23,0.06)' }}>
            <div style={{ width: 320, height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {images[s.code] ? (
                <img src={images[s.code]} alt={s.code} style={{ width: 300, height: 300, borderRadius: 20 }} />
              ) : (
                <div style={{ color: '#999' }}>Generating...</div>
              )}
            </div>
            <div style={{ marginTop: 8 }}><strong>{s.code}</strong></div>
            <div style={{ fontSize: 12, color: '#444' }}>{s.label}</div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => download(s.code)}>Download PNG</button>
            </div>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, color: '#666' }}>This styled QR keeps the modules intact and overlays a small logo — it is still scannable by modern phone cameras.</p>
    </div>
  )
}
