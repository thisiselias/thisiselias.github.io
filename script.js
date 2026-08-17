    const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let stars = [];
    let width;
    let height;
    let dpr;

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


    function random(min, max) {
      return Math.random() * (max - min) + min;
    }


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

          speed:
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

        const pulse =
          (Math.sin(
            time * star.speed +
            star.phase
          ) + 1) / 2;


        const opacity =
          star.opacity *
          (0.35 + pulse * 0.65);


        star.x += star.driftX;
        star.y += star.driftY;


        if (star.x < -5)
          star.x = width + 5;

        if (star.x > width + 5)
          star.x = -5;

        if (star.y < -5)
          star.y = height + 5;

        if (star.y > height + 5)
          star.y = -5;


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


      requestAnimationFrame(animate);
    }


    window.addEventListener(
      "resize",
      resize
    );


    resize();
    animate();