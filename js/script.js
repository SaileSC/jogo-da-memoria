const mesa = document.getElementById('mesa');

let cartas = [
    'red',
    'black',
    'blue',
    'white',
    'purple',
    'yellow',
    'green',
    'gray'
];

function adicionaCarta(cor){
    const carta = document.createElement('div');
    carta.className = 'espaco-carta';
    carta.innerHTML = `
        <div class="carta" onclick="virarCarta(event)" tipo="${cor}">
            <div class="carta-back"></div>
            <div class="carta-front" style="background-color: ${cor}"></div>
        </div>
    `;
    mesa.appendChild(carta);
}

function criarCartas(){
    var cartasDuplicadas = [...cartas, ...cartas];
    const cartasMisturadas = cartasDuplicadas.sort(() => Math.random() - 0.5);

    cartasMisturadas.forEach(carta => {
      adicionaCarta(carta);
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
    console.log("uma carta esta virada!")
  } else if (segundaCarta === '') {
    target.parentNode.classList.add('carta-virada');
    segundaCarta = target.parentNode;
    verificarPar();
  }
}



function verificarPar()
{
    if (primeiraCarta.getAttribute('tipo') === segundaCarta.getAttribute('tipo')) 
    {
      primeiraCarta.classList.add('carta-com-par');
      segundaCarta.classList.add('carta-com-par');
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







