// get Dom elements
const addToFavoritesBtn = document.getElementById("addToFavorites_btn");

// get movie details from url whene page load
const params = new URLSearchParams(window.location.search);
const userName = params.get("userName");
const userEmail = params.get("userEmail");
const movieId = params.get("movieId");
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
// render movie reviews when the page loaded
document.addEventListener("DOMContentLoaded", () => {
  renderMovieReviews(movieId);
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
// add review to movie
addReview_btn.addEventListener("click", async function (e) {
  e.preventDefault();
  const review = {
    id: Date.now().toString(),
    movieId: movieId,
    usersReviews: {
      userName: userName,
      userReview: textArea.value,
    },
  };
  // add review to the json file
  await addUsersReviews(review);

  // add only the current movie's reviews
  await renderMovieReviews(movieId);

  textArea.value = "";
});

async function renderMovieReviews(movieId) {
  // Fetch all reviews from JSON Server
  const allReviews = await fetchUsersReviews();

  // Filter only reviews for the current movie
  const movieReviews = allReviews.filter(
    (review) => review.movieId === movieId
  );

  // Clear previous reviews
  audienceReviewsContainer.innerHTML = "";

  // Render reviews
  movieReviews.forEach((review) => {
    const reviewContainer = document.createElement("div");

    const audienceReview = document.createElement("p");
    audienceReview.textContent = review.usersReviews.userReview;

    const audienceName = document.createElement("span");
    audienceName.textContent = `user name : ${review.usersReviews.userName}`;

    reviewContainer.appendChild(audienceReview);
    reviewContainer.appendChild(audienceName);
    audienceReviewsContainer.appendChild(reviewContainer);
  });
}

// add review to json file
async function addUsersReviews(newReview) {
  try {
    const response = await fetch("http://localhost:3001/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      throw new Error("Failed to add post");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error something went wrong !", error);
  }
}

// get users reviews from json server
async function fetchUsersReviews() {
  try {
    const response = await fetch("http://localhost:3001/reviews");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error something went wrong !", error);
  }
}
// add to favorite list
function addFavoriteToUser(userEmail, movieId) {
  // Get the user object from localStorage
  const userKey = `user_${userEmail}`;
  const user = JSON.parse(localStorage.getItem(userKey));

  // Avoid duplicates
  if (!user.userFavorites.includes(movieId)) {
    user.userFavorites.push(movieId);
    localStorage.setItem(userKey, JSON.stringify(user));
    alert(`Movie added to ${user.name}'s favorites.`);
  } else {
    alert("Movie already in favorites.");
  }
}

addToFavoritesBtn.addEventListener("click", function () {
  addFavoriteToUser(userEmail, movieId);
});
