const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
let width;
let height;
let dpr;

let scrollY = 0;
let previousScrollY = 0;
let scrollVelocity = 0;


// =========================
// SETUP
// =========================

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars();
}


// =========================
// RANDOM NUMBER
// =========================

function random(min, max) {
  return Math.random() * (max - min) + min;
}


// =========================
// CREATE STARS
// =========================

function createStars() {
  const density = 0.00018;

  const count =
    Math.floor(width * height * density);

  stars = [];

  for (let i = 0; i < count; i++) {
    stars.push({

      x: Math.random() * width,

      y: Math.random() * height,

      radius:
        Math.random() < 0.9
          ? random(0.3, 0.8)
          : random(0.8, 1.4),

      opacity:
        random(0.15, 0.7),

      // Normal movement speed
      speed:
        random(0.05, 0.25),

      // Individual twinkle speed
      pulseSpeed:
        random(0.0005, 0.002),

      phase:
        random(0, Math.PI * 2),

      driftX:
        random(-0.008, 0.008),

      driftY:
        random(-0.004, 0.004)
    });
  }
}


// =========================
// SCROLL TRACKING
// =========================

window.addEventListener("scroll", () => {

  scrollY = window.scrollY;

  /*
    Calculate how quickly the user is scrolling.
  */
  scrollVelocity =
    scrollY - previousScrollY;

  previousScrollY = scrollY;
});


// =========================
// ANIMATION
// =========================

let time = 0;

function animate() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  time += 1;


  for (const star of stars) {

    // =====================
    // TWINKLE
    // =====================

    const pulse =
      (
        Math.sin(
          time * star.pulseSpeed +
          star.phase
        ) + 1
      ) / 2;


    const opacity =
      star.opacity *
      (0.35 + pulse * 0.65);


    // =====================
    // NORMAL MOVEMENT
    // =====================

    star.x += star.driftX;

    star.y += star.driftY;


    // =====================
    // SCROLL MOVEMENT
    // =====================

    /*
      Scrolling pushes the stars.

      The multiplier controls how dramatic
      the effect is.
    */

    const scrollEffect =
      scrollVelocity * 0.35;

    star.y -= scrollEffect;


    // =====================
    // WRAP AROUND SCREEN
    // =====================

    if (star.x < -5) {
      star.x = width + 5;
    }

    if (star.x > width + 5) {
      star.x = -5;
    }

    if (star.y < -5) {
      star.y = height + 5;
    }

    if (star.y > height + 5) {
      star.y = -5;
    }


    // =====================
    // DRAW STAR
    // =====================

    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${opacity})`;

    ctx.fill();


    // =====================
    // STAR GLOW
    // =====================

    if (
      pulse > 0.8 &&
      star.radius > 0.7
    ) {

      ctx.beginPath();

      ctx.arc(
        star.x,
        star.y,
        star.radius * 3,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(255,255,255,${opacity * 0.08})`;

      ctx.fill();
    }
  }


  // Gradually return to normal speed
  // after the user stops scrolling.

  scrollVelocity *= 0.9;


  requestAnimationFrame(animate);
}


// =========================
// START
// =========================

window.addEventListener(
  "resize",
  resize
);

resize();
animate();