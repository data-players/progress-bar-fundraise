// DOM Elements
const circles = document.querySelectorAll(".circle"),
progressBar0 = document.querySelector(".progress-bar.step0 .indicator"),
progressBar1 = document.querySelector(".progress-bar.step1 .indicator"),
progressBar2 = document.querySelector(".progress-bar.step2 .indicator"),
ttlInvestmentSpan = document.querySelector(".ttlInvestment"),
nberInvestmentTitlesSpan = document.querySelector(".nberInvestmentTitles"),
nberSharesSpan = document.querySelector(".nberShares");

//  variables
let [currentStep , ttlInvestment , nberShares , nberInvestmentTitles ,nberShareholders] = [0,0,0,0,0];

// grappe api to retrieve the ttl investment made
const participationTitlesTable = "https://api.baserow.io/api/database/rows/table/215680/";
const sharesTable = "https://api.baserow.io/api/database/rows/table/215961/";
const tokenAPI = "Token GeASQX3FCdmiQUicE7CWWTo7DSkVcvXb";

// Example POST method implementation:
async function getDatafromAPI(url = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization": tokenAPI,
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

// gets the 2 values given by the api and adds them
async function getData(){
    const sharesTableData = await getDatafromAPI(sharesTable);
    const participationTitlesData = await getDatafromAPI(participationTitlesTable);

    // ttl amount of investments in € for the titles and the shares (2500€ for example)
    const ttlInvestmentShares = sharesTableData.results.reduce((acc,obj) => acc + parseInt(obj.field_1497659), 0);
    const ttlInvestmentTitles = participationTitlesData.results.reduce((acc, obj) => acc + parseInt(obj.field_1497647), 0);

    // ttl amount of investments in € for the titles + the shares (4500€ for example)
    ttlInvestment = parseInt(ttlInvestmentTitles) + parseInt(ttlInvestmentShares);

    // nber of shares or titles sold (5 for example)
    nberShares = sharesTableData.results.reduce((acc, obj) => acc + parseInt(obj.field_1497657), 0);
    nberInvestmentTitles = participationTitlesData.results.reduce((acc, obj) => acc + parseInt(obj.field_1497638), 0);
    nberShareholders = sharesTableData.results.length;

    // console.log("test shares table : ",sharesTableData);
    // console.log("test participation table : ",participationTitlesData);
    // console.log("ttlInvestment : " + ttlInvestment);
    // console.log("nbershares : "+nberShares);
    // console.log("nberinvestment : "+nberInvestmentTitles);
    // console.log("nberShareholders : "+nberShares);
}

getData().then(() => {

    // sets text in css elements
    ttlInvestmentSpan.textContent = ttlInvestment + "€";
    nberInvestmentTitlesSpan.textContent = nberInvestmentTitles + " titres participatifs";
    nberSharesSpan.textContent = nberShareholders + " parts sociales";

    // code for the progress bar
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