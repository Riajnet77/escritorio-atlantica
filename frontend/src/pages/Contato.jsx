import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { enviarContato } from '../services/api'

const initialForm = { nome: '', email: '', telefone: '', assunto: '', mensagem: '' }

export default function Contato() {
  const [form, setForm]       = useState(initialForm)
  const [status, setStatus]   = useState(null) // 'success' | 'error' | 'loading'
  const [errors, setErrors]   = useState({})

  const validate = () => {
    const e = {}
    if (!form.nome.trim())      e.nome     = 'Nome é obrigatório'
    if (!form.email.trim())     e.email    = 'E-mail é obrigatório'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.assunto.trim())   e.assunto  = 'Assunto é obrigatório'
    if (!form.mensagem.trim())  e.mensagem = 'Mensagem é obrigatória'
    return e
  }

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setStatus('loading')
    try {
      await enviarContato(form)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const Field = ({ name, label, type = 'text', required }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={label}
        className={`input-field ${errors[name] ? 'border-red-400 focus:ring-red-400' : ''}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  )

  return (
    <>
      <Helmet>
        <title>Contato | Escritório Atlântica</title>
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-br from-primary-900 to-primary-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Entre em Contato</h1>
          <p className="text-blue-200 text-lg">Estamos prontos para atender você.</p>
        </div>
      </section>

      <section className="py-20 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Nossos Canais</h2>
          {[
            { icon: '📍', titulo: 'Endereço', info: 'Rua Exemplo, 123 – Sala 01\nCidade, Estado – CEP 00000-000' },
            { icon: '📞', titulo: 'Telefone / WhatsApp', info: '(11) 99999-9999' },
            { icon: '✉️', titulo: 'E-mail', info: 'contato@escritorioatlantica.com.br' },
            { icon: '🕐', titulo: 'Horário', info: 'Segunda a Sexta: 08h às 18h' },
          ].map(({ icon, titulo, info }) => (
            <div key={titulo} className="flex gap-4 mb-6">
              <div className="text-2xl">{icon}</div>
              <div>
                <h3 className="font-semibold text-primary-800">{titulo}</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">{info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="card">
          <h2 className="text-2xl font-serif font-bold text-primary-800 mb-6">Envie uma Mensagem</h2>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6 text-sm">
              ✅ Mensagem enviada com sucesso! Retornaremos em breve.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 text-sm">
              ❌ Erro ao enviar. Tente novamente ou nos contate pelo telefone.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Field name="nome"     label="Nome completo" required />
            <Field name="email"    label="E-mail"        type="email" required />
            <Field name="telefone" label="Telefone / WhatsApp" />
            <Field name="assunto"  label="Assunto" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem <span className="text-red-500">*</span>
              </label>
              <textarea
                name="mensagem"
                value={form.mensagem}
                onChange={handleChange}
                rows={5}
                placeholder="Descreva sua necessidade..."
                className={`input-field resize-none ${errors.mensagem ? 'border-red-400' : ''}`}
              />
              {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem}</p>}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
