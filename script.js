let currentPage = 1;
const PROJECTS_PER_PAGE = 3;

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initProjectsPagination();
  initLandingSelector();
  initNavigation();
  initAudio();
  initProjectDetails();

  // Trigger side images slide-in animation
  setTimeout(() => {
    document.querySelectorAll('.landing-side-img').forEach(img => {
      img.classList.add('active');
    });
  }, 100);
});

/**
 * Renders the projects list into the projects grid container with pagination support.
 */
function renderProjects() {
  const container = document.getElementById('projects-container');
  const indicator = document.getElementById('pagination-indicator');
  const prevBtn = document.getElementById('pagination-prev');
  const nextBtn = document.getElementById('pagination-next');
  
  if (!container) return;

  if (typeof projects === 'undefined' || !Array.isArray(projects)) {
    container.innerHTML = '<p>Project data is missing or failed to load.</p>';
    return;
  }

  // Calculate pages
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  // Update indicators and button states
  if (indicator) {
    indicator.textContent = `Page ${currentPage} / ${totalPages}`;
  }
  if (prevBtn) {
    prevBtn.disabled = (currentPage === 1);
  }
  if (nextBtn) {
    nextBtn.disabled = (currentPage === totalPages);
  }

  container.innerHTML = ''; // Clear skeleton placeholders if any

  // Slice projects for current page
  const start = (currentPage - 1) * PROJECTS_PER_PAGE;
  const end = start + PROJECTS_PER_PAGE;
  const pageProjects = projects.slice(start, end);

  pageProjects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);

    card.innerHTML = `
      <div class="media-placeholder">
        <img 
          src="${project.coverImage.replace(/"/g, "'")}" 
          alt="${project.title}" 
          class="media-placeholder__img" 
          onload="this.style.opacity='1';"
          onerror="this.style.opacity='0'; this.nextElementSibling.style.display='block';"
          style="opacity: 0; transition: opacity var(--transition-normal);"
        >
        <span class="media-placeholder__fallback" style="display: none;">IMAGE PLACEHOLDER</span>
      </div>
      <div class="project-card__info">
        <h3 class="project-card__title">${project.title}</h3>
        <span class="project-card__meta">${project.type} · ${project.year}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Initializes click event listeners for the projects pagination buttons.
 */
function initProjectsPagination() {
  const prevBtn = document.getElementById('pagination-prev');
  const nextBtn = document.getElementById('pagination-next');

  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      changeProjectsPage(currentPage - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
    if (currentPage < totalPages) {
      changeProjectsPage(currentPage + 1);
    }
  });
}

/**
 * Changes the active projects grid page with a smooth fade out/in transition.
 * @param {number} newPage - The page number to switch to.
 */
function changeProjectsPage(newPage) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  // 1. Smoothly fade out container
  container.style.opacity = '0';

  setTimeout(() => {
    // 2. Update page index and re-render
    currentPage = newPage;
    renderProjects();

    // 3. Smoothly fade in container
    container.style.opacity = '1';
  }, 200);
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
        openingAudio.play().catch(err => {
          console.log("Audio loop blocked. Registering interaction fallback.", err);
          
          // Fallback: play on first user interaction if loop was blocked
          const playOnInteraction = () => {
            if (openingAudio.paused) {
              openingAudio.play().catch(e => console.log("Play on interaction failed", e));
            }
            triggers.forEach(t => document.removeEventListener(t, playOnInteraction));
          };

          const triggers = ['click', 'touchstart', 'pointerdown', 'keydown'];
          triggers.forEach(t => document.addEventListener(t, playOnInteraction, { once: true }));
        });
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

  const tryPlay = () => {
    openingAudio.play().then(() => {
      console.log("Audio started successfully.");
    }).catch(err => {
      console.log("Autoplay blocked, waiting for user interaction.", err);
      
      // Set up triggers for first user interaction (click, touch, pointer, key)
      const playOnInteraction = () => {
        if (openingAudio.paused) {
          openingAudio.play().then(() => {
            console.log("Audio played on user gesture.");
          }).catch(e => console.log("Play on interaction failed", e));
        }
        // Remove all listeners once played
        triggers.forEach(trigger => {
          document.removeEventListener(trigger, playOnInteraction);
        });
      };

      const triggers = ['click', 'touchstart', 'pointerdown', 'keydown'];
      triggers.forEach(trigger => {
        document.addEventListener(trigger, playOnInteraction, { once: true });
      });
    });
  };

  // If the audio is already playing (via HTML native autoplay), we are done
  const isPlaying = openingAudio.currentTime > 0 && !openingAudio.paused && !openingAudio.ended && openingAudio.readyState > 2;
  if (isPlaying) {
    console.log("Audio is already playing natively via HTML autoplay.");
    return;
  }

  // If the audio is ready to play, try to play it. Otherwise, wait for 'canplay' event.
  if (openingAudio.readyState >= 2) {
    tryPlay();
  } else {
    openingAudio.addEventListener('canplay', tryPlay, { once: true });
  }
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

/**
 * Initializes the Project Detail View functionality (opening/closing and category sub-nav)
 */
function initProjectDetails() {
  const container = document.getElementById('projects-container');
  const detailView = document.getElementById('project-detail');
  const gridView = document.getElementById('projects-grid-view');
  const backBtn = document.getElementById('project-detail-back');
  const subnavBtns = document.querySelectorAll('.detail-subnav button');
  const contentDisplay = document.getElementById('detail-content-display');

  if (!container || !detailView || !gridView || !backBtn) return;

  let currentProject = null;

  // 1. Open project detail
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    const projId = card.getAttribute('data-id');
    currentProject = projects.find(p => p.id === projId);
    if (!currentProject) return;

    // Set detail cover image and title
    const coverImage = document.getElementById('detail-cover-image');
    const projectTitle = document.getElementById('detail-project-title');
    if (coverImage) {
      coverImage.src = currentProject.coverImage;
      coverImage.alt = currentProject.title;
      // Force instant scale down first, then offset to trigger smooth animate zoom
      coverImage.classList.remove('zoomed-in');
      coverImage.offsetHeight; // force reflow
      coverImage.classList.add('zoomed-in');
    }
    if (projectTitle) {
      projectTitle.textContent = currentProject.title;
    }

    // Reset subnav buttons active state
    subnavBtns.forEach(btn => {
      if (btn.getAttribute('data-category') === 'overview') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Render default overview text
    renderCategory('overview');

    // Fade out grid and fade in detail view
    gridView.classList.add('fade-out');
    
    // Wait for grid fade out to complete before showing detail side content animation
    setTimeout(() => {
      detailView.classList.remove('hidden');
      detailView.offsetHeight; // force reflow
      detailView.classList.add('active');
    }, 200);
  });

  // 2. Click category sub-navigation
  subnavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      subnavBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      renderCategory(category);
    });
  });

  // 3. Render content category
  function renderCategory(category) {
    if (!currentProject || !contentDisplay) return;

    // Fade out old content
    contentDisplay.style.opacity = '0';

    setTimeout(() => {
      contentDisplay.innerHTML = '';
      
      const details = currentProject.details;
      if (!details || !details[category]) {
        contentDisplay.innerHTML = '<p>無可用資料。</p>';
        contentDisplay.style.opacity = '1';
        return;
      }

      if (category === 'overview') {
        const p = document.createElement('p');
        p.className = 'detail-overview-text';
        p.textContent = details.overview.text;
        contentDisplay.appendChild(p);

        // 如果 details.overview.images 存在且有圖片，則在文字下方渲染圖片
        if (details.overview.images && Array.isArray(details.overview.images) && details.overview.images.length > 0) {
          p.style.marginBottom = 'var(--space-md)';
          
          const galleryContainer = document.createElement('div');
          galleryContainer.className = 'detail-gallery';
          
          details.overview.images.forEach(imgSrc => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'detail-gallery-img-wrapper';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Overview layout diagram';
            img.className = 'detail-gallery-img';
            img.loading = 'lazy';
            
            imgContainer.appendChild(img);
            galleryContainer.appendChild(imgContainer);
          });
          
          contentDisplay.appendChild(galleryContainer);
        }
      } else {
        // plans or renders: display images
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'detail-gallery';
        
        details[category].forEach(imgSrc => {
          const imgContainer = document.createElement('div');
          imgContainer.className = 'detail-gallery-img-wrapper';
          
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = category;
          img.className = 'detail-gallery-img';
          img.loading = 'lazy';
          
          imgContainer.appendChild(img);
          galleryContainer.appendChild(imgContainer);
        });
        
        contentDisplay.appendChild(galleryContainer);
      }

      // Fade in new content
      contentDisplay.style.opacity = '1';
    }, 150);
  }

  // 4. Back button click
  backBtn.addEventListener('click', () => {
    detailView.classList.remove('active');
    detailView.classList.add('hidden');
    gridView.classList.remove('fade-out');

    // Reset zoom state of cover image
    const coverImage = document.getElementById('detail-cover-image');
    if (coverImage) {
      coverImage.classList.remove('zoomed-in');
    }
  });
}

