import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContactMessage } from "@/lib/contact.functions";
import {
  ArrowRight,
  Brain,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Rocket,
  Sparkles,
  Terminal,
} from "lucide-react";
import { NeuralBackground } from "@/components/NeuralBackground";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import avatar from "@/assets/raunak-avatar.jpg.asset.json";
import aboutVisual from "@/assets/about-visual.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raunak Kumar Singh — B.Tech AIML Student & Aspiring AI/ML Developer" },
      {
        name: "description",
        content:
          "Portfolio of Raunak Kumar Singh, second-year B.Tech AIML student at GLA University Mathura, exploring Python, machine learning, data analysis and software development.",
      },
      { property: "og:title", content: "Raunak Kumar Singh — AIML Student Portfolio" },
      {
        property: "og:description",
        content:
          "AI/ML learner building skills in Python, machine learning, data analysis and web development. Class of 2029, GLA University Mathura.",
      },
    ],
  }),
  component: Index,
});

const skills = [
  { name: "Python", level: 70, icon: Terminal, featured: true },
  { name: "AI & Machine Learning", level: 55, icon: Brain, featured: true },
  { name: "Java", level: 50, icon: Code2 },
  { name: "HTML", level: 75, icon: Code2 },
  { name: "CSS", level: 65, icon: Code2 },
  { name: "JavaScript", level: 50, icon: Code2 },
  { name: "SQL (Basics)", level: 40, icon: Database },
];

const exploring = [
  "Artificial Intelligence",
  "Machine Learning",
  "Python Development",
  "Data Analysis",
  "Software Development",
  "Web Development",
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="mb-2 text-sm font-medium tracking-[0.25em] text-primary uppercase">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

const roles = [
  "B.Tech AIML Student",
  "Aspiring AI/ML Developer",
  "Python Enthusiast",
];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index]!;
    const done = !deleting && text === full;
    const cleared = deleting && text === "";
    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (cleared) {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
          return;
        }
        setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
      },
      done ? 1600 : deleting ? 35 : 70,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return <span aria-label="B.Tech AIML Student | Aspiring AI/ML Developer">{text}</span>;
}

function Index() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendContact = useServerFn(submitContactMessage);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSending(true);
    setError(null);
    try {
      await sendContact({
        data: {
          name: String(formData.get("name") ?? "").trim() || undefined,
          email: String(formData.get("email") ?? "").trim() || undefined,
          message: String(formData.get("message") ?? "").trim(),
        },
      });
      setSent(true);
      form.reset();
    } catch {
      setError("Something went wrong. Please email me directly at singhraunak81026@gmail.com.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section
        id="home"
        className="relative isolate flex min-h-screen items-center overflow-hidden pt-32 pb-20"
      >
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden="true"
        />
        <NeuralBackground />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-glass px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Open to learning &amp; collaboration
              <span className="hidden text-border sm:inline">|</span>
              <span className="hidden sm:inline">Class of 2029 · GLA University</span>
            </span>
            <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
              Raunak Kumar <span className="text-gradient">Singh</span>
            </h1>
            <p className="mt-4 flex min-h-8 items-center text-lg font-medium text-primary sm:text-xl">
              <RotatingRole />
              <span className="animate-caret ml-0.5 inline-block h-5 w-[2px] bg-primary align-middle" />
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A technology-passionate student exploring Artificial Intelligence, Machine Learning,
              Python, data analysis and software development.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {["Python", "Machine Learning", "Java", "JavaScript", "SQL"].map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border bg-glass px-3 py-1 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#skills"
                className="animate-pulse-ring group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                View My Skills
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-glass px-6 py-3 text-sm font-semibold backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
              >
                Contact Me
              </a>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
              {[
                { k: "2nd", v: "Year B.Tech" },
                { k: "AIML", v: "Specialisation" },
                { k: "2029", v: "Graduating" },
              ].map((s) => (
                <div key={s.k} className="glass-card px-4 py-3">
                  <dt className="text-lg font-bold text-foreground">{s.k}</dt>
                  <dd className="text-[11px] tracking-wide text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex items-center gap-5 text-muted-foreground">
              <a
                href="https://github.com/Raunaksingh236"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/raunak-singh-68bb133b7/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:singhraunak81026@gmail.com"
                aria-label="Email"
                className="transition-all hover:-translate-y-0.5 hover:text-primary"
              >
                <Mail size={20} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="justify-self-center">
            <div className="animate-float-soft relative grid place-items-center">
              <div
                className="absolute -inset-10 rounded-full blur-3xl"
                style={{ background: "var(--gradient-hero)" }}
                aria-hidden="true"
              />
              {/* rotating conic halo */}
              <div
                className="conic-ring absolute h-[19rem] w-[19rem] rounded-full opacity-60 blur-[2px] sm:h-[23rem] sm:w-[23rem]"
                aria-hidden="true"
              />
              <div
                className="absolute h-[18rem] w-[18rem] rounded-full bg-background sm:h-[22rem] sm:w-[22rem]"
                aria-hidden="true"
              />
              {/* orbiting nodes */}
              <div
                className="animate-orbit absolute h-[21rem] w-[21rem] sm:h-[25rem] sm:w-[25rem]"
                aria-hidden="true"
              >
                <span className="absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_14px_var(--primary)]" />
                <span className="absolute bottom-6 left-3 h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
                <span className="absolute right-2 bottom-16 h-1.5 w-1.5 rounded-full bg-primary/70" />
              </div>
              <img
                src={avatar.url}
                alt="Profile photo of Raunak Kumar Singh"
                width={600}
                height={800}
                className="relative h-64 w-64 rounded-full border border-border object-cover sm:h-80 sm:w-80"
                style={{ boxShadow: "var(--glow-primary)" }}
              />
              <span className="glass-card absolute bottom-[-1.25rem] left-1/2 -translate-x-1/2 bg-card px-4 py-2 text-xs whitespace-nowrap text-muted-foreground">
                <Sparkles size={12} className="mr-1.5 inline text-primary" />
                AI / ML Learner
              </span>
            </div>
          </Reveal>
        </div>

        <a
          href="#about"
          aria-label="Scroll to about"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary md:flex"
        >
          <span className="flex h-9 w-5 justify-center rounded-full border border-border pt-1.5">
            <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        </a>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="About" title="A student building toward AI" />
        </Reveal>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <img
              src={aboutVisual}
              alt="Glowing neural network visualization"
              loading="lazy"
              width={1200}
              height={900}
              className="w-full rounded-3xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-muted-foreground">
            <p className="leading-relaxed">
              I'm Raunak, a second-year B.Tech student passionate about technology and constantly
              learning new skills. Right now I'm exploring Artificial Intelligence and Machine
              Learning, with a strong interest in Python, data analysis and software development.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Building projects",
                "Solving programming problems",
                "Learning new technologies",
                "Improving technical skills",
              ].map((item) => (
                <li
                  key={item}
                  className="glass-card flex items-center gap-3 px-4 py-3 text-sm text-foreground"
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="leading-relaxed">
              My goal is to grow into a skilled developer and use technology to create practical,
              meaningful solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="Education" title="Academic timeline" />
        </Reveal>
        <div className="relative border-l border-border pl-8">
          <Reveal className="relative">
            <span className="absolute top-6 -left-[41px] grid h-6 w-6 place-items-center rounded-full border border-primary bg-background">
              <GraduationCap size={13} className="text-primary" />
            </span>
            <article className="glass-card p-7">
              <p className="text-xs tracking-widest text-primary uppercase">2nd Year · Ongoing</p>
              <h3 className="mt-2 text-xl font-semibold">
                B.Tech in Artificial Intelligence &amp; Machine Learning
              </h3>
              <p className="mt-1 text-muted-foreground">GLA University, Mathura</p>
              <p className="mt-4 text-sm text-muted-foreground">Expected graduation: 2029</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="Skills" title="Currently developing" />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 70}>
              <div
                className={`glass-card h-full p-6 ${
                  skill.featured ? "ring-1 ring-primary/40" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <skill.icon size={18} />
                  </span>
                  <h3 className="min-w-0 truncate font-semibold">{skill.name}</h3>
                </div>
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-1000"
                    style={{ width: `${skill.level}%`, boxShadow: "var(--glow-primary)" }}
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {skill.featured ? "Core focus · actively practising" : "Learning & improving"}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey: projects + learning + exploring */}
      <section id="journey" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="Journey" title="Currently building & learning" />
        </Reveal>

        <Reveal>
          <div className="glass-card grid place-items-center px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
              <Rocket size={22} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold">My project journey starts here</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              No published projects yet — I'm focused on learning fundamentals and preparing to
              build. This space is reserved for AI/ML experiments, Python tools, data analysis
              notebooks and small software projects as they ship.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass-card h-full p-7">
              <h3 className="text-lg font-semibold">Learning Journey</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                I have no professional experience yet. My time goes into academic coursework,
                developing technical skills, exploring new technologies and preparing to build
                practical projects that solve real problems.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="glass-card h-full p-7">
              <h3 className="text-lg font-semibold">Areas I'm Exploring</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {exploring.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="Contact" title="Let's connect" />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          <Reveal className="space-y-3">
            {[
              { icon: Mail, label: "singhraunak81026@gmail.com", href: "mailto:singhraunak81026@gmail.com" },
              { icon: Phone, label: "9068293089", href: "tel:9068293089" },
              {
                icon: Github,
                label: "github.com/Raunaksingh236",
                href: "https://github.com/Raunaksingh236",
              },
              {
                icon: Linkedin,
                label: "linkedin.com/in/raunak-singh",
                href: "https://www.linkedin.com/in/raunak-singh-68bb133b7/",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="glass-card flex items-center gap-4 px-5 py-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0 truncate text-sm">{c.label}</span>
              </a>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="glass-card space-y-4 p-7">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  required
                  className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs text-muted-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-input bg-secondary/40 px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                <Download size={16} className="hidden" />
                Send Message <ArrowRight size={16} />
              </button>
              {sent && (
                <p className="text-center text-xs text-primary">
                  Thanks! Please also reach out directly at singhraunak81026@gmail.com.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-semibold">Raunak Kumar Singh</p>
            <p className="text-xs text-muted-foreground">
              B.Tech AIML Student | Aspiring AI/ML Developer
            </p>
          </div>
          <div className="flex justify-center gap-5 text-muted-foreground">
            <a
              href="https://github.com/Raunaksingh236"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="hover:text-primary"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/raunak-singh-68bb133b7/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary"
            >
              <Linkedin size={18} />
            </a>
            <a href="mailto:singhraunak81026@gmail.com" aria-label="Email" className="hover:text-primary">
              <Mail size={18} />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Raunak Kumar Singh
          </p>
        </div>
      </footer>
    </div>
  );
}
