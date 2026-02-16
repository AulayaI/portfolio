document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SELEKTOR ---
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backdrop = document.querySelector('.nav-backdrop');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // --- 2. FUNGSI BACKDROP (KACA MELAYANG - VERSI PRESISI) ---
    function moveBackdrop(element) {
        if (!element || !backdrop || !navMenu) return;

        // Mengambil dimensi dan posisi relatif terhadap .nav-menu
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const left = element.offsetLeft;
        const top = element.offsetTop;

        backdrop.style.width = `${width}px`;
        backdrop.style.height = `${height}px`;
        
        // Gunakan translate untuk posisi yang sangat akurat dan smooth
        backdrop.style.transform = `translate(${left}px, ${top}px)`;
        backdrop.style.opacity = '1';
    }

    // --- 3. LOGIKA NAVIGASI (CLICK & HOVER) ---
    navLinks.forEach(link => {
        // Hover
        link.addEventListener('mouseenter', () => moveBackdrop(link));
        
        // Click
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            moveBackdrop(link);
        });
    });

    // Balikkan ke menu active saat mouse keluar navbar
    navMenu.addEventListener('mouseleave', () => {
        const activeLink = document.querySelector('.nav-link.active');
        activeLink ? moveBackdrop(activeLink) : (backdrop.style.opacity = '0');
    });

    // --- 4. LOGIKA SCROLL (BLUR & SCROLLSPY) ---
    window.addEventListener('scroll', () => {
        // Efek Scrolled pada Navbar
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // ScrollSpy: Update menu aktif berdasarkan posisi scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Gunakan offset 300 agar perpindahan menu terasa pas
            if (window.scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                moveBackdrop(link); // Ini yang bikin kaca GAK STUCK
            }
        });
    });

// --- 5. MOBILE MENU LOGIC (DIPERBAIKI) ---
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('is-active');
        mobileNav.classList.toggle('active');
    });

    // Tambahkan logika update backdrop untuk mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Tutup menu mobile
            hamburger.classList.remove('is-active');
            mobileNav.classList.remove('active');
            
            // Perbarui kelas active dan backdrop
            mobileLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            moveBackdrop(link); // Ini yang memindahkan backdrop ke menu yang dipilih
        });
    });

    // Tutup saat klik luar
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('is-active');
            mobileNav.classList.remove('active');
        }
    });
}

    // --- 6. PARTICLES & TYPED (DIPANGGIL SEKALI) ---
    if(window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f0ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4 },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f0ff", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 1.5 }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } }
            },
            "retina_detect": true
        });
    }

    new Typed('.typing-text', {
        strings: ['Ahmad Ulaya Ibrahim', 'a Network Engineer', 'a Web Developer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // --- 7. WHATSAPP FORM ---
    const waForm = document.getElementById('waForm');
    if(waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const topic = document.getElementById('topic').value;
            const message = document.getElementById('message').value;
            const finalMsg = `Halo Ahmad Ulaya, saya ${name}. Ingin mendiskusikan tentang${topic}.\n\n ${message}`;
            window.open(`https://wa.me/6281259204220?text=${encodeURIComponent(finalMsg)}`, '_blank');
        });
    }

    // Set posisi kaca pertama kali
    setTimeout(() => {
        const initialActive = document.querySelector('.nav-link.active');
        if (initialActive) moveBackdrop(initialActive);
    }, 500);
});

// Tambahkan ini jika belum ada: Menutup menu saat link diklik (Mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// --- 8. AOS INITIALIZATION (Animasi Scroll) ---
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        AOS.init({
            duration: 800,           // Durasi animasi (ms)
            easing: 'ease-out-cubic', // Jenis easing yang smooth
            once: true,              // Animasi hanya sekali per load
            offset: 100,             // Jarak dari viewport untuk trigger
            delay: 0,                // Delay default
            mirror: false,           // Tidak ulang saat scroll ke atas
            anchorPlacement: 'top-bottom' // Trigger saat elemen muncul di bottom viewport
        });
    }, 300);
    
    // Force reflow untuk memastikan animasi berjalan smooth
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});