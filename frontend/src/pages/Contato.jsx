import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { enviarContato } from '../services/api'

const init = { nome: '', email: '', telefone: '', assunto: '', mensagem: '' }

export default function Contato() {
  const [form, setForm]   = useState(init)
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.nome.trim())     e.nome     = 'Nome obrigatório'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.assunto.trim())  e.assunto  = 'Assunto obrigatório'
    if (!form.mensagem.trim()) e.mensagem = 'Mensagem obrigatória'
    return e
  }

  const onChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('loading')
    try {
      await enviarContato(form)
      setStatus('success')
      setForm(init)
    } catch {
      setStatus('error')
    }
  }

  const Field = ({ name, label, type = 'text', req }) => (
    <div>
      <label className="block font-body text-sm text-white/60 mb-1.5">
        {label}{req && <span className="text-brand-cyan ml-1">*</span>}
      </label>
      <input
        type={type} name={name} value={form[name]} onChange={onChange}
        placeholder={label}
        className={`input ${errors[name] ? 'border-red-400/60' : ''}`}
      />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <>
      <Helmet><title>Contato | Escritório Atlântica</title></Helmet>

      <section style={{background: "linear-gradient(135deg, #060e1e 0%, #0f2045 60%, #1a3a70 100%)"}} className="pt-36 pb-20 bg-dots">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="cyan-line mx-auto" />
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">Fale Conosco</h1>
          <p className="font-body text-white/50 text-lg">Estamos prontos para atender você.</p>
        </div>
      </section>

      <section style={{background: "linear-gradient(180deg, #0a1630 0%, #0f2045 100%)"}} className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Info */}
          <div>
            <div className="cyan-line" />
            <h2 className="font-display text-2xl text-white font-bold mb-8">Nossos Canais</h2>
            <div className="space-y-6">
              {[
                { icon: '📍', t: 'Endereço',             v: 'Rua Emilio Dias Brandão, nº 257\nBairro Santa Izabel – Campo Grande, MS' },
                { icon: '📞', t: 'Telefone Fixo',         v: '(67) 3431-4383', href: 'tel:6734314383' },
                { icon: '📱', t: 'WhatsApp',              v: '(67) 99975-2307\n(67) 99952-9701', href: 'https://wa.me/5567999752307' },
                { icon: '✉️', t: 'E-mail',                v: 'escatlantica@gmail.com', href: 'mailto:escatlantica@gmail.com' },
                { icon: '🕐', t: 'Horário de Atendimento',v: 'Segunda a Sexta: 08h às 18h' },
              ].map(({ icon, t, v, href }) => (
                <div key={t} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center flex-shrink-0 text-lg">
                    {icon}
                  </div>
                  <div>
                    <div className="font-body text-xs text-brand-cyan uppercase tracking-widest mb-0.5">{t}</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="font-body text-white/70 text-sm whitespace-pre-line hover:text-brand-cyan transition-colors">
                        {v}
                      </a>
                    ) : (
                      <p className="font-body text-white/70 text-sm whitespace-pre-line">{v}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/5567999752307?text=Olá! Gostaria de saber mais sobre os serviços do Escritório Atlântica."
              target="_blank" rel="noopener noreferrer"
              className="btn-primary mt-8 inline-flex">
              💬 Chamar no WhatsApp
            </a>
          </div>

          {/* Formulário */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="font-display text-xl text-white font-bold mb-6">Envie uma Mensagem</h2>

            {status === 'success' && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4 mb-6 text-sm font-body">
                ✅ Mensagem enviada! Retornaremos em breve.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6 text-sm font-body">
                ❌ Erro ao enviar. Tente pelo WhatsApp ou telefone.
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <Field name="nome"     label="Nome completo" req />
              <Field name="email"    label="E-mail"        type="email" req />
              <Field name="telefone" label="Telefone / WhatsApp" />
              <Field name="assunto"  label="Assunto" req />
              <div>
                <label className="block font-body text-sm text-white/60 mb-1.5">
                  Mensagem <span className="text-brand-cyan">*</span>
                </label>
                <textarea name="mensagem" value={form.mensagem} onChange={onChange} rows={5}
                  placeholder="Descreva sua necessidade..."
                  className={`input resize-none ${errors.mensagem ? 'border-red-400/60' : ''}`}
                />
                {errors.mensagem && <p className="text-red-400 text-xs mt-1">{errors.mensagem}</p>}
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
