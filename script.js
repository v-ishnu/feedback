document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const thankYou = document.getElementById('thankYou');
    
    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    
    if (success === 'true') {
        form.style.display = 'none';
        thankYou.style.display = 'block';
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verify reCAPTCHA
        const response = grecaptcha.getResponse();
        if (response.length === 0) {
            alert('Please complete the reCAPTCHA');
            return;
        }
        
        // Submit the form to FormSubmit
        form.action = 'https://formsubmit.co/dinestx@gmail.com';
        form.submit();
    });
});