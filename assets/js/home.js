import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
// get Dom Elements
const moviesCard = document.getElementById("moviesCard");
const tvCard = document.getElementById("tvCard");
const topRatedCard = document.getElementById("topRated");
const topRatedTv = document.getElementById("topRatedTv");

const MovieDetailsImage = document.querySelector(".MovieDetails__img");
const MovieDetailsInfoBox = document.querySelector(".MovieDetails__info");

const logoutBtn = document.getElementById("logout-btn");

const loginUserName = document.getElementById("navbar__login__userName");

const searchValue = document.getElementById("search");
const search_movies = document.querySelector("#search_movies");
const mainPageWrapper = document.querySelector(".mainMovies_wrapper");
const myFavoritesList = document.getElementById("favoritesList_btn");
const myListContainer = document.getElementById("myList");
const favoritesListWrapper = document.getElementById("favoritesList");

const params = new URLSearchParams(window.location.search);
const userName = params.get("userName");
const userEmail = params.get("email");
const isLoggedIn = params.get("isLoggedIn");

document.addEventListener("DOMContentLoaded", () => {
  // Display user name in UI
  loginUserName.textContent = userName;

  // Get user from localStorage
  const userData = localStorage.getItem("user_" + userEmail);
  const user = userData ? JSON.parse(userData) : null;
  // Redirect if user not found
  if (!user || user.email !== userEmail || !isLoggedIn) {
    window.location.href = "index.html";
    return;
  }

  // Logout logic
  logoutBtn.addEventListener("click", function () {
    // Set isLoggedIn = false
    user.isLoggedIn = false;

    // Save updated user back to localStorage
    localStorage.setItem("user_" + userEmail, JSON.stringify(user));

    // Redirect to sign in page
    window.location.href = "index.html";
  });
});

// select all left arrows
const allGoBackBtn = document.querySelectorAll(".arrow_left");
// select all right arrows
const allGoForwardBtn = document.querySelectorAll(".arrow_right");

//add slide effict to all cards , direction 1==right , -1==left
function scrollSlider(slider, direction) {
  const scrollAmount = 220;
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// add goBack function to all back buttons
allGoBackBtn.forEach((btnGoBack) =>
  btnGoBack.addEventListener("click", function () {
    const slider = btnGoBack.closest("section").querySelector(".slider");
    scrollSlider(slider, -1);
  })
);

// add goForward function to all back buttons
allGoForwardBtn.forEach((btnGoForward) => {
  btnGoForward.addEventListener("click", function () {
    const slider = btnGoForward.closest("section").querySelector(".slider");
    scrollSlider(slider, 1);
  });
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTY0NGYyYTE2ZDA0MjNhZWI1YzU5N2RlZTk5ODMzNCIsIm5iZiI6MTc0NzU1NDA1NS4yMTgsInN1YiI6IjY4Mjk4ZjA3ZDViMjFmNjM2ODY0ODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YFZHsdktsmSqSOVRNH8Mkm2b55uTlvFm1py01DTudS8",
  },
};

async function fetchMovies(url) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const moviesArray = data.results;

    return moviesArray;
  } catch (err) {
    console.error("Failed to fetch movies:", err);
  }
}

let debounceTimeout;
// search for movies
searchValue.addEventListener("input", function () {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async function () {
    const query = searchValue.value.trim();
    if (query === "") return;
    const searchResult = await fetchMovies(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=1`
    );
    console.log(searchResult);
    // clear the page
    mainPageWrapper.style.display = "none";
    // render searched items
    renderMovies(searchResult, search_movies);
  }, 500);
  // clear the search
  search_movies.innerHTML = "";
  // show the main page details
  mainPageWrapper.style.display = "block";
});
function renderMovies(moviesArr, position) {
  position.innerHTML = "";

  moviesArr.forEach((movie, i) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.id = movie.id;

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500${
      movie.poster_path || movie.profile_path
    }`;
    img.alt = `movie number ${i}`;

    card.appendChild(img);
    position.appendChild(card);

    // Add click event
    card.addEventListener("click", () => showMovieDetails(movie));
  });
}

// multibal api calls to render all data
async function fetchAndRenderAll() {
  const movies = await fetchMovies(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
  );
  renderMovies(movies, moviesCard);

  const topRatedMovies = await fetchMovies(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  );
  renderMovies(topRatedMovies, topRatedCard);

  const tv = await fetchMovies(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
  );
  renderMovies(tv, tvCard);

  const topRatedTvShows = await fetchMovies(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
  );
  renderMovies(topRatedTvShows, topRatedTv);
}

fetchAndRenderAll();

function showMovieDetails({
  id,
  name,
  title,
  backdrop_path,
  profile_path,
  poster_path,
  overview,
  vote_average,
  popularity,
}) {
  // Clear previous content
  MovieDetailsInfoBox.innerHTML = "";
  MovieDetailsImage.innerHTML = "";

  // Create Title
  const heading = document.createElement("h2");
  heading.textContent = title || name;

  // Create Overview
  const description = document.createElement("p");
  description.textContent = overview || "No description available.";

  // Create Rating container
  const rateContainer = document.createElement("div");
  rateContainer.classList.add("MovieDetails__info__rate");

  const rateLabel = document.createElement("span");
  rateLabel.textContent = "Rate : ";

  const rateValue = document.createElement("span");
  rateValue.textContent = `${vote_average.toFixed(1)}/10`;

  rateContainer.appendChild(rateLabel);
  rateContainer.appendChild(rateValue);

  // Create buttons/links
  const playLink = document.createElement("a");
  playLink.href = "#";
  playLink.textContent = "Play";

  const learnMoreLink = document.createElement("a");
  learnMoreLink.href = "#";
  learnMoreLink.textContent = "Learn More";
  learnMoreLink.addEventListener("click", function () {
    const params = new URLSearchParams(window.location.search);
    const userName = params.get("userName");
    const url = `movieDetails.html?&userName=${encodeURIComponent(
      userName
    )}&userEmail=${encodeURIComponent(userEmail)}&movieId=${encodeURIComponent(
      id
    )}&title=${encodeURIComponent(
      name || title
    )}&poster_path=${encodeURIComponent(
      poster_path
    )}&description=${encodeURIComponent(overview)}&rate=${encodeURIComponent(
      vote_average
    )}&views=${encodeURIComponent(popularity)}`;
    window.open(url, "_blank");
    console.log("clicked.." + id);
  });
  // Append elements to info box
  MovieDetailsInfoBox.appendChild(heading);
  MovieDetailsInfoBox.appendChild(description);
  MovieDetailsInfoBox.appendChild(rateContainer);
  MovieDetailsInfoBox.appendChild(playLink);
  MovieDetailsInfoBox.appendChild(learnMoreLink);

  // Create and append image
  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/original${
    backdrop_path || profile_path
  }`;
  img.alt = `movie number ${id}`;

  MovieDetailsImage.appendChild(img);

  // Scroll to top of movie details
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// chat pot Dom Elements
const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.getElementById("chatContainer");
const chatMessagesContainer = document.getElementById("chat-messages");
const sendButton = document.getElementById("send-btn");
const userInputElement = document.getElementById("userInput");

// --- Gemini Variables ---
let genAIInstance;
let model;

const API_KEY = "AIzaSyAnfDyYgefGWf3RVba9XOn7UHpG5SNd4qc";

// Function to initialize the Gemini model
function initializeGemini(apiKeyToUse) {
  if (!apiKeyToUse) {
    addMessage("API Key is missing. Cannot initialize Gemini.", "bot-error");
    model = null;
    return false;
  }
  try {
    genAIInstance = new GoogleGenerativeAI(apiKeyToUse);
    model = genAIInstance.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });
    addMessage("Chatbot initialized. How can I help?", "bot");
    return true;
  } catch (error) {
    addMessage(
      `Error initializing Gemini: ${error.message}. Please check API Key.`,
      "bot-error"
    );
    model = null;
    return false;
  }
}

// handle messages
async function handleSendMessage() {
  const userInputText = userInputElement.value.trim();
  if (!userInputText) return;

  // Initialize Gemini if not already, or if API key changed (though API_KEY is constant here)
  if (!model || (genAIInstance && genAIInstance.apiKey !== API_KEY)) {
    // genAIInstance.apiKey is not a public property, this check might not be robust
    if (!initializeGemini(API_KEY)) {
      addMessage(
        "Failed to initialize the chatbot. Please check the API Key.",
        "bot-error"
      );
      return; // Initialization failed
    }
  }
  // Double check model is initialized after attempt
  if (!model) {
    addMessage(
      "Gemini model is not initialized. Please check API key and console.",
      "bot-error"
    );
    return;
  }

  // add user message to chat
  addMessage(userInputText, "user");
  // clear input filed
  userInputElement.value = "";

  try {
    addMessage("Thinking...", "bot-loading"); // Show a thinking indicator

    // --- Call Gemini API ---
    const result = await model.generateContent(userInputText); // Pass the user's text directly
    const geminiResponse = await result.response;
    const textResponse = geminiResponse.text();

    // Remove "Thinking..." message before adding the actual response
    const thinkingMessage = chatMessagesContainer.querySelector(".bot-loading");
    if (thinkingMessage) thinkingMessage.remove();

    addMessage(textResponse, "bot");
  } catch (error) {
    // Remove "Thinking..." message if it exists on error
    const thinkingMessage = chatMessagesContainer.querySelector(".bot-loading");
    if (thinkingMessage) thinkingMessage.remove();

    let errorMessage = "Sorry, I encountered an error.";
    if (error.message && error.message.toLowerCase().includes("quota")) {
      errorMessage =
        "API quota exceeded. Please check your Google AI Studio or Cloud Console.";
    } else if (
      error.message &&
      error.message.toLowerCase().includes("api key not valid")
    ) {
      errorMessage = "The API key is not valid. Please check it.";
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    }
    addMessage(errorMessage, "bot-error");
  }
}

// add message to users
function addMessage(text, sender) {
  if (!chatMessagesContainer) {
    console.error("Chat messages container not found!");
    return;
  }
  // create div element
  const messageDiv = document.createElement("div");
  // sender will be 'user', 'bot', 'bot-error', 'bot-loading'
  // the class list will apple css style to the added message
  messageDiv.classList.add("chat-message", sender);
  messageDiv.textContent = text;
  // add message to chat container
  chatMessagesContainer.appendChild(messageDiv);
  // scroll down to show messages
  chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// --- Event Listeners ---
if (sendButton) {
  sendButton.addEventListener("click", handleSendMessage);
} else {
  console.error("Send button not found.");
}

if (userInputElement) {
  userInputElement.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
}

// open - close chat
chatToggle.addEventListener("click", () => {
  chatContainer.style.display =
    chatContainer.style.display === "none" ? "flex" : "none";
});

// get user favorites moveis from localStorage
function getUserFromStorage(userEmail) {
  const userKey = `user_${userEmail}`;
  const user = JSON.parse(localStorage.getItem(userKey));

  if (!user) {
    console.error(`No user found with email: ${userEmail}`);
    return null;
  }

  return user.userFavorites;
}
// render all favorites movies
myFavoritesList.addEventListener("click", async function () {
  const userFavoritesArray = getUserFromStorage(userEmail);
  if (!userFavoritesArray || userFavoritesArray.length === 0) {
    favoritesListWrapper.style.display = "block";
    myListContainer.innerHTML = "<p>No favorites found.</p>";
    return;
  }
  favoritesListWrapper.style.display = "block";
  myListContainer.innerHTML = "";
  // Fetch all favorite movies
  const favMoviesArray = await Promise.all(
    userFavoritesArray.map(async (movieId) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        options
      );
      if (!response.ok) return null;
      return await response.json();
    })
  );
  // Filter out any failed fetches (nulls)
  const validMovies = favMoviesArray.filter(Boolean);
  renderMovies(validMovies, myListContainer);
});
