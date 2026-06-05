const texts = ["Aspiring Software Engineer", "Frontend Developer"];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 50;
const deletingSpeed = 30;
const delayBetweenTexts = 1000;

function typeWriter() {
  const typewriterElement = document.getElementById("typewriter");
  const currentText = texts[currentTextIndex];

  if (!isDeleting) {
    // Typing
    if (currentCharIndex < currentText.length) {
      typewriterElement.textContent += currentText[currentCharIndex];
      currentCharIndex++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Finished typing, wait before deleting
      isDeleting = true;
      setTimeout(typeWriter, delayBetweenTexts);
    }
  } else {
    // Deleting
    if (currentCharIndex > 0) {
      typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      setTimeout(typeWriter, deletingSpeed);
    } else {
      // Finished deleting, move to next text
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setTimeout(typeWriter, 500);
    }
  }
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", typeWriter);

// Mobile menu toggle
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");

if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Contact form submission
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const email = document.querySelector(".contact-form input[name='email']").value;
      const message = document.querySelector(".contact-form textarea[name='message']").value;
      
      if (email && message) {
        // Send email using Formspree (free service)
        fetch("https://formspree.io/f/xzzbqvkj", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            message: message
          })
        })
        .then(response => {
          if (response.ok) {
            alert("✓ Message sent successfully! Thank you for reaching out. Namrata will get back to you soon!");
            contactForm.reset();
          } else {
            throw new Error("Failed to send");
          }
        })
        .catch(error => {
          // Fallback to mailto if service is unavailable
          const mailtoLink = `mailto:isitnamrata@gmail.com?subject=Message from ${encodeURIComponent(email)}&body=${encodeURIComponent("From: " + email + "\n\nMessage:\n" + message)}`;
          window.location.href = mailtoLink;
        });
      } else {
        alert("Please fill in all fields");
      }
    });
  }
});
