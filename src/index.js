function generateJoke(event) {
  event.preventDefault();
  let apiKey = "24f16ff06b6aba2369ec3846f0t8bco2";
  let context =
    "You are a funny AI assistant, and you love the movie and tv franchise about the Star Wars universe. Keep your response random as we don't want to hear the same joke everytime.";
  let prompt = "tell me a joke or pun to do with Star Wars";
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let jokeElement = document.querySelector("#joke");
  let button = document.querySelector("#joke-button");

  // Disable the button and update UI
  button.disabled = true;
  button.innerText = "Loading joke...";
  jokeElement.textContent = "Generating a joke guaranteed to make you smile, please wait 😁";

  axios.get(apiUrl).then((response) => {
    displayJoke(response);
    button.disabled = false;
    button.innerText = "Tell me another joke";
  }).catch((error) => {
    jokeElement.textContent = "Oops! Something went wrong.";
    button.disabled = false;
    button.innerText = "Try again";
    console.error(error);
  });
}


function generateCustomJoke(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-instructions").value.trim();
  if (!userInput) return;

  let apiKey = "24f16ff06b6aba2369ec3846f0t8bco2";
  let context =
    "You are a funny AI assistant with deep knowledge of the Star Wars universe. Generate original jokes, puns, or clever humor tailored to the theme provided by the user.";
  let prompt = `Tell me a Star Wars-themed joke about: ${userInput}`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let jokeElement = document.querySelector("#joke");
  let submitButton = document.querySelector(".topic-submit");
  submitButton.disabled = true;
  submitButton.value = "Loading...";

  jokeElement.textContent = "Summoning your custom joke... ⚡";

  axios.get(apiUrl).then((response) => {
    displayJoke(response);
    submitButton.disabled = false;
    submitButton.value = "Submit";
  }).catch((error) => {
    jokeElement.textContent = "Oops! Couldn't fetch a joke.";
    submitButton.disabled = false;
    submitButton.value = "Submit";
    console.error(error);
  });

  document.querySelector("#user-instructions").value = "";
}


function displayJoke(response) {
  let jokeElement = document.querySelector("#joke");

  new Typewriter("#joke", {
    strings: response.data.answer,
    autoStart: true,
    cursor: null,
    delay: 50,
  });

  let buttonShow = document.querySelector("#joke-button");
  buttonShow.style.display = "block";
  buttonShow.innerHTML = "Tell me another joke";
}

let generatorButton = document.querySelector("#joke-button");
generatorButton.addEventListener("click", generateJoke);

let form = document.querySelector("#form-generator");
form.addEventListener("submit", generateCustomJoke);
