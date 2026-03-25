import { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `Você é um assistente especializado do Escritório Atlântica, escritório de contabilidade fundado em 1986 em Ponta Porã, MS (CRC/MS 00239/0-0).

Seu foco principal é responder dúvidas sobre a Reforma Tributária Brasileira (EC 132/2023) e o novo sistema tributário, incluindo:
- IBS (Imposto sobre Bens e Serviços) - substitui ICMS e ISS
- CBS (Contribuição sobre Bens e Serviços) - substitui PIS e COFINS
- IS (Imposto Seletivo) - para produtos prejudiciais à saúde/ambiente
- IVA Dual (CBS federal + IBS estadual/municipal)
- Extinção gradual do PIS, COFINS, IPI, ICMS e ISS (período de transição 2026-2033)
- Impactos para MEI, Simples Nacional, Lucro Presumido e Lucro Real
- Split payment (pagamento fracionado do imposto)
- Cashback para pessoas de baixa renda
- Regimes específicos para setores (agro, combustíveis, saúde, educação)
- Planejamento tributário frente às mudanças

Você também pode responder dúvidas gerais de contabilidade e fiscal.

Seja objetivo, use linguagem acessível (evite jargão excessivo), e quando pertinente, sugira que o cliente entre em contato com o Escritório Atlântica para assessoria personalizada.

Telefone: (67) 3431-4383 | WhatsApp: (67) 99975-2307 | Email: escatlantica@gmail.com

Responda em português brasileiro. Seja conciso mas completo. Máximo 3 parágrafos por resposta.`

const SUGESTOES = [
  'O que muda com a Reforma Tributária?',
  'Como o Simples Nacional será afetado?',
  'O que é o IBS e a CBS?',
  'Quando as mudanças entram em vigor?',
  'O que é split payment?',
  'Minha empresa precisa fazer algo agora?',
]

export default function Chatbot() {
  const [aberto, setAberto]     = useState(false)
  const [msgs, setMsgs]         = useState([
    {
      role: 'assistant',
      content: '👋 Olá! Sou o assistente do **Escritório Atlântica**.\n\nPosso esclarecer suas dúvidas sobre a **Reforma Tributária** e o novo sistema fiscal brasileiro. Como posso ajudar?'
    }
  ])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const endRef                  = useRef(null)

  useEffect(() => {
    if (aberto) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, aberto])

  const enviar = async (texto) => {
    const pergunta = texto || input.trim()
    if (!pergunta || loading) return
    setInput('')

    const novasMsgs = [...msgs, { role: 'user', content: pergunta }]
    setMsgs(novasMsgs)
    setLoading(true)

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: novasMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const resposta = data.content?.[0]?.text || 'Desculpe, não consegui processar sua pergunta. Tente novamente.'
      setMsgs(prev => [...prev, { role: 'assistant', content: resposta }])
    } catch {
      setMsgs(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro. Entre em contato diretamente: **(67) 3431-4383** ou WhatsApp **(67) 99975-2307**.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const formatMsg = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #22d3ee, #1e3a6e)' }}
        aria-label="Abrir chat"
      >
        {aberto ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">💬</span>
        )}
        {/* Badge */}
        {!aberto && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Janela do chat */}
      <div className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] transition-all duration-300 ${
        aberto ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ background: 'linear-gradient(180deg, #0a1630 0%, #060e1e 100%)' }}>

          {/* Header */}
          <div className="px-4 py-3 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #1e3a6e, #0f2045)' }}>
            <div className="w-9 h-9 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-lg flex-shrink-0">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm font-body">Assistente Atlântica</div>
              <div className="text-brand-cyan text-xs font-body">Reforma Tributária & Contabilidade</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          </div>

          {/* Mensagens */}
          <div className="h-80 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e3a6e transparent' }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-body leading-relaxed ${
                    m.role === 'user'
                      ? 'text-navy-900 rounded-br-sm'
                      : 'text-white/90 border border-white/10 rounded-bl-sm'
                  }`}
                  style={m.role === 'user'
                    ? { background: '#22d3ee' }
                    : { background: 'rgba(255,255,255,0.06)' }
                  }
                  dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }}
                />
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/6 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0,1,2].map(i => (
                    <span key={i} className="w-2 h-2 rounded-full bg-brand-cyan/60 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Sugestões */}
          {msgs.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {SUGESTOES.slice(0,4).map(s => (
                <button key={s} onClick={() => enviar(s)}
                  className="text-xs bg-white/5 border border-white/15 text-white/70 hover:text-brand-cyan hover:border-brand-cyan/40 rounded-full px-3 py-1.5 transition-all font-body">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3">
            <div className="flex gap-2 bg-white/5 border border-white/15 rounded-xl p-1.5">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && enviar()}
                placeholder="Digite sua dúvida..."
                className="flex-1 bg-transparent text-white text-sm px-2 outline-none placeholder-white/30 font-body"
                disabled={loading}
              />
              <button
                onClick={() => enviar()}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 flex-shrink-0"
                style={{ background: '#22d3ee' }}
              >
                <svg className="w-4 h-4 text-navy-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
