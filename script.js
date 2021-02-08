import Deck from "./deck.js";
const arrow = document.querySelector(".warArrow");
const warTable = document.querySelector("#warTable");
arrow.addEventListener("click", () => {
  warTable.classList.remove("invisible");
  warTable.classList.add("visible");
});
const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const playerDeckElement = document.querySelector(".player-deck");
const computerDeckElement = document.querySelector(".computer-deck");
const result = document.querySelector(".result");
const cardValueMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  2: 2,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};
const isGameOver = deck => {
  return deck.numberOfCards === 0;
};
const updateDeckCount = () => {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
};
const isRoundWinner = (cardOne, cardTwo) => {
  return cardValueMap[cardOne.value] > cardValueMap[cardTwo.value];
};
const flipCards = () => {
  inRound = true;
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();
  computerCardSlot.appendChild(computerCard.getHTML());
  playerCardSlot.appendChild(playerCard.getHTML());

  if (isRoundWinner(playerCard, computerCard)) {
    result.innerText = "Bravo !";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    result.innerText = "Dommage !";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    result.innerText = "Egalité !";
  }
  if (isGameOver(playerDeck)) {
    result.innerText = "Vous avez perdu !";
    stop = true;
  } else if (isGameOver(computerDeck)) {
    result.innerText = "Vous avez gagné !";
    stop = true;
  }
};
const cleanBeforeRound = () => {
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  result.innnerText = "";
  updateDeckCount();
  inRound = false;
};
let playerDeck, computerDeck, inRound, stop;

const startGame = () => {
  result.innerText = "";
  const deck = new Deck();
  deck.shuffle();
  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  computerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  playerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;
  cleanBeforeRound();
  const play = document.querySelector(".play");
  const playBtn = document.createElement("button");
  play.appendChild(playBtn);
  playBtn.innerText = "Jouer";
  playBtn.addEventListener("click", () => {
    if (stop) {
      updateDeckCount();
      const btnRestart = () => {
        const btn = document.createElement("button");
        playBtn.remove();
        play.appendChild(btn);
        btn.classList.add("restart");
        btn.innerText = "Recommencer";
        btn.width = "70";
        btn.height = "30";
        btn.addEventListener("click", () => {
          btn.remove();
          startGame();
        });
      };
      btnRestart();
      return;
    }

    if (inRound) {
      cleanBeforeRound();
      result.innerText = "";
    } else {
      flipCards();
    }
  });
};

startGame();
