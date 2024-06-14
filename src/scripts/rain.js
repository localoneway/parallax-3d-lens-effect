const random = (min, max) => Math.floor(Math.random() * max) + min;

/**
 * @typedef {[min: Number, max: Number]} Range
 */

/**
 * The single drop of the 'rain effect'.
 */
class RainDrop {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Number} x
   * @param {Number} y
   * @param {Number} size
   * @param {Number} thickness
   * @param {Number} velocityX
   * @param {Number} velocityY
   * @param {Number} opacity
   */
  constructor(context, { x, y, size, thickness, velocityX, velocityY, opacity }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.size = size;
    this.thickness = thickness;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.opacity = opacity;
  }

  draw() {
    const { context, x, y, size, thickness, opacity } = this;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + this.velocityX, y + this.velocityY);
    context.lineWidth = thickness;
    context.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
    context.stroke();
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.draw();
  }
}


/**
 * The 'rain effect' in the background.
 */
class Rain {
  drops = [];

  /**
   * @param {Range} size The range of drop size.
   * @param {Range} thickness The range of drop thickness.
   * @param {Range} speed The range of drop speed.
   * @param {Number} amount Initial amount of drops.
   * @param {Number} interval Time interval for adding new drops in milliseconds.
   */
  constructor({ size = [2, 10], thickness = [1, 2], speed = [2, 20], amount = 340, interval = 30 } = {}) {
    const [sizeMin, sizeMax] = size;
    const [speedMin, speedMax] = speed;
    const [thicknessMin, thicknessMax] = thickness;

    this.sizeRange = size;
    this.thicknessRange = thickness;
    this.speedRange = speed;
    this.interval = interval;

    this.#initCanvas();

    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;

    // Initial blast from the center
    for (let i = 0; i < amount; i++) {
      this.addDropFromCenter();
    }

    // Add new drops at regular intervals
    setInterval(() => {
      this.addDropFromCenter();
    }, interval);
  }

  #initCanvas() {
    const canvas = document.querySelector('canvas.rain');
    this.context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  addDropFromCenter() {
    const [sizeMin, sizeMax] = this.sizeRange;
    const [speedMin, speedMax] = this.speedRange;
    const [thicknessMin, thicknessMax] = this.thicknessRange;

    const angle = Math.random() * 2 * Math.PI;
    const speed = random(speedMin, speedMax);
    const velocityX = speed * Math.cos(angle);
    const velocityY = speed * Math.sin(angle);

    this.drops.push(
      new RainDrop(this.context, {
        x: this.centerX,
        y: this.centerY,
        size: random(sizeMin, sizeMax),
        thickness: random(thicknessMin, thicknessMax - 1) + random(1, 9) / 10,
        velocityX: velocityX,
        velocityY: velocityY,
        opacity: Math.random() * 0.35,
      })
    );
  }

  addRandomDrop() {
    const [sizeMin, sizeMax] = this.sizeRange;
    const [speedMin, speedMax] = this.speedRange;
    const [thicknessMin, thicknessMax] = this.thicknessRange;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const angle = Math.random() * 2 * Math.PI;
    const speed = random(speedMin, speedMax);
    const velocityX = speed * Math.cos(angle);
    const velocityY = speed * Math.sin(angle);

    this.drops.push(
      new RainDrop(this.context, {
        x: x,
        y: y,
        size: random(sizeMin, sizeMax),
        thickness: random(thicknessMin, thicknessMax - 1) + random(1, 9) / 10,
        velocityX: velocityX,
        velocityY: velocityY,
        opacity: Math.random() * 0.85,
      })
    );
  }

  animate() {
    const animateRain = () => {
      requestAnimationFrame(animateRain);
      this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < this.drops.length; i++) {
        this.drops[i].update();
      }
    };

    animateRain();
  }
}

export default Rain;
