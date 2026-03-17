const createElement = document.getElementById("createElement");
const addFragment = document.getElementById("addFragment");
const fragment = new DocumentFragment();

createElement.addEventListener("click", createDiv);
addFragment.addEventListener("click", addElements)

function createDiv() {
	console.log("click");

	const newDiv = document.createElement("div");

	const newContent = document.createTextNode("New content");

	newDiv.appendChild(newContent);

	fragment.appendChild(newDiv);
}

function addElements() {
	document.body.appendChild(fragment);
}

