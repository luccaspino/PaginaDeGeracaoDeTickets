const confForm = document.querySelector(".conf-form");
const confTicket = document.querySelector(".conf-ticket");
const container = document.querySelector(".container");

const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userGithub = document.getElementById("username");

const dropBox = document.querySelector(".upload-box");
const dropBtn = document.querySelector(".upload-btn");
const fileInput = document.getElementById("file");
const dragText = document.querySelector(".dragText");
const avatarBtn = document.querySelector(".avatar-btn");

let imgUser = "";

const warnEmail = document.querySelector(".email-warn");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

dropBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  handleFile(event.target.files[0]);
});

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
      uploadWarn.style.display = "block";
      return;
    }
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imgUser = e.target.result;
        dropBtn.innerHTML = `<img src="${imgUser}" alt="User Image">`;
        dragText.style.display = "none";
        avatarBtn.style.display = "flex";
        uploadWarn.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      uploadWarn.style.display = "block";
    }
  } else {
    uploadWarn.style.display = "block";
  }
}

userEmail.addEventListener("input", () => {
  warnEmail.style.display = emailRegex.test(userEmail.value) ? "none" : "block";
});

const generateBtn = document.querySelector(".submit-btn");

function generateTicket() {
  if (userName.value && userEmail.value && imgUser) {
    let confUser = userName.value;
    let confEmail = userEmail.value;
    let confGithub = userGithub.value.trim();

    if (!confGithub.startsWith("@") && confGithub !== "") {
      confGithub = `@${confGithub}`;
    }

    const randomId = `#BR${Math.floor(10000 + Math.random() * 90000)}`;

    confForm.style.display = "none";

    const confTicketForm = document.createElement("div");
    confTicketForm.classList.add("conf-ticket");
    confTicketForm.style.display = "flex";

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

    container.appendChild(confTicketForm);
  } else {
    alert("Please Enter Your Name, Email, and Upload an Image");
  }
}

generateBtn.addEventListener("click", generateTicket);
