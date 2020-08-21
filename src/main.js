import "./styles/main.pcss";
if (process.env.NODE_ENV === "development") {
  require("file-loader!./index.pug");
}

import "./scripts/skills";
import "./scripts/works";
import "./scripts/reviews";

//------------------------------ menu ------------------------------
  
const menuButton = document.querySelector(".header__menu-button");
const menuBody = document.querySelector(".header__menu-container");

let menuButtonChange = false;

const menuAction = function () {
  menuButtonChange = !menuButtonChange;

  if (menuButtonChange) {    
    menuBody.classList.add("header__menu-container--active");
  } else {    
    menuBody.classList.remove("header__menu-container--active");
  }
};

menuButton.addEventListener("click", function() {
  menuAction();
});
