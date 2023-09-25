const mesa = document.getElementById('mesa');

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

function adicionaCarta(cor, imagem){
    const carta = document.createElement('div');
    carta.className = 'espaco-carta';
    carta.innerHTML = `
        <div class="carta" onclick="virarCarta(event)" tipo="${cor}">
            <div class="carta-back"></div>
            <div class="carta-front" style="background-color: ${cor} ; background-image: url(../images/${imagem}.png);"></div>
        </div>
    `;
    mesa.appendChild(carta);
}


function criarCartas(){
    var cartasDuplicadas = [...cartas, ...cartas];
    const cartasMisturadas = cartasDuplicadas.sort(() => Math.random() - 0.5);

    cartasMisturadas.forEach(function(element) {
      let cor = element[0];
      let imagem = element[1];

      adicionaCarta(cor, imagem);
    })
}



let primeiraCarta = '';
let segundaCarta = '';


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
    verificarPar();
  }
}



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


function fimdoJogo() {
  const cartasViradas = document.querySelectorAll('.carta-virada');
  if (cartasViradas.length === 16) {
      alert("O jogo terminou");
  }
}

criarCartas();







