
        // Form validation and submission
        document.getElementById('forgotForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const resetBtn = document.getElementById('resetBtn');
            const successMessage = document.getElementById('successMessage');
            
            // Reset errors
            email.classList.remove('error', 'success');
            emailError.textContent = '';
            emailError.style.display = 'none';
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                return;
            }
            
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
                email.classList.add('success');
                successMessage.style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(function() {
                    document.getElementById('forgotForm').reset();
                    email.classList.remove('success');
                    successMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        });

        // Real-time email validation
        document.getElementById('email').addEventListener('input', function() {
            const emailError = document.getElementById('emailError');
            
            if (this.value.length > 0) {
                this.classList.remove('error');
                emailError.style.display = 'none';
            }
        });