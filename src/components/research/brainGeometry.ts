// 절차적 뇌 형태 — 외부 3D 모델(라이선스) 없이 SDF로 대뇌 두 반구·측두엽·소뇌·뇌간을 만들고
// 표면에 노드를 뿌린 뒤 가까운 노드끼리 연결한다. 결정적 난수(seed)로 매번 같은 모양.

type V3 = [number, number, number];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 3D value noise (격자 해시 + 부드러운 보간)
function hash3(x: number, y: number, z: number) {
  let h = (x * 374761393 + y * 668265263 + z * 1274126177) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}
// 능선형 노이즈 → 뇌 이랑(gyri) 느낌
function ridged(x: number, y: number, z: number) {
  let s = 0, amp = 0.6, f = 1;
  for (let o = 0; o < 3; o++) {
    const n = vnoise(x * f, y * f, z * f) * 2 - 1;
    s += (1 - Math.abs(n)) * amp;
    f *= 2.1;
    amp *= 0.45;
  }
  return s;
}

function ellip(p: V3, c: V3, r: V3) {
  const x = (p[0] - c[0]) / r[0], y = (p[1] - c[1]) / r[1], z = (p[2] - c[2]) / r[2];
  const k = Math.sqrt(x * x + y * y + z * z);
  return (k - 1) * Math.min(r[0], r[1], r[2]);
}
function smin(a: number, b: number, k: number) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

// 좌표: x = 좌우, y = 위아래, z = 앞(+)/뒤(-)
export function brainSDF(p: V3): number {
  const L = smin(ellip(p, [-0.28, 0.1, 0.0], [0.58, 0.58, 1.0]), ellip(p, [-0.44, -0.26, 0.26], [0.36, 0.3, 0.56]), 0.25);
  const R = smin(ellip(p, [0.28, 0.1, 0.0], [0.58, 0.58, 1.0]), ellip(p, [0.44, -0.26, 0.26], [0.36, 0.3, 0.56]), 0.25);
  let cer = smin(L, R, 0.1);
  // 위쪽 가운데 세로 고랑(대뇌 종렬) — 위로 갈수록 깊게
  const fy = Math.min(Math.max((p[1] + 0.15) / 0.55, 0), 1);
  cer += 0.11 * Math.exp(-(p[0] * p[0]) / 0.0025) * fy * fy * (3 - 2 * fy);
  // 이랑 주름
  cer -= 0.045 * (ridged(p[0] * 3.6 + 7, p[1] * 3.6, p[2] * 3.6) - 0.55);
  const cbl = ellip(p, [0, -0.47, -0.62], [0.6, 0.28, 0.36]) - 0.012 * Math.sin(p[1] * 70); // 소뇌의 가는 결
  const stem = ellip(p, [0, -0.72, -0.28], [0.15, 0.42, 0.16]);
  return smin(smin(cer, cbl, 0.08), stem, 0.12);
}

function grad(p: V3): V3 {
  const e = 0.004;
  const f = (x: number, y: number, z: number) => brainSDF([x, y, z]);
  return [
    (f(p[0] + e, p[1], p[2]) - f(p[0] - e, p[1], p[2])) / (2 * e),
    (f(p[0], p[1] + e, p[2]) - f(p[0], p[1] - e, p[2])) / (2 * e),
    (f(p[0], p[1], p[2] + e) - f(p[0], p[1], p[2] - e)) / (2 * e),
  ];
}

export type BrainData = {
  positions: Float32Array; // 노드 xyz
  normals: Float32Array;
  rand: Float32Array; // 노드별 0..1
  edges: Uint32Array; // 노드 인덱스 쌍
};

export function buildBrain(surfaceCount: number, interiorCount: number, seed = 7): BrainData {
  const rnd = mulberry32(seed);
  const pts: V3[] = [];
  const nrm: V3[] = [];
  const minGap = 0.034;
  // 공간 격자(최소 간격 유지 + 이웃 탐색)
  const cell = 0.12;
  const grid = new Map<string, number[]>();
  const key = (x: number, y: number, z: number) => `${Math.floor(x / cell)},${Math.floor(y / cell)},${Math.floor(z / cell)}`;
  const tooClose = (p: V3, gap: number) => {
    const cx = Math.floor(p[0] / cell), cy = Math.floor(p[1] / cell), cz = Math.floor(p[2] / cell);
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      const arr = grid.get(`${cx + dx},${cy + dy},${cz + dz}`);
      if (!arr) continue;
      for (const i of arr) {
        const q = pts[i];
        const d2 = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 + (q[2] - p[2]) ** 2;
        if (d2 < gap * gap) return true;
      }
    }
    return false;
  };
  const add = (p: V3, n: V3) => {
    const k = key(p[0], p[1], p[2]);
    const arr = grid.get(k);
    if (arr) arr.push(pts.length); else grid.set(k, [pts.length]);
    pts.push(p);
    nrm.push(n);
  };

  // 표면 노드: 상자 안 임의 점 → SDF 기울기로 표면에 투영
  let guard = 0;
  while (pts.length < surfaceCount && guard++ < surfaceCount * 40) {
    let p: V3 = [(rnd() * 2 - 1) * 1.05, (rnd() * 2 - 1) * 0.95 - 0.1, (rnd() * 2 - 1) * 1.15];
    let ok = false;
    for (let it = 0; it < 12; it++) {
      const d = brainSDF(p);
      const g = grad(p);
      const gl = g[0] * g[0] + g[1] * g[1] + g[2] * g[2] || 1;
      p = [p[0] - (d * g[0]) / gl, p[1] - (d * g[1]) / gl, p[2] - (d * g[2]) / gl];
      if (Math.abs(d) < 0.002) { ok = true; break; }
    }
    if (!ok || Math.abs(brainSDF(p)) > 0.006) continue;
    if (tooClose(p, minGap)) continue;
    const g = grad(p);
    const gl = Math.hypot(g[0], g[1], g[2]) || 1;
    add(p, [g[0] / gl, g[1] / gl, g[2] / gl]);
  }
  const surfaceN = pts.length;

  // 내부 노드(깊이감): 표면보다 안쪽, 성기게
  guard = 0;
  while (pts.length < surfaceN + interiorCount && guard++ < interiorCount * 60) {
    const p: V3 = [(rnd() * 2 - 1) * 0.95, (rnd() * 2 - 1) * 0.8 - 0.05, (rnd() * 2 - 1) * 1.05];
    const d = brainSDF(p);
    if (d > -0.09) continue;
    if (tooClose(p, minGap * 2.2)) continue;
    const l = Math.hypot(p[0], p[1], p[2]) || 1;
    add(p, [p[0] / l, p[1] / l, p[2] / l]);
  }

  // 연결: 각 노드에서 가까운 이웃 k개 (거리 상한)
  const edgesSet = new Set<number>();
  const edges: number[] = [];
  const N = pts.length;
  for (let i = 0; i < N; i++) {
    const p = pts[i];
    const interior = i >= surfaceN;
    const kN = interior ? 3 : 3;
    const maxD = interior ? 0.3 : 0.15;
    const cand: [number, number][] = [];
    const cx = Math.floor(p[0] / cell), cy = Math.floor(p[1] / cell), cz = Math.floor(p[2] / cell);
    const span = interior ? 3 : 2;
    for (let dx = -span; dx <= span; dx++) for (let dy = -span; dy <= span; dy++) for (let dz = -span; dz <= span; dz++) {
      const arr = grid.get(`${cx + dx},${cy + dy},${cz + dz}`);
      if (!arr) continue;
      for (const j of arr) {
        if (j === i) continue;
        const q = pts[j];
        const d2 = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2 + (q[2] - p[2]) ** 2;
        if (d2 < maxD * maxD) cand.push([d2, j]);
      }
    }
    cand.sort((a, b) => a[0] - b[0]);
    for (let c = 0; c < Math.min(kN, cand.length); c++) {
      const j = cand[c][1];
      const a = Math.min(i, j), b = Math.max(i, j);
      const h = a * 100003 + b;
      if (edgesSet.has(h)) continue;
      edgesSet.add(h);
      edges.push(a, b);
    }
  }

  const positions = new Float32Array(N * 3);
  const normals = new Float32Array(N * 3);
  const rand = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    positions.set(pts[i], i * 3);
    normals.set(nrm[i], i * 3);
    rand[i] = rnd();
  }
  return { positions, normals, rand, edges: new Uint32Array(edges) };
}

// 화면 광선 → 뇌 표면 교차점 (sphere tracing). 로컬 좌표계의 원점/방향을 받는다.
export function traceBrain(o: V3, d: V3): V3 | null {
  // 경계 구(반지름 1.35)와 먼저 교차
  const b = o[0] * d[0] + o[1] * d[1] + o[2] * d[2];
  const c = o[0] * o[0] + o[1] * o[1] + o[2] * o[2] - 1.35 * 1.35;
  const disc = b * b - c;
  if (disc < 0) return null;
  let t = Math.max(0, -b - Math.sqrt(disc));
  const tMax = -b + Math.sqrt(disc);
  for (let i = 0; i < 64 && t < tMax; i++) {
    const p: V3 = [o[0] + d[0] * t, o[1] + d[1] * t, o[2] + d[2] * t];
    const s = brainSDF(p);
    if (s < 0.004) return p;
    t += Math.max(s * 0.8, 0.004);
  }
  return null;
}
