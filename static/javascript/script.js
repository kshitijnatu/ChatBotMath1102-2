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

    // Display the user's message
    addMessageToChatBox(message);
    userInput.value = "";

    // Send the message to the chatbot
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ "user-input": message }),
        });

        const data = await response.json();
        // Display the bot's response
        addMessageToChatBox(data.response, false);
    } catch (error) {
        console.error("Error communicating with the chatbot:", error);
        addMessageToChatBox("There was an error. Please try again.", false);
    }
});