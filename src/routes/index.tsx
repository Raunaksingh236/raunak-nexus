import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContactMessage } from "@/lib/contact.functions";
import {
  ArrowRight,
  AtSign,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Download,
  Github,
  GraduationCap,
  LineChart,
  Linkedin,
  Lightbulb,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Rocket,
  Send,
  Sigma,
  Sparkles,
  Terminal,
  User,
} from "lucide-react";
import { AiBackground } from "@/components/AiBackground";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import { SkillModal, type SkillDetail } from "@/components/SkillModal";

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

const skills: SkillDetail[] = [
  {
    name: "Python",
    level: 70,
    icon: Terminal,
    featured: true,
    intro:
      "Python is the language I use most while learning AI and machine learning — it keeps code readable so I can focus on the ideas.",
    what: "A high-level, general-purpose programming language known for simple, readable syntax.",
    usedFor:
      "AI and machine learning, automation and scripting, data analysis, backend and general software development.",
    whyUseful:
      "Almost every major AI/ML library (NumPy, Pandas, scikit-learn, TensorFlow, PyTorch) is built for Python, so it is the fastest route from an idea to a working model.",
    status: "Actively practising — comfortable with the fundamentals, still learning deeper topics.",
  },
  {
    name: "AI & Machine Learning",
    level: 55,
    icon: Brain,
    featured: true,
    intro:
      "This is my core area of study at university, and the direction I want my career to grow in.",
    what: "Artificial Intelligence is building systems that perform tasks needing human-like reasoning; Machine Learning is the subset where models learn patterns from data instead of being explicitly programmed.",
    usedFor:
      "Predictions, recommendations, classification, image and language understanding, and decision support systems.",
    whyUseful:
      "ML lets software improve from data and handle problems that are impractical to solve with fixed rules.",
    status: "Currently learning core concepts and preparing my first practical projects.",
  },
  {
    name: "Java",
    level: 50,
    icon: Code2,
    intro: "Java is where I strengthen my object-oriented thinking and program structure.",
    what: "A strongly typed, object-oriented programming language that runs on the JVM.",
    usedFor: "Backend systems, enterprise software, Android apps and large application development.",
    whyUseful:
      "Its strict structure teaches clean design and OOP concepts that carry over into every other language I use.",
    status: "Learning through coursework and practice problems.",
  },
  {
    name: "HTML",
    level: 75,
    icon: Code2,
    intro: "HTML is the foundation of everything I build for the web, including this portfolio.",
    what: "The markup language that defines the structure and content of a web page.",
    usedFor: "Creating headings, text, images, forms, links and the semantic layout of websites.",
    whyUseful:
      "Well-structured HTML makes pages accessible and is required before any styling or interactivity works.",
    status: "Comfortable with the basics and improving semantic/accessible markup.",
  },
  {
    name: "CSS",
    level: 65,
    icon: Code2,
    intro: "CSS is how I turn plain structure into an interface that actually feels designed.",
    what: "The styling language that controls how HTML elements look and are laid out.",
    usedFor: "Colors, spacing, typography, layouts, animations and responsive design.",
    whyUseful:
      "Good CSS makes projects and dashboards clear and usable — presentation matters as much as the logic behind it.",
    status: "Learning layout systems, responsive design and modern effects.",
  },
  {
    name: "JavaScript",
    level: 50,
    icon: Code2,
    intro: "JavaScript is how I make the things I build respond to the person using them.",
    what: "A programming language that runs in the browser to add behaviour to web pages.",
    usedFor: "Interactivity, form handling, dynamic content, data fetching and web applications.",
    whyUseful:
      "It lets me put models, data and results in front of people through an interface instead of just a terminal.",
    status: "Learning the fundamentals and DOM/UI behaviour.",
  },
  {
    name: "SQL (Basics)",
    level: 40,
    icon: Database,
    intro: "SQL is my starting point for working with real stored data rather than sample files.",
    what: "A query language used to store, retrieve, manipulate and analyse data in relational databases.",
    usedFor: "Filtering and joining tables, aggregating results and preparing datasets for analysis.",
    whyUseful:
      "Most real-world data lives in databases, so SQL is often the first step in any data or ML workflow.",
    status: "Beginner — learning queries, joins and aggregations.",
  },
  {
    name: "Pandas",
    level: 45,
    icon: Database,
    intro: "Pandas is the tool I use to actually understand a dataset before modelling it.",
    what: "A Python library for data manipulation, cleaning and analysis built around DataFrames.",
    usedFor: "Loading CSV/Excel data, handling missing values, filtering, grouping and summarising.",
    whyUseful:
      "Real data is messy — Pandas handles the cleaning and preparation that most ML work depends on.",
    status: "Learning core DataFrame operations through practice datasets.",
  },
  {
    name: "NumPy",
    level: 45,
    icon: Sigma,
    intro: "NumPy is where the mathematics behind machine learning starts to make sense to me.",
    what: "A Python library providing efficient numerical arrays and fast mathematical operations.",
    usedFor: "Vector and matrix maths, statistics and numerical computation on large arrays.",
    whyUseful:
      "It powers the array maths under Pandas and most ML frameworks, so understanding it helps me understand models.",
    status: "Learning arrays, indexing and vectorised operations.",
  },
  {
    name: "Matplotlib",
    level: 40,
    icon: LineChart,
    intro: "Matplotlib is how I check whether the patterns I think exist in data really do.",
    what: "A Python visualisation library for creating graphs and charts.",
    usedFor: "Line charts, bar charts, scatter plots and histograms for exploring results.",
    whyUseful:
      "Visualising data reveals trends, outliers and model behaviour that raw numbers hide.",
    status: "Learning to build clear plots for data analysis.",
  },
];

const journeySteps = [
  {
    title: "It started with fundamentals",
    body: "My first real interest wasn't a framework — it was the moment a small program did exactly what I told it to. I started with programming basics, syntax, loops and logic, and slowly learned to break a problem down before writing a single line.",
  },
  {
    title: "Thinking in problems, not code",
    body: "Working through programming problems changed how I think. I stopped memorising solutions and started noticing patterns: what the input really is, what the edge cases are, and how to reason toward an answer step by step.",
  },
  {
    title: "Choosing Python as my foundation",
    body: "As I moved deeper into my AIML degree, Python became my base. It got out of the way and let me focus on the actual concepts — how data is shaped, how a model learns, and why an approach works or fails.",
  },
  {
    title: "Learning to listen to data",
    body: "Data analysis was the turning point. With NumPy, Pandas and Matplotlib I began cleaning messy datasets, asking questions of them and plotting the answers — realising that most of AI/ML is understanding data long before training anything.",
  },
  {
    title: "Building breadth around AIML",
    body: "Alongside AIML I picked up Java for structured, object-oriented thinking, HTML, CSS and JavaScript to put ideas in front of people, and SQL to work with data where it actually lives.",
  },
  {
    title: "From separate skills to real projects",
    body: "Right now I'm connecting these pieces — turning a dataset into an analysis, an analysis into a model, and a model into something a person can use. My planned project ideas are the experiments I'm working toward, not finished work.",
  },
  {
    title: "Where I'm heading",
    body: "My goal is to become an AI/ML developer who can take a real problem end to end: understand the data, build a sound model and ship it as technology that genuinely helps someone.",
  },
];

const projectIdeas = [
  {
    title: "AI-Powered Student Performance Predictor",
    tech: ["Python", "NumPy", "Pandas", "Matplotlib", "Machine Learning"],
    description:
      "Predict student performance using academic data and visualize the important factors affecting results.",
  },
  {
    title: "Smart Expense Tracker & Financial Analyzer",
    tech: ["Python", "Pandas", "Matplotlib", "SQL"],
    description:
      "Track expenses, analyze spending patterns and generate useful financial visualizations.",
  },
  {
    title: "AI Resume Analyzer",
    tech: ["Python", "NLP", "Machine Learning", "Web Development"],
    description:
      "Analyze resumes and provide suggestions for improving skills, keywords and job compatibility.",
  },
  {
    title: "E-Commerce Sales Analytics Dashboard",
    tech: ["Python", "Pandas", "Matplotlib", "SQL", "Data Visualization"],
    description:
      "Analyze sales, customers, products and revenue trends through an interactive analytics dashboard.",
  },
  {
    title: "AI-Based Disease Prediction System",
    tech: ["Python", "Pandas", "NumPy", "Machine Learning"],
    description:
      "Create an educational machine-learning project that predicts possible conditions from a dataset.",
  },
  {
    title: "Personal AI Study Assistant",
    tech: ["Python", "AI/ML", "SQL", "Web Technologies"],
    description:
      "Build an assistant that helps students organize study material, track progress and answer study-related questions.",
  },
];

function ProjectIdeasCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + projectIdeas.length) % projectIdeas.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 4500);
    return () => clearInterval(id);
  }, [paused, index, go]);

  const idea = projectIdeas[index]!;

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="glass-panel circuit-bg relative flex min-h-[19rem] flex-col justify-between overflow-hidden p-7 sm:min-h-[17rem] sm:p-9">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden="true"
        />
        <div key={index} className="animate-fade-in relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] tracking-widest text-primary uppercase">
              <Lightbulb size={12} /> Planned Project
            </span>
            <span className="text-[11px] tracking-widest text-muted-foreground uppercase">
              Idea #{index + 1} · Coming soon
            </span>
          </div>
          <h3 className="mt-4 text-xl font-semibold sm:text-2xl">{idea.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{idea.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {idea.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-glass px-3 py-1 text-xs text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {projectIdeas.map((p, i) => (
              <button
                key={p.title}
                type="button"
                aria-label={`Show idea ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-primary/60"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous project idea"
              onClick={() => go(-1)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-glass text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next project idea"
              onClick={() => go(1)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-glass text-muted-foreground backdrop-blur-md transition-colors hover:border-primary hover:text-primary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [openSkill, setOpenSkill] = useState<SkillDetail | null>(null);
  const sendContact = useServerFn(submitContactMessage);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    setSending(true);
    setError(null);
    try {
      // Keep saving to the backend (non-blocking for the visitor).
      const saved = sendContact({
        data: {
          name: name || undefined,
          email: email || undefined,
          message,
        },
      }).catch(() => undefined);

      const res = await fetch("https://formspree.io/f/xljrlqly", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `New portfolio message${name ? ` from ${name}` : ""}`,
        }),
      });
      await saved;
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { errors?: Array<{ message?: string }> }
          | null;
        throw new Error(body?.errors?.[0]?.message ?? "Formspree rejected the submission.");
      }
      setSent(true);
      form.reset();
    } catch (err) {
      const detail = err instanceof Error ? err.message : "";
      setError(
        `Couldn't send your message${detail ? ` (${detail})` : ""}. Please email me directly at singhraunak81026@gmail.com.`,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <AiBackground />
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
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-3xl px-5">
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
            <span className="glass-card mt-8 inline-flex items-center bg-card px-4 py-2 text-xs whitespace-nowrap text-muted-foreground">
              <Sparkles size={12} className="mr-1.5 inline text-primary" />
              AI / ML Learner
            </span>
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
            <div className="neon-frame relative overflow-hidden rounded-3xl">
              <video
                src="/aiml-loop.mp4"
                poster={aboutVisual}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Animated AI and machine learning neural network visualisation"
                className="motion-reduce:hidden aspect-[4/3] w-full rounded-3xl object-cover"
              />
              <img
                src={aboutVisual}
                alt="Glowing neural network visualization"
                loading="lazy"
                width={1200}
                height={900}
                className="hidden aspect-[4/3] w-full rounded-3xl object-cover motion-reduce:block"
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ background: "var(--gradient-hero)" }}
                aria-hidden="true"
              />
            </div>
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
            <article className="glass-panel circuit-bg p-7">
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
        <p className="-mt-8 mb-8 text-sm text-muted-foreground">
          <Sparkles size={13} className="mr-1.5 inline text-primary" />
          Tap any skill to read what it is and how far along I am.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 70}>
              <button
                type="button"
                onClick={() => setOpenSkill(skill)}
                aria-label={`Learn more about ${skill.name}`}
                className={`glass-panel group h-full w-full p-6 text-left ${
                  skill.featured ? "ring-1 ring-primary/40" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
                    <skill.icon size={18} />
                  </span>
                  <h3 className="min-w-0 truncate font-semibold transition-colors group-hover:text-primary">
                    {skill.name}
                  </h3>
                  <ArrowRight
                    size={15}
                    className="ml-auto shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
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
              </button>
            </Reveal>
          ))}
        </div>
        {openSkill && <SkillModal skill={openSkill} onClose={() => setOpenSkill(null)} />}
      </section>

      {/* Journey: projects + learning + exploring */}
      <section id="journey" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="Journey" title="Currently building & learning" />
        </Reveal>

        <Reveal>
          <div className="glass-panel circuit-bg grid place-items-center px-6 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
              <Rocket size={22} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold">From concepts to real AI/ML projects</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              I haven't shipped published projects yet — what I have is a path I'm actively walking:
              fundamentals, problem solving, Python, data, and now the first steps toward building
              things that actually work end to end.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 border-l border-border pl-8">
          {journeySteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60} className="relative pb-8 last:pb-0">
              <span className="absolute top-1.5 -left-[41px] grid h-6 w-6 place-items-center rounded-full border border-primary/60 bg-background text-[10px] font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <article className="glass-panel p-6">
                <h3 className="text-base font-semibold sm:text-lg">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <Reveal>
            <div className="glass-panel h-full p-7">
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

      {/* Project ideas */}
      <section id="ideas" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-medium tracking-[0.25em] text-primary uppercase">
              Future Work
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Project Ideas I Want to Build
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              <BarChart3 size={13} className="mr-1.5 inline text-primary" />
              Concepts on my roadmap — not built yet, but planned as I grow my AI/ML skills.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <ProjectIdeasCarousel />
        </Reveal>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <SectionTitle eyebrow="Contact" title="Let's connect" />
        </Reveal>
        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          <Reveal>
            <div className="neon-frame">
            <div className="glass-panel circuit-bg p-7 sm:p-9">
              <h3 className="text-center text-sm font-semibold tracking-[0.25em] text-primary uppercase">
                My Connections
              </h3>
              <div className="mt-6 space-y-3">
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
                className="group flex items-center gap-4 rounded-2xl border border-border bg-glass px-5 py-4 backdrop-blur-md transition-all hover:translate-x-1 hover:border-primary/50 hover:bg-primary/5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-110">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0 truncate text-sm transition-colors group-hover:text-primary">
                  {c.label}
                </span>
                <ArrowRight
                  size={15}
                  className="ml-auto shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>
            ))}
              </div>
            </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="neon-frame">
              <form onSubmit={onSubmit} className="glass-panel circuit-bg space-y-5 p-7 sm:p-9">
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare size={15} className="text-primary" />
                  <h3 className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">
                    Send Me a Message
                  </h3>
                </div>

                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[11px] tracking-widest text-muted-foreground uppercase">
                    Name
                  </label>
                  <div className="relative">
                    <User size={15} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input id="name" name="name" required placeholder="Your name" className="input-futuristic" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-[11px] tracking-widest text-muted-foreground uppercase">
                    Email
                  </label>
                  <div className="relative">
                    <AtSign size={15} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground" />
                    <input id="email" name="email" type="email" required placeholder="you@example.com" className="input-futuristic" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[11px] tracking-widest text-muted-foreground uppercase">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare size={15} className="pointer-events-none absolute top-4 left-3.5 text-muted-foreground" />
                    <textarea id="message" name="message" rows={4} required placeholder="Write your message..." className="input-futuristic resize-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ boxShadow: "var(--glow-primary)" }}
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {sent && (
                  <div className="animate-pop-in flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/5 p-4">
                    <span className="animate-success-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                      <CheckCircle2 size={18} />
                    </span>
                    <p className="text-sm font-medium text-primary">
                      THANK YOU!! Your message is submitted to Raunak
                    </p>
                  </div>
                )}
                {error && <p className="text-center text-xs text-destructive">{error}</p>}
              </form>
            </div>
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
