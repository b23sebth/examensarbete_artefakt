const createElement = document.getElementById("createElement");
const addFragment = document.getElementById("addFragment");
const fragment = new DocumentFragment();
const submitBtn = document.getElementById("submit-btn");

// Array so created element can be randomly chosen. 
const elements = [
  createHeading,
  createParagraph,
  createIMG,
  createTable
]

let numberOfElements;

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  const elementOptions = new FormData(document.getElementById("element-options"));

  const numberOfElements = elementOptions.get("numberOfElements");
  const seed = Number(elementOptions.get("seed"));

  Math.setSeed(seed);

  for(let i = 0; i < numberOfElements; i++) {
    createDiv();
  }

  addElements();
});

//Returns up to n *amount* sentences with normal distribution.
function getRandomSentence(amount) {
  let randomSentence = "";

  for (let i = 0; i < Math.round(Math.random() * amount); i++) {
    randomSentence += generate_sentence(true,true,true,true,true,true,true,true,true,true,true);
  }

  return randomSentence;
}

function createDiv() {
  console.log("Creating Div");

	const newDiv = document.createElement("div");

  for (let i = 0; i < getRandomInt(1,11); i++) {
    newDiv.appendChild(elements[getRandomInt(0, 4)]());
  }

	fragment.appendChild(newDiv);
}

function createParagraph() {
  console.log("Creating paragraph");

  const newParagraph = document.createElement("p");
  const newContent = document.createTextNode(getRandomSentence(25));

  newParagraph.appendChild(newContent);

  return newParagraph;
}

function createHeading() {
  console.log("Creating heading");

  const heading = getRandomInt(1,7);

  const newHeading = document.createElement(`h${heading}`);
  const newContent = document.createTextNode(getRandomSentence(1));
  newHeading.appendChild(newContent);

  return newHeading;
}

// Creates a table with random amount of rows and cells
function createTable() {
  console.log("Creating table");
  
  const newTable = document.createElement("table");
  newTable.createTBody();

  for (let i = 0; i < getRandomInt(1, 101); i++) {
    const tr = newTable.insertRow(getRandomInt(0, i + 1)); //Inserts row at random location in table.

    for (let i2 = 0; i2 < getRandomInt(1, 21); i2++) {
      const td = tr.insertCell(getRandomInt(0, i2 + 1));
      td.appendChild(document.createTextNode(randomword(noun)));
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
    document.body.appendChild(fragment);
	} else {
    console.log("Fragment empty");
	}
}

