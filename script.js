document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderSketches();
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
