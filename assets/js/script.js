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
