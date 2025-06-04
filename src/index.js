let jokeTimeout;
const droidBeep = new Audio("./src/sounds/droid-beep.mp3");

function showLoader() {
  document.querySelector("#lightsaber-loader").style.display = "flex";
}

function hideLoader() {
  document.querySelector("#lightsaber-loader").style.display = "none";
}

function resetUI() {
  document.querySelector("#selection-options").style.display = "block";
  document.querySelector(".custom-joke").style.display = "none";
  document.querySelector("#joke-button").style.display = "none";
  document.querySelector("#another-joke").style.display = "none";
  hideLoader();
}

function prepareForNewJoke() {
  clearTimeout(jokeTimeout);
  document.querySelector("#joke").innerHTML = "";
  resetUI();
}

function handleTimeout() {
  hideLoader();
  document.querySelector("#joke").innerText =
    "Oops, things are taking longer than expected. Let's try again!";
  resetUI();
}

function playDroidBeep() {
  droidBeep.currentTime = 0;
  droidBeep.play().catch((error) => {
    console.error("Beep playback failed:", error);
  });
}

function displayJoke(response) {
  clearTimeout(jokeTimeout);
  hideLoader();
  let jokeElement = document.querySelector("#joke");

  new Typewriter("#joke", {
    strings: response.data.answer,
    autoStart: true,
    cursor: null,
    delay: 50,
  });

  playDroidBeep();
  document.querySelector("#another-joke").style.display = "block";
}

function generateJoke(event) {
  if (event) event.preventDefault();
  let apiKey = "24f16ff06b6aba2369ec3846f0t8bco2";
  let context =
    "You are a funny AI assistant, and you love the movie and tv franchise about the Star Wars universe. Keep your response random as we don't want to hear the same joke everytime.";
  let prompt = "tell me a joke or pun to do with Star Wars";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let jokeElement = document.querySelector("#joke");
  jokeElement.textContent = "Generating a joke guaranteed to make you smile, please wait 😁";
  showLoader();
  jokeTimeout = setTimeout(handleTimeout, 20000);

  axios.get(apiUrl)
    .then((response) => displayJoke(response))
    .catch(() => handleTimeout());
}

function generateCustomJoke(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-instructions").value.trim();
  if (!userInput) return;

  let apiKey = "24f16ff06b6aba2369ec3846f0t8bco2";
  let context =
    "You are a funny AI assistant with deep knowledge of the Star Wars universe. Generate original jokes, puns, or clever humor tailored to the theme provided by the user.";
  let prompt = `Tell me a Star Wars-themed joke about: ${userInput}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let jokeElement = document.querySelector("#joke");
  jokeElement.textContent = "Summoning your custom joke... ⚡";
  showLoader();
  jokeTimeout = setTimeout(handleTimeout, 20000);

  axios.get(apiUrl)
    .then((response) => displayJoke(response))
    .catch(() => handleTimeout());

  document.querySelector("#user-instructions").value = "";
}

function handleInitialSelection(choice) {
  document.querySelector("#selection-options").style.display = "none";
  if (choice === 'random') {
    document.querySelector("#joke-button").style.display = "block";
  } else {
    document.querySelector(".custom-joke").style.display = "block";
  }
}

document.querySelector("#form-generator").addEventListener("submit", generateCustomJoke);
document.querySelector("#joke-button").addEventListener("click", generateJoke);
document.querySelector("#another-joke").addEventListener("click", prepareForNewJoke);

resetUI();