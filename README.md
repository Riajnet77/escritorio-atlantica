# 🏛️ Escritório Atlântica — Site Completo

Site institucional com **FastAPI** (backend) + **React + Vite** (frontend), banco de dados **MongoDB Atlas**, hospedado no **Render** (API) e **Vercel** (frontend).

---

## 📁 Estrutura do Projeto

```
escritorio-atlantica/
├── backend/                  ← API FastAPI (Render)
│   ├── app/
│   │   ├── main.py           ← Entrada da aplicação
│   │   ├── config.py         ← Configurações / variáveis
│   │   ├── database.py       ← Conexão MongoDB
│   │   ├── routes/
│   │   │   ├── services.py   ← GET/POST /api/servicos
│   │   │   ├── blog.py       ← GET/POST /api/blog
│   │   │   └── contact.py    ← POST /api/contato
│   │   └── schemas/
│   │       ├── service.py
│   │       ├── blog.py
│   │       └── contact.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
├── frontend/                 ← React + Vite (Vercel)
│   ├── src/
│   │   ├── pages/            ← Home, Sobre, Serviços, Blog, Contato
│   │   ├── components/       ← Navbar, Footer
│   │   ├── services/api.js   ← Axios para a API
│   │   └── styles/index.css  ← Tailwind CSS
│   ├── vercel.json
│   └── .env.example
├── .github/workflows/        ← CI automático
├── render.yaml               ← Config do Render
└── .gitignore
```

---

## 🚀 Passo a Passo de Deploy

### 1️⃣ MongoDB Atlas (banco de dados)

1. Acesse [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) e crie conta gratuita
2. Crie um **Cluster** (plano M0 Free)
3. Em **Database Access** → crie um usuário com senha
4. Em **Network Access** → adicione `0.0.0.0/0` (acesso de qualquer IP)
5. Clique em **Connect** → **Drivers** → copie a string de conexão:
   ```
   mongodb+srv://usuario:senha@cluster.mongodb.net/?retryWrites=true&w=majority
   ```
   > Guarde essa string — você vai usar nas próximas etapas!

---

### 2️⃣ GitHub (código)

```bash
# No terminal, dentro da pasta do projeto:
git init
git add .
git commit -m "feat: projeto inicial escritório atlântica"

# Crie um repositório no GitHub e execute:
git remote add origin https://github.com/SEU_USUARIO/escritorio-atlantica.git
git push -u origin main
```

---

### 3️⃣ Render (backend FastAPI)

1. Acesse [render.com](https://render.com) e crie conta (pode entrar com GitHub)
2. Clique em **New → Web Service**
3. Conecte seu repositório GitHub `escritorio-atlantica`
4. Configure o serviço:
   - **Name:** `escritorio-atlantica-api`
   - **Root Directory:** `backend`
   - **Runtime:** `Docker`
   - **Branch:** `main`
5. Em **Environment Variables**, adicione:
   | Chave | Valor |
   |-------|-------|
   | `MONGODB_URL` | `mongodb+srv://usuario:senha@...` |
   | `DB_NAME` | `escritorio_atlantica` |
   | `SECRET_KEY` | (gere uma chave aleatória segura) |
6. Clique em **Create Web Service**
7. Aguarde o deploy (~3-5 min). Copie a URL gerada:
   ```
   https://escritorio-atlantica-api.onrender.com
   ```

✅ Teste acessando: `https://sua-url.onrender.com/docs` (Swagger da API)

---

### 4️⃣ Vercel (frontend React)

1. Acesse [vercel.com](https://vercel.com) e crie conta (pode entrar com GitHub)
2. Clique em **Add New → Project**
3. Importe o repositório `escritorio-atlantica`
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Em **Environment Variables**, adicione:
   | Chave | Valor |
   |-------|-------|
   | `VITE_API_URL` | `https://escritorio-atlantica-api.onrender.com` |
6. Clique em **Deploy**

✅ Seu site estará em: `https://escritorio-atlantica.vercel.app`

---

### 5️⃣ Domínio Personalizado (opcional)

**No Vercel:**
- Settings → Domains → adicione `escritorioatlantica.com.br`
- Configure o DNS conforme instruído

**No Render:**
- Settings → Custom Domains → adicione `api.escritorioatlantica.com.br`

---

## ➕ Como Adicionar Conteúdo

Com a API no ar, use o Swagger (`/docs`) ou qualquer cliente HTTP (Insomnia, Postman):

### Adicionar Serviço
```bash
POST https://sua-api.onrender.com/api/servicos/
Content-Type: application/json

{
  "titulo": "Direito Tributário",
  "slug": "direito-tributario",
  "descricao_curta": "Planejamento e consultoria tributária completa.",
  "descricao_completa": "Oferecemos assessoria em...",
  "icone": "balance-scale",
  "destaque": true,
  "ordem": 1
}
```

### Adicionar Post no Blog
```bash
POST https://sua-api.onrender.com/api/blog/
Content-Type: application/json

{
  "titulo": "Reforma Tributária 2024",
  "slug": "reforma-tributaria-2024",
  "resumo": "Entenda os impactos da reforma...",
  "conteudo": "A reforma tributária aprovada em...",
  "autor": "Dr. Carlos Lima",
  "tags": ["Tributário", "Legislação"],
  "publicado": true
}
```

---

## 🔄 Deploy Automático

Após qualquer `git push origin main`:
- ✅ **Render** atualiza o backend automaticamente
- ✅ **Vercel** atualiza o frontend automaticamente
- ✅ **GitHub Actions** roda os testes de CI

---

## 🛠️ Desenvolvimento Local

### Backend
```bash
cd backend
cp .env.example .env
# Edite o .env com sua MONGODB_URL

pip install -r requirements.txt
uvicorn app.main:app --reload
# API em: http://localhost:8000
# Docs em: http://localhost:8000/docs
```

### Frontend
```bash
cd frontend
cp .env.example .env
# Edite VITE_API_URL=http://localhost:8000

npm install
npm run dev
# Site em: http://localhost:5173
```

---

## 🏗️ Stack Técnica

| Camada | Tecnologia | Hospedagem |
|--------|-----------|------------|
| Frontend | React 18 + Vite + TailwindCSS | Vercel |
| Backend | FastAPI + Python 3.12 | Render |
| Banco de Dados | MongoDB Atlas | MongoDB Cloud |
| CI/CD | GitHub Actions | GitHub |

---

> 💡 **Dica:** Sempre que fizer alterações, basta um `git push` e tudo é atualizado automaticamente!
