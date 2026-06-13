/**
 * Background Animation - Fixed Canvas Line Overlay
 * Controls the subtle architectural sliding line animation in the background.
 */

// 1. CONFIGURATION CONSTANTS (Easily adjustable)
const CONFIG = {
  lineCount: 10,                 // Number of lines (suggested: 8-12)
  widthMin: 1.0,                 // Minimum line width (px)
  widthMax: 2.0,                 // Maximum line width (px)
  angleMin: -25,                 // Minimum angle in degrees (pointing up-right)
  angleMax: -20,                 // Maximum angle in degrees (pointing up-right)
  lengthMin: 400,                // Minimum line length (px)
  lengthMax: 900,                // Maximum line length (px)
  speedMin: 0.4,                 // Minimum horizontal scroll speed multiplier
  speedMax: 1.4,                 // Maximum horizontal scroll speed multiplier
  opacityMin: 0.05,              // Minimum opacity for line color
  opacityMax: 0.18,              // Maximum opacity for line color
  gradientRatio: 0.7,            // Percentage of lines that have a gradient (0.0 to 1.0)
  lineBaseColor: '17, 17, 17',   // RGB values for the black lines (rgba format helper)
};

// 2. LINE CLASS DEFINITION
class AnimatedLine {
  constructor(canvasWidth, canvasHeight) {
    this.reset(canvasWidth, canvasHeight, true);
  }

  /**
   * Resets/initializes line properties.
   * @param {number} canvasWidth - Current canvas width.
   * @param {number} canvasHeight - Current canvas height.
   * @param {boolean} isInitial - True if first load, places lines randomly across the screen width.
   */
  reset(canvasWidth, canvasHeight, isInitial = false) {
    this.length = Math.random() * (CONFIG.lengthMax - CONFIG.lengthMin) + CONFIG.lengthMin;
    
    // Convert angle to radians
    const angleDegrees = Math.random() * (CONFIG.angleMax - CONFIG.angleMin) + CONFIG.angleMin;
    this.angle = angleDegrees * Math.PI / 180;
    
    this.speed = Math.random() * (CONFIG.speedMax - CONFIG.speedMin) + CONFIG.speedMin;
    this.width = Math.random() * (CONFIG.widthMax - CONFIG.widthMin) + CONFIG.widthMin;
    this.opacity = Math.random() * (CONFIG.opacityMax - CONFIG.opacityMin) + CONFIG.opacityMin;
    this.hasGradient = Math.random() < CONFIG.gradientRatio;
    
    // Distribute Y positions randomly across the viewport
    this.y = Math.random() * canvasHeight;

    // Calculate maximum horizontal space the line occupies due to its angle
    const maxLineOffset = this.length * Math.abs(Math.cos(this.angle));
    
    // Wrap margin to prevent lines from clipping abruptly at boundaries
    const margin = 100;

    if (isInitial) {
      // Initially distribute lines across the visible screen width + margins
      const span = canvasWidth + maxLineOffset + margin * 2;
      this.initialX = Math.random() * span - maxLineOffset - margin;
    } else {
      // If reset during runtime, start completely off-screen on the left
      this.initialX = -maxLineOffset - margin;
    }
  }

  /**
   * Renders the line onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - 2D drawing context.
   * @param {number} canvasWidth - Current canvas width.
   * @param {number} canvasHeight - Current canvas height.
   * @param {number} scrollY - Current page scroll Y offset.
   */
  draw(ctx, canvasWidth, canvasHeight, scrollY) {
    const maxLineOffset = this.length * Math.abs(Math.cos(this.angle));
    const margin = 100;
    const span = canvasWidth + maxLineOffset + margin * 2;

    // Calculate current X position incorporating horizontal displacement relative to scroll
    let currentOffset = (this.initialX + scrollY * this.speed) % span;
    if (currentOffset < 0) {
      currentOffset += span; // Ensure offset is positive
    }

    // Coordinates for start (bottom-left) and end (top-right)
    const x1 = currentOffset - maxLineOffset - margin;
    const y1 = this.y;
    
    const x2 = x1 + this.length * Math.cos(this.angle);
    const y2 = y1 + this.length * Math.sin(this.angle);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = this.width;

    if (this.hasGradient) {
      // Create a linear gradient from tail (transparent x1, y1) to head (solid x2, y2)
      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, `rgba(${CONFIG.lineBaseColor}, 0)`);
      grad.addColorStop(1, `rgba(${CONFIG.lineBaseColor}, ${this.opacity})`);
      ctx.strokeStyle = grad;
    } else {
      ctx.strokeStyle = `rgba(${CONFIG.lineBaseColor}, ${this.opacity})`;
    }

    ctx.stroke();
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
  let lines = [];
  let currentScrollY = window.scrollY;
  let lastScrollY = -1;
  let ticking = false;
  let viewportWidth = 0;
  let viewportHeight = 0;

  /**
   * Resizes canvas to fill viewport, optimizing for high-DPI/Retina screens.
   */
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;

    // Set drawing buffer dimensions scaled by device pixel ratio
    canvas.width = viewportWidth * dpr;
    canvas.height = viewportHeight * dpr;

    // Set CSS display dimensions to match viewport size
    canvas.style.width = `${viewportWidth}px`;
    canvas.style.height = `${viewportHeight}px`;

    // Scale drawing context to ensure crisp crisp rendering
    ctx.scale(dpr, dpr);

    // Reinitialize line instances if screen dimensions change
    initLines();
    
    // Force immediate redraw on resize
    draw();
  }

  /**
   * Creates line instances.
   */
  function initLines() {
    lines = [];
    for (let i = 0; i < CONFIG.lineCount; i++) {
      lines.push(new AnimatedLine(viewportWidth, viewportHeight));
    }
  }

  /**
   * Draws all line instances.
   */
  function draw() {
    ctx.clearRect(0, 0, viewportWidth, viewportHeight);
    
    lines.forEach(line => {
      line.draw(ctx, viewportWidth, viewportHeight, currentScrollY);
    });
  }

  /**
   * Animation update handler executed inside requestAnimationFrame.
   */
  function update() {
    ticking = false;
    if (currentScrollY !== lastScrollY) {
      draw();
      lastScrollY = currentScrollY;
    }
  }

  /**
   * Requests animation frame update.
   */
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  // 4. EVENT LISTENERS
  window.addEventListener('resize', resize);
  
  // Passive scroll listener for excellent performance
  window.addEventListener('scroll', () => {
    currentScrollY = window.scrollY;
    requestTick();
  }, { passive: true });

  // Initial Setup
  resize();
})();
