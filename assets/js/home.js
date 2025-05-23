const moviesCard = document.getElementById("moviesCard");
const tvCard = document.getElementById("tvCard");
const topRatedCard = document.getElementById("topRated");
const topRatedTv = document.getElementById("topRatedTv");

const MovieDetailsImage = document.querySelector(".MovieDetails__img");
const MovieDetailsInfoBox = document.querySelector(".MovieDetails__info");

const logoutBtn = document.getElementById("logout-btn");

const loginUserName = document.getElementById("navbar__login__userName");

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const userName = params.get("userName");
  const userEmail = params.get("email");
  loginUserName.textContent = userName;
  const savedUsers = localStorage.getItem("user_" + userEmail);
  const user = savedUsers ? JSON.parse(savedUsers) : {};
  const localStorageEmail = user["user_" + `${userEmail}`]?.email;

  // log out if the user email does not match the user email in local storage
  if (!localStorageEmail || localStorageEmail !== userEmail) {
    window.location.href = "index.html";
  }
  logoutBtn.addEventListener("click", function () {
    // redirect to sign in page
    window.location.href = "index.html";
  });
});
// select all slider contanier
const sliderContanier = document.querySelectorAll(".slider");
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
  console.log(topRatedTvShows);
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
  rateValue.textContent = `${vote_average}/10`;

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
    const url = `movieDetails.html?title=${encodeURIComponent(
      name || title
    )}&poster_path=${encodeURIComponent(
      poster_path
    )}&description=${encodeURIComponent(overview)}&rate=${encodeURIComponent(
      vote_average
    )}&views=${encodeURIComponent(popularity)}`;
    window.location.href = url;
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

  console.log("Movie ID:", id, "Name/Title:", name || title);
}
