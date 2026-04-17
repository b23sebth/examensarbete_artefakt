const createElement = document.getElementById("createElement");
const addFragment = document.getElementById("addFragment");
const fragment = new DocumentFragment();
const submitBtn = document.getElementById("submit-btn");

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

function createDiv() {  //TODO: Skriv om till switch-statement så att diven kan innehålla flera olika saker?
  console.log("Creating Div");

	const newDiv = document.createElement("div");

  newDiv.appendChild(createHeading(1));
  newDiv.appendChild(createParagraph());
  newDiv.appendChild(createIMG());

	fragment.appendChild(newDiv);
}

function createParagraph() {
  console.log("Creating paragraph");

  const newParagraph = document.createElement("p");
  const newContent = document.createTextNode(getRandomSentence(25));

  newParagraph.appendChild(newContent);

  return newParagraph;
}

function createHeading(heading) {
  console.log("Creating heading")

  const newHeading = document.createElement(`h${heading}`);
  const newContent = document.createTextNode(getRandomSentence(1));
  newHeading.appendChild(newContent);

  return newHeading;
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

