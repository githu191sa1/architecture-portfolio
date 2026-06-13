document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSketches();
  initLandingSelector();
  initAudio();

  // Trigger side images slide-in animation
  setTimeout(() => {
    document.querySelectorAll('.landing-side-img').forEach(img => {
      img.classList.add('active');
    });
  }, 100);
});

/**
 * Renders the projects list into the projects grid container.
 */
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (typeof projects === 'undefined' || !Array.isArray(projects)) {
    container.innerHTML = '<p>Project data is missing or failed to load.</p>';
    return;
  }

  container.innerHTML = ''; // Clear skeleton placeholders if any

  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);

    card.innerHTML = `
      <div class="media-placeholder">
        <img 
          src="${project.coverImage}" 
          alt="${project.title}" 
          class="media-placeholder__img" 
          onload="this.style.opacity='1';"
          onerror="this.style.opacity='0'; this.nextElementSibling.style.display='block';"
          style="opacity: 0; transition: opacity var(--transition-normal);"
        >
        <span class="media-placeholder__fallback" style="display: none;">IMAGE PLACEHOLDER</span>
      </div>
      <div class="project-card__info">
        <div class="project-card__meta">
          <span class="project-card__type">${project.type}</span>
          <span class="project-card__year">${project.year}</span>
        </div>
        <h3 class="project-card__title">${project.title}</h3>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Renders the sketches list into the sketches grid container.
 */
function renderSketches() {
  const container = document.getElementById('sketches-container');
  if (!container) return;

  if (typeof sketches === 'undefined' || !Array.isArray(sketches)) {
    container.innerHTML = '<p>Sketch data is missing or failed to load.</p>';
    return;
  }

  container.innerHTML = ''; // Clear skeleton placeholders if any

  sketches.forEach(sketch => {
    const card = document.createElement('article');
    card.className = 'sketch-card';
    card.setAttribute('data-id', sketch.id);

    card.innerHTML = `
      <div class="media-placeholder">
        <img 
          src="${sketch.image}" 
          alt="${sketch.title}" 
          class="media-placeholder__img" 
          onload="this.style.opacity='1';"
          onerror="this.style.opacity='0'; this.nextElementSibling.style.display='block';"
          style="opacity: 0; transition: opacity var(--transition-normal);"
        >
        <span class="media-placeholder__fallback" style="display: none;">SKETCH PLACEHOLDER</span>
      </div>
      <div class="sketch-card__info">
        <h3 class="sketch-card__title">${sketch.title}</h3>
        <span class="sketch-card__location">${sketch.location}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Initializes the Landing Selector screen cards and smooth transitions.
 */
function initLandingSelector() {
  const landingSelector = document.getElementById('landing-selector');
  const mainContent = document.getElementById('main-content');
  const aiPlaceholder = document.getElementById('ai-project-placeholder');
  const backToLandingBtn = document.getElementById('back-to-landing');
  const cards = document.querySelectorAll('.landing-card');

  if (!landingSelector || !mainContent) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      // Play click sound immediately on any card click
      const clickAudio = new Audio('./assets/audio/click.mp3');
      clickAudio.volume = 1.0;
      clickAudio.play().catch(err => console.log("Click sound blocked", err));

      // Ignore transition logic for disabled cards
      if (card.classList.contains('disabled')) return;

      const target = card.getAttribute('data-target');

      // Fade out side images
      document.querySelectorAll('.landing-side-img').forEach(img => {
        img.classList.add('fade-out');
      });

      // Fade out landing quote
      const quote = document.querySelector('.landing-quote');
      if (quote) {
        quote.classList.add('fade-out');
      }



      // 1. Fade out other cards
      cards.forEach(c => {
        if (c !== card) {
          c.classList.add('fade-out');
        }
      });

      if (target === 'portfolio') {
        // 2. Zoom the clicked card
        card.classList.add('active-zoom');

        // 3. Smooth transition to portfolio main content after zoom (1.0s)
        setTimeout(() => {
          landingSelector.classList.add('hidden');
          mainContent.classList.remove('hidden');
          
          // Dispatch resize event to let the background canvas recalculate
          window.dispatchEvent(new Event('resize'));
        }, 950);
      } 
      else if (target === 'ai-project') {
        // 2. Smooth transition to AI placeholder (800ms to allow slide-out)
        setTimeout(() => {
          landingSelector.classList.add('hidden');
          if (aiPlaceholder) {
            aiPlaceholder.classList.remove('hidden');
          }
        }, 800);
      }
    });
  });

  // Back button on AI Placeholder screen
  if (backToLandingBtn && aiPlaceholder) {
    backToLandingBtn.addEventListener('click', () => {
      aiPlaceholder.classList.add('hidden');
      // Reset side images fade-out state
      document.querySelectorAll('.landing-side-img').forEach(img => {
        img.classList.remove('fade-out');
        img.classList.add('active'); // Re-trigger slide-in
      });
      // Reset quote fade-out state
      const quote = document.querySelector('.landing-quote');
      if (quote) {
        quote.classList.remove('fade-out');
      }

      // Reset all cards transition state to fix the bug where cards disappeared
      cards.forEach(c => {
        c.classList.remove('fade-out', 'active-zoom');
      });

      landingSelector.classList.remove('hidden');
    });
  }
}

let openingAudio;
let loopTimeout;

/**
 * Initializes opening background audio and mute/unmute toggle.
 */
function initAudio() {
  const audioToggle = document.getElementById('audio-toggle');
  if (!audioToggle) return;

  openingAudio = new Audio('./assets/audio/opening.mp3');
  openingAudio.loop = false; // Disable default looping to allow silence gap
  openingAudio.volume = 1.0;
  openingAudio.muted = false; // Default to UNMUTED

  // Make sure toggle button shows unmuted state initially
  audioToggle.classList.remove('muted');

  // Listen for audio ended to trigger a 60-second silence gap before playing again
  openingAudio.addEventListener('ended', () => {
    if (loopTimeout) clearTimeout(loopTimeout);
    loopTimeout = setTimeout(() => {
      // Respect current mute state before looping
      if (!openingAudio.muted) {
        openingAudio.play().catch(err => console.log("Audio loop blocked", err));
      }
    }, 60000); // 60 seconds silence gap
  });

  // Toggle button click handler
  audioToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Avoid triggering document click handler
    
    // Toggle the HTML5 Audio element muted property directly
    openingAudio.muted = !openingAudio.muted;
    
    if (openingAudio.muted) {
      if (loopTimeout) clearTimeout(loopTimeout);
      audioToggle.classList.add('muted');
      openingAudio.pause(); // Pause when muted to ensure absolute silence
    } else {
      audioToggle.classList.remove('muted');
      openingAudio.play().catch(err => console.log("Audio play blocked", err));
    }
  });

  // Try to play automatically (unmuted) on load
  openingAudio.play().catch(err => {
    console.log("Autoplay blocked, waiting for user interaction.");
    // If blocked, wait for the first click anywhere on the document to play unmuted
    const playOnFirstClick = () => {
      if (!openingAudio.muted) {
        openingAudio.play().catch(e => console.log("Play on click failed", e));
      }
      document.removeEventListener('click', playOnFirstClick);
    };
    document.addEventListener('click', playOnFirstClick);
  });
}

/**
 * Fades out an audio element smoothly.
 */
function fadeOutAudio(audio, duration = 1500) {
  if (!audio) return;
  const startVolume = audio.volume;
  const steps = 30;
  const intervalTime = duration / steps;
  const volumeStep = startVolume / steps;
  
  let currentStep = 0;
  const fadeInterval = setInterval(() => {
    currentStep++;
    if (audio.volume - volumeStep > 0) {
      audio.volume -= volumeStep;
    } else {
      audio.volume = 0;
    }
    
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      audio.pause();
      audio.volume = startVolume; // Reset volume for next play
    }
  }, intervalTime);
}
