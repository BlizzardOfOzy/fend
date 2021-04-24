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
const sections = document.getElementsByTagName("section");
let navBarList = document.getElementById("navbar__list");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isOnScreen(element) {
    return element.getBoundingClientRect().top >= 0 && 
    element.getBoundingClientRect().top < window.innerHeight;
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
buildNavBar();


// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", setActiveSection);


// Scroll to anchor ID using scrollTO event
navBarList.addEventListener("click", scrollToSection);


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
function buildNavBar() {
    // Fragment so we only need to re-render once
    const navBarFragment = document.createDocumentFragment();
    for (const section of sections) {
        let listItem = document.createElement("li");

        let sectionLink = document.createElement("a");
        // Href for accessibility, though we replace the link with a scroll action
        sectionLink.href = "#" + section.id;
        // Data attr for easy access
        sectionLink.setAttribute("data-section-id", section.id);
        sectionLink.textContent = section.dataset.nav;
        // For css styling
        sectionLink.className = "menu__link";
        listItem.appendChild(sectionLink);
        navBarFragment.appendChild(listItem);
    }

    navBarList.appendChild(navBarFragment);
}

// Scroll to section on link click
function scrollToSection(event) {
    event.preventDefault();
    document.getElementById(event.target.getAttribute("data-section-id")).scrollIntoView();
}

// Set sections as active
function setActiveSection() {
    let sectionsOnScreen = Array.from(sections).filter(isOnScreen);
    // Sort by position
    sectionsOnScreen.sort((element1, element2) => {
        return element1.getBoundingClientRect().top - element2.getBoundingClientRect().top;
    });
    // Drop all existing active sections
    for (let section of document.getElementsByClassName("your-active-class")) {
        section.classList.remove("your-active-class");
    }
    // Set current active section
    if (sectionsOnScreen.length > 0) {
        sectionsOnScreen[0].classList.add("your-active-class");
    }
}
