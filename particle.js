// Cute, cozy, floating particles for lapis lazuli site
(function() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let dpr = window.devicePixelRatio || 1;
  let w = window.innerWidth, h = window.innerHeight;
  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
  }
  window.addEventListener('resize', resize);
  resize();
  // Particle shapes: bubbles, hearts, stars
  const shapes = [
    { draw: (x, y, r) => { ctx.globalAlpha = 0.18; ctx.beginPath(); ctx.arc(x, y, r, 0, 2*Math.PI); ctx.fillStyle = '#5b7fff'; ctx.fill(); ctx.globalAlpha = 1; } },
    { draw: (x, y, r) => { ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI/4); ctx.scale(r/12, r/12); ctx.beginPath(); ctx.moveTo(0,0); ctx.bezierCurveTo(0,-6,6,-12,12,0); ctx.bezierCurveTo(18,12,0,18,0,30); ctx.bezierCurveTo(0,18,-18,12,-12,0); ctx.bezierCurveTo(-6,-12,0,-6,0,0); ctx.closePath(); ctx.fillStyle = '#ffd166'; ctx.globalAlpha = 0.22; ctx.fill(); ctx.globalAlpha = 1; ctx.restore(); } },
    { draw: (x, y, r) => { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI/5); ctx.beginPath(); for(let i=0;i<5;i++){ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*r, -Math.sin((18+i*72)/180*Math.PI)*r);ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*r*0.5, -Math.sin((54+i*72)/180*Math.PI)*r*0.5);} ctx.closePath(); ctx.fillStyle = '#7c4dff'; ctx.globalAlpha = 0.16; ctx.fill(); ctx.globalAlpha = 1; ctx.restore(); } }
  ];
  const particles = [];
  function spawn() {
    if (particles.length < 22) {
      const s = shapes[Math.floor(Math.random()*shapes.length)];
      particles.push({
        x: Math.random()*w,
        y: h+30,
        r: 12+Math.random()*18,
        vy: -0.3-Math.random()*0.7,
        vx: (Math.random()-0.5)*0.3,
        shape: s,
        alpha: 0.7+Math.random()*0.3
      });
    }
  }
  function draw() {
    ctx.clearRect(0,0,w,h);
    for (let p of particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      p.shape.draw(p.x, p.y, p.r);
      ctx.restore();
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.0007;
    }
    for (let i=particles.length-1; i>=0; i--) {
      if (particles[i].y < -40 || particles[i].alpha < 0.05) particles.splice(i,1);
    }
    spawn();
    requestAnimationFrame(draw);
  }
  draw();
})();
