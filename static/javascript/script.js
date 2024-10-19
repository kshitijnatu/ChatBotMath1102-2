const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Function to add a message to the chat box
function addMessageToChatBox(message, isUser = true) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${isUser ? 'user' : 'bot'}`;
    messageElement.innerHTML = isUser ? `<strong>You:</strong> ${message}` : `<strong>Bot:</strong> ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "message bot typing";
    typingIndicator.innerHTML = `<strong>Bot:</strong> <em>Typing...</em>`;
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
    return typingIndicator;
}

// Handle form submission
chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    // Display the user's message
    addMessageToChatBox(message);
    userInput.value = "";

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

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
        // Remove typing indicator
        typingIndicator.remove();
        // Display the bot's response
        addMessageToChatBox(data.response, false);
    } catch (error) {
        console.error("Error communicating with the chatbot:", error);
        typingIndicator.remove();
        addMessageToChatBox("There was an error. Please try again.", false);
    }
});