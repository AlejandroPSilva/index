
  
    // ========== REVEAL (scroll animation) ==========
    const elementos = document.querySelectorAll(".reveal");

    function revelar() {
      elementos.forEach(el => {
        const topo = el.getBoundingClientRect().top;
        if (topo < window.innerHeight - 60) {
          el.classList.add("visible");
        }
      });
    }
    window.addEventListener("scroll", revelar);
    revelar();

    // ========== MODAL RESERVA ==========
    const modal = document.getElementById("reserva-modal");
    const botoes = document.querySelectorAll(".reservar");
    const fechar = document.getElementById("close-reserva");
    const campoPacote = document.getElementById("pacote-escolhido");

    botoes.forEach(btn => {
      btn.onclick = () => {
        modal.style.display = "flex";
        campoPacote.value = btn.dataset.pacote;
      };
    });

    fechar.onclick = () => modal.style.display = "none";
    window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

    // ========== MÁSCARA TELEFONE ==========
    const tel = document.getElementById("telefone");
    tel.addEventListener("input", () => {
      let v = tel.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);

      if (v.length <= 2) tel.value = `(${v}`;
      else if (v.length <= 7) tel.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      else tel.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    });

    // ========== CONFIRMAÇÃO RESERVA ==========
    document.getElementById("form-reserva").onsubmit = e => {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const data = document.getElementById("data").value;

      modal.style.display = "none";
      e.target.reset();
    };

    // ========== FORM CONTATO ==========
    document.getElementById("form-contato").addEventListener("submit", function(e) {
      e.preventDefault();
      const nome = document.getElementById("contato-nome").value;
      this.reset();
    });

    // ========== NEWSLETTER ==========
    document.getElementById("form-news").addEventListener("submit", function(e) {
      e.preventDefault();
      const email = document.getElementById("news-email").value;
    });

    // ========== MODO ESCURO ==========
    const toggleBtn = document.getElementById("toggle-darkmode");

    if (localStorage.getItem("darkmode") === "on") {
      document.body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️";
        localStorage.setItem("darkmode", "on");
      } else {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("darkmode", "off");
      }
    });

    // ========== CONTADORES DE IMPACTO ==========
    const impactoNums = document.querySelectorAll(".impacto-num");
    let impactoAtivado = false;

    function animarImpacto() {
      const secImpacto = document.getElementById("impacto");
      const topo = secImpacto.getBoundingClientRect().top;

      if (!impactoAtivado && topo < window.innerHeight - 80) {
        impactoAtivado = true;

        impactoNums.forEach(num => {
          const target = parseInt(num.dataset.target, 10);
          let atual = 0;
          const incremento = Math.max(1, Math.floor(target / 100));

          const intervalo = setInterval(() => {
            atual += incremento;
            if (atual >= target) {
              atual = target;
              clearInterval(intervalo);
            }
            num.textContent = atual;
          }, 20);
        });
      }
    }

    window.addEventListener("scroll", animarImpacto);
    animarImpacto();

    document.getElementById("form-news").addEventListener("submit", function(e) {
    e.preventDefault();

    const msg = document.getElementById("mensagem-sucesso");
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
    }, 5000);

    this.reset();
});

function mostrarToast(texto) {
    const toast = document.getElementById("toast");
    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000); // desaparece em 4s
}

document.getElementById("form-news").addEventListener("submit", function(e) {
    e.preventDefault();
    mostrarToast("Inscrição realizada! Obrigado por assinar ♥");
    this.reset();
});

document.getElementById("form-contato").addEventListener("submit", function(e) {
    e.preventDefault();
    mostrarToast("Mensagem enviada! Retornaremos em breve.");
    this.reset();
});

function mostrarToast(texto) {
    const toast = document.getElementById("toast");
    const textoToast = document.getElementById("toast-text");

    textoToast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000); // desaparece em 4 segundos
}

document.getElementById("form-news").addEventListener("submit", function(e) {
    e.preventDefault();
    mostrarToast("Inscrição realizada! Obrigado por assinar 🌿");
    this.reset();
});

document.getElementById("form-reserva").addEventListener("submit", function(e) {
    e.preventDefault();
    mostrarToast("Reserva confirmada! Entraremos em contato 📞");
    modal.style.display = "none";
    this.reset();
});