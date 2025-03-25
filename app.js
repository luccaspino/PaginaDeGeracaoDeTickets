// Inicializando os elementos do formulário, do ticket e  container
const confForm = document.querySelector(".conf-form");
const confTicket = document.querySelector(".conf-ticket");
const container = document.querySelector(".container");

// Input do formulário
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userGithub = document.getElementById("username");

//Elementos da caixa de upload
const dropBox = document.querySelector(".upload-box");
const dropBtn = document.querySelector(".upload-btn");
const fileInput = document.getElementById("file");
const dragText = document.querySelector(".dragText");
const avatarBtn = document.querySelector(".avatar-btn");

// Imagem do usuário
let imgUser = "";

// Declaracao do aviso do email e definicao de email valido
const warnEmail = document.querySelector(".email-warn");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Clique para upload do arquivo
dropBox.addEventListener("click", () => fileInput.click());

// Adiciona um evento de mudança no input de arquivo para processar o arquivo selecionado
fileInput.addEventListener("change", (event) => {
  handleFile(event.target.files[0]);
});

// arrastar e soltar para a área de upload
dropBox.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropBox.classList.add("drag-over"); 
});

dropBox.addEventListener("dragleave", () => {
  dropBox.classList.remove("drag-over"); 
});

dropBox.addEventListener("drop", (event) => {
  event.preventDefault();
  dropBox.classList.remove("drag-over"); 
  handleFile(event.dataTransfer.files[0]); 
});


function handleFile(file) {
  const uploadWarn = document.querySelector(".upload-warn");
  if (file) {
    if (file.size > 500 * 1024) {
      //  arquivo é maior que 500KB
      uploadWarn.style.display = "block"; // Exibe aviso se o arquivo for muito grande
      return;
    }
    if (file.type.startsWith("image/")) {
      // arquivo é uma imagem jpg png
      const reader = new FileReader();
      reader.onload = (e) => {
        imgUser = e.target.result; // Converte a imagem para base64
        dropBtn.innerHTML = `<img src="${imgUser}" alt="User Image">`; // Exibe a imagem no botão
        dragText.style.display = "none"; 
        avatarBtn.style.display = "flex"; 
        uploadWarn.style.display = "none"; 
      };
      reader.readAsDataURL(file); // Lê o arquivo 
    } else {
      uploadWarn.style.display = "block"; // Exibe aviso se o arquivo não for uma imagem
    }
  } else {
    uploadWarn.style.display = "block"; // Exibe aviso se nenhum arquivo for selecionado
  }
}

// Adiciona um evento de entrada no campo de e-mail para validar o formato
userEmail.addEventListener("input", () => {
  warnEmail.style.display = emailRegex.test(userEmail.value) ? "none" : "block"; // Exibe ou oculta o aviso de e-mail inválido
});

// Seleciona o botão de gerar ticket
const generateBtn = document.querySelector(".submit-btn");

// Função para gerar o ticket
function generateTicket() {
  if (userName.value && userEmail.value && imgUser && userGithub.value) {
    // Verifica se todos os campos obrigatórios foram preenchidos
    let confUser = userName.value;
    let confEmail = userEmail.value;
    let confGithub = userGithub.value.trim();

    if (!confGithub.startsWith("@") && confGithub !== "") {
      // Adiciona "@" ao nome de usuário do GitHub se nao tiver sido inserido
      confGithub = `@${confGithub}`;
    }

    const randomId = `#BR${Math.floor(10000 + Math.random() * 90000)}`; // Gera um ID aleatório para o ticket antecedido por BR

    confForm.style.display = "none"; // Oculta o formulário

    // Cria o elemento do ticket
    const confTicketForm = document.createElement("div");
    confTicketForm.classList.add("conf-ticket");
    confTicketForm.style.display = "flex";

    // Preenche o conteúdo do ticket pelo innerHTML em vez de criar outra página html
    confTicketForm.innerHTML = ` 
            <div class="ticket-title">
                <h1>Congrats, <span>${confUser}!</span> Your ticket is ready.</h1>
                <p class="ticket-description">We've emailed your ticket to <span class="email-address">${confEmail}</span> and will send updates in the run-up to the event.</p>
            </div>
            <div class="card">
                <img src="./assets/images/pattern-ticket.svg" alt="" class="bg-card">
                <div class="card-details">
                    <div class="card-address">
                        <img src="./assets/images/logo-mark.svg" alt="">
                        <div class="card-address-text">
                            <h2>Coding Conf</h2>
                            <p>Jan 31, 2025 / Austin, TX</p>
                        </div>
                    </div>
                    <div class="card-user">
                        <img src="${imgUser}" alt="User Image" class="user-pic">
                        <div class="card-user-info">
                            <h2>${confUser}</h2>
                            <div class="card-github-link">
                                <img src="./assets/images/icon-github.svg" alt="">
                                <a href="#">${confGithub}</a>
                           </div>
                        </div>
                    </div>
                    <div class="card-id">
                        <div class="id-generated">
                            <p>${randomId}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

    container.appendChild(confTicketForm); // Adiciona o ticket ao container
  } else {
    alert("Please Enter Your Name, Email, and Upload an Image"); // Exibe um alerta se algum campo obrigatório estiver faltando
  }
}

// Adiciona um evento de clique no botão de gerar ticket
generateBtn.addEventListener("click", generateTicket);
