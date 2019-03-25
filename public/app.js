//get username --> listen to io chat messages, push them to the ul
//

if (io && username) {
	const socket = io();

	document.querySelector("#chatApp button").addEventListener("click", () => {
		sendMessage();
	});

	window.addEventListener("keyup", event => {
		if (event.isComposing || event.keyCode === 229) {
			return;
		} else if (event.keyCode === 13) {
			sendMessage();
		}
	});

	function sendMessage() {
		let message = document.querySelector("#chatApp input").value;
		if (message !== "") {
			socket.emit("chat message", { username: username, message: message });
		}
		document.querySelector("#chatApp input").value = "";
	}
	socket.on("chat message", function(data) {
		let li = document.createElement("li");
		li.textContent = `${data.username}: ${data.message}`;
		document.querySelector("#chatApp ul").appendChild(li);
	});
}
