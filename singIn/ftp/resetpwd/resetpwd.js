
        // Password visibility toggle for new password
        document.getElementById('newPasswordToggle').addEventListener('click', function() {
            const passwordInput = document.getElementById('newPassword');
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

        // Password visibility toggle for confirm password
        document.getElementById('confirmPasswordToggle').addEventListener('click', function() {
            const passwordInput = document.getElementById('confirmPassword');
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
        document.getElementById('newPassword').addEventListener('input', function() {
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

        // Form validation and submission
        document.getElementById('resetForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = document.getElementById('newPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const passwordError = document.getElementById('passwordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const resetBtn = document.getElementById('resetBtn');
            const successMessage = document.getElementById('successMessage');
            
            // Reset errors
            newPassword.classList.remove('error', 'success');
            confirmPassword.classList.remove('error', 'success');
            passwordError.textContent = '';
            passwordError.style.display = 'none';
            confirmPasswordError.textContent = '';
            confirmPasswordError.style.display = 'none';
            
            let isValid = true;
            
            // Validate password strength
            const password = newPassword.value;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            if (!passwordRegex.test(password)) {
                newPassword.classList.add('error');
                passwordError.textContent = 'Password must be at least 8 characters with uppercase, number, and special character';
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                newPassword.classList.add('success');
            }
            
            // Validate password match
            if (password !== confirmPassword.value) {
                confirmPassword.classList.add('error');
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.display = 'block';
                isValid = false;
            } else if (confirmPassword.value) {
                confirmPassword.classList.add('success');
            }
            
            if (!isValid) return;
            
            // Show loading state
            const originalText = resetBtn.innerHTML;
            resetBtn.classList.add('btn-loading');
            resetBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // Remove loading state
                resetBtn.classList.remove('btn-loading');
                resetBtn.innerHTML = originalText;
                resetBtn.disabled = false;
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form after 3 seconds and redirect
                setTimeout(function() {
                    document.getElementById('resetForm').reset();
                    newPassword.classList.remove('success');
                    confirmPassword.classList.remove('success');
                    successMessage.style.display = 'none';
                    
                    // Redirect to login page
                    window.location.href = '/singIn/signin.html';
                }, 3000);
            }, 2000);
        });

        // Real-time validation for confirm password
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const newPassword = document.getElementById('newPassword').value;
            
            if (this.value.length > 0) {
                if (this.value !== newPassword) {
                    this.classList.add('error');
                    confirmPasswordError.textContent = 'Passwords do not match';
                    confirmPasswordError.style.display = 'block';
                } else {
                    this.classList.remove('error');
                    this.classList.add('success');
                    confirmPasswordError.style.display = 'none';
                }
            } else {
                this.classList.remove('error', 'success');
                confirmPasswordError.style.display = 'none';
            }
        });