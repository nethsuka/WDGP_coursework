document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(this);
            sendEmail(formData);
            this.reset();
            alert('Thank you for your feedback!');
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('mail').value.trim();
        const firstTime = document.querySelector('input[name="select1"]:checked');
        const informative = document.querySelector('input[name="select2"]:checked');
        const rating = document.querySelector('input[name="1-10"]:checked');
        const recommend = document.querySelector('input[name="select3"]:checked');

        if (name === '') {
            alert('Please enter your name.');
            return false;
        }

        if (email === '') {
            alert('Please enter your email.');
            return false;
        } else if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return false;
        }

        if (!firstTime) {
            alert('Please indicate if this is your first time visiting.');
            return false;
        }

        if (!informative) {
            alert('Please indicate if the website is informative and easy to navigate.');
            return false;
        }

        if (!rating) {
            alert('Please rate your satisfaction with our services.');
            return false;
        }

        if (!recommend) {
            alert('Please indicate if you would recommend our services.');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function sendEmail(formData) {
        // Add email sending logic here
        // For demonstration purposes, we'll just log the form data to the console
        console.log('Form data:', formData);
    }
});
