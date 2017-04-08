$(document).ready(function() {

function card(value, name, suit){
  this.value = value;
  this.name = name;
  this.suit = suit;
}

function deck(){
  this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];

  var cards = [];

  for(var s=0; s < this.suits.length; s++){
    for( var x=0; x < this.names.length; x++){
      cards.push( new card(x+1, this.names[x], this.suits[s]));
    }
  }

  return cards;
}

function openingValue(card){
  if(card.name === "J" ||card.name === "Q"|| card.name === "K" ){
    return parseInt(10);
  }else if(card.name === "A"){
    return parseInt(11);
  }else{
    return parseInt(card.name);
  }
}

function isAce(card) {
  if(card.name === "A"){
    return true;
  }else{
    return false;
  }
}

function score(hand){
  var score = 0;
  var aces = [];
  var aceCount = 0;

  for(counter=0; counter < hand.length; counter++){
      if(isAce(hand[counter])){ aceCount++;}
  };

  if(hand.length < 3){
    score = openingValue(hand[0]) + openingValue(hand[1]);
  }else{
    for(var i = 0; i < hand.length; i++){
      score = score + openingValue(hand[i]);
    }
      if(aceCount > 0 && score > 21){ score -= aceCount *10};
  }
  return score;
}

var myDeck = new deck();
console.log(myDeck);

var dealerHand = new Array();
var playerHand = new Array();

document.getElementById("deal").disabled = false;
document.getElementById("hit").disabled = true;
document.getElementById("stay").disabled = true;

$("button#deal").click(function () {
  document.getElementById("hit").disabled = false;
  document.getElementById("stay").disabled = false;

  var hitCount = 0;

  firstCard = myDeck[myDeck.length - 1];
  myDeck.pop();
  secondCard = myDeck[myDeck.length - 1];
  myDeck.pop();
  thirdCard = myDeck[myDeck.length - 1];
  myDeck.pop();
  fourthCard = myDeck[myDeck.length - 1];
  myDeck.pop();

  dealerHand = [firstCard, thirdCard];
  playerHand = [secondCard, fourthCard];

  $("#dealerCards").html("<div class=\"card\"> " + dealerHand[0].name + dealerHand[0].suit + "</div>");
  $("#dealerCards").append("<div class=\"card\">  HIDDEN </div>");

  $("#playerCards").html("<div class=\"card\"> " + playerHand[0].name + playerHand[0].suit + "</div>");
  $("#playerCards").append("<div class=\"card\"> " + playerHand[1].name + playerHand[1].suit + "</div>");


  $("#textBar").html("You score is " + score(playerHand) + ". Would you like to hit or stay?");
});

$("button#hit").click(function () {
  nextCard = myDeck[myDeck.length - 1];
  myDeck.pop();

  playerHand.push(nextCard);
  $("#playerCards").append("<div class=\"card\"> " + playerHand[playerHand.length - 1].name + playerHand[playerHand.length - 1].suit + "</div");

  if(score(playerHand) <= 21){
    $("#textBar").html("Your score is " + score(playerHand) + ". Would you like to hit or stay?");
  }else if(score(playerHand) > 21){
    $("#textBar").html("Your score is " + score(playerHand) + ", you bust!");
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
  }

});

$("button#stay").click(function () {
  document.getElementById("hit").disabled = true;
  document.getElementById("stay").disabled = true;

  $("#dealerCards").html("<div class=\"card\"> " + dealerHand[0].name + dealerHand[0].suit + "</div");
  $("#dealerCards").append("<div class=\"card\"> " + dealerHand[1].name + dealerHand[1].suit + "</div");

  dealerScore = openingValue(dealerHand[0]) + openingValue(dealerHand[1]);

})

});
