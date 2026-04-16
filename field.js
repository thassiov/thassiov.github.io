var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");
var dpr = window.devicePixelRatio || 1;
var GAP = 22;
var RADIUS = 150;
var STRENGTH = 14;
var SPRING = 0.08;
var DAMPING = 0.85;
var DOT_R = 1;
var ANCHOR_R = 0.8;

var stalks = [];
var mx = -9999, my = -9999;
var w, h, cols, rows;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  cols = Math.ceil(w / GAP) + 1;
  rows = Math.ceil(h / GAP) + 1;

  var old = {};
  for (var i = 0; i < stalks.length; i++) {
    var s = stalks[i];
    old[s.ax + "," + s.ay] = s;
  }
  stalks = [];
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      var ax = c * GAP;
      var ay = r * GAP;
      var prev = old[ax + "," + ay];
      stalks.push({
        ax: ax, ay: ay,
        tx: prev ? prev.tx : ax,
        ty: prev ? prev.ty : ay,
        vx: prev ? prev.vx : 0,
        vy: prev ? prev.vy : 0
      });
    }
  }
}

function getColors() {
  var style = getComputedStyle(document.documentElement);
  return {
    bg: style.getPropertyValue("--bg").trim(),
    dot: style.getPropertyValue("--dot").trim(),
    line: style.getPropertyValue("--line").trim()
  };
}

function frame() {
  var colors = getColors();

  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, w, h);

  var r2 = RADIUS * RADIUS;

  for (var i = 0; i < stalks.length; i++) {
    var s = stalks[i];

    var dx = mx - s.ax;
    var dy = my - s.ay;
    var d2 = dx * dx + dy * dy;

    if (d2 < r2 && d2 > 0) {
      var d = Math.sqrt(d2);
      var force = (1 - d / RADIUS) * STRENGTH;
      var fx = -(dx / d) * force;
      var fy = -(dy / d) * force;
      s.vx += fx * 0.3;
      s.vy += fy * 0.3;
    }

    var sx = s.ax - s.tx;
    var sy = s.ay - s.ty;
    s.vx += sx * SPRING;
    s.vy += sy * SPRING;

    s.vx *= DAMPING;
    s.vy *= DAMPING;

    s.tx += s.vx;
    s.ty += s.vy;

    var ddx = s.tx - s.ax;
    var ddy = s.ty - s.ay;
    var dist = Math.sqrt(ddx * ddx + ddy * ddy);
    var MAX_LEN = GAP * 0.4;
    if (dist > MAX_LEN) {
      s.tx = s.ax + (ddx / dist) * MAX_LEN;
      s.ty = s.ay + (ddy / dist) * MAX_LEN;
      s.vx *= 0.5;
      s.vy *= 0.5;
    }

    var displaced = dist > 0.3;

    if (displaced) {
      ctx.beginPath();
      ctx.moveTo(s.ax, s.ay);
      ctx.lineTo(s.tx, s.ty);
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(s.ax, s.ay, ANCHOR_R, 0, Math.PI * 2);
      ctx.fillStyle = colors.line;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(s.tx, s.ty, DOT_R, 0, Math.PI * 2);
    ctx.fillStyle = colors.dot;
    ctx.fill();
  }

  requestAnimationFrame(frame);
}

document.addEventListener("mousemove", function(e) { mx = e.clientX; my = e.clientY; });
document.addEventListener("mouseleave", function() { mx = -9999; my = -9999; });
document.addEventListener("touchmove", function(e) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }, { passive: true });
document.addEventListener("touchend", function() { mx = -9999; my = -9999; });

window.addEventListener("resize", resize);
resize();
requestAnimationFrame(frame);
