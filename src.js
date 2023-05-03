'use strict';

// Modal de Bienvenida
const botonModal = document.querySelector('#cerrarMB');

botonModal.addEventListener('click', () => {
  const modalBienve = document.querySelector('#modalBienve');
  modalBienve.style.display = 'none';
});

//Seleccionar nodos

const cards = document.querySelectorAll('.card');

//Crear variables de dos cartas con valor null(sin valor) para no
//representar ninguna carta en particular

let firstCard = null;
let secondCard = null;

//Contador de intentos y maximo de intentos

let count = 0; //puntuacion final

//Mostrador de contador de intentos en la pagina

const counter = document.querySelector('#counter'); //nº actual de intentos(pantalla)
counter.textContent = `Intentos: ${count}`;

//Definimos variables para contar aciertos

let matches = 0;

// Definimos Función reveal
let canClick = true; //Variable para bloquear opción de clic

const reveal = (e) => {
  console.log('Click en una carta', canClick);
  if (!canClick) return;

  const currentCard = e.currentTarget;

  // Verificar que currentCard no sea la misma que firstCard
  if (currentCard === firstCard) return;

  currentCard.classList.add('flipped');

  if (!firstCard) {
    firstCard = currentCard;
    count--;
  } else {
    secondCard = currentCard;
    count++;
    counter.textContent = `Intentos: ${count}`;
  }

  if (firstCard && secondCard) {
    const firstEmoji = firstCard.querySelector('.back').textContent;
    const secondEmoji = secondCard.querySelector('.back').textContent;

    if (firstEmoji === secondEmoji) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      firstCard.removeEventListener('click', reveal);
      secondCard.removeEventListener('click', reveal);

      firstCard = null;
      secondCard = null;
    } else {
      canClick = false;

      setTimeout(() => {
        if (firstCard) firstCard.classList.remove('flipped');
        if (secondCard) secondCard.classList.remove('flipped');
        firstCard = null;
        secondCard = null;

        canClick = true;
      }, 1000);
    }

    count++;
    counter.textContent = `Intentos: ${count}`;
  }

  const matchedCards = document.querySelectorAll('.matched');
  if (matchedCards.length === 16) {
    counter.textContent = `¡Juego completado en ${count} intentos!`;
  }
};

const matchedCards = document.querySelectorAll('.matched');

if (matchedCards.length === cards.length) {
  for (const card of cards) {
    card.removeEventListener('click', reveal);
  }
}

const emojis = [
  '👻',
  '🤖',
  '👽',
  '👾',
  '👩‍🚀',
  '☄️',
  '🚀',
  '🦾',
  '👻',
  '🤖',
  '👽',
  '👾',
  '👩‍🚀',
  '☄️',
  '🚀',
  '🦾',
];

const randomEmojis = emojis.sort(() => Math.random() - 0.5);

for (let i = 0; i < cards.length; i++) {
  cards[i].querySelector('.back').innerHTML = randomEmojis[i];
}

for (const card of cards) {
  card.addEventListener('click', reveal);
}

//Resetear Juego

function resetGame() {
  // Ocultar todos los emojis
  for (const card of cards) {
    card.classList.remove('flipped');

    card.classList.remove('matched');
    card.addEventListener('click', reveal);
  }

  setTimeout(() => {
    // Volver a mezclar los emojis
    const randomEmojis = emojis.sort(() => Math.random() - 0.5);
    for (let i = 0; i < cards.length; i++) {
      cards[i].querySelector('.back').innerHTML = randomEmojis[i];
    }
  }, 1000);

  // Reiniciar variables
  firstCard = null;
  secondCard = null;
  count = 0;
  matches = 0; // Reiniciar variable de matches a 0
  counter.textContent = `Intentos: ${count}`;
}

const resetButton = document.querySelector('.botonReinicio');
resetButton.addEventListener('click', resetGame);
