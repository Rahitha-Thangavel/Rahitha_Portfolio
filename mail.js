// ---------- NOTIFICATION SYSTEM ----------
function showNotification(title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${icon}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

// ---------- EMAILJS SETUP ----------
emailjs.init("lDfQnw3DMGKdaob9G"); // Your Public Key from EmailJS

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // 1. Add submission time for the template
        const timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = 'time';
        timeInput.value = new Date().toLocaleString();
        this.appendChild(timeInput);

        // 2. Send via EmailJS
        emailjs.sendForm(
            'service_k9o9kb2',     
            'template_35rauyg',    
            this
        ).then(() => {
            showNotification('Message Sent!', 'I will get back to you as soon as possible.');
            
            // 3. Backup: Save to Local Storage
            const submission = {
                name: this.name.value,
                email: this.email.value,
                message: this.message.value,
                time: timeInput.value
            };
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

            contactForm.reset();
            if (this.contains(timeInput)) this.removeChild(timeInput);
        }, (error) => {
            showNotification('Submission Error', 'Please try again later or email me directly.', 'error');
            console.error('EmailJS Error:', error);
        });
    });
}

// ---------- ENDORSEMENT FORM ----------
const endorseForm = document.getElementById('endorse-form');
const ratingStars = document.querySelectorAll('.endorse-form .stars i');

let currentRating = 0;

// Star rating logic
if (ratingStars.length > 0) {
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => highlightStarsMail(star.getAttribute('data-rating')));
        star.addEventListener('mouseout', () => highlightStarsMail(currentRating));
        star.addEventListener('click', () => {
            currentRating = star.getAttribute('data-rating');
            highlightStarsMail(currentRating);
        });
    });
}

function highlightStarsMail(rating) {
    ratingStars.forEach(s => {
        if (s.getAttribute('data-rating') <= rating) s.classList.add('active');
        else s.classList.remove('active');
    });
}

// Handle endorsement submission
if (endorseForm) {
    endorseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const form = e.target;

        // Add rating and time as hidden inputs for EmailJS
        const ratingInput = document.createElement('input');
        ratingInput.type = 'hidden';
        ratingInput.name = 'rating';
        ratingInput.value = currentRating || 0;
        form.appendChild(ratingInput);

        const timeInput = document.createElement('input');
        timeInput.type = 'hidden';
        timeInput.name = 'time';
        timeInput.value = new Date().toLocaleString();
        form.appendChild(timeInput);

        // 1. Send via EmailJS
        emailjs.sendForm(
            'service_k9o9kb2',     
            'template_ffmid6k',    
            form
        ).then(() => {
            showNotification('Endorsement Received!', 'Thank you for your valuable feedback.');
            
            // 2. Backup: Save to Local Storage
            const submission = {
                name: form.elements['name'] ? form.elements['name'].value : '',
                role: form.elements['role'] ? form.elements['role'].value : '',
                testimonial: form.elements['testimonial'] ? form.elements['testimonial'].value : '',
                rating: currentRating,
                time: timeInput.value
            };
            const submissions = JSON.parse(localStorage.getItem('endorsementSubmissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('endorsementSubmissions', JSON.stringify(submissions));

            form.reset();
            highlightStarsMail(0);
            currentRating = 0;
            if (form.contains(ratingInput)) form.removeChild(ratingInput);
            if (form.contains(timeInput)) form.removeChild(timeInput);
        }, (error) => {
            showNotification('Submission Error', 'Something went wrong. Please try again.', 'error');
            console.error('EmailJS Error:', error);
        });
    });
}