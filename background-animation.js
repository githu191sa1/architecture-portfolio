/**
 * Background Animation - Wave Flowing Particle Field
 * Renders a slow-drifting, scroll-responsive wave field of particles using HTML5 Canvas.
 */

// Mouse interaction constants
const MOUSE_INFLUENCE_RADIUS = 200; // 影響範圍(px)
const MOUSE_REPEL_STRENGTH = 0.25;  // 排斥力強度(0~1,越大越強)
const RETURN_SPEED = 0.03;          // 粒子回彈速度

// 1. CONFIGURATION CONSTANTS (Easily adjustable)
const CONFIG = {
  // Particle Properties
  particleCount: 450,            // Total number of particles (suggested: 300-600)
  particleColor: '245, 245, 245', // RGB for light gray/white particles (matches dark theme text)
  sizeMin: 0.6,                  // Minimum particle radius (px)
  sizeMax: 1.8,                  // Maximum particle radius (px)
  opacityMin: 0.15,              // Minimum particle base opacity
  opacityMax: 0.65,              // Maximum particle base opacity

  // Wave Dynamics
  waveAmplitude: 55,             // Max vertical displacement of the wave (px)
  waveFrequencyX: 0.005,         // How tight the wave peaks are horizontally
  scrollSpeed: 0.0018,           // How fast the wave rolls when scrolling
  timeSpeed: 0.0008,             // Speed of continuous idle wave movement

  // Floating & Drift Dynamics
  driftSpeedXMin: -0.05,         // Min horizontal idle drift speed (pixels/frame)
  driftSpeedXMax: 0.12,          // Max horizontal idle drift speed (pixels/frame)
};

// 2. PARTICLE CLASS DEFINITION
class WaveParticle {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight, true);
  }

  /**
   * Initializes or resets particle properties.
   */
  reset(canvasWidth, canvasHeight, isInitial = false) {
    this.x = Math.random() * canvasWidth;
    this.baseY = Math.random() * canvasHeight;
    this.radius = Math.random() * (CONFIG.sizeMax - CONFIG.sizeMin) + CONFIG.sizeMin;
    this.baseOpacity = Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin) + CONFIG.opacityMin;
    this.phase = Math.random() * Math.PI * 2; // Random initial angle for wave offset
    
    // Each particle has a unique amplitude scaling factor to create natural visual depth
    this.ampScale = Math.random() * 0.6 + 0.7; // 0.7x to 1.3x amplitude
    
    // Constant horizontal drift
    this.driftX = Math.random() * (CONFIG.driftSpeedXMax - CONFIG.driftSpeedXMin) + CONFIG.driftSpeedXMin;

    // Mouse repulsion offsets
    this.offsetX = 0; // 因滑鼠產生的X偏移
    this.offsetY = 0; // 因滑鼠產生的Y偏移
  }

  /**
   * Updates particle coordinates based on horizontal drift, wave sine math, and mouse repulsion.
   * @param {number} canvasWidth - Viewport width
   * @param {number} canvasHeight - Viewport height
   * @param {number} time - Elapsed time in ms
   * @param {number} scrollY - Page scroll offset
   * @param {number} mouseX - Mouse X coordinate
   * @param {number} mouseY - Mouse Y coordinate
   */
  update(canvasWidth, canvasHeight, time, scrollY, mouseX, mouseY) {
    // 1. Apply horizontal drift and wrap around edges
    this.x += this.driftX;
    if (this.x > canvasWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = canvasWidth;
    }

    // Adapt baseY if screen resized smaller
    if (this.baseY > canvasHeight) {
      this.baseY = Math.random() * canvasHeight;
    }

    // 2. Multi-sine wave interference equation for premium, organic movement
    const mainWave = Math.sin(this.x * CONFIG.waveFrequencyX + scrollY * CONFIG.scrollSpeed + time * CONFIG.timeSpeed + this.phase);
    const microRipple = Math.cos(this.x * 0.012 - scrollY * 0.0006 + time * 0.0012 + this.phase * 0.5);

    // Composite offset calculation
    const displacement = (mainWave * 0.75 + microRipple * 0.25) * (CONFIG.waveAmplitude * this.ampScale);
    this.displayY = this.baseY + displacement;

    // 3. Mouse repulsion physics
    const dx = this.x + this.offsetX - mouseX;
    const dy = this.displayY + this.offsetY - mouseY;

    // High performance exclusion with Math.abs before full distance calculation
    if (Math.abs(dx) < MOUSE_INFLUENCE_RADIUS && Math.abs(dy) < MOUSE_INFLUENCE_RADIUS) {
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < MOUSE_INFLUENCE_RADIUS && distance > 0) {
        const force = (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
        this.offsetX += (dx / distance) * force * MOUSE_REPEL_STRENGTH * 10;
        this.offsetY += (dy / distance) * force * MOUSE_REPEL_STRENGTH * 10;
      }
    }

    // Damping return: offset decays back to 0
    this.offsetX *= (1 - RETURN_SPEED);
    this.offsetY *= (1 - RETURN_SPEED);
  }

  /**
   * Draws the particle on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - 2D drawing context.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x + this.offsetX, this.displayY + this.offsetY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.particleColor}, ${this.baseOpacity})`;
    ctx.fill();
  }
}

// 3. CORE INITIALIZATION AND ANIMATION LOOP
(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) {
    console.warn('Background Canvas element #bg-canvas not found.');
    return;
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let viewportWidth = 0;
  let viewportHeight = 0;
  let startTime = performance.now();

  // Track mouse coordinates
  let mouseX = -9999;
  let mouseY = -9999;

  /**
   * Resizes canvas and scales context for Retina/high-DPI screens.
   */
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    // Scale drawing buffer
    canvas.width = viewportWidth * dpr;
    canvas.height = viewportHeight * dpr;

    // Scale css layout style bounds
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    // Apply scale matrix transformation for crystal clear rendering
    ctx.scale(dpr, dpr);

    // Initial allocation of particles
    if (particles.length === 0) {
      initParticles();
    }
  }

  /**
   * Allocates particle instances.
   */
  function initParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push(new WaveParticle(viewportWidth, viewportHeight));
    }
  }

  /**
   * Animation tick update loop.
   * @param {DOMHighResTimeStamp} timestamp - Elapsed time from animation start
   */
  function tick(timestamp) {
    const time = timestamp - startTime;
    const scrollY = window.scrollY;

    // Clear buffer
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);

    // Update and draw each particle
    particles.forEach(particle => {
      particle.update(viewportWidth, viewportHeight, time, scrollY, mouseX, mouseY);
      particle.draw(ctx);
    });

    requestAnimationFrame(tick);
  }

  // 4. EVENT LISTENERS
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouseX = -9999;
    mouseY = -9999;
  });

  // Initial trigger
  resize();

  // Run the render loop continuously
  requestAnimationFrame(tick);
})();
