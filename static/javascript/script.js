const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Function to add a message to the chat box
function addMessageToChatBox(message, isUser = true) {
    const messageElement = document.createElement("div");
    messageElement.className = "message";
    messageElement.innerHTML = isUser ? `<strong>You:</strong> ${message}` : `<strong>Bot:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Handle form submission
chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    addMessageToChatBox(message);
    userInput.value = "";

    // Send the message to the chatbot
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ message }),
    });

    const data = await response.json();
    addMessageToChatBox(data.response, false);
});
