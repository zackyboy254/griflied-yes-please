import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import mouse from "@/assets/mouse.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will you be my girlfriend? 💖" },
      { name: "description", content: "A little question, from my heart to yours." },
      { property: "og:title", content: "Will you be my girlfriend? 💖" },
      { property: "og:description", content: "A little question, from my heart to yours." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;1,500&family=Quicksand:wght@400;600&display=swap" },
    ],
  }),
  component: Index,
});

const hearts = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100, delay: (i * 1.3) % 9, dur: 8 + (i % 5) * 2, size: 14 + (i % 4) * 8,
}));

function Index() {
  const [noPos, setNoPos] = useState<{ top: number; left: number } | null>(null);
  const [tries, setTries] = useState(0);
  const [tip, setTip] = useState(false);
  const [yes, setYes] = useState(false);

  const runAway = () => {
    setTries((t) => t + 1);
    setNoPos({ top: 10 + Math.random() * 75, left: 5 + Math.random() * 80 });
  };

  const clickYes = () => {
    if (tries < 3) { setTip(true); setTimeout(() => setTip(false), 2600); return; }
    setYes(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          key={Date.now()}
          src="https://www.youtube.com/embed/2ZTcvsdMR1c?si=A217ubNsaCiJmduN&autoplay=1&enablejsapi=1&rel=0"
          title="Background music"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full scale-150 opacity-25"
        />
      </div>

      {hearts.map((h, i) => (
        <span key={i} className="heart-float pointer-events-none absolute bottom-[-40px] text-primary/60 z-10"
          style={{ left: `${h.left}%`, animationDelay: `${h.delay}s`, animationDuration: `${h.dur}s`, fontSize: h.size }}>♥</span>
      ))}

      {!yes ? (
        <div className="pop relative z-20 bg-card/80 backdrop-blur rounded-lg border border-border p-10 text-center max-w-lg shadow-2xl">
          <div className="text-6xl mb-4">💌</div>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">Hi <strong>Tess🛸</strong>, Will you be my girlfriend?</h1>
          <p className="mt-3 text-muted-foreground">Think carefully… there's only one right answer 😌</p>
          <div className="mt-8 flex items-center justify-center gap-6 min-h-14">
            <div className="relative">
              {tip && (
                <div className="pop absolute bottom-full left-1/2 z-50 -translate-x-1/2 mb-3 w-56 bg-card border border-border rounded-lg p-3 text-center shadow-xl">
                  <img src={mouse} alt="Cheeky mouse" className="w-24 h-24 mx-auto animate-bounce" />
                  <p className="text-sm font-semibold">Hold on! Try clicking &quot;No&quot; first 😏</p>
                </div>
              )}
              <button onClick={clickYes} className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:scale-110 transition-transform">
                Yes 💖
              </button>
            </div>
            <button
              onMouseEnter={runAway} onTouchStart={runAway} onClick={runAway}
              className="bg-secondary text-secondary-foreground font-semibold px-8 py-3 rounded-full text-lg transition-all duration-200"
              style={noPos ? { position: "fixed", top: `${noPos.top}%`, left: `${noPos.left}%` } : undefined}>
              No 🙈
            </button>
          </div>
        </div>
      ) : (
        <div className="pop relative z-20 bg-card/85 backdrop-blur rounded-lg border border-border p-10 max-w-2xl shadow-2xl text-center">
          <div className="text-6xl mb-4">💞</div>
          <h1 className="font-display text-4xl md:text-5xl">You just made me the happiest person alive</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed font-display italic">
            <p>From the moment you came into my life, everything softened — the noise got quieter, the days got brighter, and my heart finally found where it belongs.</p>
            <p>I don't just want to be with you for the easy days. I want your laughter on Sunday mornings, your hand in mine on the hard nights, and your name in every chapter of my story.</p>
            <p>I promise to choose you, every single day — to listen, to protect, to cherish, and to love you deeper than words could ever say.</p>
            <p className="not-italic font-semibold text-primary">You are my yes, my home, my forever. ❤️</p>
          </div>
          <p className="mt-6 text-muted-foreground">— Forever yours, <strong>mein schatz</strong></p>
        </div>
      )}
    </main>
  );
}
