// Array de cartas utilizadas no jogo, com a cor de fundo e o nome da imagem
let cartas = [
    ['red', 'chris'],
    ['black', 'javascript'],
    ['blue', 'ifam'],
    ['Lime', 'faepi'],
    ['purple', 'sansung'],
    ['yellow', 'pc'],
    ['green', 'dev'],
    ['gray', 'aranoua']
];

//Função responsavel pela criação da mesa onde vão ficar as cartas
function criarMesa(){
  tentativas = 0;
  const mesa = document.createElement('main');
  mesa.innerHTML = `
  <div class="mesa" id="mesa"></div>
  `;

  document.body.appendChild(mesa);
}


// Essa função vai criando carta a carta
function adicionaCarta(cor, imagem){
    const carta = document.createElement('div');
    carta.className = 'espaco-carta';
    carta.innerHTML = `
        <div class="carta" onclick="virarCarta(event)" tipo="${imagem}">
            <div class="carta-back"></div>
            <div class="carta-front" style="background-color: ${cor} ; background-image: url(images/${imagem}.png);"></div>
        </div>
    `;
    mesa.appendChild(carta);
}


//Essa função é responsavel por randomizar as cartas, e definir a quantidade passando esses dados para função "adicionarCarta()" criar as cartas.
function criarCartas(){
    criarMesa()
    var cartasDuplicadas = [...cartas, ...cartas];
    const cartasMisturadas = cartasDuplicadas.sort(() => Math.random() - 0.5);

    cartasMisturadas.forEach(function(element) {
      let cor = element[0];
      let imagem = element[1];

      adicionaCarta(cor, imagem);
    })

    const conteudo = document.querySelectorAll('.telaMensagem')
    conteudo.forEach(node =>{
      node.parentNode.removeChild(node)
    })
}

let primeiraCarta = '';
let segundaCarta = '';
let tentativas = 0;


//Essa função é responsavel por virar as cartas e carregar as variaveis "primeiraCarta" e "segundaCarta"
function virarCarta(event) {
  const target = event.target;

  if (target.parentNode.className.includes('carta-virada')) {
    return;
  } else if (primeiraCarta === '') {
    target.parentNode.classList.add('carta-virada');
    primeiraCarta = target.parentNode;
  } else if (segundaCarta === '') {
    target.parentNode.classList.add('carta-virada');
    segundaCarta = target.parentNode;
    tentativas += 1;
    verificarPar();
  }
}


//Apos 2 cartas serem viradas, essa função é reponsavel por verificar se elas são iguais ou não e manter viradas ou desvirar as cartas
function verificarPar()
{
    if (primeiraCarta.getAttribute('tipo') === segundaCarta.getAttribute('tipo')){
      const cartasViradas = document.querySelectorAll('.carta-virada');
      cartasViradas.forEach(function(cartaVirada) {
        cartaVirada.parentNode.classList.add('carta-com-par');
      });

      primeiraCarta = '';
      segundaCarta = '';
      fimdoJogo();
    } else {
      setTimeout(() => {
        primeiraCarta.classList.remove('carta-virada');
        segundaCarta.classList.remove('carta-virada');

        primeiraCarta = '';
        segundaCarta = '';
      }, 1000);
    }
}


//Essa função faz a verificação de fim de jogo usando o "querySelectorAll" para saber se todas as cartas ja foram viradas
function fimdoJogo() {
  const cartasViradas = document.querySelectorAll('.carta-virada');
  if (cartasViradas.length === 16) {
    telaFim()
  }
}

//Essa função cria uma pequena tela inicial com botão para iniciar o jogo
function telaPrincipal(){
  const tela = document.createElement('div');
    tela.className = 'telaMensagem';
    tela.innerHTML = `
        <h5>
          JOGO DA MEMÓRIA
        </h5>

        <p>
          Jogo da memória criado por alunos do curso FIC como proposta de projeto, Click Iniciar para jogar uma partida...
        </p>
        <button onclick="criarCartas()"type="button"> INICIAR </button>
    `;

    document.body.appendChild(tela);
}


//Essa é uma função que vai destruir elementos do jogo ja concluido e chamar a tela inicial novamente.
function voltaInicio(){
  let main = document.querySelector('main')
  main.parentNode.removeChild(main)

  telaPrincipal()
}



//Função para criar uma tela de finalização com um botão para reiniciar o jogo e mostrar uma mensagem com quantidade de tentativas
function telaFim(){
  const tela = document.createElement('div');
    tela.className = 'telaMensagem';
    tela.innerHTML = `
        <h5>
          JOGO DA MEMÓRIA
        </h5>

        <p>
          Parabens Voce concluil uma partida com ${tentativas} Tentativas
        </p>
        <button onclick="voltaInicio()"type="button"> TENTAR DE NOVO </button>
    `;

    document.body.appendChild(tela);
}



telaPrincipal()







