function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);

    navMenu.classList.toggle('active');
}

document.getElementById('hamburger').addEventListener('click', toggleMenu);

function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');

    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');

        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(image => {
    image.addEventListener('click', () => {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
    });
});

// Close on click (background or button)
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImage) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
}

// Close with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});


/* ------------------------------
   Form Validation
------------------------------ */

const form = document.getElementById('contact-form');

const fields = {
    name: {
        input: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: value => value.trim() !== '',
        message: 'Please enter your name.'
    },
    email: {
        input: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address.'
    },
    message: {
        input: document.getElementById('message'),
        error: document.getElementById('message-error'),
        validate: value => value.trim() !== '',
        message: 'Please enter a message.'
    }
};

// Real-time validation
Object.values(fields).forEach(field => {
    field.input.addEventListener('input', () => {
        if (field.validate(field.input.value)) {
            field.error.textContent = '';
            field.input.classList.remove('error-border');
        } else {
            field.error.textContent = field.message;
            field.input.classList.add('error-border');
        }
    });
});

// Validate on submit
form.addEventListener('submit', event => {
    let valid = true;

    Object.values(fields).forEach(field => {
        if (!field.validate(field.input.value)) {
            field.error.textContent = field.message;
            field.input.classList.add('error-border');
            valid = false;
        }
    });

    if (!valid) {
        event.preventDefault();
    }
});
