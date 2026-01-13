/**
 * MAIN JAVASCRIPT - RY Portfolio
 * Menangani: Navbar Fetch, Dark Mode, Burger Menu, & Video Player
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Ambil Navbar secara Asinkron
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Inisialisasi fitur SETELAH elemen HTML navbar masuk ke DOM
                initThemeToggle();
                initBurgerMenu();
            })
            .catch(err => console.error("Gagal memuat navbar:", err));
    }

    // 2. Cek Tema Saat Halaman Pertama Dimuat (Mencegah flash putih)
    applyInitialTheme();
});

// --- FUNGSI-FUNGSI UTAMA ---

function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}

function initThemeToggle() {
    const toggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
    const html = document.documentElement;

    toggles.forEach(btn => {
        if (btn) {
            btn.onclick = () => {
                html.classList.toggle('dark');
                const isDark = html.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            };
        }
    });
}

function initBurgerMenu() {
    const burger = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('navOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;

    if (!burger || !mobileNav) return;

    function toggleMenu() {
        const isClosed = mobileNav.classList.contains('translate-x-full');

        if (isClosed) {
            // Buka: Geser Kanan ke Kiri
            mobileNav.classList.remove('translate-x-full', 'invisible');
            mobileNav.classList.add('translate-x-0', 'visible');
            if (overlay) overlay.classList.remove('opacity-0', 'pointer-events-none');
            body.classList.add('overflow-hidden');
        } else {
            // Tutup: Geser Kiri ke Kanan
            mobileNav.classList.add('translate-x-full', 'invisible');
            mobileNav.classList.remove('translate-x-0', 'visible');
            if (overlay) overlay.classList.add('opacity-0', 'pointer-events-none');
            body.classList.remove('overflow-hidden');
        }

        // Animasi Burger Ikon
        burger.querySelector('.line-1').classList.toggle('rotate-45');
        burger.querySelector('.line-1').classList.toggle('translate-y-2');
        burger.querySelector('.line-2').classList.toggle('opacity-0');
        burger.querySelector('.line-3').classList.toggle('-rotate-45');
        burger.querySelector('.line-3').classList.toggle('-translate-y-2');
    }

    burger.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;

    mobileLinks.forEach(link => {
        link.onclick = () => {
            if (!mobileNav.classList.contains('translate-x-full')) toggleMenu();
        };
    });
}

// --- FUNGSI KHUSUS HALAMAN VIDEO ---
// Fungsi ini dipanggil langsung dari HTML (onclick)
function playVideo(container) {
    const thumbnail = container.querySelector('.thumbnail');
    const iframe = container.querySelector('iframe');
    const overlay = container.querySelector('div.absolute');

    if (iframe && thumbnail) {
        iframe.src = iframe.getAttribute('data-src');
        iframe.classList.remove('hidden');
        thumbnail.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
    }
}