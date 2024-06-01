document.addEventListener("DOMContentLoaded", function() {
    // Determina la ruta correcta a navbar.html
    let navbarPath;//
    if (window.location.pathname.includes("/cut_1/")) {
        navbarPath = "../../pages/navbar.html";
    } else {
        navbarPath = "/pages/navbar.html";
    }
    
    // Fetch the navbar.html content and insert it into the header
    fetch(navbarPath)
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
        .catch(error => console.error('Error loading the navbar:', error));
});
