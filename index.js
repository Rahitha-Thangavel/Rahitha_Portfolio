const skillIcons = {
    "Python": "fa-brands fa-python",
    "JavaScript": "fa-brands fa-js",
    "C": "fa-solid fa-c",
    "C++": "fa-solid fa-plus",
    "Java": "fa-brands fa-java",
    "Node.js": "fa-brands fa-node-js",
    "Express.js": "fa-solid fa-server",
    "MongoDB": "fa-solid fa-database",
    "MySQL": "fa-solid fa-table",
    "ChromaDB": "fa-solid fa-brain",
    "Docker": "fa-brands fa-docker",
    "Microsoft Azure": "fa-brands fa-microsoft",
    "Excel (Pivot Tables)": "fa-solid fa-file-excel",
    "Power BI": "fa-solid fa-chart-bar",
    "Tableau": "fa-solid fa-chart-pie",
    "Preprocessing": "fa-solid fa-filter",
    "Clustering": "fa-solid fa-object-group",
    "Classification": "fa-solid fa-tags",
    "RAG": "fa-solid fa-book-open",
    "LangChain": "fa-solid fa-link",
    "LLaMA 3": "fa-solid fa-microchip",
    "Leadership": "fa-solid fa-users",
    "Adaptability": "fa-solid fa-flex",
    "Teamwork": "fa-solid fa-people-group",
    "Continuous Learning": "fa-solid fa-graduation-cap",
    "Problem Solving": "fa-solid fa-lightbulb"
};

document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadProjects();
    loadCertifications();
    loadAchievements();
    loadExtraCurriculars();
    loadTestimonials();
    initRatings();
    initTestimonialSlider();
});

async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skills = await response.json();
        const track = document.getElementById('skills-track');

        // Flatten all skills into a single list for the marquee
        const allSkills = Object.values(skills).flat();

        // Double the skills for seamless loop
        const displaySkills = [...allSkills, ...allSkills];

        displaySkills.forEach(skill => {
            const pill = document.createElement('div');
            pill.className = 'skill-pill';
            const iconClass = skillIcons[skill] || 'fa-solid fa-code';
            pill.innerHTML = `<i class="${iconClass}"></i> <span>${skill}</span>`;
            track.appendChild(pill);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

const techColors = {
    "Python": "#3572A5",
    "JavaScript": "#f1e05a",
    "Java": "#b07219",
    "C": "#555555",
    "C++": "#f34b7d",
    "React": "#61dafb",
    "Node.js": "#339933",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Jupyter Notebook": "#DA5B0B",
    "SQL": "#e38c00"
};

async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const container = document.getElementById('projects-container');

        projects.forEach((project) => {
            const card = document.createElement('div');
            card.className = 'project-card-new glass';

            const mainTech = project.tech[0] || 'Code';
            const techColor = techColors[mainTech] || '#cccccc';

            card.innerHTML = `
                <div class="project-content">
                    <div class="project-header">
                        <a href="${project.github}" target="_blank" class="project-title-link">
                            <h3>${project.name}</h3>
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                    <div class="project-description">
                        <p>${project.description}</p>
                    </div>
                    <div class="project-footer">
                        <div class="project-meta">
                            <span class="meta-item tech">
                                <span class="tech-dot" style="background-color: ${techColor}"></span>
                                ${mainTech}
                            </span>
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function loadCertifications() {
    try {
        const response = await fetch('data/certifications.json');
        const certs = await response.json();
        const container = document.getElementById('certs-container');

        certs.forEach(cert => {
            const certItem = document.createElement('div');
            certItem.className = 'cert-card glass';
            certItem.innerHTML = `
                <img src="${cert.image}" alt="${cert.title}">
                <h4>${cert.title}</h4>
                <p>${cert.platform}</p>
            `;
            container.appendChild(certItem);
        });
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

async function loadAchievements() {
    try {
        const response = await fetch('data/achievements.json');
        const groups = await response.json();
        const container = document.getElementById('achievements-container');

        groups.forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'achievement-group';

            let eventsHtml = '';
            group.events.forEach(event => {
                const imagesHtml = (event.images || []).map(src => `
                    <div class="gallery-item glass">
                        <img src="${src}" alt="${event.name}" loading="lazy">
                    </div>
                `).join('');

                eventsHtml += `
                    <div class="achievement-event">
                        <div class="event-header">
                            <h4>${event.name}</h4>
                            <p>${event.detail}</p>
                        </div>
                        <div class="event-gallery">
                            ${imagesHtml}
                        </div>
                    </div>
                `;
            });

            groupEl.innerHTML = `
                <div class="group-description">
                    <p>${group.description}</p>
                </div>
                <div class="events-container">
                    ${eventsHtml}
                </div>
            `;
            container.appendChild(groupEl);
        });
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

async function loadExtraCurriculars() {
    try {
        const response = await fetch('data/extra_curriculars.json');
        const groups = await response.json();
        const container = document.getElementById('beyond-academics-container');
        if (!container) return;

        groups.forEach(group => {
            const groupEl = document.createElement('div');
            groupEl.className = 'achievement-group';

            let eventsHtml = '';
            group.events.forEach(event => {
                const imagesHtml = (event.images || []).map(src => `
                    <div class="gallery-item glass">
                        <img src="${src}" alt="${event.name}" loading="lazy">
                    </div>
                `).join('');

                eventsHtml += `
                    <div class="achievement-event">
                        <div class="event-header">
                            <h4>${event.name}</h4>
                            <p>${event.detail}</p>
                        </div>
                        <div class="event-gallery">
                            ${imagesHtml}
                        </div>
                    </div>
                `;
            });

            groupEl.innerHTML = `
                <div class="group-description">
                    <h3>${group.title}</h3>
                    <p>${group.description}</p>
                </div>
                <div class="events-container">
                    ${eventsHtml}
                </div>
            `;
            container.appendChild(groupEl);
        });
    } catch (error) {
        console.error('Error loading extra-curriculars:', error);
    }
}



async function loadTestimonials() {
    try {
        const response = await fetch('data/testimonials.json');
        const testimonials = await response.json();
        const container = document.getElementById('testimonials-container');
        if (!container) return;

        testimonials.forEach(t => {
            const card = document.createElement('div');
            card.className = 'testimonial-card glass';
            card.innerHTML = `
                <div class="stars">
                    ${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}
                </div>
                <blockquote>"${t.comment}"</blockquote>
                <div class="testimonial-user">
                    <img src="${t.image}" alt="${t.name}">
                    <div class="user-info">
                        <h4>${t.name}</h4>
                        <p>${t.role}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

function initRatings() {
    const stars = document.querySelectorAll('.rating-input .stars i');
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-rating');
            highlightStars(rating);
        });

        star.addEventListener('mouseout', () => {
            highlightStars(currentRating);
        });

        star.addEventListener('click', () => {
            currentRating = star.getAttribute('data-rating');
            highlightStars(currentRating);
        });
    });

    function highlightStars(rating) {
        stars.forEach(s => {
            if (s.getAttribute('data-rating') <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }
}

function initTestimonialSlider() {
    const slider = document.getElementById('testimonials-container');
    const prev = document.querySelector('.slider-btn.prev');
    const next = document.querySelector('.slider-btn.next');

    if (slider && prev && next) {
        prev.addEventListener('click', () => {
            slider.scrollLeft -= 500;
        });
        next.addEventListener('click', () => {
            slider.scrollLeft += 500;
        });
    }
}

// Intersection Observer for scroll reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .project-card, .cert-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Improved Anti-Gravity Parallax
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
});

function animate() {
    const glassElements = document.querySelectorAll('.glass');
    glassElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 20;
        const x = mouseX * speed;
        const y = mouseY * speed;
        el.style.transform = `translate(${x}px, ${y}px)`;
    });
    requestAnimationFrame(animate);
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');

    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            toggle.querySelector('i').classList.toggle('fa-bars');
            toggle.querySelector('i').classList.toggle('fa-xmark');
        });
    }
}

// Scroll Spy — highlights the active nav link based on visible section
function initScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-40% 0px -55% 0px', // triggers when section is in the middle ~40% of viewport
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

// Call init on load
window.onload = () => {
    initScrollReveal();
    animate();
    initMobileMenu();
    initScrollSpy();
};
