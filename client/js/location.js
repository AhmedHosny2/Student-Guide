window.onload = function () {
  const loadingScreen = document.getElementById("test");
  loadingScreen.style.display = "none";
};

function sliderFunction(slider, items, next, prev, dots) {
  let lengthItems = items.length - 1;
  let active = 0;
  next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
  };
  prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
  };
  let refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
  function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + "px";
    //
    let last_active_dot = document.querySelector(".slider .dots li.active");
    last_active_dot.classList.remove("active");
    dots[active].classList.add("active");

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      next.click();
    }, 3000);
  }

  dots.forEach((li, key) => {
    li.addEventListener("click", () => {
      active = key;
      reloadSlider();
    });
  });
  window.onresize = function () {
    reloadSlider();
  };
}

const librarySlider = document.querySelector(".librarySlider .list");
const libraryItems = document.querySelectorAll(".librarySlider .list .library");
const libraryNext = document.getElementById("nextLibrary");
const libraryPrev = document.getElementById("prevLibrary");
const libraryDots = document.querySelectorAll(".librarySlider .libraryDots li");

sliderFunction(
  librarySlider,
  libraryItems,
  libraryNext,
  libraryPrev,
  libraryDots
);

const poolSlider = document.querySelector(".poolSlider .list");
const poolItems = document.querySelectorAll(".poolSlider .list .pool");
const poolNext = document.getElementById("nextPool");
const poolPrev = document.getElementById("prevPool");
const poolDots = document.querySelectorAll(".poolSlider .poolDots li");

sliderFunction(
  poolSlider,
  poolItems,
  poolNext,
  poolPrev,
  poolDots
);

