# Chatbot Educacional para Pessoas com TEA

Este é um chatbot web feito com Flask + Together AI, projetado para auxiliar pessoas no espectro autista a estudar de forma clara, acolhedora e acessível.

## Funcionalidades

- Login e registro de usuários
- Histórico de conversas por usuário
- Upload de arquivos (.txt, .pdf, .docx, .pptx, .xlsx, .img) com OCR
- IA com contexto de conversa (usando Together AI)
- Tema escuro/claro
- Interface responsiva e acessível

## Tecnologias usadas

- Python (Flask)
- Together AI (LLaMA 3 70B)
- SQLite + SQLAlchemy
- HTML, CSS, JS
- Flask-Login
- OCR com Tesseract
- Deploy compatível com Heroku

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/Venti23/Chat-Bot-TEA.git

# 2. Acesse a pasta do projeto
cd Chat-Bot-TEA

# 3. Crie um ambiente virtual (recomendado)
python -m venv venv

# 4. Ative o ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/macOS:
source venv/bin/activate

# 5. Instale as dependências
pip install -r requirements.txt

# 7. Alterar o .env
Altere o .env.example para .env 
Modifique o .env com a sua secret key e sua api key
Para obter sua api key acesse: https://api.together.ai/
Para ober sua secret key rode esse codigo em python:
import secrets
print(secrets.token_hex(16))

# 6. Execute o chatbot
python Serv.py
