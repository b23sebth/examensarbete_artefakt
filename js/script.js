const createElement = document.getElementById("createElement");
const addFragment = document.getElementById("addFragment");
const fragment = new DocumentFragment();
const submitBtn = document.getElementById("submit-btn");

let test;

createElement.addEventListener("click", createDiv);
addFragment.addEventListener("click", addElements);

submitBtn.addEventListener("click", function(event) {
  event.preventDefault();

  let elementOptions = new FormData(document.getElementById("element-options"));
  test = elementOptions.get("numberOfElements");
});

function createDiv() {
	console.log("click");

	const newDiv = document.createElement("div");

	const newContent = document.createTextNode("New content");

	newDiv.appendChild(newContent);

	fragment.appendChild(newDiv);
}

function addElements() {
	if (fragment.childElementCount > 0) {
    document.body.appendChild(fragment);
	} else {
    console.log("Fragment empty");
	}
}

