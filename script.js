// ==================== NAVIGATION ==================== 
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    const isActive = navMenu.classList.contains('active');

    spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = isActive ? '0' : '1';
    spans[2].style.transform = isActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.querySelectorAll('span').forEach((span, i) => {
            span.style.transform = 'none';
            if (i === 1) span.style.opacity = '1';
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// ==================== MENU SYSTEM ====================
const menuData = {
    entrees: [
        { name: 'Rouleaux de Printemps', description: 'Rouleaux frais aux légumes et crevettes', price: '8€' },
        { name: 'Raviolis Vapeur', description: 'Raviolis faits maison à la viande de porc', price: '9€' },
        { name: 'Nems au Poulet', description: 'Nems croustillants servis avec sauce aigre-douce', price: '7€' },
        { name: 'Soupe Won-Ton', description: 'Soupe traditionnelle aux raviolis', price: '6€' },
        { name: 'Salade de Concombre', description: 'Concombre mariné aux épices chinoises', price: '5€' },
        { name: 'Beignets de Crevettes', description: 'Crevettes panées servies avec sauce soja', price: '10€' }
    ],
    plats: [
        { name: 'Canard Laqué de Pékin', description: 'Canard rôti traditionnel avec crêpes', price: '32€' },
        { name: 'Bœuf Sauté aux Oignons', description: 'Bœuf tendre sauté avec oignons et sauce soja', price: '18€' },
        { name: 'Poulet Kung Pao', description: 'Poulet épicé aux cacahuètes et légumes', price: '16€' },
        { name: 'Porc Aigre-Doux', description: 'Porc croustillant sauce aigre-douce', price: '17€' },
        { name: 'Crevettes Sauce Piquante', description: 'Crevettes sautées sauce épicée', price: '22€' },
        { name: 'Tofu Ma Po', description: 'Tofu soyeux sauce épicée au porc haché', price: '14€' },
        { name: 'Riz Cantonais', description: 'Riz sauté aux légumes et viandes', price: '15€' },
        { name: 'Nouilles Sautées', description: 'Nouilles fraîches sautées aux légumes', price: '13€' }
    ],
    desserts: [
        { name: 'Beignets de Banane', description: 'Bananes frites au miel et sésame', price: '7€' },
        { name: 'Perles de Coco', description: 'Dessert traditionnel au lait de coco', price: '6€' },
        { name: 'Litchis au Sirop', description: 'Litchis frais en conserve', price: '5€' },
        { name: 'Gâteau de Lune', description: 'Pâtisserie traditionnelle aux haricots rouges', price: '8€' },
        { name: 'Salade de Fruits Exotiques', description: 'Mangue, litchi, fruit du dragon', price: '7€' }
    ],
    boissons: [
        { name: 'Thé Vert Jasmin', description: 'Thé vert parfumé aux fleurs de jasmin', price: '4€' },
        { name: 'Thé Oolong', description: 'Thé semi-fermenté traditionnel', price: '5€' },
        { name: 'Bière Tsingtao', description: 'Bière chinoise premium', price: '6€' },
        { name: 'Vin de Riz', description: 'Vin traditionnel chinois', price: '8€' },
        { name: 'Jus de Litchi', description: 'Jus de litchi frais', price: '5€' },
        { name: 'Bubble Tea', description: 'Thé au lait avec perles de tapioca', price: '6€' }
    ]
};

const menuItemsContainer = document.getElementById('menuItems');

function loadMenu(category) {
    const items = menuData[category];
    menuItemsContainer.innerHTML = items.map((item, i) => `
        <div class="menu-item" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ${i * 0.05}s ease">
            <div class="menu-item-header">
                <h4>${item.name}</h4>
                <span class="menu-item-price">${item.price}</span>
            </div>
            <p>${item.description}</p>
        </div>
    `).join('');

    // Trigger animation
    requestAnimationFrame(() => {
        menuItemsContainer.querySelectorAll('.menu-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
}

// Initialize menu
loadMenu('entrees');

// Category buttons
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loadMenu(button.dataset.category);
    });
});

// ==================== FORM HANDLING ====================
document.getElementById('reservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Merci pour votre réservation ! Nous vous confirmerons par email sous peu.');
    e.target.reset();
});

// ==================== SCROLL ANIMATIONS ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.specialty-card, .testimonial-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ==================== PARALLAX EFFECT ====================
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

console.log('🐉 Dragon d\'Or - Site chargé avec succès!');
