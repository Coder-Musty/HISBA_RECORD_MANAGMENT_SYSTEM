 // Tab navigation between Terms and Privacy
        document.querySelectorAll('.policy-nav button').forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and sections
                document.querySelectorAll('.policy-nav button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.policy-section').forEach(section => {
                    section.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding section
                this.classList.add('active');
                const sectionId = this.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
                
                // Scroll to top of content
                document.querySelector('.policy-content').scrollTop = 0;
            });
        });
        // Smooth scrolling for table of contents links
        document.querySelectorAll('.toc a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const activeSection = document.querySelector('.policy-section.active');
                const targetElement = activeSection.querySelector(targetId);
                
                if (targetElement) {
                    activeSection.scrollTop = targetElement.offsetTop - 20;
                }
            });
        });

        // Print functionality
        function printPolicy() {
            window.print();
        }