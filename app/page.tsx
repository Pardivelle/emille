"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * Emille AI — landing temporal.
 * Recreación fiel del prototipo de Claude Design ("Emille Landing.dc.html").
 * Los estilos inline del prototipo se portan tal cual mediante el helper `s()`,
 * que parsea una cadena CSS a un objeto de estilo de React y mapea las familias
 * tipográficas a las variables de next/font.
 */
function s(css: string): CSSProperties {
  const style: Record<string, string> = {};
  for (const decl of css.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const rawProp = decl.slice(0, i).trim();
    let value = decl.slice(i + 1).trim();
    if (!rawProp) continue;
    const key = rawProp
      .replace(/^-/, "")
      .split("-")
      .map((p, idx) => {
        if (idx === 0) {
          if (p === "webkit") return "Webkit";
          if (p === "moz") return "Moz";
          if (p === "ms") return "ms";
          if (p === "o") return "O";
          return p;
        }
        return p.charAt(0).toUpperCase() + p.slice(1);
      })
      .join("");
    if (key === "fontFamily") {
      value = value
        .replace(/'Space Grotesk'/g, "var(--font-space-grotesk)")
        .replace(/'JetBrains Mono'/g, "var(--font-jetbrains)")
        .replace(/'Instrument Sans'/g, "var(--font-instrument)");
    }
    style[key] = value;
  }
  return style as CSSProperties;
}

type Dict = (typeof dict)["es"];

const dict = {
  es: {
    navA: "Orquestador",
    navB: "Arquitectura",
    navC: "Ejecución",
    navD: "Integración",
    cta: "Solicitar demo",
    ctaGhost: "Ver arquitectura",
    badge: "Etapa 1 · Inteligencia orquestadora",
    h1a: "Una sola IA que",
    h1b: "orquesta y ejecuta.",
    sub: "Emille no es un chat más. Es la capa de inteligencia que conmuta entre múltiples LLMs, genera interfaces en vivo y ejecuta acciones en el mundo real — con el contexto de tu negocio.",
    stat1: "LLMs orquestados",
    stat2: "latencia de voz",
    stat3: "ejecución real",
    online: "En línea",
    chatUser: "Resérvame una estancia en Pardivelle para este finde",
    stayTitle: "Cabaña del Lago · Pardivelle",
    stayDates: "Vie 18 → Dom 20 · 2 huéspedes",
    night: "noche",
    book: "Reservar",
    chatConfirm: "Listo ✦ Reserva confirmada. Te envié la ruta y las llaves digitales.",
    floatVoice: "Llamada agendada por voz",
    trust: "Orquesta los mejores modelos, sin casarte con ninguno",
    s1kicker: "El orquestador inteligente",
    s1title: "Universal por diseño, contextual por defecto",
    s1sub: "Una interfaz unificada que elige el modelo y la herramienta correcta para cada tarea, siempre informada por los datos reales de tu empresa.",
    orchCards: [
      { icon: "🧠", title: "Multi-LLM", body: "Conmuta y combina modelos según la tarea: razonamiento, velocidad o coste. Sin lock-in." },
      { icon: "🔌", title: "Contexto 8ity", body: "Integración nativa con CRM, Finanzas, Tareas y Calendario. Cada respuesta conoce tus datos." },
      { icon: "🛠️", title: "Herramientas reales", body: "Cada negocio expone sus capacidades vía MCP. Emille las invoca cuando hacen falta." },
    ],
    s2kicker: "Generative UI Runtime",
    s2title: "Composición sobre configuración",
    s2quote: '"Emille decide QUÉ mostrar; la aplicación host decide CÓMO se ve."',
    runtimeBullets: [
      { n: "1", text: "El usuario pregunta y el LLM decide usar una herramienta." },
      { n: "2", text: "Emille emite un evento estructurado — sin renderizar nada." },
      { n: "3", text: "Tu SDK captura el evento y dibuja el componente nativo de tu app." },
    ],
    s3kicker: "Ejecución en el mundo real",
    s3title: "Rompe la barrera entre lo digital y lo físico",
    s3sub: "Emille no se queda en la pantalla: llama, agenda y coordina personas para completar la tarea de principio a fin.",
    voiceTitle: "Capacidades de voz",
    voiceBody: "Llamadas entrantes y salientes con motores de alta fidelidad y baja latencia: agendamiento, atención al cliente y seguimiento automático.",
    humanTitle: "Hire a Human",
    humanBody: "Un puente directo con plataformas de ejecución humana para lo que la IA no puede hacer físicamente.",
    humanTasks: ["Entregas y logística", "Inspecciones manuales", "Trámites complejos"],
    s4kicker: "Contexto 8ity",
    s4title: "Conectado a todo tu negocio",
    s4sub: "Los módulos internos de 8ity alimentan a Emille con datos reales, en tiempo real.",
    modules: [
      { icon: "👥", title: "CRM", body: "Clientes, contactos y pipeline al alcance de la conversación." },
      { icon: "💰", title: "Finanzas", body: "Reportes e indicadores bajo demanda, en lenguaje natural." },
      { icon: "✅", title: "Tareas", body: "Crea, asigna y da seguimiento sin salir del chat." },
      { icon: "📅", title: "Calendario", body: "Agenda y coordina reuniones automáticamente." },
    ],
    finalTitle: "Construyamos tu copiloto de ejecución",
    finalSub: "Agenda una demo y descubre cómo Emille orquesta tu operación en Etapa 1.",
    emailPh: "tu@empresa.com",
    finalBtn: "Solicitar demo",
    thanks: "¡Gracias! Te contactaremos muy pronto.",
    footerNote: "Emille AI · Etapa 1",
    stageBadge: "Etapa 1 · disponible",
    nextStage: "Etapa 2 · Nexostone Smart Home",
  },
  en: {
    navA: "Orchestrator",
    navB: "Architecture",
    navC: "Execution",
    navD: "Integration",
    cta: "Request a demo",
    ctaGhost: "See architecture",
    badge: "Stage 1 · Orchestrating intelligence",
    h1a: "One AI that",
    h1b: "orchestrates and executes.",
    sub: "Emille isn't just another chat. It's the intelligence layer that switches across multiple LLMs, generates live interfaces and executes real-world actions — with your business context.",
    stat1: "LLMs orchestrated",
    stat2: "voice latency",
    stat3: "real execution",
    online: "Online",
    chatUser: "Book me a stay in Pardivelle for this weekend",
    stayTitle: "Lakeside Cabin · Pardivelle",
    stayDates: "Fri 18 → Sun 20 · 2 guests",
    night: "night",
    book: "Book",
    chatConfirm: "Done ✦ Booking confirmed. I sent you the route and digital keys.",
    floatVoice: "Call scheduled by voice",
    trust: "Orchestrate the best models — without marrying any of them",
    s1kicker: "The intelligent orchestrator",
    s1title: "Universal by design, contextual by default",
    s1sub: "A unified interface that picks the right model and tool for each task, always informed by your company's real data.",
    orchCards: [
      { icon: "🧠", title: "Multi-LLM", body: "Switch and combine models per task: reasoning, speed or cost. No lock-in." },
      { icon: "🔌", title: "8ity context", body: "Native integration with CRM, Finance, Tasks and Calendar. Every answer knows your data." },
      { icon: "🛠️", title: "Real tools", body: "Each business exposes its capabilities via MCP. Emille calls them when needed." },
    ],
    s2kicker: "Generative UI Runtime",
    s2title: "Composition over configuration",
    s2quote: '"Emille decides WHAT to show; the host app decides HOW it looks."',
    runtimeBullets: [
      { n: "1", text: "The user asks and the LLM decides to use a tool." },
      { n: "2", text: "Emille emits a structured event — rendering nothing." },
      { n: "3", text: "Your SDK captures the event and draws your app's native component." },
    ],
    s3kicker: "Real-world execution",
    s3title: "Break the barrier between digital and physical",
    s3sub: "Emille doesn't stay on screen: it calls, schedules and coordinates people to complete the task end to end.",
    voiceTitle: "Voice capabilities",
    voiceBody: "Inbound and outbound calls with high-fidelity, low-latency engines: scheduling, customer support and automatic follow-ups.",
    humanTitle: "Hire a Human",
    humanBody: "A direct bridge to human execution platforms for what AI can't physically do.",
    humanTasks: ["Deliveries & logistics", "Manual inspections", "Complex paperwork"],
    s4kicker: "8ity context",
    s4title: "Wired into your whole business",
    s4sub: "8ity's internal modules feed Emille with real, real-time data.",
    modules: [
      { icon: "👥", title: "CRM", body: "Customers, contacts and pipeline within reach of the conversation." },
      { icon: "💰", title: "Finance", body: "Reports and KPIs on demand, in natural language." },
      { icon: "✅", title: "Tasks", body: "Create, assign and track without leaving the chat." },
      { icon: "📅", title: "Calendar", body: "Schedule and coordinate meetings automatically." },
    ],
    finalTitle: "Let's build your execution copilot",
    finalSub: "Book a demo and see how Emille orchestrates your operation in Stage 1.",
    emailPh: "you@company.com",
    finalBtn: "Request demo",
    thanks: "Thanks! We'll reach out very soon.",
    footerNote: "Emille AI · Stage 1",
    stageBadge: "Stage 1 · available",
    nextStage: "Stage 2 · Nexostone Smart Home",
  },
};

const code = {
  sdk: `import { EmilleProvider, useEmille } from "@8ity/sdk";

// Emille decide QUÉ mostrar — tú decides CÓMO
emille.on("render", (event) => {
  return registry.map(event.component, {
    StayCard:  (p) => <StayCard {...p} />,
    Invoice:   (p) => <Invoice {...p} />,
    TaskList:  (p) => <TaskList {...p} />,
  });
});

<EmilleProvider tenant="pardivelle">
  <App />
</EmilleProvider>`,
  mcp: `import { z } from "zod";

// Cada negocio expone sus capacidades reales
export const tools = {
  book_rental: {
    description: "Reserva una estancia",
    input: z.object({
      property: z.string(),
      nights: z.number(),
    }),
    run: async ({ property, nights }) =>
      booking.create({ property, nights }),
  },
};`,
};

const models = ["GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Retell AI"];

function seg(active: boolean): CSSProperties {
  return s(
    active
      ? "padding:7px 14px;border-radius:999px;border:none;font-size:13px;font-weight:600;cursor:pointer;background:#fff;color:#0b1220;box-shadow:0 2px 6px rgba(11,18,32,.12)"
      : "padding:7px 14px;border-radius:999px;border:none;font-size:13px;font-weight:600;cursor:pointer;background:transparent;color:#64748b"
  );
}
function codeSeg(active: boolean): CSSProperties {
  return s(
    active
      ? "padding:6px 13px;border-radius:7px;border:none;font-size:12.5px;font-weight:600;cursor:pointer;font-family:'JetBrains Mono',monospace;background:rgba(255,255,255,.12);color:#fff"
      : "padding:6px 13px;border-radius:7px;border:none;font-size:12.5px;font-weight:500;cursor:pointer;font-family:'JetBrains Mono',monospace;background:transparent;color:rgba(255,255,255,.5)"
  );
}

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [chatStep, setChatStep] = useState(0);
  const [tab, setTab] = useState<"sdk" | "mcp">("sdk");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setChatStep((step) => (step >= 6 ? 0 : step + 1));
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  const t: Dict = dict[lang];
  const showUser = chatStep >= 1;
  const showThinking = chatStep === 2;
  const showEvent = chatStep >= 3;
  const showCard = chatStep >= 4;
  const showConfirm = chatStep >= 5;

  return (
    <div style={s("position:relative;width:100%;overflow:hidden")}>
      <div style={s("position:fixed;inset:0;z-index:0;pointer-events:none")}>
        <div style={s("position:absolute;top:-160px;left:-120px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(124,58,237,.35),transparent 70%);filter:blur(20px);animation:floatBlob 16s ease-in-out infinite")} />
        <div style={s("position:absolute;top:120px;right:-140px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle at 60% 40%,rgba(6,182,212,.32),transparent 70%);filter:blur(20px);animation:floatBlob2 19s ease-in-out infinite")} />
        <div style={s("position:absolute;bottom:-180px;left:40%;width:480px;height:480px;border-radius:50%;background:radial-gradient(circle at 50% 50%,rgba(110,231,201,.28),transparent 70%);filter:blur(24px);animation:floatBlob 22s ease-in-out infinite")} />
      </div>

      <div style={s("position:relative;z-index:2")}>
        <header style={s("position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;padding:16px clamp(20px,5vw,64px);background:rgba(255,255,255,.62);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid rgba(11,18,32,.06)")}>
          <div style={s("display:flex;align-items:center;gap:11px")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/8ity-logo.png" alt="8ity" style={s("width:34px;height:34px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(6,182,212,.25))")} />
            <span style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;letter-spacing:-.02em")}>
              <span style={{ background: "linear-gradient(135deg, rgb(124, 58, 237), rgb(6, 182, 212))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Emille AI</span>
            </span>
          </div>
          <nav style={s("display:flex;align-items:center;gap:clamp(10px,2.4vw,30px);font-size:14.5px;font-weight:500")}>
            <a href="#orquestador" style={s("color:#475569")}>{t.navA}</a>
            <a href="#runtime" style={s("color:#475569")}>{t.navB}</a>
            <a href="#ejecucion" style={s("color:#475569")}>{t.navC}</a>
            <a href="#integracion" style={s("color:#475569")}>{t.navD}</a>
            <div style={s("display:flex;align-items:center;padding:3px;border-radius:999px;background:rgba(11,18,32,.05);gap:2px")}>
              <button onClick={() => setLang("es")} style={seg(lang === "es")}>ES</button>
              <button onClick={() => setLang("en")} style={seg(lang === "en")}>EN</button>
            </div>
            <a href="#demo" style={s("padding:9px 18px;border-radius:999px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-weight:600;box-shadow:0 6px 18px rgba(124,58,237,.28)")}>{t.cta}</a>
          </nav>
        </header>

        {/* HERO */}
        <section style={s("max-width:1200px;margin:0 auto;padding:clamp(48px,8vw,110px) clamp(20px,5vw,64px) 40px;display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,4vw,64px);align-items:center")}>
          <div>
            <div style={s("display:inline-flex;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(124,58,237,.08);border:1px solid rgba(124,58,237,.16);font-size:13px;font-weight:600;color:#7c3aed;margin-bottom:24px")}>
              <span style={s("width:7px;height:7px;border-radius:50%;background:#06b6d4;box-shadow:0 0 0 4px rgba(6,182,212,.18)")} />{t.badge}
            </div>
            <h1 style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(38px,5.6vw,68px);line-height:1.02;letter-spacing:-.03em;margin:0 0 22px")}>
              {t.h1a}{" "}
              <span style={s("background:linear-gradient(120deg,#7c3aed,#06b6d4,#6ee7c9);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gradientPan 6s linear infinite alternate")}>{t.h1b}</span>
            </h1>
            <p style={s("font-size:clamp(16px,2vw,20px);line-height:1.55;color:#475569;max-width:520px;margin:0 0 32px;text-wrap:pretty")}>{t.sub}</p>
            <div style={s("display:flex;gap:14px;flex-wrap:wrap;align-items:center")}>
              <a href="#demo" style={s("padding:14px 26px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-weight:600;font-size:16px;box-shadow:0 10px 30px rgba(124,58,237,.3)")}>{t.cta} →</a>
              <a href="#runtime" style={s("padding:14px 26px;border-radius:14px;background:rgba(255,255,255,.7);border:1px solid rgba(11,18,32,.1);color:#0b1220;font-weight:600;font-size:16px;backdrop-filter:blur(8px)")}>{t.ctaGhost}</a>
            </div>
            <div style={s("display:flex;gap:26px;margin-top:40px;flex-wrap:wrap")}>
              <div><div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:26px")}>∞</div><div style={s("font-size:13px;color:#64748b")}>{t.stat1}</div></div>
              <div><div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:26px;background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;background-clip:text;color:transparent")}>{"<300ms"}</div><div style={s("font-size:13px;color:#64748b")}>{t.stat2}</div></div>
              <div><div style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:26px")}>24/7</div><div style={s("font-size:13px;color:#64748b")}>{t.stat3}</div></div>
            </div>
          </div>

          <div style={s("position:relative")}>
            <div style={s("position:relative;border-radius:24px;background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.8);box-shadow:0 30px 80px rgba(11,18,32,.14),inset 0 1px 0 rgba(255,255,255,.9);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);padding:20px;overflow:hidden")}>
              <div style={s("display:flex;align-items:center;gap:9px;padding:2px 4px 16px;border-bottom:1px solid rgba(11,18,32,.06);margin-bottom:16px")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/8ity-logo.png" alt="Emille" style={s("width:22px;height:22px;object-fit:contain")} />
                <span style={s("font-weight:600;font-size:14px")}>Emille</span>
                <span style={s("margin-left:auto;font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px")}><span style={s("width:6px;height:6px;border-radius:50%;background:#22c55e")} />{t.online}</span>
              </div>

              <div style={s("display:flex;flex-direction:column;gap:12px;min-height:340px")}>
                {showUser && (
                  <div style={s("align-self:flex-end;max-width:80%;padding:11px 15px;border-radius:16px 16px 4px 16px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-size:14px;line-height:1.4;animation:popIn .4s ease both")}>{t.chatUser}</div>
                )}
                {showThinking && (
                  <div style={s("align-self:flex-start;padding:13px 16px;border-radius:16px 16px 16px 4px;background:rgba(11,18,32,.045);display:flex;gap:5px;animation:popIn .3s ease both")}>
                    <span style={s("width:7px;height:7px;border-radius:50%;background:#7c3aed;animation:dots 1.2s infinite")} />
                    <span style={s("width:7px;height:7px;border-radius:50%;background:#7c3aed;animation:dots 1.2s .2s infinite")} />
                    <span style={s("width:7px;height:7px;border-radius:50%;background:#06b6d4;animation:dots 1.2s .4s infinite")} />
                  </div>
                )}
                {showEvent && (
                  <div style={s("align-self:flex-start;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#7c3aed;background:rgba(124,58,237,.06);border:1px solid rgba(124,58,237,.14);padding:8px 11px;border-radius:10px;animation:popIn .3s ease both")}>→ emit <b>render</b>(StayCard, {"{…}"})</div>
                )}
                {showCard && (
                  <div style={s("align-self:stretch;border-radius:16px;overflow:hidden;background:#fff;border:1px solid rgba(11,18,32,.08);box-shadow:0 12px 30px rgba(11,18,32,.1);animation:popIn .45s ease both")}>
                    <div style={s("height:118px;background:linear-gradient(120deg,#6ee7c9,#06b6d4,#7c3aed);background-size:200% auto;animation:gradientPan 5s linear infinite alternate;position:relative")}>
                      <span style={s("position:absolute;top:10px;left:12px;font-size:11px;font-weight:600;color:#fff;background:rgba(11,18,32,.35);padding:4px 9px;border-radius:999px;backdrop-filter:blur(4px)")}>Pardivelle</span>
                      <span style={s("position:absolute;top:10px;right:12px;font-size:11px;font-weight:700;color:#fff;background:rgba(11,18,32,.35);padding:4px 9px;border-radius:999px;backdrop-filter:blur(4px)")}>★ 4.9</span>
                    </div>
                    <div style={s("padding:13px 15px")}>
                      <div style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px")}>{t.stayTitle}</div>
                      <div style={s("font-size:12.5px;color:#64748b;margin:3px 0 12px")}>{t.stayDates}</div>
                      <div style={s("display:flex;align-items:center;justify-content:space-between")}>
                        <div><span style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:19px")}>€240</span><span style={s("font-size:12px;color:#64748b")}> / {t.night}</span></div>
                        <button style={s("padding:8px 18px;border-radius:10px;border:none;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-weight:600;font-size:13px;cursor:pointer")}>{t.book}</button>
                      </div>
                    </div>
                  </div>
                )}
                {showConfirm && (
                  <div style={s("align-self:flex-start;max-width:82%;padding:11px 15px;border-radius:16px 16px 16px 4px;background:rgba(11,18,32,.045);color:#0b1220;font-size:14px;line-height:1.4;animation:popIn .4s ease both")}>{t.chatConfirm}</div>
                )}
              </div>
            </div>
            <div style={s("position:absolute;bottom:-18px;left:-18px;padding:11px 15px;border-radius:14px;background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.85);box-shadow:0 12px 30px rgba(11,18,32,.12);backdrop-filter:blur(14px);font-size:12.5px;font-weight:600;display:flex;align-items:center;gap:8px")}>🎙️ {t.floatVoice}</div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section style={s("max-width:1100px;margin:0 auto;padding:20px clamp(20px,5vw,64px) 40px")}>
          <p style={s("text-align:center;font-size:12.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin:0 0 20px")}>{t.trust}</p>
          <div style={s("display:flex;flex-wrap:wrap;justify-content:center;gap:10px")}>
            {models.map((m) => (
              <span key={m} style={s("font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:#475569;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.6);border:1px solid rgba(11,18,32,.08);backdrop-filter:blur(6px)")}>{m}</span>
            ))}
          </div>
        </section>

        {/* 01 · ORQUESTADOR */}
        <section id="orquestador" style={s("max-width:1200px;margin:0 auto;padding:clamp(50px,7vw,90px) clamp(20px,5vw,64px)")}>
          <div className="reveal" style={s("max-width:680px;margin:0 auto 52px;text-align:center")}>
            <div style={s("font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#7c3aed;margin-bottom:14px")}>01 · {t.s1kicker}</div>
            <h2 style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(28px,4vw,46px);letter-spacing:-.02em;line-height:1.08;margin:0 0 16px")}>{t.s1title}</h2>
            <p style={s("font-size:17px;line-height:1.6;color:#475569;margin:0;text-wrap:pretty")}>{t.s1sub}</p>
          </div>
          <div style={s("display:grid;grid-template-columns:repeat(3,1fr);gap:20px")}>
            {t.orchCards.map((c) => (
              <div key={c.title} className="reveal" style={s("padding:28px;border-radius:20px;background:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.8);box-shadow:0 12px 40px rgba(11,18,32,.06);backdrop-filter:blur(16px)")}>
                <div style={s("width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;font-size:22px;background:linear-gradient(135deg,rgba(124,58,237,.12),rgba(6,182,212,.12));margin-bottom:18px")}>{c.icon}</div>
                <h3 style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:19px;margin:0 0 9px")}>{c.title}</h3>
                <p style={s("font-size:14.5px;line-height:1.55;color:#64748b;margin:0")}>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 02 · RUNTIME */}
        <section id="runtime" style={s("position:relative;padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px);background:linear-gradient(180deg,rgba(124,58,237,.05),rgba(6,182,212,.04))")}>
          <div style={s("max-width:1200px;margin:0 auto;display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(30px,5vw,68px);align-items:center")}>
            <div className="reveal">
              <div style={s("font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#06b6d4;margin-bottom:14px")}>02 · {t.s2kicker}</div>
              <h2 style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(28px,4vw,46px);letter-spacing:-.02em;line-height:1.08;margin:0 0 18px")}>{t.s2title}</h2>
              <div style={s("padding:18px 22px;border-radius:16px;background:rgba(255,255,255,.7);border-left:3px solid;border-image:linear-gradient(180deg,#7c3aed,#06b6d4) 1;font-style:italic;font-size:16px;line-height:1.5;color:#0b1220;margin-bottom:22px")}>{t.s2quote}</div>
              <div style={s("display:flex;flex-direction:column;gap:14px")}>
                {t.runtimeBullets.map((b) => (
                  <div key={b.n} style={s("display:flex;gap:12px;align-items:flex-start")}>
                    <span style={s("flex:none;width:24px;height:24px;border-radius:8px;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px")}>{b.n}</span>
                    <span style={s("font-size:15px;line-height:1.5;color:#334155")}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal" style={s("border-radius:20px;overflow:hidden;background:#0b1220;box-shadow:0 30px 70px rgba(11,18,32,.28)")}>
              <div style={s("display:flex;align-items:center;gap:6px;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08)")}>
                <span style={s("width:11px;height:11px;border-radius:50%;background:#ff5f57")} />
                <span style={s("width:11px;height:11px;border-radius:50%;background:#febc2e")} />
                <span style={s("width:11px;height:11px;border-radius:50%;background:#28c840")} />
                <div style={s("margin-left:16px;display:flex;gap:4px;padding:3px;border-radius:9px;background:rgba(255,255,255,.06)")}>
                  <button onClick={() => setTab("sdk")} style={codeSeg(tab === "sdk")}>SDK · Frontend</button>
                  <button onClick={() => setTab("mcp")} style={codeSeg(tab === "mcp")}>MCP · Backend</button>
                </div>
              </div>
              <pre style={s("margin:0;padding:22px 24px;font-family:'JetBrains Mono',monospace;font-size:13px;line-height:1.7;color:#e2e8f0;overflow-x:auto;min-height:290px;white-space:pre")}>{code[tab]}</pre>
            </div>
          </div>
        </section>

        {/* 03 · EJECUCIÓN */}
        <section id="ejecucion" style={s("max-width:1200px;margin:0 auto;padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px)")}>
          <div className="reveal" style={s("max-width:700px;margin:0 auto 52px;text-align:center")}>
            <div style={s("font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#7c3aed;margin-bottom:14px")}>03 · {t.s3kicker}</div>
            <h2 style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(28px,4vw,46px);letter-spacing:-.02em;line-height:1.08;margin:0 0 16px")}>{t.s3title}</h2>
            <p style={s("font-size:17px;line-height:1.6;color:#475569;margin:0;text-wrap:pretty")}>{t.s3sub}</p>
          </div>
          <div style={s("display:grid;grid-template-columns:1fr 1fr;gap:24px")}>
            <div className="reveal" style={s("position:relative;padding:34px;border-radius:24px;overflow:hidden;background:linear-gradient(160deg,#0b1220,#1e1b4b);color:#fff;box-shadow:0 24px 60px rgba(11,18,32,.28)")}>
              <div style={s("position:absolute;top:-60px;right:-40px;width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(6,182,212,.4),transparent 70%);filter:blur(10px)")} />
              <div style={s("position:relative")}>
                <div style={s("font-size:34px;margin-bottom:16px")}>🎙️</div>
                <h3 style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:23px;margin:0 0 10px")}>{t.voiceTitle}</h3>
                <p style={s("font-size:15px;line-height:1.6;color:rgba(255,255,255,.72);margin:0 0 22px")}>{t.voiceBody}</p>
                <div style={s("display:flex;flex-wrap:wrap;gap:9px")}>
                  <span style={s("font-family:'JetBrains Mono',monospace;font-size:12.5px;padding:6px 13px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14)")}>Retell AI</span>
                  <span style={s("font-family:'JetBrains Mono',monospace;font-size:12.5px;padding:6px 13px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14)")}>Vapi</span>
                  <span style={s("font-family:'JetBrains Mono',monospace;font-size:12.5px;padding:6px 13px;border-radius:999px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.14)")}>Bland AI</span>
                </div>
              </div>
            </div>
            <div className="reveal" style={s("position:relative;padding:34px;border-radius:24px;overflow:hidden;background:rgba(255,255,255,.62);border:1px solid rgba(255,255,255,.8);box-shadow:0 24px 60px rgba(11,18,32,.08);backdrop-filter:blur(16px)")}>
              <div style={s("font-size:34px;margin-bottom:16px")}>🤝</div>
              <h3 style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:23px;margin:0 0 10px")}>{t.humanTitle}</h3>
              <p style={s("font-size:15px;line-height:1.6;color:#64748b;margin:0 0 22px")}>{t.humanBody}</p>
              <div style={s("display:flex;flex-direction:column;gap:10px")}>
                {t.humanTasks.map((h) => (
                  <div key={h} style={s("display:flex;align-items:center;gap:10px;font-size:14px;color:#334155")}><span style={s("color:#06b6d4;font-weight:700")}>✓</span>{h}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04 · INTEGRACIÓN */}
        <section id="integracion" style={s("position:relative;padding:clamp(56px,8vw,100px) clamp(20px,5vw,64px);background:linear-gradient(180deg,rgba(6,182,212,.04),rgba(124,58,237,.05))")}>
          <div style={s("max-width:1200px;margin:0 auto")}>
            <div className="reveal" style={s("max-width:700px;margin:0 auto 52px;text-align:center")}>
              <div style={s("font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#06b6d4;margin-bottom:14px")}>04 · {t.s4kicker}</div>
              <h2 style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(28px,4vw,46px);letter-spacing:-.02em;line-height:1.08;margin:0 0 16px")}>{t.s4title}</h2>
              <p style={s("font-size:17px;line-height:1.6;color:#475569;margin:0;text-wrap:pretty")}>{t.s4sub}</p>
            </div>
            <div style={s("display:grid;grid-template-columns:repeat(4,1fr);gap:18px")}>
              {t.modules.map((m) => (
                <div key={m.title} className="reveal" style={s("padding:26px 22px;border-radius:18px;background:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.85);box-shadow:0 12px 34px rgba(11,18,32,.06);backdrop-filter:blur(14px);text-align:center")}>
                  <div style={s("width:52px;height:52px;margin:0 auto 16px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:24px;background:linear-gradient(135deg,rgba(124,58,237,.14),rgba(6,182,212,.14))")}>{m.icon}</div>
                  <h3 style={s("font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:17px;margin:0 0 6px")}>{m.title}</h3>
                  <p style={s("font-size:13.5px;line-height:1.5;color:#64748b;margin:0")}>{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="demo" style={s("padding:clamp(56px,8vw,110px) clamp(20px,5vw,64px)")}>
          <div className="reveal" style={s("max-width:920px;margin:0 auto;position:relative;border-radius:30px;overflow:hidden;padding:clamp(40px,6vw,72px) clamp(28px,5vw,64px);text-align:center;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;box-shadow:0 40px 90px rgba(124,58,237,.32)")}>
            <div style={s("position:absolute;top:-80px;left:-60px;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.25),transparent 70%);filter:blur(8px)")} />
            <div style={s("position:absolute;bottom:-90px;right:-50px;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(110,231,201,.4),transparent 70%);filter:blur(10px)")} />
            <div style={s("position:relative")}>
              <h2 style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:clamp(30px,4.5vw,52px);letter-spacing:-.02em;line-height:1.05;margin:0 0 16px")}>{t.finalTitle}</h2>
              <p style={s("font-size:clamp(16px,2vw,19px);line-height:1.55;color:rgba(255,255,255,.85);max-width:520px;margin:0 auto 34px")}>{t.finalSub}</p>
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={s("display:flex;gap:10px;max-width:480px;margin:0 auto;flex-wrap:wrap;justify-content:center")}>
                <input type="email" required placeholder={t.emailPh} style={s("flex:1;min-width:220px;padding:15px 20px;border-radius:14px;border:none;font-size:15px;font-family:inherit;background:rgba(255,255,255,.95);color:#0b1220;outline:none")} />
                <button type="submit" style={s("padding:15px 30px;border-radius:14px;border:none;background:#0b1220;color:#fff;font-weight:600;font-size:15px;cursor:pointer;font-family:inherit")}>{t.finalBtn}</button>
              </form>
              {submitted && (
                <p style={s("margin:18px 0 0;font-size:14px;font-weight:600;color:#fff")}>✓ {t.thanks}</p>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={s("max-width:1200px;margin:0 auto;padding:40px clamp(20px,5vw,64px) 56px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px;border-top:1px solid rgba(11,18,32,.07)")}>
          <div style={s("display:flex;align-items:center;gap:10px")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/8ity-logo.png" alt="8ity" style={s("width:26px;height:26px;object-fit:contain")} />
            <span style={s("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:16px")}>Emille AI</span>
            <span style={s("font-size:13px;color:#94a3b8;margin-left:6px")}>© 2026 · {t.footerNote}</span>
          </div>
          <div style={s("font-size:13px;color:#94a3b8;display:flex;gap:20px")}>
            <span>{t.stageBadge}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
