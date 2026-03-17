const createElement = document.getElementById("createElement");

createElement.addEventListener("click", createDiv);

function createDiv() {
	console.log("click");

	const newDiv = document.createElement("div");

	const newContent = document.createTextNode("New content");

	newDiv.appendChild(newContent);

	document.body.appendChild(newDiv);
}
