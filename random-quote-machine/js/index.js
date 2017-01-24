$(document).ready(function(){
  setTweetText();
  
});

var lastRand = -1;

 var quotes = 
 [
	 {
	 	quote: "Be yourself. Everyone else is already taken.",
	 	author: "Oscar Wilde"
	 },
	 {
	 	quote: "So many books, so little time.",
	 	author: "Frank Zappa"
 	},
 	{
 		quote: "You only live once, but if you do it right, once is enough.",
 		author: "Mae West"
 	},
   {
     quote: "Let no man pull you low enough to hate him.",
     author:"Martin Luther King Jr"
   },
  {
     quote: "A journey of a thousand miles begins with a single step.",
     author:"Lao-tzu"
   },
   {
     quote: "Education is the best provision for the journey to old age.",
     author:"Aristotle"
   },
   {
     quote: "Always be wary of any helpful item that weighs less than its operating manual.",
     author: "Terry Pratchett"
   }
 ];

function generateQuote()
{  
	var randIndex = Math.floor(Math.random()*(quotes.length));
	if(randIndex == lastRand)
	{
		randIndex = (randIndex + 1)%quotes.length;
	}
	document.getElementById("quote").innerHTML = quotes[randIndex].quote;
	document.getElementById("author").innerHTML = "- " + quotes[randIndex].author;
  
	lastRand = randIndex;
  
  setTweetText();
}



function setTweetText()
{
  var tweetIntentSource = "https://twitter.com/intent/tweet?text=";
  
  var text = document.getElementById("quote").innerHTML;
 
  var writer = document.getElementById("author").innerHTML;
  
document.getElementById("twitter-button").href =  tweetIntentSource + text + writer + "&via=freeCodeCamp";
}