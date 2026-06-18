/* ========================= */
/* GASTRACK NAMA TAMU (URL)  */
/* ========================= */
function muatNamaTamu() {
    const urlParams = new URLSearchParams(window.location.search);
    let namaTamu = urlParams.get('to');
    const elemenNama = document.getElementById("nama-tamu");
    
    if (elemenNama) {
        if (namaTamu) {
            elemenNama.innerText = decodeURIComponent(namaTamu);
        } else {
            elemenNama.innerText = "Teman-teman & Sahabat";
        }
    }
}

// Jalankan langsung tanpa nunggu browser ribet
muatNamaTamu();

/* ========================= */
/* LOADER */
/* ========================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        if (loader) {
            loader.style.opacity = "0";

            setTimeout(function () {
                loader.style.display = "none";
            }, 1000);
        }

    }, 2500);

});

/* ========================= */
/* ELEMENTS */
/* ========================= */

const openBtn = document.getElementById("openInvitationBtn");
const envelopeScreen = document.getElementById("envelopeScreen");
const music = document.getElementById("birthdayMusic");
const musicBtn = document.getElementById("musicBtn");

const slider = document.getElementById("slider");
const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const fullscreenViewer = document.getElementById("fullscreenViewer");
const fullscreenImage = document.getElementById("fullscreenImage");
const closeFullscreen = document.getElementById("closeFullscreen");

/* ========================= */
/* OPEN INVITATION */
/* ========================= */

if (openBtn) {

    openBtn.addEventListener("click", function () {

        if (envelopeScreen) {
            envelopeScreen.style.display = "none";
        }

        document.body.classList.remove("lock-scroll");

        if (music) {
            music.play().catch(function () {});
        }

        startHearts();
        startGlitter();

    });

}

/* ========================= */
/* MUSIC CONTROL */
/* ========================= */

if (musicBtn && music) {

    musicBtn.addEventListener("click", function () {

        if (music.paused) {

            music.play();

            musicBtn.innerHTML = "🎵 Pause Music";

        } else {

            music.pause();

            musicBtn.innerHTML = "🎵 Play Music";

        }

    });

}

/* ========================= */
/* COUNTDOWN */
/* ========================= */

const targetDate = new Date("2026-06-21T15:00:00").getTime();

setInterval(function () {

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    const d = document.getElementById("days");
    const h = document.getElementById("hours");
    const m = document.getElementById("minutes");
    const s = document.getElementById("seconds");

    if (d) d.innerHTML = days;
    if (h) h.innerHTML = hours;
    if (m) m.innerHTML = minutes;
    if (s) s.innerHTML = seconds;

}, 1000);

/* ========================= */
/* SLIDER */
/* ========================= */

let currentSlide = 0;

function showSlide(index) {

    if (!slider || slides.length === 0) return;

    if (index < 0) {
        currentSlide = slides.length - 1;
    } else if (index >= slides.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    slider.style.transform =
        "translateX(-" + (currentSlide * 100) + "%)";
}

if (nextBtn) {

    nextBtn.addEventListener("click", function () {
        showSlide(currentSlide + 1);
    });

}

if (prevBtn) {

    prevBtn.addEventListener("click", function () {
        showSlide(currentSlide - 1);
    });

}

setInterval(function () {
    showSlide(currentSlide + 1);
}, 4000);

/* ========================= */
/* SWIPE MOBILE */
/* ========================= */

let touchStartX = 0;

if (slider) {

    slider.addEventListener("touchstart", function (e) {

        touchStartX = e.changedTouches[0].screenX;

    });

    slider.addEventListener("touchend", function (e) {

        const touchEndX = e.changedTouches[0].screenX;

        if (touchEndX < touchStartX - 50) {
            showSlide(currentSlide + 1);
        }

        if (touchEndX > touchStartX + 50) {
            showSlide(currentSlide - 1);
        }

    });

}

/* ========================= */
/* FULLSCREEN */
/* ========================= */

slides.forEach(function (slide) {

    slide.addEventListener("click", function () {

        if (!fullscreenViewer || !fullscreenImage) return;

        fullscreenViewer.style.display = "flex";
        fullscreenImage.src = slide.src;

    });

});

if (closeFullscreen) {

    closeFullscreen.addEventListener("click", function () {

        fullscreenViewer.style.display = "none";

    });

}

/* ========================= */
/* HEARTS */
/* ========================= */

function startHearts() {

    const container =
        document.getElementById("heart-container");

    if (!container) return;

    setInterval(function () {

        const heart =
            document.createElement("div");

        heart.innerHTML = "💜";
        heart.className = "heart";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.position = "fixed";
        heart.style.bottom = "-20px";

        container.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 6000);

    }, 300);

}

/* ========================= */
/* GLITTER */
/* ========================= */

function startGlitter() {

    const container =
        document.getElementById("glitter-container");

    if (!container) return;

    setInterval(function () {

        const dot =
            document.createElement("div");

        dot.style.position = "fixed";
        dot.style.width = "4px";
        dot.style.height = "4px";
        dot.style.borderRadius = "50%";
        dot.style.background = "#fff";

        dot.style.left =
            Math.random() * 100 + "%";

        dot.style.top =
            Math.random() * 100 + "%";

        container.appendChild(dot);

        setTimeout(function () {
            dot.remove();
        }, 2000);

    }, 120);

}

/* ========================= */
/* REVEAL */
/* ========================= */

const reveals =
document.querySelectorAll(".reveal");

function revealElements() {

    reveals.forEach(function (el) {

        const top =
            el.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            el.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealElements);

revealElements();
