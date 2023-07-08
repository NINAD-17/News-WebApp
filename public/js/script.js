// Constants 
const userBtn = document.querySelector(".userBtn");
const searchIcon = document.querySelector(".search-icon");
const secSearchBar = document.querySelector(".secondary-search-bar-form");
const profileOptdropdown = document.querySelector(".profile-options-dropdown");
const full = document.querySelector(".full");
const mainSearchBar = document.querySelector(".search-input");

userBtn.addEventListener("click", () => {
    profileOptdropdown.style.display = "block";
});

searchIcon.addEventListener("click", () => {
    secSearchBar.style.display = "block";
    searchIcon.style.display = "none";
});

secSearchBar.addEventListener("click", () => {
   full.style.display = "block"; 
});

mainSearchBar.addEventListener("click", () => {
    full.style.display = "block";
});

if (window.innerWidth >= 850) {
    searchIcon.style.display = "none";
} else {
    searchIcon.style.display = "inline-block";
}

document.addEventListener("click", (event) => {
    if(!userBtn.contains(event.target)) {
        profileOptdropdown.style.display = "none";
    }

    if (!searchIcon.contains(event.target) && !secSearchBar.contains(event.target)) {
        secSearchBar.style.display = "none";
        if(window.innerWidth < 850) {
            searchIcon.style.display = "inline-block";
        }
        else {
            searchIcon.style.display = "none";
        }
    }

    if(!secSearchBar.contains(event.target) && !mainSearchBar.contains(event.target)) {
        full.style.display = "none";
    }
})

window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 5) {
        header.classList.add("blackBG-Header")
    }
    else { 
        fullHeader.classList.remove("blackBG-Header")
    }
})