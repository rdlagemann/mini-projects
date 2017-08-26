var MAX_TURNS = 20,
	currentSeq = [],
	colors,
	startButton;

$(document).ready(function(){

	colors = Array.from(document.querySelectorAll('.simon'));
	console.log(colors);

	startButton = $("#startButton");

	startButton.click(function(e){
		e.preventDefault();
		e.stopPropagation();
		
		$(this).prop("disabled", true);
		
		currentSeq.push(Math.floor(Math.random() * 4)); //between 0 and 3

		let last,
			intervalID,
			i = 0;

		intervalID = setInterval(function(){
			
			if(last !== undefined){
				last.classList.remove("on");
				last.classList.add("off");
			}


			last = colors[currentSeq[i]];
			setTimeout(function(){
				if(last !== undefined){
					last.classList.remove("off");		
					last.classList.add("on");
				}
				i++;
				
			},200);

			if(i >= currentSeq.length-1){
				setTimeout(function(){
					if(last !== undefined){
						last.classList.remove("on");
						last.classList.add("off");	
					}
					last = undefined;	
					i = 0;
					startButton.prop("disabled", false);
					clearInterval(intervalID);

				}, 900);
				

			}
		}, 1000);

	});




});

