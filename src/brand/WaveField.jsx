import { useEffect, useRef } from "react";

const ICE = [220, 233, 243];
const SKY = [127, 176, 224];
const COBALT = [47, 93, 140];
const GAP = 26;

function mix(a, b, t) {
  return `rgb(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)})`;
}

/**
 * A field of dots that ripples in two slow crossing waves. When the pointer
 * moves over the parent element the dots near it swell, push aside and send
 * out rings, and the red point follows the pointer. Under reduced motion the
 * waves hold still but the field still answers the pointer.
 */
export default function WaveField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return undefined;

    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, inside: false };
    const smooth = { x: -1, y: -1, h: 0 };
    let t = 0;
    let last = 0;
    let frame = 0;
    let visible = true;

    const size = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return [w, h];
    };

    const draw = () => {
      const [W, H] = size();
      if (!W || !H) return;
      if (smooth.x < 0) {
        smooth.x = W * 0.76;
        smooth.y = H * 0.42;
      }
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my, h } = smooth;

      for (let y = GAP / 2; y < H; y += GAP) {
        for (let x = GAP / 2; x < W; x += GAP) {
          const w01 = Math.sin(x * 0.011 + t * 1.5) * Math.cos(y * 0.015 - t * 1.05) * 0.5 + 0.5;
          const dx = x - mx;
          const dy = y - my;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const m = Math.exp(-(d * d) / (2 * 130 * 130));
          const ripple = Math.sin(d * 0.055 - t * 6) * Math.exp(-d / 240);
          const r = 1.6 + 2.6 * w01 + h * (6.5 * m + 2.2 * ripple);
          if (r < 0.5) continue;
          const push = h * m * 14;
          const k = Math.max(0, Math.min(1, 0.15 + 0.45 * w01 + 0.7 * m * h));
          ctx.fillStyle = k < 0.5 ? mix(ICE, SKY, k * 2) : mix(SKY, COBALT, (k - 0.5) * 2);
          ctx.beginPath();
          ctx.arc(x + (dx / d) * push, y + (dy / d) * push, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const pr = 10 + h * 3 * Math.sin(t * 3);
      ctx.fillStyle = "rgba(207,51,38,0.14)";
      ctx.beginPath();
      ctx.arc(mx, my, pr + 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#CF3326";
      ctx.beginPath();
      ctx.arc(mx, my, pr, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = (now) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      if (!reduce) t += dt;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      const tx = mouse.inside ? mouse.x : W * 0.76;
      const ty = mouse.inside ? mouse.y : H * 0.42;
      smooth.x += (tx - smooth.x) * Math.min(1, dt * 7);
      smooth.y += (ty - smooth.y) * Math.min(1, dt * 7);
      smooth.h += ((mouse.inside ? 1 : 0) - smooth.h) * Math.min(1, dt * 4);
      draw();
      const settling = Math.abs((mouse.inside ? 1 : 0) - smooth.h) > 0.01 || Math.hypot(tx - smooth.x, ty - smooth.y) > 0.5;
      frame = visible && (!reduce || settling) ? requestAnimationFrame(tick) : 0;
    };

    const wake = () => {
      if (!frame && visible) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (event) => {
      const rect = host.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.inside = true;
      wake();
    };
    const onLeave = () => {
      mouse.inside = false;
      wake();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) wake();
    });
    observer.observe(host);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) wake();
    };
    const resize = new ResizeObserver(() => draw());
    resize.observe(canvas);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    draw();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={`tc-wave-field ${className}`} aria-hidden="true" />;
}
