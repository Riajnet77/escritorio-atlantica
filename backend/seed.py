"""
Script para popular o MongoDB com dados iniciais.
Execute: python seed.py

Certifique-se de ter o .env configurado antes de rodar.
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME     = os.getenv("DB_NAME", "escritorio_atlantica")

servicos = [
    {
        "titulo": "Direito Civil",
        "slug": "direito-civil",
        "descricao_curta": "Assessoria completa em contratos, família, sucessões e responsabilidade civil.",
        "descricao_completa": (
            "Nossa equipe de Direito Civil oferece consultoria e representação em:\n\n"
            "• Elaboração e revisão de contratos\n"
            "• Direito de família e divórcio\n"
            "• Inventário e herança\n"
            "• Responsabilidade civil e indenizações\n"
            "• Direito do consumidor\n\n"
            "Atuamos com ética, transparência e comprometimento total com os seus interesses."
        ),
        "icone": "scale",
        "destaque": True,
        "ordem": 1,
        "criado_em": datetime.utcnow(),
    },
    {
        "titulo": "Direito Tributário",
        "slug": "direito-tributario",
        "descricao_curta": "Planejamento tributário e defesa em processos fiscais para empresas e pessoas físicas.",
        "descricao_completa": (
            "Nossos especialistas em Direito Tributário oferecem:\n\n"
            "• Planejamento tributário estratégico\n"
            "• Defesa em autuações fiscais\n"
            "• Recuperação de créditos tributários\n"
            "• Consultoria em Simples Nacional, Lucro Presumido e Lucro Real\n"
            "• Parcelamento de dívidas tributárias (PERT, REFIS)\n\n"
            "Reduzimos a carga tributária da sua empresa dentro da legalidade."
        ),
        "icone": "building",
        "destaque": True,
        "ordem": 2,
        "criado_em": datetime.utcnow(),
    },
    {
        "titulo": "Contabilidade Empresarial",
        "slug": "contabilidade-empresarial",
        "descricao_curta": "Gestão contábil, fiscal e financeira para empresas de todos os portes.",
        "descricao_completa": (
            "Serviços contábeis completos para a saúde financeira do seu negócio:\n\n"
            "• Escrituração contábil e fiscal\n"
            "• Apuração de impostos (IRPJ, CSLL, PIS, COFINS, ISS, ICMS)\n"
            "• Folha de pagamento e gestão de RH\n"
            "• Demonstrações financeiras (Balanço, DRE, Fluxo de Caixa)\n"
            "• Abertura, alteração e encerramento de empresas\n\n"
            "Cuidamos dos números para você focar no crescimento."
        ),
        "icone": "calculator",
        "destaque": True,
        "ordem": 3,
        "criado_em": datetime.utcnow(),
    },
    {
        "titulo": "Direito Trabalhista",
        "slug": "direito-trabalhista",
        "descricao_curta": "Defesa de empregados e empresas em reclamações e consultoria preventiva.",
        "descricao_completa": (
            "Atuação completa em Direito do Trabalho:\n\n"
            "• Defesa em reclamações trabalhistas\n"
            "• Consultoria preventiva para empresas\n"
            "• Elaboração de contratos de trabalho\n"
            "• Rescisão e homologação\n"
            "• Acordos e convenções coletivas\n\n"
            "Protegemos os direitos de empregados e empregadores."
        ),
        "icone": "briefcase",
        "destaque": False,
        "ordem": 4,
        "criado_em": datetime.utcnow(),
    },
]

posts = [
    {
        "titulo": "O que muda com a Reforma Tributária para pequenas empresas?",
        "slug": "reforma-tributaria-pequenas-empresas",
        "resumo": "Entenda os principais impactos da Reforma Tributária aprovada e como ela afeta o seu negócio.",
        "conteudo": (
            "A Reforma Tributária representa uma das maiores mudanças no sistema fiscal brasileiro das últimas décadas. "
            "Para pequenas empresas, as alterações trazem tanto desafios quanto oportunidades.\n\n"
            "Os principais pontos de atenção são a unificação dos tributos sobre consumo (PIS, COFINS, IPI, ICMS e ISS) "
            "em dois novos tributos: a CBS (federal) e o IBS (estadual e municipal).\n\n"
            "Para o Simples Nacional, a reforma prevê um regime diferenciado que preserva os benefícios para micro "
            "e pequenas empresas, mas exige atenção ao período de transição previsto até 2033.\n\n"
            "Recomendamos que todo empresário busque orientação especializada para adaptar seu planejamento tributário "
            "às novas regras com antecedência."
        ),
        "autor": "Dr. Carlos Lima",
        "tags": ["Tributário", "Reforma", "Pequenas Empresas"],
        "imagem_url": None,
        "publicado": True,
        "criado_em": datetime.utcnow(),
    },
    {
        "titulo": "Inventário: quando fazer e quais os documentos necessários?",
        "slug": "inventario-quando-fazer-documentos",
        "resumo": "Guia prático sobre o processo de inventário, prazos legais e documentação exigida.",
        "conteudo": (
            "O inventário é o processo legal de transferência dos bens de uma pessoa falecida para seus herdeiros. "
            "Muitas famílias desconhecem os prazos e exigências, o que pode gerar multas e dificuldades.\n\n"
            "O prazo legal para abertura do inventário é de 60 dias a partir do falecimento. "
            "O descumprimento desse prazo sujeita os herdeiros a multa de 10% sobre o imposto ITCMD devido.\n\n"
            "Documentos necessários:\n"
            "• Certidão de óbito\n"
            "• Documentos de identidade do falecido e dos herdeiros\n"
            "• Certidão de casamento (se aplicável)\n"
            "• Documentos dos bens (matrículas de imóveis, extratos bancários, documentos de veículos)\n"
            "• Certidão de nascimento dos herdeiros\n\n"
            "O inventário pode ser judicial (com processo no tribunal) ou extrajudicial (em cartório), "
            "sendo este último mais rápido e econômico quando não há conflito entre os herdeiros."
        ),
        "autor": "Dra. Ana Souza",
        "tags": ["Civil", "Família", "Herança"],
        "imagem_url": None,
        "publicado": True,
        "criado_em": datetime.utcnow(),
    },
    {
        "titulo": "Fluxo de caixa: o termômetro da saúde financeira da sua empresa",
        "slug": "fluxo-de-caixa-saude-financeira",
        "resumo": "Como controlar o fluxo de caixa de forma eficiente e evitar surpresas financeiras no seu negócio.",
        "conteudo": (
            "O fluxo de caixa é uma das ferramentas mais importantes para a gestão financeira de qualquer empresa, "
            "independentemente do porte. Empresas que não controlam seu caixa têm muito mais chances de enfrentar "
            "crises de liquidez, mesmo sendo lucrativas.\n\n"
            "Como funciona:\n"
            "O fluxo de caixa registra todas as entradas (receitas, cobranças, empréstimos recebidos) e saídas "
            "(pagamentos, salários, impostos, fornecedores) de dinheiro em um determinado período.\n\n"
            "Dicas práticas:\n"
            "• Registre todos os movimentos diariamente\n"
            "• Separe contas pessoais e empresariais (pró-labore definido)\n"
            "• Projete o fluxo para os próximos 3 meses\n"
            "• Mantenha uma reserva de emergência equivalente a 3 meses de custos fixos\n\n"
            "A contabilidade bem feita é a base para decisões empresariais inteligentes."
        ),
        "autor": "Dra. Mariana Costa",
        "tags": ["Contabilidade", "Gestão Financeira"],
        "imagem_url": None,
        "publicado": True,
        "criado_em": datetime.utcnow(),
    },
]

async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db     = client[DB_NAME]

    print("🌱 Iniciando seed do banco de dados...")

    # Limpa coleções existentes
    await db.servicos.drop()
    await db.blog.drop()
    print("🗑️  Coleções antigas removidas.")

    # Insere serviços
    await db.servicos.insert_many(servicos)
    print(f"✅ {len(servicos)} serviços inseridos.")

    # Insere posts
    await db.blog.insert_many(posts)
    print(f"✅ {len(posts)} posts de blog inseridos.")

    # Cria índices para performance
    await db.servicos.create_index("slug", unique=True)
    await db.blog.create_index("slug", unique=True)
    await db.blog.create_index("publicado")
    print("📑 Índices criados.")

    client.close()
    print("\n🎉 Seed concluído com sucesso!")
    print(f"   Banco: {DB_NAME}")
    print(f"   Acesse: http://localhost:8000/docs para testar a API")

if __name__ == "__main__":
    asyncio.run(seed())
