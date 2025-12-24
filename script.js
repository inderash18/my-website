
    // Custom Cursor Logic
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    const glow = document.getElementById('mouse-glow');

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';

      setTimeout(() => {
        follower.style.left = (e.clientX - 15) + 'px';
        follower.style.top = (e.clientY - 15) + 'px';
      }, 50);
    });

    document.querySelectorAll('a, button, .bento-item, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.transform = 'scale(2)';
        follower.style.background = 'rgba(112, 0, 255, 0.1)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.transform = 'scale(1)';
        follower.style.background = 'transparent';
      });
    });

    // Scroll Reveal logic
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3D Tilt Effect
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });

    // Navbar active link
    window.addEventListener('scroll', () => {
      let current = '';
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) {
          a.classList.add('active');
        }
      });
    });

    // Contact Form Submission
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button');
      const originalContent = btn.innerHTML;
      btn.innerHTML = 'Sending...';

      setTimeout(() => {
        btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        btn.style.background = '#00c853';
        e.target.reset();
        setTimeout(() => {
          btn.innerHTML = originalContent;
          btn.style.background = 'var(--primary)';
        }, 3000);
      }, 1000);
    });