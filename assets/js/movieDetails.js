// get movie details from url whene page load

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  const poster_path = params.get("poster_path");
  const description = params.get("description");
  const rate = params.get("rate");
  const views = params.get("views");

  if (title && poster_path && description && rate && views) {
    renderMovieDetails(title, poster_path, description, rate, views);
  } else {
    console.error("no movie details available.");
  }
});

function renderMovieDetails(title, poster_path, description, rate, views) {
  const movieInfoContainer = document.getElementById("movieInfo");
  // Clear previous content
  movieInfoContainer.innerHTML = "";

  // Create poster figure and image
  const figure = document.createElement("figure");
  figure.className = "movie-details__poster";

  const img = document.createElement("img");
  img.src = "https://image.tmdb.org/t/p/original" + poster_path;
  img.alt = "movie poster";
  figure.appendChild(img);

  // Create content container
  const contentDiv = document.createElement("div");
  contentDiv.className = "movie-details__content";

  const titleElement = document.createElement("h2");
  titleElement.textContent = title;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  const viewsElement = document.createElement("h4");
  viewsElement.textContent = `Views: ${views}`;

  const rateElement = document.createElement("h4");
  rateElement.textContent = `Rate: ${rate}/10`;

  // Append elements to content container
  contentDiv.appendChild(titleElement);
  contentDiv.appendChild(descriptionElement);
  contentDiv.appendChild(viewsElement);
  contentDiv.appendChild(rateElement);

  // Append figure and content to the main container
  movieInfoContainer.appendChild(figure);
  movieInfoContainer.appendChild(contentDiv);
}

const addReview_btn = document.getElementById("addReview_btn");
const audienceReviewsContainer = document.getElementById("audienceReviews");
const textArea = document.getElementById("comment");
addReview_btn.addEventListener("click", function () {
  const audienceReview = document.createElement("p");
  audienceReview.textContent = textArea.value;
  audienceReviewsContainer.appendChild(audienceReview);
  textArea.value = "";
});
