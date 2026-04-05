// ========================================
// Navigation
// ========================================

const navLinks = document.querySelectorAll('.nav-link');
const navIndicator = document.querySelector('.nav-indicator');

function updateNavIndicator(activeLink) {
    const { left, width } = activeLink.getBoundingClientRect();
    const navMenu = document.querySelector('.nav-menu');
    const navMenuLeft = navMenu.getBoundingClientRect().left;

    navIndicator.style.width = `${width}px`;
    navIndicator.style.transform = `translateX(${left - navMenuLeft}px)`;
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        updateNavIndicator(link);

        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize nav indicator on load
window.addEventListener('load', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        updateNavIndicator(activeLink);
    }
});

// Update nav indicator on window resize
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        updateNavIndicator(activeLink);
    }
});

// ========================================
// Scroll Progress Bar
// ========================================

const progressBar = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    progressBar.style.transform = `scaleX(${scrollPercent})`;
});

// ========================================
// Section Visibility & Nav Updates
// ========================================

const sections = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const navLink = document.querySelector(`[data-section="${sectionId}"]`);

            if (navLink) {
                navLinks.forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
                updateNavIndicator(navLink);
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// ========================================
// Swiper Carousel
// ========================================

const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
        768: {
            slidesPerView: 1,
        }
    }
});

// ========================================
// Sample Projects Data
// ========================================

const projectsData = [
    {
        title: "Mountain Explorer App",
        description: "A mobile app for discovering and tracking alpine hiking trails with real-time weather updates.",
        tags: ["React Native", "Firebase", "Maps API"],
        link: "#"
    },
    {
        title: "Portfolio Dashboard",
        description: "Interactive dashboard showcasing project analytics and performance metrics with data visualization.",
        tags: ["React", "D3.js", "Node.js"],
        link: "#"
    },
    {
        title: "Climate Data Visualizer",
        description: "Web application for exploring global climate patterns and environmental trends with interactive maps.",
        tags: ["Vue.js", "Webpack", "Canvas API"],
        link: "#"
    }
];

// Populate projects grid
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');

    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        projectCard.innerHTML = `
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${project.link}" style="margin-top: auto; color: var(--primary-5); text-decoration: none; font-weight: 500; font-size: 0.875rem;">
                View Project →
            </a>
        `;

        projectsGrid.appendChild(projectCard);
    });
}

// Render projects on load
window.addEventListener('load', () => {
    renderProjects();
});

// ========================================
// Button Event Listeners
// ========================================

const contactButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

contactButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.toLowerCase();

        if (text.includes('contact') || text.includes('touch')) {
            window.location.href = 'mailto:hello@example.com';
        } else if (text.includes('work')) {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        } else if (text.includes('resume')) {
            // Link to resume PDF
            window.open('#resume', '_blank');
        }
    });
});

// ========================================
// Smooth Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Animation already handled by CSS, but you can add more logic here
    console.log('Page loaded and ready!');
});

// ========================================
// Mobile Menu Optimization
// ========================================

// Improve mobile touch interactions
if (window.matchMedia('(max-width: 640px)').matches) {
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        el.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}
