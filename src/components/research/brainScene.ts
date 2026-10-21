import { traceBrain } from "./brainGeometry";

// R&D 히어로 — 디지털 뇌 신경망.
// 기본: 연한 흰색 노드·연결선, 지구 자전 방향(위에서 보아 반시계)으로 천천히 회전.
// 마우스/터치가 닿은 표면 주변의 노드·선만 주황~노랑으로 그때그때 다른 색으로 켜지고 약하게 반짝인 뒤 사라진다.

const TRAIL = 32; // 동시에 켜져 있을 수 있는 활성 지점 수
const DECAY = 2.6; // 마우스가 지나간 자리의 잔상이 잦아드는 시간(초)
const HOVER_STEP = 0.09; // 이만큼 움직였을 때만 새 활성 지점을 남김(뇌 좌표 기준)
const ROT_SPEED = 0.11; // rad/s (한 바퀴 약 57초)
const IDLE_EVERY = 1.5; // 자동 반짝임 간격(초)
const IDLE_DECAY = 2.8; // 자동 반짝임이 잦아드는 시간(초) — 간격보다 길어 다음 반짝임과 겹친다
const IDLE_RESUME_MS = 1200; // 포인터가 떠난 뒤 자동 반짝임 재개까지

const NODE_VERT = /* glsl */ `
  attribute float aRand;
  uniform float uTime;
  uniform float uPixel;
  uniform vec4 uHits[${TRAIL}];
  varying float vAct;
  varying float vRand;
  varying float vDepth;
  float act(vec3 p) {
    float a = 0.0;
    for (int i = 0; i < ${TRAIL}; i++) {
      vec3 d = p - uHits[i].xyz;
      a += uHits[i].w * exp(-dot(d, d) / (2.0 * 0.026));
    }
    return clamp(a, 0.0, 1.0);
  }
  void main() {
    vec3 p = position;
    p += normalize(p) * 0.006 * sin(uTime * 0.9 + aRand * 31.0); // 아주 약한 숨결
    vAct = act(position);
    vRand = aRand;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = smoothstep(-5.6, -2.8, mv.z); // 1 = 가까움
    float base = mix(2.3, 3.8, aRand);
    gl_PointSize = (base + vAct * 9.0) * uPixel * (3.6 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const COLOR_FN = /* glsl */ `
  vec3 activeColor(float r, float t) {
    // 주황(#FF8A1E) ~ 호박색 ~ 노랑(#FFD34E) 사이를 노드마다·시간마다 다르게
    vec3 orange = vec3(1.0, 0.50, 0.10);
    vec3 amber  = vec3(1.0, 0.66, 0.16);
    vec3 yellow = vec3(1.0, 0.82, 0.30);
    float k = 0.5 + 0.5 * sin(t * 1.3 + r * 23.0);
    k = k * k; // 주황·호박색 쪽에 더 오래 머무르게
    return k < 0.5 ? mix(orange, amber, k * 2.0) : mix(amber, yellow, k * 2.0 - 1.0);
  }
`;

const NODE_FRAG = /* glsl */ `
  uniform float uTime;
  varying float vAct;
  varying float vRand;
  varying float vDepth;
  ${COLOR_FN}
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.05, r);
    float glow = exp(-r * r * 14.0);
    float dotc = smoothstep(0.22, 0.0, r);
    vec3 base = vec3(0.86, 0.91, 0.94);
    float twinkle = 0.72 + 0.28 * sin(uTime * 7.0 + vRand * 61.0);
    vec3 col = mix(base, activeColor(vRand, uTime), smoothstep(0.02, 0.5, vAct));
    float a = mix(0.5, 1.0, vDepth) * core;
    // 활성: 작은 밝은 심 + 넓은 반짝임 후광
    a = mix(a, max(dotc, glow * 0.75) * (0.8 + 0.4 * twinkle), smoothstep(0.02, 0.4, vAct));
    gl_FragColor = vec4(col * (1.0 + vAct * 0.5 * twinkle), a);
  }
`;

const LINE_VERT = /* glsl */ `
  attribute float aRand;
  uniform float uTime;
  uniform vec4 uHits[${TRAIL}];
  varying float vAct;
  varying float vRand;
  varying float vDepth;
  float act(vec3 p) {
    float a = 0.0;
    for (int i = 0; i < ${TRAIL}; i++) {
      vec3 d = p - uHits[i].xyz;
      a += uHits[i].w * exp(-dot(d, d) / (2.0 * 0.022));
    }
    return clamp(a, 0.0, 1.0);
  }
  void main() {
    vec3 p = position;
    p += normalize(p) * 0.006 * sin(uTime * 0.9 + aRand * 31.0);
    vAct = act(position);
    vRand = aRand;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = smoothstep(-5.6, -2.8, mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const LINE_FRAG = /* glsl */ `
  uniform float uTime;
  varying float vAct;
  varying float vRand;
  varying float vDepth;
  ${COLOR_FN}
  void main() {
    vec3 base = vec3(0.80, 0.88, 0.92);
    float twinkle = 0.75 + 0.25 * sin(uTime * 5.0 + vRand * 47.0);
    vec3 col = mix(base, activeColor(vRand, uTime), smoothstep(0.02, 0.45, vAct));
    float a = mix(0.09, 0.26, vDepth) + vAct * 0.8 * twinkle;
    gl_FragColor = vec4(col, a);
  }
`;

/** 컨테이너에 뇌 신경망 캔버스를 붙인다. 성공하면 정리 함수를, WebGL·데이터가 없으면 null을 돌려준다. */
export async function mountNeuralBrain(
  wrap: HTMLElement,
  dataUrl: string,
  isDisposed: () => boolean = () => false,
): Promise<(() => void) | null> {
  const [THREE, res] = await Promise.all([import("three"), fetch(dataUrl)]);
  if (isDisposed() || !res.ok) return null;
  const buf = await res.arrayBuffer();
  if (isDisposed()) return null;
  const head = new Uint32Array(buf, 0, 2);
  const N = head[0], E = head[1];
  const pos = new Float32Array(buf, 8, N * 3);
  const rnd = new Float32Array(buf, 8 + N * 12, N);
  const edges = new Uint16Array(buf, 8 + N * 16, E * 2);

  let renderer: import("three").WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return null; // WebGL 미지원 — 조용히 생략
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.touchAction = "pan-y";
  canvas.setAttribute("aria-hidden", "true");
  wrap.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.05, 4.4);

  const brain = new THREE.Group();
  brain.rotation.x = 0.12;
  brain.rotation.z = -0.05;
  const spin = new THREE.Group(); // 자전(+Y = 위에서 보아 반시계 = 지구 자전 방향)
  spin.rotation.y = -Math.PI / 2 + 0.35; // 옆모습에서 시작
  brain.add(spin);
  scene.add(brain);

  const hits = Array.from({ length: TRAIL }, () => new THREE.Vector4(0, 0, 0, 0));
  const uniforms = {
    uTime: { value: 0 },
    uPixel: { value: dpr },
    uHits: { value: hits },
  };

  // 노드
  const ng = new THREE.BufferGeometry();
  ng.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  ng.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
  const nm = new THREE.ShaderMaterial({
    uniforms, vertexShader: NODE_VERT, fragmentShader: NODE_FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  spin.add(new THREE.Points(ng, nm));

  // 연결선 (선분 정점별로 위치·난수 복사)
  const lp = new Float32Array(E * 6);
  const lr = new Float32Array(E * 2);
  for (let e = 0; e < E; e++) {
    const a = edges[e * 2], b = edges[e * 2 + 1];
    lp.set(pos.subarray(a * 3, a * 3 + 3), e * 6);
    lp.set(pos.subarray(b * 3, b * 3 + 3), e * 6 + 3);
    lr[e * 2] = rnd[a];
    lr[e * 2 + 1] = rnd[b];
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.BufferAttribute(lp, 3));
  lg.setAttribute("aRand", new THREE.BufferAttribute(lr, 1));
  const lm = new THREE.ShaderMaterial({
    uniforms, vertexShader: LINE_VERT, fragmentShader: LINE_FRAG,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  spin.add(new THREE.LineSegments(lg, lm));

  // 크기 맞춤
  const resize = () => {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // 뇌(폭 약 2.5 · 높이 약 1.9)가 화면에 꽉 차되 잘리지 않게 거리 맞춤
    const k = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.z = Math.max(2.05 / k, 2.6 / (k * camera.aspect));
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(wrap);
  resize();

  // 포인터 → 뇌 표면 교차점(로컬 좌표)을 활성 지점으로 기록
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const inv = new THREE.Matrix4();
  let last_ = 0; // 가장 최근에 쓴 슬롯
  const idleSlot = new Array(TRAIL).fill(false); // 자동 반짝임이 쓴 슬롯
  const push = (x: number, y: number, z: number, idle: boolean) => {
    // 가장 많이 사그라든 슬롯을 덮어써서, 아직 밝은 잔상이 끊기지 않게 한다
    let k = 0;
    for (let i = 1; i < TRAIL; i++) if (hits[i].w < hits[k].w) k = i;
    hits[k].set(x, y, z, 1);
    idleSlot[k] = idle;
    last_ = k;
  };
  // 포인터가 올라와 있지 않을 때만 자동 반짝임
  let hovering = false;
  let lastPointer = -1e9;
  const endHover = () => {
    hovering = false;
    lastPointer = performance.now();
  };
  const onMove = (ev: PointerEvent) => {
    if (!hovering) {
      hovering = true;
      // 자동 반짝임은 바로 걷어 낸다
      for (let i = 0; i < TRAIL; i++) if (idleSlot[i]) hits[i].w = Math.min(hits[i].w, 0.2);
    }
    lastPointer = performance.now();
    const r = canvas.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    spin.updateWorldMatrix(true, false);
    inv.copy(spin.matrixWorld).invert();
    const o = ray.ray.origin.clone().applyMatrix4(inv);
    const d = ray.ray.direction.clone().transformDirection(inv);
    const p = traceBrain([o.x, o.y, o.z], [d.x, d.y, d.z]);
    if (!p) return;
    const prev = hits[last_];
    const moved = Math.hypot(prev.x - p[0], prev.y - p[1], prev.z - p[2]);
    if (!idleSlot[last_] && prev.w > 0 && moved < HOVER_STEP) {
      prev.w = 1; // 거의 같은 자리면 새로 쌓지 않고 그 자리를 다시 밝힌다
      return;
    }
    push(p[0], p[1], p[2], false);
  };
  const onUp = (ev: PointerEvent) => {
    if (ev.pointerType !== "mouse") endHover();
  };
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerdown", onMove);
  canvas.addEventListener("pointerleave", endHover);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", endHover);

  // 자동 반짝임: 화면 쪽을 향한 임의의 노드와 그 이웃 몇 개를 마우스가 닿은 것처럼 켠다
  const wp = new THREE.Vector3();
  const pulse = () => {
    spin.updateWorldMatrix(true, false);
    for (let tries = 0; tries < 30; tries++) {
      const i = Math.floor(Math.random() * N);
      wp.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]).applyMatrix4(spin.matrixWorld);
      if (wp.z < 0.25) continue; // 뒤쪽은 건너뜀
      const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
      push(x, y, z, true);
      let added = 0;
      for (let k = 0; k < 400 && added < 2; k++) {
        const j = Math.floor(Math.random() * N);
        const d = Math.hypot(pos[j * 3] - x, pos[j * 3 + 1] - y, pos[j * 3 + 2] - z);
        if (d > 0.06 && d < 0.2) {
          push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2], true);
          added++;
        }
      }
      return;
    }
  };
  let idleT = 0.6; // 첫 반짝임은 곧바로

  // 렌더 루프 — 화면 밖·탭 숨김이면 멈춤
  let raf = 0;
  let visible = true;
  let last = performance.now();
  const loop = (t: number) => {
    raf = 0;
    const dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    uniforms.uTime.value += reduceMotion ? dt * 0.25 : dt;
    if (!reduceMotion) spin.rotation.y += ROT_SPEED * dt;
    for (let i = 0; i < TRAIL; i++) hits[i].w = Math.max(0, hits[i].w - dt / (idleSlot[i] ? IDLE_DECAY : DECAY));
    if (!reduceMotion && !hovering && t - lastPointer > IDLE_RESUME_MS) {
      idleT += dt;
      if (idleT >= IDLE_EVERY) {
        idleT = 0;
        pulse();
      }
    } else {
      idleT = IDLE_EVERY - 0.3;
    }
    renderer.render(scene, camera);
    if (visible && !document.hidden) raf = requestAnimationFrame(loop);
  };
  const kick = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
  };
  const io = new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    kick();
  });
  io.observe(wrap);
  document.addEventListener("visibilitychange", kick);
  kick();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", kick);
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerdown", onMove);
    canvas.removeEventListener("pointerleave", endHover);
    canvas.removeEventListener("pointerup", onUp);
    canvas.removeEventListener("pointercancel", endHover);
    ng.dispose(); lg.dispose(); nm.dispose(); lm.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
