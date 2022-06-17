"use strict";

function addMonths(elem) {
	var annualUseKw = 0;
	var dailyUseKw = 0;
    var i = 0;
    var x = 0;
	var months = document.getElementById(elem).getElementsByTagName("input");

	for (let i = 0; i < months.length; i++){
        x += Number(months[i].value);
        annualUseKw += x;
    } 

	dailyUseKw = annualUseKw/365;
	return dailyUseKw;
};

function sunHours() {
	var hrs;
	var theZone = document.forms.solarForm.zone.selectedIndex;
	theZone += 1;

	switch (theZone) {
		case 1:
			hrs = 6;
			break;
		case 2:
			hrs = 5.5;
			break;
		case 3:
			hrs = 5;
			break;
		case 4:
			hrs = 4.5;
			break;
		case 5:
			hrs = 4.2;
			break;
		case 6:
			hrs = 3.5;
			break;
		default:
			hrs = 0;
	}
	return hrs;
}


function calculatePanel() {
	var userChoice = document.forms.solarForm.panel.selectedIndex;
	var panelOptions = document.forms.solarForm.panel.options;
	var power = panelOptions[userChoice].value;
	var name = panelOptions[userChoice].text;
	var x = [power, name];
	return x;
};

function calculateSolar() {
	const dailyUseKw = addMonths("mpc");
	console.log(dailyUseKw);
    
	let sunHoursPerDay = sunHours();
	console.log(sunHoursPerDay);

	var minKwNeeds = dailyUseKw/sunHoursPerDay;
	console.log(minKwNeeds);

	var realKwNeeds = minKwNeeds*1.25;
	console.log(realKwNeeds);

	var realWattNeeds = realKwNeeds*1000;
	console.log(realWattNeeds);

	var panelInfo = calculatePanel();
	var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];

	var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
	console.log(panelsNeeded);

    var feedback = "";
	feedback += "<p>Based on your average daily use of "+ Math.round(dailyUseKw) + " KWh, you will need to purchase "+ panelsNeeded +" "+ panelName +" solar panels to offset 100% of your electricty bill.";
    feedback += "<h2>Additonal Details</h2>";
    feedback += "<p>Your average daily electricity consumption: "+Math.round(dailyUseKw)+" Kwh per day.</p>"
    feedback += "<p>Average sunshine hours per day: "+sunHoursPerDay+" </p>";
    feedback += "<p>Realistic watts needed per hours: "+Math.round(realWattNeeds)+" watts/hour</p>";
    feedback += "<p>The "+panelName+"panel you selected generates about "+panelOutput+" watts per hour</p>";
    document.getElementById("feedback").innerHTML=feedback;
};

