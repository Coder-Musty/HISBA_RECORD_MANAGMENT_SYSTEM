// Password visibility toggle
document.getElementById('passwordToggle').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Confirm password visibility toggle
document.getElementById('confirmPasswordToggle').addEventListener('click', function() {
    const passwordInput = document.getElementById('confirm_password');
    const icon = this.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// Password strength checker
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('passwordStrength');
    const requirements = {
        length: document.getElementById('lengthReq'),
        upper: document.getElementById('upperReq'),
        number: document.getElementById('numberReq'),
        special: document.getElementById('specialReq')
    };
    
    // Reset
    strengthBar.className = 'password-strength-bar';
    Object.values(requirements).forEach(req => {
        req.classList.remove('valid', 'invalid');
        req.querySelector('i').className = 'fas fa-circle';
    });
    
    if (password.length === 0) return;
    
    let strength = 0;
    
    // Check length
    if (password.length >= 8) {
        requirements.length.classList.add('valid');
        requirements.length.querySelector('i').className = 'fas fa-check';
        strength++;
    } else {
        requirements.length.classList.add('invalid');
    }
    
    // Check uppercase
    if (/[A-Z]/.test(password)) {
        requirements.upper.classList.add('valid');
        requirements.upper.querySelector('i').className = 'fas fa-check';
        strength++;
    } else {
        requirements.upper.classList.add('invalid');
    }
    
    // Check numbers
    if (/[0-9]/.test(password)) {
        requirements.number.classList.add('valid');
        requirements.number.querySelector('i').className = 'fas fa-check';
        strength++;
    } else {
        requirements.number.classList.add('invalid');
    }
    
    // Check special characters
    if (/[^A-Za-z0-9]/.test(password)) {
        requirements.special.classList.add('valid');
        requirements.special.querySelector('i').className = 'fas fa-check';
        strength++;
    } else {
        requirements.special.classList.add('invalid');
    }
    
    // Update strength bar
    if (strength <= 1) {
        strengthBar.classList.add('weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
});

// Form submission with AJAX
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset errors and styles
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('input').forEach(el => el.classList.remove('error', 'success'));
    document.getElementById('terms').parentElement.style.color = '';
    
    const signupBtn = document.getElementById('signupBtn');
    const originalText = signupBtn.innerHTML;
    
    // Show loading state
    signupBtn.disabled = true;
    signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    
    // Create FormData object
    const formData = new FormData(this);
    
    // Add email field (you'll need to add this to your HTML form)
    const email = document.getElementById('email') ? document.getElementById('email').value : '';
    if (email) {
        formData.append('email', email);
    }
    
    // Send AJAX request to PHP
    fetch('../backend/signup.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Success - show message and redirect
            showNotification(data.message, 'success');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = '/singIn/signin.html';
            }, 2000);
        } else {
            // Show validation errors
            if (data.errors) {
                displayFormErrors(data.errors);
            }
            showNotification(data.message || 'Error creating account', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('An error occurred. Please try again.', 'error');
    })
    .finally(() => {
        // Re-enable button
        signupBtn.disabled = false;
        signupBtn.innerHTML = originalText;
    });
});

// Function to display form errors from PHP
function displayFormErrors(errors) {
    for (const [field, message] of Object.entries(errors)) {
        const errorElement = document.getElementById(field + 'Error');
        const inputElement = document.getElementById(field === 'nin' ? 'NIN' : field);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    // Special handling for terms
    if (errors.terms) {
        document.getElementById('terms').parentElement.style.color = '#ff4757';
    }
}

// Function to show notifications
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 500px;
        animation: slideIn 0.3s ease-out;
    `;
    
    if (type === 'success') {
        notification.style.backgroundColor = '#2ed573';
    } else {
        notification.style.backgroundColor = '#ff4757';
    }
    
    // Add close button styles
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        margin-left: 10px;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Real-time validation for NIN and Phone
document.getElementById('NIN').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 11);
    this.classList.remove('error', 'success');
    document.getElementById('ninError').textContent = '';
});

document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 11);
    this.classList.remove('error', 'success');
    document.getElementById('phoneError').textContent = '';
});

// Real-time validation for other fields
document.getElementById('password').addEventListener('input', function() {
    this.classList.remove('error', 'success');
    document.getElementById('passwordError').textContent = '';
});

document.getElementById('confirm_password').addEventListener('input', function() {
    this.classList.remove('error', 'success');
    document.getElementById('confirmPasswordError').textContent = '';
});

// Add input event listeners for other fields
['FullName', 'Address', 'email'].forEach(fieldId => {
    const element = document.getElementById(fieldId);
    if (element) {
        element.addEventListener('input', function() {
            this.classList.remove('error', 'success');
            const errorElement = document.getElementById(fieldId + 'Error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
});

// Terms checkbox styling
document.getElementById('terms').addEventListener('change', function() {
    this.parentElement.style.color = this.checked ? '' : '#ff4757';
});