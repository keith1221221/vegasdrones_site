// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
  });
  
  // Mobile menu toggle
  document.addEventListener('DOMContentLoaded', function() {
    try {
      const navToggle = document.querySelector('.nav-toggle');
      const navLinks = document.querySelector('.nav-links');
  
      console.log('Nav Toggle Element:', navToggle);
      console.log('Nav Links Element:', navLinks);
  
      if (navToggle && navLinks) {
        navToggle.addEventListener('click', function(event) {
          console.log('Nav Toggle Clicked', event);
          navLinks.classList.toggle('active');
          console.log('Nav Links ClassList:', navLinks.classList);
        });
      } else {
        console.error('Nav Toggle or Nav Links not found:', { navToggle, navLinks });
      }
    } catch (error) {
      console.error('Error in mobile menu toggle:', error);
    }
  });
  
  // Smooth scroll for anchor links
  document.addEventListener('DOMContentLoaded', function() {
    try {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
            });
          }
        });
      });
    } catch (error) {
      console.error('Error in smooth scroll:', error);
    }
  });