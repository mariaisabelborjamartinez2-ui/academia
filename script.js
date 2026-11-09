// ==========================================
// LINGUA PLUS - JAVASCRIPT
// Academia de idiomas
// ==========================================


// ==========================================
// 1. MENÚ RESPONSIVE
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("show");
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("show");
  });
});


// ==========================================
// 2. TEST DE NIVEL - 10 PREGUNTAS
// ==========================================

const questions = [
  {
    question: "1. Choose the correct option: I ___ a student.",
    answers: ["Am", "Is", "Are", "Be"],
    correct: 0
  },
  {
    question: "2. She ___ to school every day.",
    answers: ["Go", "Goes", "Going", "Gone"],
    correct: 1
  },
  {
    question: "3. What is the past tense of 'eat'?",
    answers: ["Eated", "Eating", "Ate", "Eats"],
    correct: 2
  },
  {
    question: "4. They have lived here ___ 2020.",
    answers: ["For", "Since", "During", "At"],
    correct: 1
  },
  {
    question: "5. If I had more money, I ___ travel.",
    answers: ["Will", "Would", "Can", "Am"],
    correct: 1
  },
  {
    question: "6. Choose the correct sentence.",
    answers: [
      "He don't like coffee.",
      "He doesn't likes coffee.",
      "He doesn't like coffee.",
      "He not like coffee."
    ],
    correct: 2
  },
  {
    question: "7. By the time we arrived, the movie ___.",
    answers: [
      "Already started",
      "Has already start",
      "Had already started",
      "Already starting"
    ],
    correct: 2
  },
  {
    question: "8. If she had studied harder, she ___ the exam.",
    answers: [
      "Would pass",
      "Would have passed",
      "Will pass",
      "Passed"
    ],
    correct: 1
  },
  {
    question: "9. The report ___ by the manager yesterday.",
    answers: [
      "Was written",
      "Wrote",
      "Has writing",
      "Is write"
    ],
    correct: 0
  },
  {
    question: "10. Choose the correct expression.",
    answers: [
      "Despite of the rain, we went out.",
      "Although the rain, we went out.",
      "Despite the rain, we went out.",
      "In spite the rain, we went out."
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionArea = document.getElementById("questionArea");
const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const nextButton = document.getElementById("nextQuestion");
const quizResult = document.getElementById("quizResult");
const quizCard = document.getElementById("quizCard");


// MOSTRAR PREGUNTA

function showQuestion() {

  const question = questions[currentQuestion];

  questionCounter.textContent =
    `Pregunta ${currentQuestion + 1} de ${questions.length}`;

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  progressPercent.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;

  questionArea.innerHTML = `
    <h3 class="question-title">${question.question}</h3>

    <div class="answers">
      ${question.answers.map((answer, index) => `
        <label class="answer-option">
          <input
            type="radio"
            name="answer"
            value="${index}"
          >
          <span>${answer}</span>
        </label>
      `).join("")}
    </div>
  `;

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "Ver mi resultado"
      : "Siguiente pregunta →";

  nextButton.disabled = true;
}


// ACTIVAR BOTÓN AL SELECCIONAR RESPUESTA

questionArea.addEventListener("change", event => {

  if (event.target.matches('input[name="answer"]')) {
    nextButton.disabled = false;
  }

});


// SIGUIENTE PREGUNTA Y CÁLCULO

nextButton.addEventListener("click", () => {

  const selected = document.querySelector(
    'input[name="answer"]:checked'
  );

  if (!selected) {
    alert("Selecciona una respuesta para continuar.");
    return;
  }

  const answer = Number(selected.value);

  if (answer === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {

    showQuestion();

  } else {

    showResult();

  }

});


// RESULTADO PERSONALIZADO

function showResult() {

  quizCard.style.display = "none";

  let level;
  let message;
  let recommendation;

  if (score <= 4) {

    level = "BÁSICO";

    message = "¡Excelente comienzo! Tienes una buena oportunidad para construir tus conocimientos desde las bases.";

    recommendation = "Te recomendamos comenzar con nuestro curso de Inglés Inicial.";

  } else if (score <= 7) {

    level = "INTERMEDIO";

    message = "¡Muy bien! Tienes conocimientos importantes y puedes seguir desarrollando tus habilidades.";

    recommendation = "Te recomendamos nuestro curso de Inglés Comunicativo.";

  } else {

    level = "AVANZADO";

    message = "¡Excelente trabajo! Demuestras un buen dominio de las estructuras del inglés.";

    recommendation = "Te recomendamos nuestro curso de Inglés Profesional.";

  }

  quizResult.innerHTML = `
    <div class="result-content">
      <h3>¡Tu resultado está listo! 🎓</h3>

      <div class="result-score">${score}/10</div>

      <h2>Nivel ${level}</h2>

      <p>${message}</p>

      <p><strong>${recommendation}</strong></p>

      <p>Recuerda que este test es orientativo y no reemplaza una evaluación académica completa.</p>

      <a href="#inscripcion" class="btn btn-primary">
        Quiero inscribirme
      </a>

      <br><br>

      <button type="button" class="btn btn-outline restart-btn" id="restartQuiz">
        Repetir test
      </button>
    </div>
  `;

  quizResult.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  document.getElementById("restartQuiz").addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    quizResult.innerHTML = "";
    quizCard.style.display = "block";

    showQuestion();

    quizCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  });

}

showQuestion();


// ==========================================
// 3. ACORDEÓN DE PREGUNTAS FRECUENTES
// ==========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  button.addEventListener("click", () => {

    const wasOpen = item.classList.contains("open");

    faqItems.forEach(otherItem => {

      otherItem.classList.remove("open");

      otherItem.querySelector(".faq-answer").style.maxHeight = null;

    });

    if (!wasOpen) {

      item.classList.add("open");

      answer.style.maxHeight = answer.scrollHeight + "px";

    }

  });

});


// ==========================================
// 4. VALIDACIÓN DEL FORMULARIO
// ==========================================

const enrollmentForm = document.getElementById("enrollmentForm");

const enrollmentMessage = document.getElementById("enrollmentMessage");

enrollmentForm.addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();

  const email = document.getElementById("studentEmail").value.trim();

  const phone = document.getElementById("studentPhone").value.trim();

  const language = document.getElementById("studentLanguage").value;

  const level = document.getElementById("studentLevel").value;

  const accepted = document.getElementById("acceptTerms").checked;


  // VALIDAR NOMBRE

  const nameRegex = /^[\p{L}\s'-]{3,70}$/u;

  if (!nameRegex.test(name)) {

    alert("Escribe un nombre válido de al menos 3 caracteres.");

    return;

  }


  // VALIDAR CORREO ELECTRÓNICO

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(email)) {

    alert("Ingresa un correo electrónico válido.");

    return;

  }


  // VALIDAR TELÉFONO COLOMBIANO

  const phoneRegex = /^(?:\+57\s?)?3\d{9}$/;

  const cleanPhone = phone.replace(/[\s-]/g, "");

  if (!phoneRegex.test(cleanPhone)) {

    alert("Ingresa un número celular colombiano válido de 10 dígitos.");

    return;

  }


  // VALIDAR IDIOMA Y NIVEL

  if (!language || !level) {

    alert("Selecciona el idioma y tu nivel de conocimiento.");

    return;

  }


  // VALIDAR ACEPTACIÓN

  if (!accepted) {

    alert("Debes aceptar que la academia se comunique contigo.");

    return;

  }


  // MOSTRAR CONFIRMACIÓN

  enrollmentMessage.innerHTML = `
    <h3>¡Preinscripción preparada correctamente! 🎓</h3>

    <p><strong>Nombre:</strong> ${escapeHTML(name)}</p>
    <p><strong>Correo:</strong> ${escapeHTML(email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHTML(phone)}</p>
    <p><strong>Idioma:</strong> ${escapeHTML(language)}</p>
    <p><strong>Nivel:</strong> ${escapeHTML(level)}</p>

    <p>Gracias por confiar en Lingua Plus.</p>

    <a
      href="https://wa.me/573126020219?text=${encodeURIComponent(
        "Hola, quiero realizar mi preinscripción en Lingua Plus.\n\n" +
        "Nombre: " + name + "\n" +
        "Correo: " + email + "\n" +
        "Teléfono: " + phone + "\n" +
        "Idioma: " + language + "\n" +
        "Nivel: " + level
      )}"
      target="_blank"
      rel="noopener"
      class="btn btn-primary"
    >
      Enviar datos por WhatsApp
    </a>
  `;

  enrollmentMessage.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

});


// PROTEGER LOS DATOS MOSTRADOS EN HTML

function escapeHTML(value) {

  return value.replace(/[&<>"']/g, character => ({

    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"

  })[character]);

}