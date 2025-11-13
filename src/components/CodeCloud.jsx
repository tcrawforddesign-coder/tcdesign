import { useEffect, useRef } from "react";
import * as THREE from "three";

const ALPHABET = "TRAVISCRAWFORDDESIGNWEBPOSTERYXQKHMN";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ACCENT_HEX = "#FFFFFF";

const CodeCloud = () => {
  const wrapRef = useRef(null);
  const scanRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const rootStyles = window.getComputedStyle(document.documentElement);
    const accentHex = rootStyles.getPropertyValue("--brand-red").trim() || "#ffffff";
    const baseLetterColor = "#ffffff";
    const accentLetterColor = accentHex || "#ffffff";

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(clamp(window.devicePixelRatio, 1, 2));
    renderer.setSize(wrap.clientWidth, wrap.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, wrap.clientWidth / wrap.clientHeight, 0.1, 100);
    camera.position.set(0, 0.35, 8);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x111111, 0.95);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(4, 3, 6);
    scene.add(dir);

    const starCount = 360;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const radius = 22 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.cos(phi);
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      opacity: 0.42,
      transparent: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const textureCache = new Map();
    const makeLetterTexture = (char, tint = false) => {
      const key = `${char}-${tint ? "r" : "w"}`;
      if (textureCache.has(key)) return textureCache.get(key);
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 256, 256);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "900 180px Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
      ctx.fillStyle = tint ? ACCENT_HEX : "#FFFFFF";
      ctx.fillText(char, 128, 140);
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      textureCache.set(key, texture);
      return texture;
    };

    const randomOnShell = (minR, maxR) => {
      const r = minR + Math.random() * (maxR - minR);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      );
    };

    const spriteCount = 110;
    const sprites = [];
    for (let i = 0; i < spriteCount; i += 1) {
      const letter = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      const tint = Math.random() < 0.22;
      const texture = makeLetterTexture(letter, tint);
      const material = new THREE.SpriteMaterial({
        map: texture,
        color: 0xffffff,
        opacity: 0.95,
        transparent: true,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      const position = randomOnShell(2.4, 4.4);
      sprite.position.copy(position);
      const baseScale = 0.1 + Math.random() * 0.18;
      sprite.scale.set(baseScale, baseScale, baseScale);
      sprite.userData = {
        baseRadius: position.length(),
        theta: Math.atan2(position.z, position.x),
        phi: Math.acos(position.y / position.length()),
        speed: 0.1 + Math.random() * 0.28,
        wobble: Math.random() * Math.PI * 2,
        nextFlickerAt: performance.now() + 400 + Math.random() * 2200,
        flickerEnd: 0,
        baseScale,
        tinted: tint,
      };
      sprites.push(sprite);
      scene.add(sprite);
    }

    const targetTilt = new THREE.Vector2();
    const pointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      targetTilt.set(nx * 0.12, ny * 0.1);
    };
    const handlePointerLeave = () => {
      targetTilt.set(0, 0);
    };
    window.addEventListener("pointermove", pointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    const handleResize = () => {
      const { clientWidth, clientHeight } = wrap;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    const currentTilt = new THREE.Vector2();
    let animationId = null;

    let burstActive = false;
    let burstUntil = 0;
    const scanElement = scanRef.current;

    const maybeBurst = (now) => {
      if (!scanElement) return;
      if (!burstActive && Math.random() < 0.0025) {
        burstActive = true;
        burstUntil = now + 120 + Math.random() * 220;
        scanElement.classList.add("code-cloud__scan--on");
        starMaterial.opacity = 0.28 + Math.random() * 0.15;
        sprites.forEach((sprite) => {
          if (Math.random() < 0.5) {
            sprite.userData.nextFlickerAt = now + Math.random() * 120;
          }
        });
      } else if (burstActive && now > burstUntil) {
        burstActive = false;
        scanElement.classList.remove("code-cloud__scan--on");
        starMaterial.opacity = 0.42;
      }
    };

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      const now = performance.now();

      currentTilt.lerp(targetTilt, 0.12);
      scene.rotation.x = currentTilt.y;
      scene.rotation.z = currentTilt.x;

      sprites.forEach((sprite) => {
        const data = sprite.userData;
        const radius = data.baseRadius + Math.sin(elapsed * 0.5 + data.wobble) * 0.12;
        const theta = data.theta + elapsed * data.speed * 0.22;
        const phi = data.phi + Math.sin(elapsed * 0.4 + data.wobble) * 0.02;

        sprite.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta),
        );

        const pulse = 0.95 + 0.1 * Math.sin(elapsed * 2 + data.wobble);
        sprite.scale.setScalar(data.baseScale * pulse);

        if (now >= data.nextFlickerAt) {
          data.flickerEnd = now + 80 + Math.random() * 160;
          data.nextFlickerAt = now + 900 + Math.random() * 2400;
        }

        if (now < data.flickerEnd) {
          const char = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
          const tint = Math.random() < 0.4 ? true : data.tinted;
          const tex = makeLetterTexture(char, tint);
          sprite.material.map = tex;
          sprite.material.needsUpdate = true;
        }
      });

      maybeBurst(now);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(tick);
    };

    handleResize();
    tick();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", pointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      wrap.removeChild(renderer.domElement);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      sprites.forEach((sprite) => {
        sprite.material.map?.dispose();
        sprite.material.dispose();
      });
      textureCache.forEach((texture) => texture.dispose());
      scene.clear();
    };
  }, []);

  return (
    <div ref={wrapRef} className="code-cloud">
      <div ref={scanRef} className="code-cloud__scan" aria-hidden="true" />
    </div>
  );
};

export default CodeCloud;

