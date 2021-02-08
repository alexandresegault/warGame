const suits = ["♥", "♦", "♠", "♣"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
];

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }
  getHTML() {
    const cardDiv = document.createElement("div");
    cardDiv.innerText = this.suit;
    cardDiv.classList.add("card", this.color);
    cardDiv.dataset.value = `${this.value}`;
    return cardDiv;
  }
}

const FreshDeck = () => {
  return suits.flatMap(suit => {
    return values.map(value => {
      return new Card(suit, value);
    });
  });
};
export default class Deck {
  constructor(cards = FreshDeck()) {
    this.cards = cards;
  }
  get numberOfCards() {
    return this.cards.length;
  }
  pop() {
    return this.cards.shift();
  }
  push(card) {
    this.cards.push(card);
  }
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}
