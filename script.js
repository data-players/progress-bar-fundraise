// DOM Elements
const circles = document.querySelectorAll(".circle"),
progressBar = document.querySelector(".indicator"),
buttons = document.querySelectorAll("button");

//  variables
let currentStep = 0;
let ttlInvestment = 0;

// grappe api to retrieve the ttl investment made
const apiUrl = "https://grappe.io/data/api/654a566e8ee5dff40e3348d1-investment-ttl";

// retrieves the value of the ttl investment made 
async function getValueInvestment() {
    let response = await fetch(apiUrl);
    let data = await response.json();
    return data;
}

getValueInvestment().then(data => {
    console.log(parseInt(data));
    ttlInvestment = 5000;
    console.log("ttlinvestement : "+ttlInvestment);

   if(ttlInvestment >= 30000){
    currentStep = 3;
   } else if(ttlInvestment >= 20000){
    currentStep = 2;
   } else if(ttlInvestment >= 10000){
    currentStep = 1;
   }

    console.log("currentstep : ",currentStep);

    circles.forEach((circle, index) => {
        console.log('index : ',index);
        console.log('circle : ',circle);
        circle.classList[`${index <= currentStep ? "add" : "remove"}`]("active");
    });


    const progressBarWidth = (ttlInvestment * 100) / 30000;
    console.log("progressBarWidth : "+progressBarWidth);
    //progressBar.style.width = 
    progressBar.style.width = `${progressBarWidth}%`;

    // loop through all circles and add/remove "active" class based on their index and current step
    // circles.forEach((circle, index) => {
    //     console.log('index : ',index);
    //     console.log('circle : ',circle);
    //     circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
    // });



});




// function that updates the current step and updates the DOM
// const updateSteps = (e) => {
//  // update current step based on the button clicked
//  //currentStep = e.target.id === "next" ? ++currentStep : --currentStep;

//  // loop through all circles and add/remove "active" class based on their index and current step
//  circles.forEach((circle, index) => {
//    circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
//  });

//  // update progress bar width based on current step

// //  
//  // check if current step is last step or first step and disable corresponding buttons
// //  if (currentStep === circles.length) {
// //    buttons[1].disabled = true;
// //  } else if (currentStep === 1) {
// //    buttons[0].disabled = true;
// //  } else {
// //    buttons.forEach((button) => (button.disabled = false));
// //  }
// };

// add click event listeners to all buttons
// buttons.forEach((button) => {
//  button.addEventListener("click", updateSteps);
// });