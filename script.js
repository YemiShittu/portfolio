const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");


// =========================================================
// DARK / LIGHT MODE
// =========================================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");
    themeIcon.textContent = "🌙";

} else if (savedTheme === "dark") {

    document.body.classList.remove("light-mode");
    themeIcon.textContent = "☀️";

} else {

    const prefersLight =
        window.matchMedia("(prefers-color-scheme: light)").matches;

    if (prefersLight) {
        document.body.classList.add("light-mode");
        themeIcon.textContent = "🌙";
    }

}


// =========================================================
// TOGGLE DARK / LIGHT MODE
// =========================================================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    if (isLightMode) {

        themeIcon.textContent = "🌙";
        localStorage.setItem("theme", "light");

    } else {

        themeIcon.textContent = "☀️";
        localStorage.setItem("theme", "dark");

    }

});


// =========================================================
// MOBILE NAVIGATION
// =========================================================

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.classList.toggle("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


// =========================================================
// CLOSE MOBILE MENU WHEN LINK IS CLICKED
// =========================================================

const navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

// =========================================================
// WEB3FORMS CONTACT FORM
// =========================================================

const form = document.getElementById("form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");


form.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Disable button while submitting
    submitBtn.disabled = true;

    // Show loading state
    submitBtn.innerHTML = `
        <span class="spinner"></span>
        Sending...
    `;

    // Clear previous message
    formStatus.textContent = "";
    formStatus.className = "form-status";


    // Collect form data
    const formData = new FormData(form);


    try {

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method: "POST",
                body: formData
            }
        );


        const result = await response.json();


        if (result.success) {

            // Clear the form
            form.reset();


            // Show success message
            formStatus.textContent =
                "Message received successfully! I'll get back to you soon.";

            formStatus.className =
                "form-status success show";


            // Change button
            submitBtn.innerHTML = "Message Sent ✓";


            // Remove success message after 5 seconds
            setTimeout(() => {

                formStatus.classList.remove("show");

                setTimeout(() => {
                    formStatus.textContent = "";
                }, 300);

            }, 5000);


            // Restore button after 3 seconds
            setTimeout(() => {

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    "Send Message";

            }, 3000);


        } else {

            throw new Error(
                result.message || "Something went wrong."
            );

        }


    } catch (error) {

        console.error(
            "Web3Forms Error:",
            error
        );


        // Show error message
        formStatus.textContent =
            "Sorry, your message could not be sent. Please try again.";

        formStatus.className =
            "form-status error show";


        // Restore button
        submitBtn.disabled = false;

        submitBtn.innerHTML =
            "Send Message";


        // Remove error message after 5 seconds
        setTimeout(() => {

            formStatus.classList.remove("show");

            setTimeout(() => {
                formStatus.textContent = "";
            }, 300);

        }, 5000);

    }

});