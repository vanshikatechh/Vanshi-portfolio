/* =========================================================
   VANSHI.CODES — MASTER JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   01 — PAGE LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const pageLoader = document.getElementById("pageLoader");

    if (pageLoader) {

        window.addEventListener("load", () => {

            setTimeout(() => {
                pageLoader.classList.add("loaded");
            }, 400);

        });

    }

});


/* =========================================================
   02 — HEADER SCROLL EFFECT
========================================================= */

const siteHeader = document.querySelector(".site-header");

function updateHeader() {

    if (!siteHeader) return;

    if (window.scrollY > 30) {
        siteHeader.classList.add("scrolled");
    } else {
        siteHeader.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


/* =========================================================
   03 — MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove("menu-open");

}


function openMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.add("active");

    mobileMenu.classList.add("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add("menu-open");

}


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.contains("open");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });

}


/* =========================================================
   04 — ESCAPE KEY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    closeMobileMenu();

    closeChat();

});


/* =========================================================
   05 — REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}




/* =========================================
   CONTACT FORM — WEB3FORMS
========================================= */

const projectForm = document.getElementById("projectForm");
const formStatus = document.getElementById("formStatus");

if (projectForm && formStatus) {

    projectForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = projectForm.querySelector(".form-submit");

        if (!submitButton) return;

        const originalButtonText = submitButton.innerHTML;

        /* Basic validation */
        if (!projectForm.checkValidity()) {
            projectForm.reportValidity();
            return;
        }

        /* Loading state */
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        formStatus.className = "form-status";
        formStatus.textContent = "Sending your project inquiry...";

        const formData = new FormData(projectForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {

                formStatus.className =
                    "form-status success";

                formStatus.textContent =
                    "Your inquiry has been sent successfully. I’ll get back to you soon.";

                projectForm.reset();

                submitButton.innerHTML =
                    "Inquiry Sent ✓";

            } else {

                throw new Error(
                    result.message ||
                    "Unable to send your inquiry."
                );
            }

        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );

            formStatus.className =
                "form-status error";

            formStatus.textContent =
                "Something went wrong. Please try again in a moment.";

            submitButton.innerHTML =
                originalButtonText;

        } finally {

            submitButton.disabled = false;

            if (
                submitButton.innerHTML ===
                "Sending..."
            ) {
                submitButton.innerHTML =
                    originalButtonText;
            }

        }

    });

}

            
/* =========================================================
   09 — PREVENT PLACEHOLDER LINKS FROM JUMPING
========================================================= */

const placeholderLinks =
    document.querySelectorAll(
        'a[href="#"]'
    );


placeholderLinks.forEach(link => {

    /*
        Only prevent empty placeholder links.
        Real project/social links can later replace #.
    */

    link.addEventListener("click", event => {

        event.preventDefault();

    });

});


/* =========================================================
   10 — CURRENT YEAR
========================================================= */

const currentYear =
    new Date().getFullYear();

const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );


yearElements.forEach(element => {

    element.textContent = currentYear;

});


/* =========================================================
   11 — IMAGE ERROR HANDLING
========================================================= */

const pageImages =
    document.querySelectorAll("img");


pageImages.forEach(image => {

    image.addEventListener("error", () => {

        image.classList.add(
            "image-error"
        );

        /*
            Do not replace missing images with
            random external images.

            This keeps the website predictable
            when uploaded online.
        */

    });

});


/* =========================================================
   12 — RESIZE SAFETY
========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer =
            setTimeout(() => {

                /*
                    If the screen becomes desktop-sized,
                    make sure the mobile menu is closed.
                */

                if (
                    window.innerWidth > 800
                ) {

                    closeMobileMenu();

                }

            }, 150);

    },
    {
        passive: true
    }
);


/* =========================================================
   13 — PAGE READY
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);