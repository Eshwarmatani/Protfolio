/**
 * ESHWAR KUMAR - PORTFOLIO INTERACTIVE ENGINE
 * Features:
 * - Particle Constellation Canvas with cursor attraction
 * - Dynamic Typewriter Hero text
 * - 3D Card Perspective Tilt
 * - Interactive Skills Category Filtering
 * - Modal System (Project Deep Dive & Resume Preview)
 * - Copy-to-Clipboard with sleek Toast Notifications
 * - Contact Form validation & simulation
 * - Scroll Reveal & Navbar Spy
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PARTICLE CONSTELLATION CANVAS
  initParticleCanvas();

  // 2. TYPEWRITER HERO ANIMATION
  initTypewriter();

  // 3. 3D CARD TILT EFFECT
  initCardTilt();

  // 4. SKILLS FILTER SYSTEM
  initSkillsFilter();

  // 5. PROJECT DETAIL MODALS
  initProjectModals();

  // 6. RESUME PREVIEW MODAL
  initResumeModal();

  // 7. CLIPBOARD & TOAST SYSTEM
  initClipboardAndToasts();

  // 8. CONTACT FORM HANDLER
  initContactForm();

  // 9. SCROLL OBSERVER & NAVBAR SPY
  initScrollEffects();

  // 10. MOBILE NAVIGATION DRAWER
  initMobileDrawer();
});

/* ==========================================================================
   1. PARTICLE CONSTELLATION CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 35 : 75;
  const maxDistance = 120;
  
  const mouse = {
    x: null,
    y: null,
    radius: 140
  };

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.2;
      this.color = Math.random() > 0.5 ? '0, 242, 254' : '127, 0, 255';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = dx / dist;
          const directionY = dy / dist;
          this.x -= directionX * force * 1.5;
          this.y -= directionY * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & Draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Connect to mouse if near
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(127, 0, 255, ${mAlpha})`;
          ctx.lineWidth = 0.9;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. TYPEWRITER HERO ANIMATION
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const phrases = [
    'Scalable Software Systems',
    'AI Crop Advisory & Disease Detectors',
    'High-Performance DSA Solutions',
    'Multilingual Translation Engines',
    'Java & MySQL Enterprise Apps',
    'C++ Native Console Games',
    'Modern Responsive Web Experiences'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const backSpeed = 45;
  const holdDelay = 1800;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = holdDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   3. 3D CARD TILT EFFECT
   ========================================================================== */
function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   4. SKILLS FILTER SYSTEM
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger animation
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAIL MODALS
   ========================================================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('project-modal-title');
  const modalBody = document.getElementById('project-modal-body');
  const modalFooter = document.getElementById('project-modal-footer');
  const closeBtn = document.getElementById('project-modal-close');
  const modalButtons = document.querySelectorAll('.project-modal-btn');

  if (!modalOverlay) return;

  const projectDetails = {
    weather: {
      title: 'Weather Tracking App — Architecture & Custom DSA',
      image: 'assets/weather-app.jpg',
      tags: ['Java Swing', 'API Integration', 'Trie Autocomplete', 'Min-Heap', 'Persistent History'],
      github: 'https://github.com/Eshwarmatani/Weather-Track-App',
      description: `
        An enterprise-grade desktop weather application built in Java that pairs real-time REST API consumption 
        with algorithmic optimizations to guarantee snappy user experience across thousands of cities.
      `,
      highlights: [
        '<strong>Trie Prefix Tree Implementation:</strong> Implemented a custom in-memory Trie data structure enabling instant, sub-millisecond city search autocomplete as users type.',
        '<strong>Min-Heap Temperature Tracker:</strong> Dynamically organizes global weather data points into a min-heap priority queue, tracking cold extremes and ranking regional fluctuations in O(log N) time.',
        '<strong>Live API Integration:</strong> Seamlessly communicates with external weather providers with robust JSON parsing, caching, and fallback handling.',
        '<strong>Persistent Search History:</strong> Saves and manages user history locally to minimize redundant network calls.'
      ]
    },
    bank: {
      title: 'Bank Management System (ATM) — Relational Security',
      image: 'assets/bank-atm.jpg',
      tags: ['Java Swing', 'MySQL Database', 'ACID Compliance', 'PIN Verification', 'Ledger Audit'],
      github: 'https://github.com/Eshwarmatani/Bank-Management-Project-with-connection-of-database',
      description: `
        A robust Java-based simulation of real-world ATM banking infrastructure, designed to handle financial 
        transactions with strict relational consistency and automated transaction logging.
      `,
      highlights: [
        '<strong>ACID-Compliant MySQL Transactions:</strong> Implements atomic database transactions ensuring balance transfers, deposits, and withdrawals either complete fully or roll back safely.',
        '<strong>Secure Account Registration:</strong> Generates unique account tokens and utilizes cryptographic hashing routines for confidential PIN verification.',
        '<strong>Digital Audit Ledger:</strong> Every debit, credit, and administrative change is permanently timestamped in an append-only audit trail for customer statements.',
        '<strong>Real-Time Balance Inquiries:</strong> Interactive Java Swing GUI providing immediate feedback, transaction limits, and error diagnostics.'
      ]
    },
    wordgame: {
      title: 'Word Guessing Game — C++ & Windows API Visuals',
      image: 'assets/word-game.jpg',
      tags: ['C++', 'Windows API', 'Game Loop', 'Heuristic Hints', 'Color Feedback'],
      github: null,
      description: `
        An interactive console arcade game built from scratch in C++ featuring multi-category word pools, 
        real-time letter validation, dynamic hint computation, and Windows API color buffers.
      `,
      highlights: [
        '<strong>Windows API Integration:</strong> Directly interfaces with the Windows console handle to manipulate color palettes, providing instant visual cues (green for correct position, yellow for misplaced letters).',
        '<strong>7 Distinct Categories:</strong> Includes comprehensive dictionaries for Animals, Fruits, Countries, and Seasons, each with balanced difficulty levels.',
        '<strong>Dynamic Hint System:</strong> Algorithmic hint evaluation that dynamically gauges remaining attempts and reveals contextual clues without trivializing gameplay.',
        '<strong>Robust Input Validation:</strong> Sanitizes keystrokes, handles edge-case character entries, and tracks user scores through persistent session counters.'
      ]
    },
    cropadvisor: {
      title: 'AI Weather & Soil Crop Advisor + Disease Detector',
      image: 'assets/crop-advisor.jpg',
      tags: ['Machine Learning (ML)', 'Computer Vision (CNN)', 'Soil NPK Telemetry', 'Weather API', 'Precision Agriculture'],
      github: null,
      description: `
        An end-to-end intelligent agro-tech platform designed to empower farmers with data-driven decision intelligence. 
        Integrates atmospheric telemetry, multi-sensor soil analysis (NPK, pH, moisture), and deep convolutional neural networks 
        to detect crop diseases and prescribe real-time remediations.
      `,
      highlights: [
        '<strong>Deep Learning Disease Diagnosis:</strong> Utilizes Convolutional Neural Networks (CNN) with transfer learning to identify foliar blights, fungi, and bacterial lesions from smartphone camera scans with 95%+ precision.',
        '<strong>Soil NPK & Chemistry Analysis:</strong> Cross-references Nitrogen (N), Phosphorus (P), Potassium (K), pH, and moisture levels against crop viability models to recommend optimal crop selection and fertilizer scheduling.',
        '<strong>Climate & Weather Forecasting Engine:</strong> Analyzes hyper-local weather parameters (humidity, rainfall probability, temperature) to forecast disease vectors and recommend preventive spraying.',
        '<strong>Actionable Agronomic Prescriptions:</strong> Formulates specific fungicide/pesticide dosage guidelines, irrigation triggers, and preventive measures directly on the user dashboard.'
      ]
    },
    trillingo: {
      title: 'Trillingo Translator — Multilingual AI Platform',
      image: 'assets/trillingo.jpg',
      tags: ['Natural Language Processing', 'JavaScript / Python', 'Speech Waveform API', 'Contextual Phrasebook', 'Vocabulary Builder'],
      github: null,
      description: `
        A sleek multilingual translation and linguistic acquisition web platform combining neural machine translation 
        with interactive vocabulary flashcards, real-time speech pronunciation waveforms, and context-aware phrase recommendation.
      `,
      highlights: [
        '<strong>Bidirectional Neural Translation:</strong> Facilitates instant text and voice translation across multiple world languages with contextual nuance preservation.',
        '<strong>Speech Waveform & Audio Playback:</strong> Renders real-time audio waveforms during speech synthesis, helping language learners analyze native accents and pronunciations.',
        '<strong>Categorized Smart Phrasebooks:</strong> Quick-access situational categories (Travel, Greetings, Ordering, Politeness) with instantaneous bilingual translations.',
        '<strong>Spaced-Repetition Vocabulary Builder:</strong> Stores newly translated words and provides adaptive flashcard drills to accelerate long-term retention.'
      ]
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    
    let tagsHtml = data.tags.map(t => `<span class="badge-tech">${t}</span>`).join('');
    let highlightsHtml = data.highlights.map(h => `<li><i class="fa-solid fa-circle-check text-cyan"></i> <div>${h}</div></li>`).join('');
    
    modalBody.innerHTML = `
      <div class="modal-project-content">
        <img src="${data.image}" alt="${data.title}" class="modal-project-img">
        <div class="modal-tech-pills">${tagsHtml}</div>
        <p>${data.description}</p>
        <div class="highlight-box">
          <ul class="modal-features-list">
            ${highlightsHtml}
          </ul>
        </div>
      </div>
    `;

    if (data.github) {
      modalFooter.innerHTML = `
        <button class="btn btn-outline" id="modal-close-inner">Close</button>
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <i class="fa-brands fa-github"></i> View GitHub Repository
        </a>
      `;
    } else {
      modalFooter.innerHTML = `
        <button class="btn btn-outline" id="modal-close-inner">Close</button>
        <a href="#contact" class="btn btn-primary" onclick="closeProjectModal()">
          <i class="fa-solid fa-envelope"></i> Inquire About Source
        </a>
      `;
    }

    const innerClose = document.getElementById('modal-close-inner');
    if (innerClose) innerClose.addEventListener('click', closeProjectModal);

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeProjectModal();
    }
  });

  window.closeProjectModal = closeProjectModal;
}

/* ==========================================================================
   6. RESUME PREVIEW MODAL
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = [
    document.getElementById('btn-open-resume'),
    document.getElementById('hero-resume-btn'),
    document.getElementById('btn-drawer-resume')
  ].filter(Boolean);
  const closeBtn = document.getElementById('resume-modal-close');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Also close mobile drawer if open
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');
  }

  function closeResume() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openResume));
  if (closeBtn) closeBtn.addEventListener('click', closeResume);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   7. CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
function initClipboardAndToasts() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, icon = 'fa-solid fa-circle-check') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="${icon}"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 3200);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast(`Selected: ${textToCopy}`);
      });
    });
  });

  window.showToast = showToast;
}

/* ==========================================================================
   8. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const btnOpenEmailClient = document.getElementById('btn-open-email-client');
  const targetEmail = 'keshwar662@gmail.com';
  const formSubmitEndpoint = 'fab2ca80f197a66ff1a4ed2419e27c57';

  function composeDirectEmail(name, email, subject, message) {
    const nameVal = name || 'Website Visitor';
    const emailVal = email || 'No email provided';
    const subjectVal = subject || 'General Portfolio Inquiry';
    const messageVal = message || 'Hello Eshwar, I would like to connect with you regarding an opportunity.';

    // Prominently identifies sender in the email subject line
    const emailSubject = `[Portfolio Contact] From ${nameVal} (${emailVal}): ${subjectVal}`;
    const emailBody = 
`====================================================
NEW CONTACT MESSAGE FOR ESHWAR KUMAR
====================================================
• SENDER FULL NAME    : ${nameVal}
• SENDER EMAIL ADDRESS: ${emailVal}
• SUBJECT / INQUIRY   : ${subjectVal}
====================================================

GIVEN MESSAGE:
${messageVal}

----------------------------------------------------
Dispatched from Eshwar Kumar's Portfolio Website`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Try opening Gmail web composer in a new tab; fallback to mailto URI
    const newWin = window.open(gmailUrl, '_blank');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }
  }

  if (btnOpenEmailClient) {
    btnOpenEmailClient.addEventListener('click', () => {
      const name = form.querySelector('#contact-name').value.trim();
      const email = form.querySelector('#contact-email').value.trim();
      const subject = form.querySelector('#contact-subject').value.trim();
      const message = form.querySelector('#contact-message').value.trim();

      if (window.showToast) {
        window.showToast('Opening Gmail / your email client with sender details...', 'fa-solid fa-envelope-open-text');
      }
      composeDirectEmail(name, email, subject, message);
    });
  }

  // Status alert container helpers
  const statusAlert = document.getElementById('form-status-alert');

  function showStatusAlert(type, title, messageHtml, actionButtonsHtml = '') {
    if (!statusAlert) return;
    statusAlert.className = `form-status-alert ${type}`;
    statusAlert.style.display = 'block';
    statusAlert.innerHTML = `
      <div class="status-header">
        <i class="${type === 'success' ? 'fa-solid fa-circle-check' : (type === 'warning' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-xmark')}"></i>
        <span>${title}</span>
      </div>
      <p>${messageHtml}</p>
      ${actionButtonsHtml ? `<div class="status-actions">${actionButtonsHtml}</div>` : ''}
    `;
    statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideStatusAlert() {
    if (!statusAlert) return;
    statusAlert.style.display = 'none';
    statusAlert.innerHTML = '';
  }

  // Real-time synchronization of hidden fields
  const nameInput = form.querySelector('#contact-name');
  const emailInput = form.querySelector('#contact-email');
  const subjectInput = form.querySelector('#contact-subject');
  const messageInput = form.querySelector('#contact-message');

  function updateHiddenFields() {
    hideStatusAlert();
    const n = nameInput ? nameInput.value.trim() : '';
    const em = emailInput ? emailInput.value.trim() : '';
    const sub = subjectInput ? subjectInput.value.trim() : '';
    const dynSub = `[Portfolio Contact] From ${n || 'Visitor'} (${em || 'No Email'}): ${sub || 'New Inquiry'}`;

    const hiddenSub = document.getElementById('hidden-email-subject');
    if (hiddenSub) hiddenSub.value = dynSub;
    const hiddenReply = document.getElementById('hidden-email-replyto');
    if (hiddenReply) hiddenReply.value = em;
    const hiddenSenderEmail = document.getElementById('hidden-sender-email');
    if (hiddenSenderEmail) hiddenSenderEmail.value = em;
    const hiddenSenderName = document.getElementById('hidden-sender-name');
    if (hiddenSenderName) hiddenSenderName.value = n;
  }

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateHiddenFields);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const subject = form.querySelector('#contact-subject').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      if (window.showToast) {
        window.showToast('Please fill out all required fields (Name, Email, Message).', 'fa-solid fa-triangle-exclamation');
      }
      return;
    }

    const dynamicSubject = `[Portfolio Contact] From ${name} (${email}): ${subject || 'New Inquiry'}`;

    // Update hidden fields so standard form post or fallback also receives exact sender details
    const hiddenSub = document.getElementById('hidden-email-subject');
    if (hiddenSub) hiddenSub.value = dynamicSubject;
    const hiddenReply = document.getElementById('hidden-email-replyto');
    if (hiddenReply) hiddenReply.value = email;
    const hiddenSenderEmail = document.getElementById('hidden-sender-email');
    if (hiddenSenderEmail) hiddenSenderEmail.value = email;
    const hiddenSenderName = document.getElementById('hidden-sender-name');
    if (hiddenSenderName) hiddenSenderName.value = name;

    // Richly format the message content so sender details and full message are never lost
    const formattedEmailMessage = 
`====================================================
NEW CONTACT MESSAGE FOR ESHWAR KUMAR
====================================================
• SENDER FULL NAME    : ${name}
• SENDER EMAIL ADDRESS: ${email}
• SUBJECT / INQUIRY   : ${subject || 'General Inquiry'}
====================================================

GIVEN MESSAGE:
${message}

----------------------------------------------------
Dispatched from Eshwar Kumar's Portfolio Website`;

    const submitBtn = document.getElementById('btn-submit-form');
    const originalBtnHtml = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending to ${targetEmail}...</span>`;

    // If viewing via local file:/// protocol, FormSubmit rejects without web origin, so open email client directly
    if (window.location.protocol === 'file:') {
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Opening Email Client...</span>`;
        if (window.showToast) {
          window.showToast(`Opening Gmail / email app with sender details for ${targetEmail}!`, 'fa-solid fa-paper-plane');
        }
        composeDirectEmail(name, email, subject, message);
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnHtml;
        }, 3500);
      }, 500);
      return;
    }

    // When running via HTTP/HTTPS (e.g. localhost or live host), post to FormSubmit AJAX
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${formSubmitEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          // Primary FormSubmit standard fields (Guarantees FormSubmit parses message and sender email)
          "name": name,
          "email": email,
          "_replyto": email,
          "subject": subject || 'Portfolio Contact Inquiry',
          "message": formattedEmailMessage,

          // Descriptive labeled fields for the email table view
          "Sender_Name": name,
          "Sender_Email": email,
          "Inquiry_Subject": subject || 'General Inquiry',
          "Given_Message": message,

          // FormSubmit configuration
          "_subject": dynamicSubject,
          "_template": "table",
          "_captcha": "false"
        })
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true || response.ok) {
        showStatusAlert(
          'success',
          'Message Delivered Successfully!',
          `Your message from <strong>${email}</strong> has been delivered directly to <strong>${targetEmail}</strong>. Thank you for reaching out!`
        );
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Message Sent!</span>`;
        if (window.showToast) {
          window.showToast(`Message from ${email} sent successfully to ${targetEmail}!`, 'fa-solid fa-circle-check');
        }
        form.reset();
      } else {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(dynamicSubject)}&body=${encodeURIComponent(formattedEmailMessage)}`;
        const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(dynamicSubject)}&body=${encodeURIComponent(formattedEmailMessage)}`;

        if (data.message && data.message.toLowerCase().includes('activation')) {
          submitBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>Form Activation Needed</span>`;
          showStatusAlert(
            'warning',
            'One-Time Setup: Form Activation Required in Inbox',
            `FormSubmit has sent an activation confirmation email to <strong>${targetEmail}</strong>.<br>
            Please open your Gmail inbox at <strong>${targetEmail}</strong> and click the <em>"Activate Form"</em> button once. After that single click, all future messages submitted here will arrive directly in your inbox.<br><br>
            <strong>To send this message right now:</strong> click below to send it via Gmail or your mail app.`,
            `<a href="${gmailUrl}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-envelope"></i> Send via Gmail with 1-Click</a>
             <a href="${mailtoUrl}" class="btn btn-outline btn-sm"><i class="fa-solid fa-paper-plane"></i> Send via Mail App</a>`
          );
          if (window.showToast) {
            window.showToast(`Action Required: Click "Activate Form" in ${targetEmail} or use the Gmail button below.`, 'fa-solid fa-triangle-exclamation', 8000);
          }
        } else {
          submitBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>Delivery Issue</span>`;
          showStatusAlert(
            'error',
            'Submission Could Not Complete',
            `Could not deliver automatically (${data.message || 'Service unreachable'}). You can send this exact message directly via your email app below:`,
            `<a href="${gmailUrl}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-envelope"></i> Open in Gmail</a>
             <a href="${mailtoUrl}" class="btn btn-outline btn-sm"><i class="fa-solid fa-paper-plane"></i> Open in Mail App</a>`
          );
        }
      }
    } catch (err) {
      console.warn('FormSubmit network error, providing direct email compose links:', err);
      submitBtn.innerHTML = `<i class="fa-solid fa-envelope-open-text"></i> <span>Send via Gmail</span>`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetEmail)}&su=${encodeURIComponent(dynamicSubject)}&body=${encodeURIComponent(formattedEmailMessage)}`;
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(dynamicSubject)}&body=${encodeURIComponent(formattedEmailMessage)}`;
      showStatusAlert(
        'warning',
        'Direct Email Dispatch',
        `Click below to send your message directly to <strong>${targetEmail}</strong> with your email address (<strong>${email}</strong>) and message prefilled:`,
        `<a href="${gmailUrl}" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-envelope"></i> Send via Gmail</a>
         <a href="${mailtoUrl}" class="btn btn-outline btn-sm"><i class="fa-solid fa-paper-plane"></i> Send via Mail App</a>`
      );
      if (window.showToast) {
        window.showToast(`Use the buttons below to dispatch your message directly to ${targetEmail}!`, 'fa-solid fa-paper-plane');
      }
    } finally {
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnHtml;
      }, 5000);
    }
  });
}

/* ==========================================================================
   9. SCROLL OBSERVER & NAVBAR SPY
   ========================================================================== */
function initScrollEffects() {
  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // Navbar Active Link Spy & Back to Top
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.5';
      }
    }

    // Nav spy
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   10. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!drawer || !toggleBtn) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}
