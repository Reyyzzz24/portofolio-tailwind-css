/**
 * MAIN JAVASCRIPT - RY Portfolio
 * Menangani: Navbar Fetch, Dark Mode, Burger Menu, Resume Dropdown & Video Player
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
                initResumeDropdown(); // Fungsi baru untuk dropdown resume mobile
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
                // HAPUS efek scale-90 di sini agar tidak ada bounce/guncangan
                
                // Toggle Tema secara langsung
                if (html.classList.contains('dark')) {
                    html.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    html.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
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
            mobileNav.classList.remove('translate-x-full', 'invisible');
            mobileNav.classList.add('translate-x-0', 'visible');
            if (overlay) overlay.classList.remove('opacity-0', 'pointer-events-none');
            body.classList.add('overflow-hidden');
        } else {
            mobileNav.classList.add('translate-x-full', 'invisible');
            mobileNav.classList.remove('translate-x-0', 'visible');
            if (overlay) overlay.classList.add('opacity-0', 'pointer-events-none');
            body.classList.remove('overflow-hidden');
        }

        // Animasi Burger Ikon
        const l1 = burger.querySelector('.line-1');
        const l2 = burger.querySelector('.line-2');
        const l3 = burger.querySelector('.line-3');
        
        if(l1) { l1.classList.toggle('rotate-45'); l1.classList.toggle('translate-y-2'); }
        if(l2) { l2.classList.toggle('opacity-0'); }
        if(l3) { l3.classList.toggle('-rotate-45'); l3.classList.toggle('-translate-y-2'); }
    }

    burger.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;

    mobileLinks.forEach(link => {
        link.onclick = () => {
            if (!mobileNav.classList.contains('translate-x-full')) toggleMenu();
        };
    });
}

// --- FUNGSI DROPDOWN RESUME MOBILE ---
function initResumeDropdown() {
    const btn = document.getElementById('resumeBtnMobile');
    const dropdown = document.getElementById('resumeDropdownMobile');
    const arrow = document.getElementById('resumeArrow');

    if (btn && dropdown) {
        btn.onclick = (e) => {
            e.stopPropagation();
            
            const isClosed = dropdown.classList.contains('max-h-0');

            if (isClosed) {
                // BUKA
                dropdown.classList.remove('max-h-0', 'opacity-0', 'border-transparent', 'dark:border-transparent');
                dropdown.classList.add('max-h-60', 'opacity-100', 'border-gray-100', 'dark:border-gray-700');
                
                // Animasi Panah Berputar
                if(arrow) arrow.classList.add('rotate-180');
            } else {
                // TUTUP
                dropdown.classList.add('max-h-0', 'opacity-0', 'border-transparent', 'dark:border-transparent');
                dropdown.classList.remove('max-h-60', 'opacity-100', 'border-gray-100', 'dark:border-gray-700');
                
                // Kembalikan Panah
                if(arrow) arrow.classList.remove('rotate-180');
            }
        };
    }
}

// --- FUNGSI KHUSUS HALAMAN VIDEO ---
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