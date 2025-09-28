
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

        // Form validation
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('input').forEach(el => el.classList.remove('error', 'success'));
            
            // Validate NIN (11 digits)
            const nin = document.getElementById('NIN');
            if (!/^\d{11}$/.test(nin.value)) {
                document.getElementById('ninError').textContent = 'NIN must be 11 digits';
                nin.classList.add('error');
                isValid = false;
            } else {
                nin.classList.add('success');
            }
            
            // Validate phone number
            const phone = document.getElementById('phone');
            if (!/^\d{11}$/.test(phone.value)) {
                document.getElementById('phoneError').textContent = 'Phone number must be 11 digits';
                phone.classList.add('error');
                isValid = false;
            } else {
                phone.classList.add('success');
            }
            
            // Validate password match
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm_password');
            if (password.value !== confirmPassword.value) {
                document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
                confirmPassword.classList.add('error');
                isValid = false;
            } else if (password.value) {
                confirmPassword.classList.add('success');
            }
            
            // Validate terms agreement
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                isValid = false;
                terms.parentElement.style.color = '#ff4757';
            } else {
                terms.parentElement.style.color = '';
            }
            
            if (isValid) {
                const signupBtn = document.getElementById('signupBtn');
                const originalText = signupBtn.innerHTML;
                
                // Show loading state
                signupBtn.classList.add('btn-loading');
                signupBtn.disabled = true;
                
                // Simulate signup process
                setTimeout(function() {
                    signupBtn.classList.remove('btn-loading');
                    signupBtn.innerHTML = originalText;
                    signupBtn.disabled = false;
                    
                    // In a real application, you would handle the actual signup here
                    alert('Account created successfully! You will be redirected to login.');
                    window.location.href = '/singIn/signin.html';
                }, 2000);
            }
        });

        // Real-time validation for NIN and Phone
        document.getElementById('NIN').addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 11);
        });
        
        document.getElementById('phone').addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 11);
        });