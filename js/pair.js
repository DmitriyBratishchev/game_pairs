
(function() {
  // 'use strict'

  let pairs = [];
  let card1;
  let card2;

  function getArrayPairs(num) {
    const pair = []
    for (let i = 0; i < num / 2; i++) {
      pair.push(i + 1)
      pair.push(i + 1)
    }
    return pair;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  const createCard = (el, id) => {
    const cardSize = (600 / 4) - 4;
    const element = document.createElement('div');

    element.id = `${id}`;
    element.className = 'card'
    element.style.width = cardSize + "px";
    element.style.height = cardSize + "px";
    element.style.lineHeight = cardSize + "px";
    element.style.fontSize = cardSize / 1.5 + "px";
    element.addEventListener('click', clickedCard)
    // строчка для отладки (делает карточки открытыми)
    // element.textContent = `${el}`;

    return element;
  }

  function showCard(el) {
    el.innerText = `${pairs[el.id]}`
    el.style.backgroundColor = '#ff9900'
  }

  function closeCard(el) {
    el.innerText = ''
    el.style.backgroundColor = '#666666'
  }

  function correctlyCard(el) {
    el.removeEventListener('click', clickedCard)
    el.style.backgroundColor = 'green'
  }

  function compareCards() {
    if (pairs[card1.id] === pairs[card2.id]) {
      correctlyCard(card1)
      correctlyCard(card2)
    } else {
      closeCard(card1)
      closeCard(card2)
    }
    card1 = null;
    card2 = null;
  }

  function clickedCard({ target }) {
    const el = target
    if (!card1) {
      card1 = el
      showCard(el)
    } else {
      card2 = el
      showCard(el)
      setTimeout(() => compareCards(), 500)
    }
  }

  function startPair(numberCardsOfSideBoard = 4) {
    const board = document.querySelector('.pair-board');

    if (board.childElementCount) {
      if (confirm("Вы действительно хотите начать заново?")) {
        while (board.childElementCount) {
          board.removeChild(board.firstChild)
        };
        pairs = []
      } else {
        return
      }
    };

    pairs = shuffle(getArrayPairs(numberCardsOfSideBoard ** 2));
    const cards = pairs.map((el, index) => createCard(el, index))
    board.append(...cards)
  }

  document.addEventListener('DOMContentLoaded', startPair())

  window.startPair = startPair;
})();
