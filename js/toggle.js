document.addEventListener("DOMContentLoaded", function() {
    const toggles = document.querySelectorAll(".toggle");

    toggles.forEach(toggle => {
        const content = toggle.nextElementSibling;
        content.style.display = "none"; // Ensure all content sections are closed on page load

        toggle.addEventListener("click", function() {
            if (content.style.display === "none") {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        });
    });
});
