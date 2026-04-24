import "./style/Landing.css"
import { useState, useRef, useEffect } from "react"

const CATEGORIES = [
  { emoji: "🍻", label: "Bares", sub: "Animado agora", color: "#f59e0b" },
  { emoji: "🎶", label: "Música ao vivo", sub: "Shows rolando", color: "#a78bfa" },
  { emoji: "🍔", label: "Comida", sub: "Rolê barato", color: "#f97316" },
  { emoji: "🎬", label: "Cinema", sub: "Hoje à noite", color: "#38bdf8" },
  { emoji: "🕹️", label: "Games", sub: "Arcades e LAN", color: "#34d399" },
  { emoji: "🌙", label: "Balada", sub: "Open até tarde", color: "#f472b6" },
  { emoji: "☕", label: "Café", sub: "Ambiente gostoso", color: "#fb923c" },
  { emoji: "🎭", label: "Arte & Cultura", sub: "Exposições", color: "#c084fc" },
]

const TRENDING = [
  {
    name: "Bar do Zé",
    tag: "🔥 Lotado agora",
    distance: "340m",
    rating: "4.8",
    desc: "Chopps gelados + pagode ao vivo toda sexta",
    color: "#f59e0b",
    img: "🍺",
  },
  {
    name: "Cine Praia",
    tag: "🎬 Sessão em 40min",
    distance: "1.2km",
    rating: "4.6",
    desc: "Cinema ao ar livre com pipoca artesanal",
    color: "#38bdf8",
    img: "🎬",
  },
  {
    name: "Casa Nostra",
    tag: "🎶 Live agora",
    distance: "800m",
    rating: "4.9",
    desc: "Jazz e soul — entrada gratuita até 22h",
    color: "#a78bfa",
    img: "🎷",
  },
  {
    name: "Hawkins Arcade",
    tag: "🕹️ Poucos lugares",
    distance: "2.1km",
    rating: "4.7",
    desc: "Fliperamas vintage + burgers incríveis",
    color: "#34d399",
    img: "🕹️",
  },
]

const MOODS = [
  { label: "Tô sozinho(a)", icon: "🚶", query: "lugar tranquilo pra ir sozinho" },
  { label: "Com galera", icon: "👥", query: "lugar para grupo grande" },
  { label: "Encontro", icon: "💫", query: "lugar romântico e charmoso" },
  { label: "Com criança", icon: "🧒", query: "passeio família com criança" },
  { label: "Sem gastar", icon: "💸", query: "programa gratuito perto de mim" },
  { label: "Surpresa total", icon: "🎲", query: "qualquer coisa aleatória incrível" },
]

export default function Landing() {
  const [query, setQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIdx(i => (i + 1) % TRENDING.length)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  // Scroll category carousel
  const scrollCat = (dir: "left" | "right") => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" })
  }

  const handleSuggestion = (text: string) => {
    setQuery(text)
    inputRef.current?.focus()
  }

  return (
    <div className={`landing ${isVisible ? "visible" : ""}`}>
      {/* Ambient background */}
      <div className="ambient">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* Header */}
      <header className="header stagger-1">
        <div className="logo-mark">
          <span className="logo-u">U</span>
          <span className="logo-dot">•</span>
          <span className="logo-p">P</span>
        </div>
        <div className="header-right">
          <div className="location-pill">
            <span className="pulse-dot" />
            Fortaleza, CE
          </div>
          <button className="icon-btn" aria-label="Notificações">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-eyebrow stagger-1">
          <span className="live-badge">
            <span className="live-dot" />
            247 rolês acontecendo agora
          </span>
        </div>

        <h1 className="hero-title stagger-2">
          <span className="title-line">Sem ideia</span>
          <span className="title-line accent">do que fazer?</span>
        </h1>

        <p className="hero-sub stagger-3">
          A gente decide por você — rápido e perto de você
        </p>

        {/* Search */}
        <div className={`search-container stagger-4 ${focused ? "focused" : ""}`}>
          <div className="search-inner">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              className="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={focused ? "Tenta: 'bar com música hoje à noite'…" : "Ex: bar, cinema, rolê barato…"}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
            {query && (
              <button className="clear-btn" onClick={() => setQuery("")} aria-label="Limpar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button className="search-cta">
            <span>Explorar</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Quick mood chips */}
        <div className="mood-strip stagger-5">
          {MOODS.map((m, i) => (
            <button
              key={i}
              className="mood-chip"
              onClick={() => handleSuggestion(m.query)}
            >
              <span className="mood-icon">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Categories carousel */}
      <section className="section stagger-6">
        <div className="section-header">
          <h2 className="section-title">Explorar por categoria</h2>
          <div className="carousel-controls">
            <button className="carousel-btn" onClick={() => scrollCat("left")} aria-label="Anterior">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="carousel-btn" onClick={() => scrollCat("right")} aria-label="Próximo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="categories-track" ref={carouselRef}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={i}
              className={`cat-card ${activeCategory === i ? "active" : ""}`}
              style={{ "--cat-color": cat.color } as React.CSSProperties}
              onClick={() => setActiveCategory(i === activeCategory ? null : i)}
            >
              <span className="cat-emoji">{cat.emoji}</span>
              <span className="cat-label">{cat.label}</span>
              <span className="cat-sub">{cat.sub}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Trending carousel — featured cards */}
      <section className="section stagger-7">
        <div className="section-header">
          <h2 className="section-title">
            <span className="fire">🔥</span> Tendências agora
          </h2>
          <span className="section-tag">Atualizado há 2min</span>
        </div>

        <div className="trending-track">
          {TRENDING.map((item, i) => (
            <div
              key={i}
              className={`trending-card ${i === carouselIdx ? "active" : ""}`}
              style={{ "--card-color": item.color } as React.CSSProperties}
              onClick={() => setCarouselIdx(i)}
            >
              <div className="card-glow" />
              <div className="card-top">
                <span className="card-img">{item.img}</span>
                <span className="card-tag">{item.tag}</span>
              </div>
              <div className="card-body">
                <div className="card-meta">
                  <span className="card-dist">📍 {item.distance}</span>
                  <span className="card-rating">★ {item.rating}</span>
                </div>
                <h3 className="card-name">{item.name}</h3>
                <p className="card-desc">{item.desc}</p>
              </div>
              <button className="card-cta">
                Ver mais
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {TRENDING.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === carouselIdx ? "active" : ""}`}
              onClick={() => setCarouselIdx(i)}
              aria-label={`Card ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Surprise CTA */}
      <section className="surprise-section stagger-8">
        <button className="surprise-btn" onClick={() => handleSuggestion("me surpreenda com qualquer coisa incrível perto de mim agora")}>
          <span className="surprise-icon">🎲</span>
          <span className="surprise-text">
            <strong>Surpreende-me</strong>
            <small>Deixa a sorte escolher</small>
          </span>
          <svg className="surprise-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Footer */}
      <footer className="footer stagger-8">
        <span className="footer-loc">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Baseado na sua localização
        </span>
        <span className="footer-sep">·</span>
        <span>Up-TO © 2025</span>
      </footer>
    </div>
  )
}