let isScrolling;
const navbar = document.querySelector('.menu'); 

window.addEventListener('scroll', () => {
    isScrolling = true;
    navbar.style.opacity = 0;

    clearTimeout(navbar.timeout); 
    navbar.timeout = setTimeout(() => { 
        if (!isScrolling) {
            navbar.style.opacity = 1; 
        }
    }, 1000); 
});


navbar.style.opacity = 1;

function smoothScroll(targetId) {
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: 'smooth', 
      easing: 'ease-in-out'
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

const words = ["student.", "coder.", "programmer.", "developer."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingTextElement = document.getElementById("typing-text");

function type() {
    const currentWord = words[wordIndex];

    const displayText = isDeleting
        ? currentWord.substring(0, charIndex - 1)
        : currentWord.substring(0, charIndex + 1);

    typingTextElement.textContent = displayText;

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
    } else {
       
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    const typingSpeed = isDeleting ? 100 : 150;
    const delay = isDeleting && charIndex === 0 ? 100 : typingSpeed;

    setTimeout(type, delay);
}

type();

document.addEventListener('DOMContentLoaded', (theme) => {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  prefersDarkScheme.addEventListener((e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    setTheme(newTheme);
  });
});
