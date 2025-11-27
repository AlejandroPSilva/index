/* ============================================
   REVEAL (animações no scroll) com IntersectionObserver
============================================ */
const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observerReveal = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el) => observerReveal.observe(el));
} else {
  // fallback simples
  elementos.forEach((el) => el.classList.add("visible"));
}

/* ============================================
   MODAL RESERVA
============================================ */
const modal = document.getElementById("reserva-modal");
const botoes = document.querySelectorAll(".reservar");
const fechar = document.getElementById("close-reserva");
const campoPacote = document.getElementById("pacote-escolhido");

botoes.forEach((btn) => {
  btn.onclick = () => {
    modal.style.display = "flex";
    campoPacote.value = btn.dataset.pacote;
  };
});

fechar.onclick = () => (modal.style.display = "none");

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

/* ==========================================================
   MÁSCARA DE TELEFONE COMPLETA — DDD + validação + shake
========================================================== */
const telefoneCampo = document.getElementById("telefone");
const alertaTelefone = document.createElement("div");

if (telefoneCampo) {
  alertaTelefone.className = "erro-telefone";
  alertaTelefone.style.display = "none";
  telefoneCampo.insertAdjacentElement("afterend", alertaTelefone);

  /* DDD válidos do Brasil */
  const DDD_VALIDOS_BR = [
    11,12,13,14,15,16,17,18,19,
    21,22,24,
    27,28,
    31,32,33,34,35,37,38,
    41,42,43,44,45,46,
    47,48,49,
    51,53,54,55,
    61,
    62,64,
    63,
    65,66,
    67,
    68,
    69,
    71,73,74,75,77,
    79,
    81,87,
    82,
    83,
    84,
    85,88,
    86,89,
    91,93,94,
    92,97,
    95,
    96,
    98,99
  ];

  telefoneCampo.addEventListener("input", () => {
    let v = telefoneCampo.value.replace(/\D/g, "");

    if (v.length > 11) v = v.slice(0, 11);

    // só DDD
    if (v.length <= 2) {
      telefoneCampo.value = `(${v}`;
      return;
    }

    const ddd = parseInt(v.slice(0, 2), 10);

    if (!DDD_VALIDOS_BR.includes(ddd)) {
      erroDDD("DDD inválido! Ex: 27, 21, 11...");
      return;
    } else {
      limparErro();
    }

    if (v.length <= 10) {
      // fixo
      telefoneCampo.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    } else {
      // celular
      telefoneCampo.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    }
  });

  function erroDDD(msg) {
    alertaTelefone.textContent = msg;
    alertaTelefone.style.display = "block";
    telefoneCampo.classList.add("shake");
    setTimeout(() => telefoneCampo.classList.remove("shake"), 500);
  }

  function limparErro() {
    alertaTelefone.style.display = "none";
  }

  // Sugestão de DDD pelo GPS (não afeta scroll)
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`
      )
        .then((r) => r.json())
        .then((data) => {
          const estado = data.principalSubdivision;

          const mapaDDD = {
            "Espírito Santo": 27,
            "Rio de Janeiro": 21,
            "Minas Gerais": 31,
            "São Paulo": 11,
            "Bahia": 71,
            "Pernambuco": 81,
            "Santa Catarina": 48,
            "Paraná": 41
          };

          if (mapaDDD[estado] && !telefoneCampo.value.trim()) {
            telefoneCampo.value = `(${mapaDDD[estado]}) `;
          }
        })
        .catch(() => {});
    });
  }
}

/* ============================================
   TOAST NATURAL PREMIUM
============================================ */
function mostrarToast(texto) {
  const toast = document.getElementById("toast");
  const textoToast = document.getElementById("toast-text");
  if (!toast || !textoToast) return;

  textoToast.textContent = texto;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

/* ============================================
   FORMULÁRIOS
============================================ */
const formNews = document.getElementById("form-news");
const formContato = document.getElementById("form-contato");
const formReserva = document.getElementById("form-reserva");

if (formNews) {
  formNews.addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarToast("Inscrição realizada! Obrigado por assinar 🌿");
    formNews.reset();
  });
}

if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarToast("Mensagem enviada! Retornaremos em breve.");
    formContato.reset();
  });
}

if (formReserva) {
  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarToast("Reserva confirmada! Entraremos em contato 📞");
    modal.style.display = "none";
    formReserva.reset();
  });
}

/* ============================================
   MODO ESCURO
============================================ */
const toggleBtn = document.getElementById("toggle-darkmode");

if (toggleBtn) {
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
}

/* ============================================
   CONTADOR DE IMPACTO (IntersectionObserver)
============================================ */
const impactoNums = document.querySelectorAll(".impacto-num");
const secImpacto = document.getElementById("impacto");

if (secImpacto && impactoNums.length && "IntersectionObserver" in window) {
  const impactoObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          impactoNums.forEach((num) => {
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

          obs.unobserve(secImpacto);
        }
      });
    },
    { threshold: 0.3 }
  );

  impactoObserver.observe(secImpacto);
}

/* ============================================
   FAQ – abrir só 1 por vez
============================================ */
document.querySelectorAll(".faq details").forEach((det) => {
  det.addEventListener("toggle", () => {
    if (det.open) {
      document.querySelectorAll(".faq details").forEach((d) => {
        if (d !== det) d.open = false;
      });
    }
  });
});

/* ============================================
   SCROLL SUAVE PARA LINKS INTERNOS
   (menu + links de pacotes/destinos)
============================================ */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const destino = document.querySelector(this.getAttribute("href"));
    if (!destino) return;

    e.preventDefault();
    const offset = 80; // altura do header
    const posicao = destino.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: posicao,
      behavior: "smooth"
    });
  });
});

/* ============================================
   BARRA DE PROGRESSO DO SCROLL
============================================ */
window.addEventListener("scroll", () => {
  const top = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progresso = (top / height) * 100;
  const barra = document.getElementById("scroll-progress");
  if (barra) barra.style.width = progresso + "%";
});

/* ============================================
   HIGHLIGHT DO CARD ATIVO com IntersectionObserver
============================================ */
const cards = document.querySelectorAll(".destino, .pacote, .dif-card");

if (cards.length && "IntersectionObserver" in window) {
  const cardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-ativo");
        } else {
          entry.target.classList.remove("card-ativo");
        }
      });
    },
    { threshold: 0.55 }
  );

  cards.forEach((card) => cardsObserver.observe(card));
}
