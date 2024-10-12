from flask import Flask, render_template, request, jsonify
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

# Initialize Flask app
app = Flask(__name__)

# Set up the language model and prompt template
template = """
Answer the question below.

Here is the conversation history: {context}

Question: {question}

Answer:
"""

model = OllamaLLM(model="llama3")
prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

# Store conversation context
context = ""

@app.route("/")
def home():
    """Render the chat interface."""
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    """Handle chat requests."""
    global context
    user_message = request.form.get("message")  # Get message from form submission

    # Generate a response from the model
    result = chain.invoke({"context": context, "question": user_message})

    # Update the conversation context
    context += f"\nUser: {user_message}\nAI: {result}"

    # Return the chatbot response
    return jsonify({"response": result})

if __name__ == "__main__":
    app.run(debug=True)
