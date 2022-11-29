// Choice whether he wants to hit or stand
const userChoiceDom = document.createElement('h1');
const userPoints = document.createElement('h2');
const cardsLeft = document.createElement('h2');
const cardPicked = document.createElement('h2');
const gameResultDom = document.createElement('h2');
const gameGrid = document.getElementById('game');
const userHand = document.createElement('strong');
let userHandArray = [];
gameGrid.append(userChoiceDom, userPoints, cardsLeft, cardPicked, gameResultDom, userHand);

let userScore = 0;

const choices = ['hit', 'stand', 'start/re-start'];


handleClick = (e) => {
    userChoice = e.target.id;
    userChoiceDom.innerHTML = `User choice: ${userChoice}`;
    if (userChoice === 'start/re-start') {
        gameRestart();
    }
    if (userChoice === 'hit') {
        gameResultDom.innerHTML = '';
        userHand.innerHTML = ``
        cardPick();
        userHandArray.forEach(card => {
            userHand.innerHTML += `|${card.name}|`;
        })
        cardsLeft.innerHTML = `Cards left: ${deckSize}`;
    }
    if(userChoice === 'stand'){
        gameResultDom.innerHTML = `You've got ${userScore} points. Better luck next time!`;
        document.getElementById('hit').style.display = "none";
        document.getElementById('stand').style.display = "none";
        userScore = 0;
        userHand.innerHTML = '';
    }
}

for (let i = 0; i < choices.length; i++) {
    const button = document.createElement('button');
    button.id = choices[i];
    button.innerHTML = choices[i];
    button.addEventListener('click', handleClick);
    gameGrid.appendChild(button);
}

document.getElementById('hit').style.display = "none";
document.getElementById('stand').style.display = "none";

let deck = [
    { name: 'ace', value: 11, amount: 4 },
    { name: 'two', value: 2, amount: 4 },
    { name: 'three', value: 3, amount: 4 },
    { name: 'four', value: 4, amount: 4 },
    { name: 'five', value: 5, amount: 4 },
    { name: 'six', value: 6, amount: 4 },
    { name: 'seven', value: 7, amount: 4 },
    { name: 'eight', value: 8, amount: 4 },
    { name: 'nine', value: 9, amount: 4 },
    { name: 'ten', value: 10, amount: 4 },
    { name: 'jack', value: 10, amount: 4 },
    { name: 'queen', value: 10, amount: 4 },
    { name: 'king', value: 10, amount: 4 },
];

resetDeck = () =>{
    deck = [
        { name: 'ace', value: 11, amount: 4 },
        { name: 'two', value: 2, amount: 4 },
        { name: 'three', value: 3, amount: 4 },
        { name: 'four', value: 4, amount: 4 },
        { name: 'five', value: 5, amount: 4 },
        { name: 'six', value: 6, amount: 4 },
        { name: 'seven', value: 7, amount: 4 },
        { name: 'eight', value: 8, amount: 4 },
        { name: 'nine', value: 9, amount: 4 },
        { name: 'ten', value: 10, amount: 4 },
        { name: 'jack', value: 10, amount: 4 },
        { name: 'queen', value: 10, amount: 4 },
        { name: 'king', value: 10, amount: 4 },
    ];
}

cardPick = () => {
    cardsCount();
    let cardIndex = Math.floor(Math.random() * deck.length)
    if (deck.length > 0 && deck[cardIndex].amount === 0) {
        deck.splice(cardIndex, 1);
        cardPick();
    }
    else if (deck.length > 0) {
        deck[cardIndex].amount -= 1;
        deckSize--;
        userHandArray.push(deck[cardIndex]);



        let handHasAce = false;
        userHandArray.forEach(card =>{
            if(card.name === "ace"){
                handHasAce = true;
            }
        })
        if(handHasAce){
            if(deck[cardIndex].name === "ace"){
                if(userScore < 10 || userScore + deck[cardIndex].value > 21){
                    console.log("Ace as 1 point");
                    userScore += 1;
                }
                else{
                    console.log("Ace as 11 points");
                    userScore += deck[cardIndex].value;
                }
            }
            else userScore += deck[cardIndex].value;
        }
        else userScore += deck[cardIndex].value;
        userPoints.innerHTML = `User points: ${userScore}`;
        if (userScore > 21) {
            gameResultDom.innerHTML = 'You lose!';
            document.getElementById('hit').style.display = "none";
            document.getElementById('stand').style.display = "none";
        }
        if (userScore === 21) {
            gameResultDom.innerHTML = 'You win!';
            document.getElementById('hit').style.display = "none";
            document.getElementById('stand').style.display = "none";
        }
    }
    else alert('No more cards in the deck');
}

let deckSize = 0;

drawUntilEmpty = () => {
    let card;
    while (deck.length > 0) {
        card = (cardPick());
        cardsCount();
    }
    alert('No more cards in the deck');
}

gameRestart = () => {
    userScore = 0;
    userHand.innerHTML = '';
    resetDeck();
    userHand.style.display = 'block';
    userHandArray = [];
    document.getElementById('hit').style.display = "inline-block";
    document.getElementById('stand').style.display = "inline-block";
    gameResultDom.innerHTML = ``;
    cardPick();
    cardPick();
    userHandArray.forEach(card => {
        userHand.innerHTML += `| ${card.name} |`;
    })
}

cardsCount = () => {
    deckSize = 0;
    deck.forEach(card => {
        deckSize += card.amount;
    })
}

// drawUntilEmpty();

