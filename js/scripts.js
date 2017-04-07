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

var myDeck = new deck();
console.log(myDeck);

});
