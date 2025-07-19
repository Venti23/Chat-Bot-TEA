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
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
