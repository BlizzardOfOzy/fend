/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
var sections = document.getElementsByTagName("section");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isOnScreen(element) {
    return element.getBoundingClientRect().top > 0 && 
    element.getBoundingClientRect().top < window.innerHeight;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
document.addEventListener("DOMContentLoaded", buildNavBar);


// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", setActiveSection);


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNavBar() {
    const navBarFragment = document.createDocumentFragment();
    for (const section of sections) {
        var sectionLink = document.createElement("li");
        sectionLink.textContent = section.dataset.nav;
        sectionLink.className = "menu__link";
        navBarFragment.appendChild(sectionLink);
    }

    var navBarList = document.getElementById("navbar__list");
    navBarList.appendChild(navBarFragment);
}

// Scroll to section on link click

// Set sections as active
function setActiveSection() {
    var sectionsOnScreen = Array.from(sections).filter(isOnScreen);
    sectionsOnScreen.sort((element1, element2) => {
        return element1.getBoundingClientRect().top - element2.getBoundingClientRect().top;
    });
    for (var section of document.getElementsByClassName("your-active-class")) {
        section.classList.remove("your-active-class");
    }
    sectionsOnScreen[0].classList.add("your-active-class");
}


