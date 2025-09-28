        // Mobile menu toggle functionality
        document.getElementById('menuToggle').addEventListener('click', function() {
            document.getElementById('mainNav').classList.toggle('active');
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const nav = document.getElementById('mainNav');
            const toggle = document.getElementById('menuToggle');
            
            if (window.innerWidth <= 768 && 
                !nav.contains(event.target) && 
                !toggle.contains(event.target)) {
                nav.classList.remove('active');
            }
        });