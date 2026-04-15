const createElement = document.getElementById("createElement");
const addFragment = document.getElementById("addFragment");
const fragment = new DocumentFragment();
const submitBtn = document.getElementById("submit-btn");

let numberOfElements;

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let elementOptions = new FormData(document.getElementById("element-options"));
  numberOfElements = elementOptions.get("numberOfElements");

  for(let i = 0; i <=numberOfElements; i++) {
    createDiv();
  }

  addElements();
});

function createDiv() {  //TODO: Skriv om till switch-statement så att diven kan innehålla flera olika saker?
  console.log("Creating Div");

	const newDiv = document.createElement("div");
	const newContent = document.createTextNode("New content");

	newDiv.appendChild(newContent);
  newDiv.appendChild(createParagraph());

	fragment.appendChild(newDiv);
}

function createParagraph() {
  console.log("Creating paragraph");

  const newParagraph = document.createElement("p");
  const newContent = document.createTextNode("This is a paragraph");

  newParagraph.appendChild(newContent);

  return newParagraph;
}

function addElements() {
	if (fragment.childElementCount > 0) {
    document.body.appendChild(fragment);
	} else {
    console.log("Fragment empty");
	}
}

