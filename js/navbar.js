document.addEventListener("DOMContentLoaded", function() {
    // Determina la ruta correcta a navbar.html
    let navbarPath;
    if (window.location.pathname.includes("/pages/")) {
        navbarPath = "../pages/navbar.html";
    } else {
        navbarPath = "pages/navbar.html";
    }
    
    // Fetch the navbar.html content and insert it into the header
    fetch(navbarPath)
        .then(response => response.text())
        .then(data => {
            // Insert the navbar into the header element
            document.querySelector("header").innerHTML = data;
        })
        .catch(error => console.error('Error loading the navbar:', error));
});
