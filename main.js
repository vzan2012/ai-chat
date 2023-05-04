import "./style.css";

// Getting values from env variables
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Fetch the elements
const promptInput = document.getElementById("grid-enter-prompt");
const resultText = document.getElementById("resultText");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");

const decoder = new TextDecoder("utf-8");

let controller = null;

// Fetch and Generate the response from the API
const generate = async () => {
  stopBtn.disabled = false;

  // For Aborting the requests
  controller = new AbortController();
  const signal = controller.signal;

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
        stream: true,
      }),
      signal,
    });

    const reader = response.body.getReader();

    resultText.innerText = "";

    while (true) {
      const { value, done } = await reader.read();

      if (done) break;

      // Parse the Response Data
      parseReponseData(value);
    }

    // Remove this code when stream is enabled
    // const responseData = await response.json();
    // resultText.innerText = responseData.choices[0].message.content;
  } catch (error) {
    if (signal.aborted) {
      resultText.innerText = "Request aborted";
    } else {
      resultText.innerText = "Error occured while generating ...";
      console.error("Error: ", error);
    }
  } finally {
    generateBtn.disabled = false;
    stopBtn.disabled = true;
    controller = null;
  }
};

// Adding Event Listeners for the Elements
generateBtn.addEventListener("click", generate);

promptInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") generate();
});

stopBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
    controller = null;
  }
});

// Parse Response Data
const parseReponseData = (value) => {
  const decoderChunk = decoder.decode(value);
  const lines = decoderChunk.split("\n");
  const parsedLines = lines
    .map((line) => line.replace(/^data:/, "").trim())
    .filter((line) => line !== "" && line !== "[DONE]")
    .map((line) => JSON.parse(line));

  for (const parseLine of parsedLines) {
    const { choices } = parseLine;
    const { delta } = choices[0];
    const { content } = delta;

    if (content) resultText.innerText += content;
  }
};
