var slide=1;

$(document).ready(function (){
	setInterval(updateCounter, 1000);
});

function updateCounter() {
	console.info("teste 123");
	var current=$("#counter-ticker").text();
	var newValue="";

	// next slide
	if (current == "0"){		
		newValue="15";
		slide++;
	} else {	
		newValue=current-1;
	}

	$("#slideNumber").text(slide);
	$("#counter-ticker").text(newValue);
}

