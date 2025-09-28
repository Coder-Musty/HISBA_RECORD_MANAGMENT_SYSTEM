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

        // Form submission with loading state
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loginBtn = document.getElementById('loginBtn');
            const originalText = loginBtn.innerHTML;
            
            // Show loading state
            loginBtn.classList.add('btn-loading');
            loginBtn.disabled = true;
            
            // Simulate login process
            setTimeout(function() {
                loginBtn.classList.remove('btn-loading');
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
                
                // In a real application, you would handle the actual login here
                alert('Login successful! Redirecting to dashboard...');
                // window.location.href = '/dashboard.html';
            }, 1500);
        });

        // Add focus effects to form inputs
        const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });