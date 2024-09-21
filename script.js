function smoothScroll(targetId) {
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth' 
    });
  }
}

const navLinks = document.querySelectorAll('.menu a');
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); 
    const targetId = link.getAttribute('href');
    smoothScroll(targetId);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.menu').classList.add('fade-in');
  document.querySelector('.hello').classList.add('fade-in');
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('fade-in-section');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1 
  });

  sections.forEach(section => {
    observer.observe(section);
  });
});