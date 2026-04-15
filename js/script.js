const createElement = document.getElementById("createElement");
const addFragment = document.getElementById("addFragment");
const fragment = new DocumentFragment();
const submitBtn = document.getElementById("submit-btn");

let numberOfElements;

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let elementOptions = new FormData(document.getElementById("element-options"));
  numberOfElements = elementOptions.get("numberOfElements");

  for(i = 0; i <=numberOfElements; i++) {
    createDiv();
    createParagraph();
  }

  addElements();
});

function createDiv() {
  console.log("Creating Div");

	const newDiv = document.createElement("div");
	const newContent = document.createTextNode("New content");

	newDiv.appendChild(newContent);
	fragment.appendChild(newDiv);
}

function createParagraph() {
  console.log("Creating paragraph");
  const newParagraph = document.createElement("p");
  const newContent = document.createTextNode("This is a paragraph");

  newParagraph.appendChild(newContent);
  fragment.appendChild(newParagraph);
}

function addElements() {
	if (fragment.childElementCount > 0) {
    document.body.appendChild(fragment);
	} else {
    console.log("Fragment empty");
	}
}

