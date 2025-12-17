'use strict';

// 1. Select all the elements
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// 2. Add 'click' event to every navigation button
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    
    // Get the text from the button (e.g., "Resume")
    // .trim() removes accidental spaces, .toLowerCase() makes it "resume"
    const targetPage = this.textContent.trim().toLowerCase(); 

    // Check if we found the target page in the HTML
    let pageFound = false;

    for (let j = 0; j < pages.length; j++) {
      // If the data-page attribute matches the button text
      if (targetPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navLinks[j].classList.add("active");
        window.scrollTo(0, 0);
        pageFound = true;
      } else {
        pages[j].classList.remove("active");
        navLinks[j].classList.remove("active");
      }
    }

    // Debugging: If it didn't work, this tells you why in the Console
    if (!pageFound) {
      console.error(`Could not find a page with data-page="${targetPage}". Check your HTML spelling!`);
    }

  });
}