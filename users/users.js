// Tab navigation
        document.querySelectorAll('.profile-nav a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links and sections
                document.querySelectorAll('.profile-nav a').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.profile-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Add active class to clicked link and corresponding section
                this.classList.add('active');
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
            });
        });

        // Function to show specific section (for quick actions)
        function showSection(sectionId) {
            document.querySelectorAll('.profile-nav a').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelectorAll('.profile-section').forEach(section => {
                section.classList.remove('active');
            });
            
            document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
            document.getElementById(sectionId).classList.add('active');
        }

        // Report Case Form
        document.getElementById('reportForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reportBtn = document.getElementById('reportBtn');
            const successMsg = document.getElementById('reportSuccess');
            const caseRef = document.getElementById('caseRef');
            
            // Generate random case ID
            const randomId = 'HRMS-C-2023-' + Math.floor(100 + Math.random() * 900);
            caseRef.textContent = randomId;
            
            // Show loading state
            const originalText = reportBtn.innerHTML;
            reportBtn.classList.add('btn-loading');
            reportBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // Remove loading state
                reportBtn.classList.remove('btn-loading');
                reportBtn.innerHTML = originalText;
                reportBtn.disabled = false;
                
                // Show success message
                successMsg.style.display = 'block';
                
                // Reset form
                document.getElementById('reportForm').reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMsg.style.display = 'none';
                }, 5000);
            }, 2000);
        });

        // Profile Form
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const saveBtn = document.getElementById('saveProfileBtn');
            const successMsg = document.getElementById('profileSuccess');
            
            // Show loading state
            const originalText = saveBtn.innerHTML;
            saveBtn.classList.add('btn-loading');
            saveBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // Remove loading state
                saveBtn.classList.remove('btn-loading');
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
                
                // Show success message
                successMsg.style.display = 'block';
                
                // Hide success message after 3 seconds
                setTimeout(function() {
                    successMsg.style.display = 'none';
                }, 3000);
            }, 1500);
        });

        // Security Form
        document.getElementById('securityForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const saveBtn = document.getElementById('saveSecurityBtn');
            const successMsg = document.getElementById('securitySuccess');
            
            // Show loading state
            const originalText = saveBtn.innerHTML;
            saveBtn.classList.add('btn-loading');
            saveBtn.disabled = true;
            
            // Simulate API call
            setTimeout(function() {
                // Remove loading state
                saveBtn.classList.remove('btn-loading');
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
                
                // Show success message
                successMsg.style.display = 'block';
                
                // Reset form and hide success message after 3 seconds
                setTimeout(function() {
                    document.getElementById('securityForm').reset();
                    successMsg.style.display = 'none';
                }, 3000);
            }, 1500);
        });

        // View case details (placeholder function)
        function viewCaseDetails(caseId) {
            alert(`Viewing details for case: ${caseId}\n\nThis would open a detailed case view in a real application.`);
        }