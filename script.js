document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSketches();
  initLandingSelector();
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
    // Ignore disabled cards
    if (card.classList.contains('disabled')) return;

    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');

      // Fade out side images
      document.querySelectorAll('.landing-side-img').forEach(img => {
        img.classList.add('fade-out');
      });

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
      });
      landingSelector.classList.remove('hidden');
    });
  }
}
