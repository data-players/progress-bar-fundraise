// DOM Elements
const circles = document.querySelectorAll(".circle"),
progressBar0 = document.querySelector(".progress-bar.step0 .indicator"),
progressBar1 = document.querySelector(".progress-bar.step1 .indicator"),
progressBar2 = document.querySelector(".progress-bar.step2 .indicator"),

buttons = document.querySelectorAll("button");

//  variables
let currentStep = 0;
let ttlInvestment = 0;

// grappe api to retrieve the ttl investment made
const apiParticipationTitles = "https://grappe.io/data/api/654a566e8ee5dff40e3348d1-investment-ttl";
const apiShares = "https://grappe.io/data/api/654b9bf98ee5dff40e3366ad-investment-ttl-shares";

// retrieves the value of the investment made 
async function getApiValue(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

// gets the 2 values given by the api and adds them
async function getFinalValue(){
    const participationTitlesValue = await getApiValue(apiParticipationTitles);
    const sharesValue = await getApiValue(apiShares);
    if(participationTitlesValue){
        ttlInvestment += parseInt(participationTitlesValue);
        // console.log("participationTitlesValue : "+participationTitlesValue);
    }
    if(sharesValue){
        ttlInvestment += parseInt(sharesValue);
        // console.log("sharesValue : "+sharesValue);
    }
    // console.log("ttlinvestement : "+ttlInvestment);
    return ttlInvestment;
}

getFinalValue().then(data => {
    // console.log("final value : ",parseInt(data));
    ttlInvestment = parseInt(data);

   if(ttlInvestment >= 30000){
    currentStep = 3;
    const progressBarWidth2 = (((ttlInvestment - 30000) * 100) / 10000) + 100;
    // console.log("progressBarWidth : "+progressBarWidth2);
    progressBar0.style.width = "100%";
    progressBar1.style.width = "100%";
    progressBar2.style.width = "100%";
    progressBar2.style.width = `${progressBarWidth2}%`;
   } else if(ttlInvestment >= 20000){
    currentStep = 2;
    const progressBarWidth1 = ((ttlInvestment - 20000) * 100) / 10000;
    // console.log("progressBarWidth : "+progressBarWidth1);
    progressBar0.style.width = "100%";
    progressBar1.style.width = "100%";
    progressBar2.style.width = `${progressBarWidth1}%`;
   } else if(ttlInvestment >= 10000){
    currentStep = 1;
    const progressBarWidth0 = ((ttlInvestment - 10000) * 100) / 10000;
    // console.log("progressBarWidth : "+progressBarWidth0);
    progressBar0.style.width = "100%";
    progressBar1.style.width = `${progressBarWidth0}%`;
   } else if(ttlInvestment >= 0){
    const progressBarWidth0 = (ttlInvestment * 100) / 10000;
    // console.log("progressBarWidth : "+progressBarWidth0);
    progressBar0.style.width = `${progressBarWidth0}%`;
   }

    // console.log("currentstep : ",currentStep);

    circles.forEach((circle, index) => {
        // console.log('index : ',index);
        // console.log('circle : ',circle);
        circle.classList[`${index <= currentStep ? "add" : "remove"}`]("active");
    });

});