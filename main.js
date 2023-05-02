import "./style.css";

console.log("Testing in JS");
console.log(import.meta.env);
console.log(import.meta.env);

// Getting values from env variables
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Fetch the elements
const promptInput = document.getElementById("grid-enter-prompt");
const resultText = document.getElementById("resultText");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");

// Fetch and Generate the response from the API
const generate = async () => {
  // Checking validation
  if (!promptInput.value) {
    alert("Please enter a prompt");
    return;
  }

  generateBtn.disabled = true;

  resultText.innerText = "Generating ...";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptInput.value }],
        temperature: 0.7,
      }),
    });

    const responseData = await response.json();
    resultText.innerText = responseData.choices[0].message.content;
  } catch (error) {
    resultText.innerText = "Error occured while generating ...";
    console.error("Error: " + error);
  } finally {
    generateBtn.disabled = false;
  }
};

// Adding Event Listeners for the Elements
generateBtn.addEventListener("click", generate);

promptInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") generate();
});
