//Armazenar a questão atual
// Esse é o stagio inicial da aplicação Porque o array começa do zero
let currentQuestion = 0;

let correctAnswers = 0;

// Array vazia do Nen
let classeNen = [];

// Executar a função
showQuestion();

//events
// Evento de resetar
document
  .querySelector('.hxhBlock__result button')
  .addEventListener('click', resetEvents);

// Função que mostra a questão
function showQuestion() {
  if (questions[currentQuestion]) {
    // Diminuição das variaveis acima
    let q = questions[currentQuestion]; //Ver as questões

    //Porcentagem
    let pct = Math.floor((currentQuestion / questions.length) * 100);
    document.querySelector('.hxhProgress__bar').style.width = `${pct}%`;

    // Esconder a Area de ponto
    document.querySelector('.hxhBlock__result').style.display = 'none';
    // Mostrar a Area de Questões
    document.querySelector('.hxhBlock__question h2').style.display = 'block';
    // Mostrar a questão
    document.querySelector('.hxhBlock__question h2').innerHTML = q.question;
    document.querySelector('.hxhBlock__option form ul').innerHTML = '';

    let optionsHtml = '';
    // Para cada pergunta vai chegar um valor unico
    for (let i in q.answer) {
      optionsHtml += `<li data-op="${q.answer[i]}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</li>`;
    }

    document.querySelector('.hxhBlock__option form ul').innerHTML = optionsHtml;

    document.querySelectorAll('.hxhBlock__option form ul li').forEach(item => {
      item.addEventListener('click', optionClickEvent);
    });
  } else {
    // Acabou as questões
    finishQuiz();
  }
}

function optionClickEvent(e) {
  // Traz a opção selecionada
  let clickedOption = e.target.getAttribute('data-op');

  classeNen.push(clickedOption);

  currentQuestion++;
  showQuestion();
}

// Esconder a area de questões e mostrar a area do resultado
function finishQuiz() {
  //CALCULAR PONTOS
  let cont = [];
  let total = 1;

  for (let i = 0; i < classeNen.length; i++) {
    if (i < classeNen.length - 1 && classeNen[i] == classeNen[i + 1]) {
      total++;
    } else {
      cont.push({ classe: classeNen[i], total: total });
      total = 1;
    }
  }

  for (let i = 0; i < cont.length; i++) {
    for (let j = i + 1; j < cont.length; j++) {
      if (cont[i].classe === cont[j].classe) {
        let result = cont[i].total + cont[j].total;
        cont[i].total = result;
        cont.splice(j, 1);
      }
    }
  }

  let comparativa = 0;
  let nome = '';

  for (let i = 0; i < cont.length; i++) {
    if (cont[i].total > comparativa) {
      comparativa = cont[i].total;
      nome = cont[i].classe;
      document.querySelector('.hxhBlock__result h1').innerHTML = nome;
      document.querySelector('.hxhBlock__result h6').style.color = '#FF0000';
    } else if (cont[i].total == comparativa) {
      nome = nome + ', ' + cont[i].classe;
      document.querySelector('.hxhBlock__result h1').innerHTML =
        'Você é um especialista com condições do Imperador Time';
      document.querySelector('.hxhBlock__result h6').style.color = '#FF0000';
    }
  }

//   document.querySelector(
//     '.hxhBlock__result--description'
//   ).innerHTML = `você respondeu ${questions.length} .`;
  // Mostrar a Area de ponto
  document.querySelector('.hxhBlock__result').style.display = 'block';
  // Esconder a Area de Questões
  document.querySelector('.hxhBlock').style.display = 'none';
  document.querySelector('.hxhProgress__bar').style.width = `100%`;
}

function resetEvents() {
  correctAnswers = 0;
  currentQuestion = 0;
  location.reload();
  showQuestion();
}
