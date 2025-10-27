const form = document.querySelector("form");
const button = form.querySelector("button[type='submit']");
const toastContainer = document.getElementById("toast-container");

// Função para criar o toast
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `
    px-5 py-3 rounded-lg shadow-lg text-white font-medium
    flex items-center gap-3
    animate-fade-in-down
    ${type === "success" ? "bg-green-500" : "bg-red-500"}
  `;
  toast.innerHTML = `
    <span>${
      type === "success" ? "✅" : "❌"
    }</span> <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);

  // Remove o toast após 4 segundos com animação
  setTimeout(() => {
    toast.classList.add("animate-fade-out-up");
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Adiciona animações Tailwind customizadas (se não tiver no config)
const style = document.createElement("style");
style.innerHTML = `
@keyframes fade-in-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fade-out-up {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
}
.animate-fade-in-down { animation: fade-in-down 0.4s ease-out; }
.animate-fade-out-up { animation: fade-out-up 0.4s ease-in forwards; }
`;
document.head.appendChild(style);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  button.disabled = true;
  button.innerText = "Enviando...";

  emailjs
    .send("SEU_SERVICE_ID", "SEU_TEMPLATE_ID", {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    })
    .then(() => {
      showToast("Mensagem enviada com sucesso!");
      form.reset();
    })
    .catch(() => {
      showToast("Erro ao enviar. Tente novamente.", "error");
    })
    .finally(() => {
      button.disabled = false;
      button.innerText = "Enviar Mensagem";
    });
});
