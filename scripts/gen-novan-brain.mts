// R&D 히어로 뇌 신경망 데이터 생성 (결정적). 실행: node --experimental-strip-types scripts/gen-novan-brain.mts
// 출력 public/research/novan-brain.bin = [u32 N][u32 E][f32 xyz*N][f32 rand*N][u16 edge*2E]
import { writeFileSync } from "node:fs";
import { buildBrain } from "../src/components/research/brainGeometry.ts";

const b = buildBrain(2600, 380, 7);
const N = b.rand.length, E = b.edges.length / 2;
if (N > 65535) throw new Error("too many nodes for u16 edges");
const head = new Uint32Array([N, E]);
const edges = Uint16Array.from(b.edges);
const buf = Buffer.concat([
  Buffer.from(head.buffer),
  Buffer.from(b.positions.buffer),
  Buffer.from(b.rand.buffer),
  Buffer.from(edges.buffer),
]);
writeFileSync("public/research/novan-brain.bin", buf);
console.log(`nodes ${N}, edges ${E}, ${buf.length} bytes`);
