document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSketches();
  initLandingSelector();
  initNavigation();
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

      // Clear any pending background music loop timeout when leaving the landing page
      if (loopTimeout) clearTimeout(loopTimeout);

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
          
          // Switch to home panel immediately upon entering the portfolio
          switchPanel('panel-home');

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

      // Reset panels to home panel for future entry
      switchPanel('panel-home');

      // If background music has never played (or is at the start and paused), play it immediately!
      // Otherwise, if it has already played and ended, schedule the 60s loop.
      if (openingAudio.currentTime === 0 && openingAudio.paused) {
        openingAudio.play().catch(err => console.log("Play on back button failed", err));
      } else {
        scheduleLandingLoop();
      }
    });
  }
}

function initNavigation() {
  const navItems = document.querySelectorAll('.hero-nav__item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const target = item.getAttribute('data-target');
      if (target) {
        switchPanel(`panel-${target}`);
      }
    });
  });
}

/**
 * Switches the active panel using a horizontal slide transition.
 * @param {string} targetPanelId - The ID of the panel to switch to.
 */
function switchPanel(targetPanelId) {
  const targetPanel = document.getElementById(targetPanelId);
  if (!targetPanel) return;

  const currentActive = document.querySelector('.panel.active');

  // If the target panel is already active, do nothing
  if (currentActive === targetPanel) return;

  // 1. Handle exiting panel animation
  if (currentActive) {
    currentActive.classList.remove('active');
    currentActive.classList.add('exit');
  }

  // 2. Reset other panels to right offscreen (remove .active and .exit)
  const panels = document.querySelectorAll('.panel');
  panels.forEach(p => {
    if (p !== currentActive && p !== targetPanel) {
      p.classList.remove('exit', 'active');
    }
  });

  // 3. Slide in target panel from the right
  targetPanel.classList.remove('exit');
  // Trigger layout reflow to ensure it registers at translateX(100%) before animating
  targetPanel.offsetHeight;
  targetPanel.classList.add('active');

  // 4. Update nav items active highlight state
  const navItems = document.querySelectorAll('.hero-nav__item');
  const targetName = targetPanelId.replace('panel-', '');
  navItems.forEach(item => {
    if (item.getAttribute('data-target') === targetName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

let openingAudio;
let loopTimeout;

/**
 * Schedules the background music replay after a 60-second silence gap.
 * It will only trigger if we are on the landing selector page, the audio is not muted, and it is not already playing.
 */
function scheduleLandingLoop() {
  if (loopTimeout) clearTimeout(loopTimeout);
  
  const landingSelector = document.getElementById('landing-selector');
  const isOnLanding = landingSelector && !landingSelector.classList.contains('hidden');

  if (isOnLanding && !openingAudio.muted && openingAudio.paused) {
    loopTimeout = setTimeout(() => {
      // Re-verify that we are still on the landing page and not muted
      const currentIsOnLanding = landingSelector && !landingSelector.classList.contains('hidden');
      if (currentIsOnLanding && !openingAudio.muted) {
        openingAudio.play().catch(err => console.log("Audio loop blocked", err));
      }
    }, 60000); // 60 seconds silence gap
  }
}

/**
 * Initializes opening background audio.
 */
function initAudio() {
  openingAudio = document.getElementById('bg-music');
  if (!openingAudio) return;

  openingAudio.loop = false; // Disable default looping to allow silence gap
  openingAudio.volume = 1.0;
  openingAudio.muted = false; // Default to UNMUTED

  // Listen for audio ended to trigger a 60-second silence gap before playing again
  openingAudio.addEventListener('ended', () => {
    scheduleLandingLoop();
  });

  // Try to play automatically (unmuted) on load
  openingAudio.play().catch(err => {
    console.log("Autoplay blocked, waiting for user interaction.");
    
    // Set up triggers for first user interaction (click, touch, pointer)
    const playOnInteraction = () => {
      if (openingAudio.paused) {
        openingAudio.play().catch(e => console.log("Play on interaction failed", e));
      }
      // Remove all listeners once played
      triggers.forEach(trigger => {
        document.removeEventListener(trigger, playOnInteraction);
      });
    };

    const triggers = ['click', 'touchstart', 'pointerdown'];
    triggers.forEach(trigger => {
      document.addEventListener(trigger, playOnInteraction);
    });
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
