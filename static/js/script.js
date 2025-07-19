const temas = ["tema-claro", "tema-escuro"];
let indiceTema = 0;
let conversaIdAtual = null;

function alternarTema() {
  document.body.classList.remove(...temas);
  indiceTema = (indiceTema + 1) % temas.length;
  document.body.classList.add(temas[indiceTema]);
  localStorage.setItem("temaAtual", temas[indiceTema]);
}

async function enviarMensagem() {
  const input = document.getElementById("user-input");
  const fileInput = document.getElementById("file-input");
  const message = input.value.trim();
  const file = fileInput.files[0];
  const chatBox = document.getElementById("chat-box");

  if (!message && !file) return;

  if (message) {
    chatBox.innerHTML += `<div class="mensagem usuario"><strong>Você:</strong> ${message}</div>`;
    const botDiv = document.createElement("div");
    botDiv.className = "mensagem bot";
    botDiv.innerHTML = `<em>Digitando...</em>`;
    chatBox.appendChild(botDiv);
    input.value = "";

    try {
      const resposta = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, conversation_id: conversaIdAtual })
      });

      const data = await resposta.json();
      if (data.conversation_id) conversaIdAtual = data.conversation_id;
      botDiv.innerHTML = `<strong>Assistente:</strong><br>${data.response}`;
    } catch (error) {
      console.error("Erro:", error);
      botDiv.innerHTML = "<strong>Erro:</strong> Falha na conexão.";
    }
  }

  if (file) {
    const formData = new FormData();
    formData.append("file", file);

    const respostaBot = document.createElement("div");
    respostaBot.className = "mensagem bot";
    respostaBot.innerHTML = "<strong>IA:</strong> lendo arquivo...";
    chatBox.appendChild(respostaBot);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      respostaBot.innerHTML = `<strong>IA:</strong><br>${data.response || "Erro ao processar o arquivo."}`;
    } catch (error) {
      console.error("Erro no upload:", error);
      respostaBot.innerHTML = "<strong>IA:</strong> Erro ao processar o arquivo.";
    }

    fileInput.value = "";
    document.getElementById("file-name").textContent = "Nenhum arquivo escolhido";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensagem();
  }
});

document.getElementById("file-input").addEventListener("change", function () {
  const fileNameSpan = document.getElementById("file-name");
  fileNameSpan.textContent = this.files.length ? this.files[0].name : "Nenhum arquivo escolhido";
});

async function novaConversa() {
  const res = await fetch("/nova-conversa", { method: "POST" });
  const data = await res.json();
  conversaIdAtual = data.conversa_id;
  document.getElementById("chat-box").innerHTML = "";
}

async function carregarHistorico() {
  const res = await fetch("/historico");
  const historico = await res.json();
  const lista = document.getElementById("lista-historico");
  lista.innerHTML = "";

  historico.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.title} (${c.created_at})`;
    li.onclick = () => carregarMensagens(c.id);
    lista.appendChild(li);
  });
}

async function carregarMensagens(id) {
  conversaIdAtual = id;
  const res = await fetch(`/mensagens/${id}`);
  const mensagens = await res.json();

  const box = document.getElementById("chat-box");
  box.innerHTML = "";
  mensagens.forEach(msg => {
    box.innerHTML += `
      <div class="mensagem usuario"><strong>Você:</strong> ${msg.usuario}</div>
      <div class="mensagem bot"><strong>Assistente:</strong><br>${msg.assistente}</div>
    `;
  });
  box.scrollTop = box.scrollHeight;
}

window.onload = () => {
  const temaSalvo = localStorage.getItem("temaAtual");
  if (temaSalvo && temas.includes(temaSalvo)) {
    document.body.classList.remove(...temas);
    document.body.classList.add(temaSalvo);
    indiceTema = temas.indexOf(temaSalvo);
  }
  carregarHistorico();
};

document.getElementById("toggle-historico").addEventListener("click", function () {
  const sidebar = document.getElementById("historico-sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
});
function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

window.onclick = function(event) {
  document.querySelectorAll(".modal").forEach(modal => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};
function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}
