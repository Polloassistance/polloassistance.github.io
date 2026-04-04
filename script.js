/* ============================================================
   Pollo Assistance - GitHub Pages Website
   Script principal: navbar scroll + menu movil
   ============================================================ */

// --- Navbar: cambiar estilo al hacer scroll ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Menu movil: toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
});

// --- Cerrar menu al hacer clic en un enlace ---
navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
        navLinks.classList.remove('open');
    });
});
