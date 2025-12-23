// Contact Form Handler
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        number: document.getElementById('number').value,
        message: document.getElementById('message').value
    };

    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Show loading state
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        const response = await fetch('mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Failed to send message. Please try again.');
        console.error('Error:', error);
    }
});

// Newsletter Form Handler
document.querySelector('.newsletter-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;

    try {
        const response = await fetch('iraid.com.ng/js/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Newsletter subscription successful!');
            this.reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        alert('Failed to subscribe. Please try again.');
        console.error('Error:', error);
    }
});