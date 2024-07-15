// public/js/main.js

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a.nav-link');
    const mainContent = document.querySelector('.main-content');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('href');
  
        fetch(url)
          .then(response => response.text())
          .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.querySelector('.main-content');
            
            if (newContent) {
              mainContent.innerHTML = newContent.innerHTML;
            } else {
              mainContent.innerHTML = "<p>Sorry, an error occurred while loading the content.</p>";
            }
          })
          .catch(error => {
            console.error('Error loading content:', error);
            mainContent.innerHTML = "<p>Sorry, an error occurred while loading the content.</p>";
          });
      });
    });
  });
  