const recaptchaScript = document.createElement('script');
recaptchaScript.src = 'https://www.google.com/recaptcha/api.js?render=6LfsmFwrAAAAAAt5dVgB7nJmMaHVcNjTxH-t_Hr9';
document.head.appendChild(recaptchaScript);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const feedbackForm = document.getElementById('feedbackForm');
    const thankYouSection = document.getElementById('thankYou');
    const submitBtn = document.getElementById('submitBtn') ||
        feedbackForm.querySelector('button[type="submit"]');

    // Create CAPTCHA badge and notice if they don't exist
    if (!document.querySelector('.grecaptcha-badge')) {
        const captchaContainer = document.createElement('div');
        captchaContainer.className = 'grecaptcha-badge';
        captchaContainer.style.visibility = 'hidden';
        document.body.appendChild(captchaContainer);

        const captchaNote = document.createElement('p');
        captchaNote.className = 'captcha-note';
        captchaNote.textContent = 'This form is protected by reCAPTCHA to prevent spam.';
        submitBtn.insertAdjacentElement('beforebegin', captchaNote);
    }

    // Handle form submission
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Execute reCAPTCHA
        grecaptcha.ready(function () {
            grecaptcha.execute('6LfsmFwrAAAAAAt5dVgB7nJmMaHVcNjTxH-t_Hr9', { action: 'submit' })
                .then(function (token) {
                    // Verify CAPTCHA first
                    if (!token) {
                        alert("CAPTCHA verification failed. Please try again.");
                        return;
                    }

                    // Collect form data
                    const formData = {
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        service: document.getElementById('service').value,
                        rating: document.querySelector('input[name="rating"]:checked')?.value,
                        feedback: document.getElementById('feedback').value,
                        recaptcha: token
                    };

                    // In production: Send to server for verification
                    console.log('Form data with CAPTCHA token:', formData);

                    // Simulate server verification
                    setTimeout(() => {
                        // Show thank you message
                        feedbackForm.style.display = 'none';
                        thankYouSection.style.display = 'block';
                        thankYouSection.scrollIntoView({ behavior: 'smooth' });

                        // Reset form
                        feedbackForm.reset();
                        grecaptcha.reset();
                    }, 1000);
                });
        });
    });

    // Rating animation (optional)
    const ratingOptions = document.querySelectorAll('.rating-option');
    ratingOptions.forEach(option => {
        option.addEventListener('mouseenter', () => option.style.transform = 'scale(1.1)');
        option.addEventListener('mouseleave', () => option.style.transform = 'scale(1)');
    });
});