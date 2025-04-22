const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const inputText = document.querySelector(".input-text");
const outputText = document.querySelector(".output-text");
const inputLang = document.getElementById("inputLang");
const outputLang = document.getElementById("outputLang");

const langCodes = {
  English: "en",
  Hindi: "hi",
  Kannada: "kn",
  Marathi: "mr",
  Telugu: "te",
};

const recognitionLangMap = {
  English: "en-US",
  Hindi: "hi-IN",
  Kannada: "kn-IN",
  Marathi: "mr-IN",
  Telugu: "te-IN",
};

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  inputText.textContent = "YOU SAID: " + transcript;

  const source = langCodes[inputLang.value];
  const target = langCodes[outputLang.value];

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(transcript)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const translatedText = data[0][0][0];
      outputText.textContent = "Translation: " + translatedText;
    })
    .catch(err => {
      console.error("Translation Error:", err);
      outputText.textContent = "Error: " + err.message;
    });
};

document.getElementById("start").addEventListener("click", () => {
  const selectedInput = inputLang.value;
  recognition.lang = recognitionLangMap[selectedInput] || "en-US";
  recognition.start();
});

document.getElementById("stop").addEventListener("click", () => {
  recognition.stop();
});

document.getElementById("play").addEventListener("click", () => {
    const text = outputText.textContent.replace("Translation: ", "");
    
    if (!text) {
      alert("Translation not available yet!");
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
  
    // Set language of the speech
    const selectedLang = outputLang.value;
    const speechLangMap = {
      English: "en-US",
      Hindi: "hi-IN",
      Kannada: "kn-IN",
      Marathi: "mr-IN",
      Telugu: "te-IN",
    };
  
    utterance.lang = speechLangMap[selectedLang] || "en-US";
    window.speechSynthesis.speak(utterance);
  });
  