 // ===============================
// QUIZ PREMIUM - JAVASCRIPT
// ===============================

const form = document.querySelector("form");
const submitButton = document.querySelector("button");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const inputs = document.querySelectorAll("input, select, textarea");

// ===============================
// 1. MENSAGEM DE BOAS-VINDAS
// ===============================

window.addEventListener("load", () => {
  console.log("Quiz de Acessibilidade carregado com sucesso.");

  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.transition = "opacity 0.8s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ===============================
// 2. DESTAQUE DA SEÇÃO ATUAL NO MENU
// ===============================

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.parentElement.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.parentElement.classList.add("active-link");
    }
  });
});

// ===============================
// 3. ANIMAÇÃO AO APARECER NA TELA
// ===============================

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
  section.style.transition = "0.8s ease";
  observer.observe(section);
});

// ===============================
// 4. EFEITO PREMIUM NOS CAMPOS
// ===============================

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.boxShadow = "0 0 0 4px rgba(201, 162, 39, 0.25)";
    input.style.borderColor = "#c9a227";
  });

  input.addEventListener("blur", () => {
    input.style.boxShadow = "none";
    input.style.borderColor = "#b7b7c4";
  });
});

// ===============================
// 5. BARRA DE PROGRESSO DO FORMULÁRIO
// ===============================

const progressBar = document.createElement("div");
progressBar.className = "progress-bar";

const progressFill = document.createElement("div");
progressFill.className = "progress-fill";

progressBar.appendChild(progressFill);
document.body.prepend(progressBar);

function updateProgress() {
  let filledFields = 0;

  inputs.forEach((input) => {
    if (
      input.type === "radio" &&
      document.querySelector(`input[name="${input.name}"]:checked`)
    ) {
      filledFields++;
    } else if (input.value.trim() !== "") {
      filledFields++;
    }
  });

  const totalFields = inputs.length;
  const progress = Math.min((filledFields / totalFields) * 100, 100);

  progressFill.style.width = `${progress}%`;
}

inputs.forEach((input) => {
  input.addEventListener("input", updateProgress);
  input.addEventListener("change", updateProgress);
});

// ===============================
// 6. VALIDAÇÃO PERSONALIZADA
// ===============================

function showMessage(text, type = "success") {
  const oldMessage = document.querySelector(".custom-message");

  if (oldMessage) {
    oldMessage.remove();
  }

  const message = document.createElement("div");
  message.className = `custom-message ${type}`;
  message.textContent = text;

  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 3500);
}

// ===============================
// 7. CONTADOR DE CARACTERES NO TEXTAREA
// ===============================

const textarea = document.querySelector("textarea");

if (textarea) {
  const counter = document.createElement("p");
  counter.className = "counter";
  counter.textContent = "0 caracteres";

  textarea.insertAdjacentElement("afterend", counter);

  textarea.addEventListener("input", () => {
    counter.textContent = `${textarea.value.length} caracteres`;
  });
}

// ===============================
// 8. CONFIRMAÇÃO DE ENVIO
// ===============================

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#student-name").value.trim();
  const email = document.querySelector("#student-email").value.trim();
  const birthDate = document.querySelector("#birth-date").value.trim();
  const cssSelect = document.querySelector("#selector").value;

  if (!name || !email || !birthDate || !cssSelect) {
    showMessage("Preencha todos os campos obrigatórios.", "error");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  setTimeout(() => {
    submitButton.textContent = "Respostas enviadas com sucesso!";
    showMessage("Quiz enviado com sucesso. Excelente trabalho!", "success");

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar respostas";
    }, 3000);
  }, 1200);
});

// ===============================
// 9. MODO ESCURO PREMIUM
// ===============================

const themeButton = document.createElement("button");
themeButton.textContent = "Alternar tema";
themeButton.className = "theme-button";
themeButton.type = "button";

document.body.appendChild(themeButton);

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeButton.textContent = "Tema claro";
    localStorage.setItem("theme", "dark");
  } else {
    themeButton.textContent = "Tema escuro";
    localStorage.setItem("theme", "light");
  }
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeButton.textContent = "Tema claro";
}

// ===============================
// 10. BOTÃO VOLTAR AO TOPO
// ===============================

const topButton = document.createElement("button");
topButton.textContent = "↑";
topButton.className = "top-button";
topButton.type = "button";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topButton.classList.add("show");
  } else {
    topButton.classList.remove("show");
  }
});

topButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
