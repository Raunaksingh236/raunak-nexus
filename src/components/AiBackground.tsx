import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
type Pulse = { a: number; b: number; t: number; speed: number };
type Snippet = { x: number; y: number; text: string; t: number; life: number };
type Graph = { x: number; y: number; w: number; h: number; pts: number[]; t: number; life: number };

const SNIPPETS = [
  "np.array()",
  "df.groupby()",
  "plt.plot()",
  "model.predict(X)",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "AI",
  "ML",
  "accuracy: 0.94",
];

/**
 * Lightweight AI/ML lab background: neural graph, travelling data pulses,
 * sketched line-charts, circuit traces and faint code snippets.
 * Canvas-only, DPR-capped, reduced-motion & mobile aware.
 */
export function AiBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let mobile = false;

    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let snippets: Snippet[] = [];
    let graphs: Graph[] = [];
    let circuits: Array<[number, number][]> = [];

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const buildCircuits = () => {
      circuits = [];
      const count = mobile ? 4 : 8;
      for (let i = 0; i < count; i++) {
        const edgeLeft = i % 2 === 0;
        let x = edgeLeft ? rand(0, w * 0.16) : rand(w * 0.84, w);
        let y = rand(0, h);
        const path: [number, number][] = [[x, y]];
        for (let s = 0; s < 5; s++) {
          if (s % 2 === 0) x += (edgeLeft ? 1 : -1) * rand(20, 70);
          else y += rand(-90, 90);
          path.push([x, y]);
        }
        circuits.push(path);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      mobile = w < 768;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = mobile ? 34000 : 20000;
      const count = Math.max(18, Math.min(mobile ? 34 : 72, Math.round((w * h) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.5 + 0.7,
        phase: Math.random() * Math.PI * 2,
      }));
      pulses = [];
      graphs = [];
      snippets = [];
      buildCircuits();
    };

    const LINK = 150;

    const spawnPulse = () => {
      if (pulses.length > (mobile ? 4 : 9)) return;
      const a = Math.floor(Math.random() * nodes.length);
      const na = nodes[a];
      if (!na) return;
      const candidates: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const nb = nodes[i]!;
        if (i !== a && Math.hypot(na.x - nb.x, na.y - nb.y) < LINK) candidates.push(i);
      }
      const b = candidates[Math.floor(Math.random() * candidates.length)];
      if (b === undefined) return;
      pulses.push({ a, b, t: 0, speed: rand(0.004, 0.011) });
    };

    const spawnSnippet = () => {
      if (snippets.length > (mobile ? 2 : 4)) return;
      snippets.push({
        x: rand(w * 0.06, w * 0.94),
        y: rand(h * 0.1, h * 0.9),
        text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]!,
        t: 0,
        life: rand(360, 560),
      });
    };

    const spawnGraph = () => {
      if (graphs.length > (mobile ? 1 : 3)) return;
      const gw = rand(90, 170);
      const pts = Array.from({ length: 7 }, () => Math.random());
      graphs.push({
        x: rand(w * 0.05, w * 0.9 - gw),
        y: rand(h * 0.12, h * 0.85),
        w: gw,
        h: gw * 0.5,
        pts,
        t: 0,
        life: rand(420, 620),
      });
    };

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const px = mouse.x * 14;
      const py = mouse.y * 14;

      // circuit traces (edges)
      ctx.lineWidth = 1;
      for (const path of circuits) {
        ctx.beginPath();
        path.forEach((p, i) => {
          const cx = p[0] + px * 0.4;
          const cy = p[1] + py * 0.4;
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        });
        ctx.strokeStyle = "rgba(120, 200, 255, 0.07)";
        ctx.stroke();
        const last = path[path.length - 1]!;
        ctx.beginPath();
        ctx.arc(last[0] + px * 0.4, last[1] + py * 0.4, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(170, 130, 255, 0.16)";
        ctx.fill();
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.strokeStyle = `rgba(120, 190, 255, ${0.13 * (1 - d / LINK)})`;
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          n.phase += 0.02;
        }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const glow = 0.45 + 0.35 * Math.sin(n.phase);
        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 215, 255, ${0.35 + glow * 0.35})`;
        ctx.fill();
      }

      // data pulses travelling along connections
      if (!reduced && frame % 26 === 0) spawnPulse();
      pulses = pulses.filter((p) => {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) return false;
        p.t += p.speed;
        if (p.t >= 1) return false;
        const x = a.x + (b.x - a.x) * p.t + px;
        const y = a.y + (b.y - a.y) * p.t + py;
        const fade = Math.sin(p.t * Math.PI);
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 140, 255, ${0.75 * fade})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 200, 255, ${0.1 * fade})`;
        ctx.fill();
        return true;
      });

      // sketched line charts
      if (!reduced && frame % 300 === 0) spawnGraph();
      graphs = graphs.filter((g) => {
        g.t++;
        if (g.t > g.life) return false;
        const inRatio = Math.min(1, g.t / 120);
        const fade = Math.min(1, (g.life - g.t) / 90) * 0.35;
        const gx = g.x + px * 0.6;
        const gy = g.y + py * 0.6;
        ctx.strokeStyle = `rgba(120, 200, 255, ${fade * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.lineTo(gx, gy + g.h);
        ctx.lineTo(gx + g.w, gy + g.h);
        ctx.stroke();
        ctx.beginPath();
        const visible = Math.max(2, Math.round(g.pts.length * inRatio));
        for (let i = 0; i < visible; i++) {
          const x = gx + (g.w / (g.pts.length - 1)) * i;
          const y = gy + g.h - g.pts[i]! * g.h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(170, 140, 255, ${fade})`;
        ctx.stroke();
        for (let i = 0; i < visible; i++) {
          const x = gx + (g.w / (g.pts.length - 1)) * i;
          const y = gy + g.h - g.pts[i]! * g.h;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(130, 215, 255, ${fade * 1.4})`;
          ctx.fill();
        }
        return true;
      });

      // floating code snippets
      if (!reduced && frame % 260 === 0) spawnSnippet();
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
      snippets = snippets.filter((s) => {
        s.t++;
        if (s.t > s.life) return false;
        const fadeIn = Math.min(1, s.t / 90);
        const fadeOut = Math.min(1, (s.life - s.t) / 90);
        ctx.fillStyle = `rgba(150, 205, 255, ${0.14 * fadeIn * fadeOut})`;
        ctx.fillText(s.text, s.x + px * 0.8, s.y + py * 0.8 - s.t * 0.02);
        return true;
      });

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
