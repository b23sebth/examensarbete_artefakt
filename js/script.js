const fragment = new DocumentFragment();
const submitBtn = document.getElementById("submit-btn");
const clearDataButton = document.getElementById("clear-data-btn");
const downloadDataButton = document.getElementById("download-data-btn");
const clearElementsButton = document.getElementById("clear-elements-btn");

//The variable noun used as a parameter for randomwword() is in the global scope from contextfreegrammar.

// Array so created element can be randomly chosen. 
const elements = [
  createHeading,
  createParagraph,
  createIMG,
  createTable
]

let stats = [];
let csv = "";
let numberOfElements;
let run = 1;
let testData = {
  "headings": [],
  "sentences": [],
  "tableData": [],
  "imgSrc": []
};

let iteration = 0;
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  const elementOptions = new FormData(document.getElementById("element-options"));

  numberOfElements = elementOptions.get("numberOfElements");
  const seed = Number(elementOptions.get("seed"));

  Math.setSeed(seed);

  generateTestData(numberOfElements);
  console.log("testData: ", testData);

  const startTime = Temporal.Now.plainTimeISO();

  for(let i = 0; i < numberOfElements; i++) {
    createDiv();
    iteration++;
    console.log("Created Divs: ", i + 1);
  }

  addElements();

  const endTime = Temporal.Now.plainTimeISO();

  addStatsData(run, numberOfElements, seed, startTime, endTime);
  run++;

});

function generateTestData(numberOfElements) {
  for (let i = 0; i < numberOfElements; i++) {
    testData.headings.push(randomword(noun));
    testData.sentences.push(getRandomSentence(25));
    testData.tableData.push(randomword(noun));
    let seed = Math.random();
    testData.imgSrc.push(`https://picsum.photos/seed/${seed}/300`);
  }
}

clearDataButton.addEventListener("click", function() {
  console.log("Clear data button pressed.");

  const table = document.getElementById("stats-table");
  const tbody = table.querySelector("tbody");

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  stats = [];
  csv = "";
  run = 1;
});

downloadDataButton.addEventListener("click", function() {
  console.log("Download data button pressed.");

  if (csv == "") {
    alert("Please generate some data first.");
  } else {
    //TODO: Fixa ett faktiskt <a> element istället för <button> för bättre accessibility.
    const blob = new Blob([csv], {type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = 'stats.csv';

    a.click();
    a.remove();
  }
});

clearElementsButton.addEventListener("click", function() {
  console.log("Clear elements button pressed.");

  const cards = document.getElementById("cards");

  let i = 1;
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
    console.log("Removed: ", i);
    i++;
  }

  //Den här implementationen tar mycket längre tid, vad beror det på? Kanske kan vara intressant för att jämföra Rust/JS ytterliggare.
  //Loops through elements backwards.
  //const elements = document.getElementsByClassName("content");
  //for (let i = elements.length -1; i >= 0; i--) {
    //elements[i].remove();
    //console.log("Removed: ", i);
  //}
});

function addStatsData(run, numberOfElements, seed, startTime, endTime) {
  const timeTaken = startTime.until(endTime);
  const timeTakenMs = timeTaken.total("milliseconds");
  const timeTakenSeconds = timeTaken.total("seconds");
  const table = document.getElementById("stats-table");
  const tbody = table.querySelector("tbody");
  const tr = tbody.insertRow();

  stats.push([run, numberOfElements, seed, timeTakenSeconds, timeTakenMs]);

  csv = "";
  for (let i = 0; i < stats.length; i++) {
    csv += stats[i].toString() + "\n";
  }

  console.log(csv);

  console.log("Temporal: ", timeTaken);
  console.log("Run: ", run);

  let td;
  let data;

  //TODO: Lös det här bättre. För mycket upprepning..
  td = tr.insertCell();
  data = document.createTextNode(run);
  td.appendChild(data);

  td = tr.insertCell();
  data = document.createTextNode(numberOfElements);
  td.appendChild(data);

  td = tr.insertCell();
  data = document.createTextNode(seed);
  td.appendChild(data);

  td = tr.insertCell();
  data = document.createTextNode(timeTakenSeconds);
  td.appendChild(data);

  td = tr.insertCell();
  data = document.createTextNode(timeTakenMs);
  td.appendChild(data);
}

//Returns up to n *amount* sentences with normal distribution.
//ALways at least one sentence.
function getRandomSentence(amount) {
  let randomSentence = "";

  for (let i = 0; i < getRandomInt(1, amount + 1); i++) {
    randomSentence += generate_sentence(true,true,true,true,true,true,true,true,true,true,true);
  }

  return randomSentence;
}

// Fills a div with 1-10 random elements.
function createDiv() {
  console.log("Creating Div");

	const newDiv = document.createElement("div");
  newDiv.className = "content";

  for (let i = 0; i < getRandomInt(1,11); i++) {
    newDiv.appendChild(elements[getRandomInt(0, 4)]());
  }

  //TODO: Borde returnera en div likt andra element. Justera fragment borde göras i eventlyssnaren.
	fragment.appendChild(newDiv);
}

function createParagraph() {
  console.log("Creating paragraph");

  const newParagraph = document.createElement("p");
  const newContent = document.createTextNode(testData.sentences[iteration]);

  newParagraph.appendChild(newContent);

  return newParagraph;
}

function createHeading() {
  console.log("Creating heading");

  const newContent = document.createTextNode(testData.headings[iteration]);
  const newHeading = document.createElement("h1");

  newHeading.appendChild(newContent);

  return newHeading;
}

// Creates a table with random amount of rows and cells
function createTable() {
  console.log("Creating table");
  
  const newTable = document.createElement("table");
  const numberofColumns = 4;
  const thead = newTable.createTHead();
  const tbody = newTable.createTBody();

  let tr = thead.insertRow();

  for (let i = 0; i < numberofColumns; i++) {
    const td = tr.insertCell();
    const th = document.createElement("th");

    th.appendChild(document.createTextNode(testData.tableData[iteration]));
    td.replaceWith(th);
  }

  for (let i = 0; i < 10; i++) {
    tr = tbody.insertRow();

    for (let i2 = 0; i2 < numberofColumns; i2++) {
      const td = tr.insertCell();
      td.appendChild(document.createTextNode(testData.tableData[iteration]));
    }
  }

  return newTable;
}

function createIMG() {
  console.log("Creating random image")

  let img = document.createElement("img");
  let seed = Math.random();
  img.setAttribute("src", `https://picsum.photos/seed/${seed}/300`);

  return img;
}

function addElements() {
	if (fragment.childElementCount > 0) {
    const div = document.getElementById("cards");
    div.appendChild(fragment);
	} else {
    console.log("Fragment empty");
	}
}

