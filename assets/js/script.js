const slider = document.getElementById("cardSlider");
const goBack = document.getElementById("arrow_left");
const goForward = document.getElementById("arrow_right");

// scroll card slider , direction 1==right , -1==left
function scrollSlider(direction) {
  const scrollAmount = 220;
  slider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

goBack.addEventListener("click", function () {
  scrollSlider(-1);
});

goForward.addEventListener("click", function () {
  scrollSlider(1);
});

// API Key
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTY0NGYyYTE2ZDA0MjNhZWI1YzU5N2RlZTk5ODMzNCIsIm5iZiI6MTc0NzU1NDA1NS4yMTgsInN1YiI6IjY4Mjk4ZjA3ZDViMjFmNjM2ODY0ODgyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YFZHsdktsmSqSOVRNH8Mkm2b55uTlvFm1py01DTudS8",
  },
};

// fetching trending data
async function fetchMovies(type = "all", time = "day") {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time}?language=en-US`,
      options
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const moviesArray = data.results;
    const topTenMovies = moviesArray.slice(0, 10);
    renderTrendingMovies(topTenMovies);
  } catch (err) {
    console.error("Failed to fetch movies:", err);
  }
}
fetchMovies();

function renderTrendingMovies(moviesArr) {
  let html = "";
  moviesArr.forEach((movie, i) => {
    return (html += ` <div class="card">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path || movie.profile_path
            }" alt="movie number ${i}">
          </div>`);
  });
  slider.innerHTML = html;
}
