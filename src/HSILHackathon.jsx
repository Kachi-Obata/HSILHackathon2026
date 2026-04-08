import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --crimson: #A51C30;
    --crimson-light: #c9273e;
    --dark: #0D0D0F;
    --card: #141416;
    --border: #2a2a2e;
    --text: #e8e4df;
    --muted: #7a7570;
    --accent: #4a9e8a;
  }

  body { background: var(--dark); color: var(--text); }

  .hsil-root {
    font-family: 'Outfit', sans-serif;
    background: var(--dark);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 4rem;
    height: 72px;
    background: rgba(13,13,15,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-weight: 600;
    letter-spacing: 0.04em; color: var(--text);
  }
  .nav-logo span { color: var(--crimson); }
  .nav-links { display: flex; gap: 2.5rem; align-items: center; }
  .nav-links a {
    font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); text-decoration: none;
    transition: color 0.2s; cursor: pointer;
  }
  .nav-links a:hover { color: var(--text); }
  .nav-cta {
    background: var(--crimson) !important;
    color: white !important;
    padding: 0.5rem 1.4rem !important;
    border-radius: 2px;
  }

  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 0 4rem 6rem;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(165,28,48,0.18) 0%, transparent 60%),
                radial-gradient(ellipse 50% 50% at 20% 80%, rgba(74,158,138,0.08) 0%, transparent 50%),
                var(--dark);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
  }
  .hero-label {
    font-size: 0.7rem; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--crimson); margin-bottom: 1.5rem; position: relative;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-label::before { content: ''; width: 40px; height: 1px; background: var(--crimson); }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.5rem, 8vw, 7.5rem);
    font-weight: 300; line-height: 0.95;
    letter-spacing: -0.02em; position: relative; margin-bottom: 1rem;
  }
  .hero-title em { font-style: italic; color: var(--crimson); }
  .hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.3rem); font-weight: 300;
    color: var(--muted); max-width: 540px; line-height: 1.65;
    margin-bottom: 3rem; position: relative;
  }
  .hero-meta { display: flex; gap: 3rem; align-items: center; position: relative; flex-wrap: wrap; }
  .hero-stat { display: flex; flex-direction: column; gap: 0.2rem; }
  .hero-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 600; }
  .hero-stat-label { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
  .hero-divider { width: 1px; height: 48px; background: var(--border); }
  .hero-btn {
    background: var(--crimson); color: white; border: none;
    padding: 1rem 2.5rem;
    font-family: 'Outfit', sans-serif; font-size: 0.78rem;
    font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase;
    cursor: pointer; transition: all 0.2s; border-radius: 2px;
  }
  .hero-btn:hover { background: var(--crimson-light); transform: translateY(-1px); }
  .hero-scroll {
    position: absolute; bottom: 2rem; right: 4rem;
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--muted);
    display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  }
  .hero-scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(var(--crimson), transparent);
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0% { transform: scaleY(0); transform-origin: top; }
    50% { transform: scaleY(1); transform-origin: top; }
    51% { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }

  .section { padding: 7rem 4rem; position: relative; }
  .section-label {
    font-size: 0.65rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--crimson); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-label::before { content: ''; width: 24px; height: 1px; background: var(--crimson); }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 300; line-height: 1.1; margin-bottom: 1.5rem;
  }
  .section-title em { font-style: italic; color: var(--crimson); }
  .section-body { font-size: 1rem; line-height: 1.75; color: var(--muted); max-width: 640px; }
  .divider { border: none; border-top: 1px solid var(--border); margin: 0 4rem; }

  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; margin-top: 3rem; }
  .about-features { display: flex; flex-direction: column; gap: 1.5rem; }
  .about-feature {
    display: flex; gap: 1.2rem; align-items: flex-start;
    padding: 1.2rem; border: 1px solid var(--border); border-radius: 4px;
    transition: border-color 0.2s, background 0.2s;
  }
  .about-feature:hover { border-color: var(--crimson); background: rgba(165,28,48,0.04); }
  .feature-icon {
    width: 36px; height: 36px; min-width: 36px;
    background: rgba(165,28,48,0.12); border-radius: 4px;
    display: flex; align-items: center; justify-content: center; font-size: 1rem;
  }
  .feature-text h4 { font-size: 0.88rem; font-weight: 500; margin-bottom: 0.3rem; }
  .feature-text p { font-size: 0.82rem; color: var(--muted); line-height: 1.5; }

  .timeline-section { background: var(--card); }
  .timeline {
    display: grid; grid-template-columns: repeat(5, 1fr);
    gap: 0; margin-top: 4rem; position: relative;
  }
  .timeline::before {
    content: ''; position: absolute; top: 28px; left: 10%; right: 10%;
    height: 1px; background: var(--border);
  }
  .timeline-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 1rem; }
  .timeline-dot {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--card); border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; margin-bottom: 1rem; position: relative; z-index: 1;
  }
  .timeline-item.active .timeline-dot { border-color: var(--crimson); background: rgba(165,28,48,0.15); }
  .timeline-date { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--crimson); margin-bottom: 0.4rem; }
  .timeline-name { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 600; margin-bottom: 0.4rem; }
  .timeline-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.4; }

  .challenges-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: var(--border); border: 1px solid var(--border); margin-top: 3rem;
  }
  .challenge-card {
    background: var(--dark); padding: 2rem; cursor: pointer;
    transition: background 0.2s; position: relative; overflow: hidden;
  }
  .challenge-card:hover { background: rgba(165,28,48,0.05); }
  .challenge-card.open { background: rgba(165,28,48,0.07); }
  .challenge-num { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; color: rgba(165,28,48,0.2); line-height: 1; margin-bottom: 0.5rem; }
  .challenge-title { font-size: 0.9rem; font-weight: 500; margin-bottom: 0.75rem; }
  .challenge-preview { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }
  .challenge-expand { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
  .challenge-expand.open { max-height: 300px; }
  .challenge-q { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border); font-size: 0.78rem; font-style: italic; color: var(--accent); line-height: 1.5; }
  .challenge-tag { display: inline-block; margin-top: 0.75rem; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--crimson); border: 1px solid rgba(165,28,48,0.3); padding: 0.2rem 0.6rem; border-radius: 2px; }

  .program-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-top: 3rem; }
  .program-day-label {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--crimson); margin-bottom: 1.5rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .program-day-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .program-event { display: flex; gap: 1.5rem; padding: 1.2rem 0; border-bottom: 1px solid var(--border); }
  .program-event:last-child { border-bottom: none; }
  .program-event-icon { width: 40px; height: 40px; min-width: 40px; background: rgba(165,28,48,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }
  .program-event h4 { font-size: 0.88rem; font-weight: 500; margin-bottom: 0.25rem; }
  .program-event p { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

  .judging-table { width: 100%; border-collapse: collapse; margin-top: 2.5rem; font-size: 0.83rem; }
  .judging-table th { text-align: left; padding: 1rem 1.5rem; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); border-bottom: 1px solid var(--border); font-weight: 500; }
  .judging-table td { padding: 1.2rem 1.5rem; border-bottom: 1px solid rgba(42,42,46,0.5); vertical-align: top; line-height: 1.5; }
  .judging-table tr:hover td { background: rgba(165,28,48,0.03); }
  .judging-table td:first-child { font-weight: 500; white-space: nowrap; }
  .judging-table td:last-child { text-align: center; font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; color: var(--crimson); }

  .team-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3rem; }
  .team-card { background: var(--card); border: 1px solid var(--border); padding: 2rem; border-radius: 4px; transition: border-color 0.2s; }
  .team-card:hover { border-color: rgba(165,28,48,0.4); }
  .team-card-icon { font-size: 1.8rem; margin-bottom: 1rem; }
  .team-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600; margin-bottom: 0.75rem; }
  .team-card p { font-size: 0.82rem; color: var(--muted); line-height: 1.6; }

  .pitch-steps { display: flex; flex-direction: column; margin-top: 3rem; border: 1px solid var(--border); }
  .pitch-step { display: grid; grid-template-columns: 120px 1fr 100px; align-items: center; gap: 2rem; padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); transition: background 0.2s; }
  .pitch-step:last-child { border-bottom: none; }
  .pitch-step:hover { background: rgba(165,28,48,0.04); }
  .pitch-step-time { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 300; color: var(--crimson); }
  .pitch-step-name { font-size: 0.88rem; font-weight: 500; }
  .pitch-step-desc { font-size: 0.78rem; color: var(--muted); margin-top: 0.2rem; line-height: 1.4; }
  .pitch-step-bar { height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }
  .pitch-step-fill { height: 100%; background: var(--crimson); border-radius: 2px; }

  .sponsors-section { background: var(--card); }
  .sponsor-tiers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
  .sponsor-tier { border: 1px solid var(--border); padding: 2.5rem 2rem; border-radius: 4px; text-align: center; position: relative; overflow: hidden; transition: border-color 0.2s, transform 0.2s; }
  .sponsor-tier:hover { transform: translateY(-3px); border-color: rgba(165,28,48,0.5); }
  .sponsor-tier.featured { border-color: var(--crimson); background: rgba(165,28,48,0.05); }
  .sponsor-tier.featured::before { content: 'MOST POPULAR'; position: absolute; top: 0; left: 50%; transform: translateX(-50%); background: var(--crimson); font-size: 0.6rem; letter-spacing: 0.15em; color: white; padding: 0.25rem 1rem; font-weight: 600; }
  .tier-name { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }
  .tier-title { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 600; margin-bottom: 2rem; }
  .tier-perks { list-style: none; text-align: left; margin-bottom: 2rem; }
  .tier-perks li { font-size: 0.8rem; color: var(--muted); padding: 0.5rem 0; border-bottom: 1px solid rgba(42,42,46,0.5); display: flex; gap: 0.75rem; align-items: flex-start; }
  .tier-perks li::before { content: '→'; color: var(--crimson); flex-shrink: 0; }
  .tier-btn { width: 100%; background: transparent; border: 1px solid var(--crimson); color: var(--crimson); padding: 0.8rem; font-family: 'Outfit', sans-serif; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border-radius: 2px; }
  .tier-btn:hover, .sponsor-tier.featured .tier-btn { background: var(--crimson); color: white; }

  .resources-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 3rem; }
  .resource-group h3 { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text); margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border); }
  .resource-link { display: block; font-size: 0.78rem; color: var(--muted); text-decoration: none; padding: 0.4rem 0; transition: color 0.2s; line-height: 1.4; }
  .resource-link:hover { color: var(--accent); }

  .footer { padding: 4rem 4rem 2rem; border-top: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 600; margin-bottom: 0.75rem; }
  .footer-logo span { color: var(--crimson); }
  .footer-bottom { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; grid-column: 1 / -1; }
  .footer-bottom p { font-size: 0.72rem; color: var(--muted); }
  .footer-links { display: flex; gap: 2rem; }
  .footer-links a { font-size: 0.72rem; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--text); }

  .badge { display: inline-flex; align-items: center; gap: 0.4rem; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; background: rgba(165,28,48,0.12); color: var(--crimson); padding: 0.3rem 0.8rem; border-radius: 2px; border: 1px solid rgba(165,28,48,0.2); }
  .badge.teal { background: rgba(74,158,138,0.1); color: var(--accent); border-color: rgba(74,158,138,0.2); }

  @media (max-width: 1024px) {
    .nav { padding: 0 2rem; }
    .section { padding: 5rem 2rem; }
    .hero { padding: 0 2rem 5rem; }
    .about-grid, .program-cols { grid-template-columns: 1fr; gap: 3rem; }
    .challenges-grid { grid-template-columns: 1fr 1fr; }
    .team-cards { grid-template-columns: 1fr 1fr; }
    .sponsor-tiers { grid-template-columns: 1fr; }
    .resources-grid { grid-template-columns: 1fr 1fr; }
    .timeline { grid-template-columns: 1fr; gap: 2rem; }
    .timeline::before { display: none; }
    .footer { grid-template-columns: 1fr; gap: 2rem; }
    .nav-links { display: none; }
  }
  @media (max-width: 640px) {
    .challenges-grid, .team-cards, .resources-grid { grid-template-columns: 1fr; }
    .pitch-step { grid-template-columns: 80px 1fr; }
    .pitch-step-bar { display: none; }
  }
`;

const challenges = [
  { num: "01", title: "Electronic Health Record Analysis", preview: "Unlock the potential of EHR data through predictive AI models.", question: "What systems can be created to analyze EHRs to form predictive models for patient diagnoses, disease trajectories and outcomes?", tag: "Data & Analytics" },
  { num: "02", title: "Diagnosis & Monitoring Improvements", preview: "AI-powered diagnostics surpassing traditional methods in imaging and real-time monitoring.", question: "What AI-driven diagnostic or monitoring tools can be developed to detect patient changes earlier, allowing for timely treatment adjustments?", tag: "Clinical AI" },
  { num: "03", title: "Intelligent Support Chatbots", preview: "Large Language Models reshaping how patients and clinicians access information.", question: "Which AI and LLMs can be used to develop a chatbot that assists patients and medical staff in clinical decision-making?", tag: "NLP / LLM" },
  { num: "04", title: "Fragmentation of Care", preview: "Bridging incompatible EHR systems across providers and settings.", question: "What systems or models could be implemented to overcome fragmentation between incompatible health platforms?", tag: "Interoperability" },
  { num: "05", title: "Too Much Information?", preview: "Cutting through 10,000+ health apps to match users with what actually works.", question: "How can we best match people with the health services or trustworthy apps that would suit them best?", tag: "Decision Support" },
  { num: "06", title: "Shortage of Healthcare Workers", preview: "AI strategies to fill critical workforce gaps as demand outpaces supply.", question: "How can we leverage AI to develop strategies that mitigate healthcare worker shortages in regions where demand surpasses availability?", tag: "Workforce" },
  { num: "07", title: "Fragmented Care Pathways", preview: "Coordinating care across providers to eliminate dangerous gaps.", question: "How can AI address fragmented care pathways by enhancing coordination, communication, and continuity?", tag: "Care Coordination" },
  { num: "08", title: "Health Literacy", preview: "Empowering patients to understand and act on health information.", question: "How can we leverage AI to improve overall health literacy, particularly for those directly affected by health conditions?", tag: "Patient Empowerment" },
  { num: "09", title: "Preventive Health Engagement", preview: "Personalized AI-driven programs that act before conditions develop.", question: "How can AI create personalized preventive health programs analyzing individual data, environmental factors, and social determinants?", tag: "Prevention" },
  { num: "10", title: "Breaking Communication Barriers", preview: "Translating medical jargon into clear, multilingual patient understanding.", question: "What are additional ways AI could enhance communication between patients and their care teams?", tag: "Communication" },
  { num: "11", title: "AI in Pediatrics", preview: "Navigating the unique complexity of children's health data across developmental stages.", question: "How can AI integrate diverse data sources to provide a comprehensive view of a child's health across developmental phases?", tag: "Pediatrics" },
];

const timelineItems = [
  { date: "Apr 10–11", name: "Hackathon", desc: "Hub Judging · ~50 teams", icon: "⚡", active: true },
  { date: "Apr 20 – May 1", name: "Bootcamp I", desc: "HSIL Judging · 20 teams", icon: "🎯", active: false },
  { date: "May 4–15", name: "Bootcamp II", desc: "Global Judging · 10 teams", icon: "🚀", active: false },
  { date: "May 18 – Jun 12", name: "Venture Immersion", desc: "4-week intensive · 10 teams", icon: "🔬", active: false },
  { date: "Jun 19", name: "Demo Day", desc: "Pitch to investors", icon: "🏆", active: false },
];

const judgingCriteria = [
  { name: "Challenge", points: "/5", desc: "Clear need articulation, root cause understanding, problem significance, urgency rationale" },
  { name: "Technology & Innovation", points: "/5", desc: "Novel solution, convincing rationale, transformative potential, design & UX consideration" },
  { name: "Implementation", points: "/5", desc: "Demand beyond need, obstacle mitigation plan, sustainable business model, stakeholder consideration" },
  { name: "Team", points: "/5", desc: "Right skill mix and attitude to implement the proposed innovation" },
  { name: "Pitch", points: "/5", desc: "Prototype demo, clear articulation, next steps, effective use of visual aids" },
  { name: "Q&A", points: "/5", desc: "Ability to defend position and respond to specific judge questions" },
];

const pitchSteps = [
  { time: "10 sec", name: "Introduction", desc: "Introduce your team memorably — people recall beginnings and endings.", pct: 5.5 },
  { time: "20 sec", name: "Problem Statement", desc: "Whose lives improve? What tangible impact will your solution have?", pct: 11 },
  { time: "1 min", name: "Product", desc: "Explain the technical aspects with enough detail to show expertise.", pct: 33 },
  { time: "1 min", name: "Demo", desc: "Live demo or visualization of design, functionality, and key features.", pct: 33 },
  { time: "30 sec", name: "Wrap-up", desc: "Summarize key points and close with a strong, lasting statement.", pct: 17.5 },
];

export default function HSILHackathon() {
  const [openChallenge, setOpenChallenge] = useState(null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hsil-root">

        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo"><span>HSIL</span> Hackathon 2026</div>
          <div className="nav-links">
            <a onClick={() => scrollTo("about")}>About</a>
            <a onClick={() => scrollTo("program")}>Program</a>
            <a onClick={() => scrollTo("challenges")}>Challenges</a>
            <a onClick={() => scrollTo("judging")}>Judging</a>
            <a onClick={() => scrollTo("sponsors")}>Sponsors</a>
            <a className="nav-cta" onClick={() => scrollTo("apply")}>Apply Now</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid" />
          <div className="hero-label">7th Annual · Harvard Health Systems Innovation Lab</div>
          <h1 className="hero-title">
            Building<br />
            <em>High-Value</em><br />
            Health Systems
          </h1>
          <p className="hero-subtitle">
            Leveraging Artificial Intelligence to transform healthcare — a two-day global hackathon spanning hubs on every continent.
          </p>
          <div className="hero-meta">
            <div className="hero-stat">
              <span className="hero-stat-val">Apr 10–11</span>
              <span className="hero-stat-label">Event Dates, 2026</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <span className="hero-stat-val">11</span>
              <span className="hero-stat-label">AI Challenges</span>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <span className="hero-stat-val">Global</span>
              <span className="hero-stat-label">Multi-Hub Event</span>
            </div>
            <div className="hero-divider" />
            <button className="hero-btn" onClick={() => scrollTo("apply")}>Apply to Participate</button>
          </div>
          <div className="hero-scroll">
            <div className="hero-scroll-line" />
            Scroll
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="section-label">About the Hackathon</div>
          <div className="about-grid">
            <div>
              <h2 className="section-title">Where Innovation<br /><em>Meets Impact</em></h2>
              <p className="section-body">
                The HSIL Hackathon is a powerful platform for innovation and collaboration dedicated to improving healthcare systems around the world. By bringing together professionals from different backgrounds, it fosters cross-disciplinary thinking to develop solutions that challenge the status quo and transform healthcare.
              </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <span className="badge">Students & Professionals</span>
                <span className="badge teal">Non-profit & For-profit</span>
                <span className="badge">Concept Stage Welcome</span>
              </div>
            </div>
            <div className="about-features">
              {[
                { icon: "🌍", title: "Global Multi-Hub Format", text: "In-person events at hubs across multiple continents, each managed by a dedicated local organizer at no cost to participants." },
                { icon: "🧬", title: "AI & Health Systems Focus", text: "All solutions must leverage AI to address real healthcare challenges — from diagnostics to workforce shortages." },
                { icon: "🤝", title: "Expert Mentorship", text: "Access to mentors with clinical, engineering, public health, business, and design expertise throughout both days." },
                { icon: "🚀", title: "8-Week Incubation Path", text: "Winners advance to Bootcamp, Venture Building Immersion, and a Global Demo Day pitching to investors." },
              ].map((f, i) => (
                <div className="about-feature" key={i}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* PROGRAM */}
        <section className="section" id="program">
          <div className="section-label">Event Program</div>
          <h2 className="section-title">Two Days of<br /><em>Intensive Innovation</em></h2>
          <div className="program-cols">
            <div>
              <div className="program-day-label">Day 1 · Friday, April 10</div>
              {[
                { icon: "🎙️", title: "Global Welcome Session", desc: "Online kick-off connecting all hubs worldwide." },
                { icon: "🤖", title: "Opening Keynote Panel", desc: '"AI-Driven Digital Solutions for Building High-Value Health Systems" — moderated by Prof. Rifat Atun, Harvard University.' },
                { icon: "📋", title: "Hack 101 Briefing", desc: "Instructions, mentor introductions, and hackathon reminders." },
                { icon: "👥", title: "Team Formation & Ideation", desc: "Form teams of 3–5, select a challenge, and begin developing your solution concept." },
                { icon: "💡", title: "Hack: Building Begins", desc: "Intensive development session with on-site mentor access." },
              ].map((e, i) => (
                <div className="program-event" key={i}>
                  <div className="program-event-icon">{e.icon}</div>
                  <div><h4>{e.title}</h4><p>{e.desc}</p></div>
                </div>
              ))}
            </div>
            <div>
              <div className="program-day-label">Day 2 · Saturday, April 11</div>
              {[
                { icon: "♀️", title: "Keynote: Women in HealthTech", desc: '"Empowering Women in HealthTech" — leading female innovators share insights on diversity and inclusion in health technology.' },
                { icon: "🔨", title: "Continued Hacking", desc: "Final development sprint and mentor consultation sessions, sign-ups via Slack." },
                { icon: "🎯", title: "Pitch Preparation", desc: "Refine your 3-minute presentation with mentor feedback." },
                { icon: "⚖️", title: "Judging & Pitches", desc: "3-minute pitches to a panel of 3–5 local judges with clinical, technical, and business expertise." },
                { icon: "🏆", title: "Awards Ceremony", desc: "Winners announced and advanced to the 8-week venture incubation program." },
              ].map((e, i) => (
                <div className="program-event" key={i}>
                  <div className="program-event-icon">{e.icon}</div>
                  <div><h4>{e.title}</h4><p>{e.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POST-HACKATHON TIMELINE */}
        <section className="section timeline-section">
          <div className="section-label">Post-Hackathon Journey</div>
          <h2 className="section-title">From Idea to<br /><em>Investment-Ready</em></h2>
          <div className="timeline">
            {timelineItems.map((item, i) => (
              <div className={`timeline-item ${item.active ? "active" : ""}`} key={i}>
                <div className="timeline-dot">{item.icon}</div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-name">{item.name}</div>
                <div className="timeline-desc">{item.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "3rem", fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 700 }}>
            Hub winners advance to an 8-week venture incubation program. Hubs with &lt;50 participants nominate 1 winning team; 50–100 participants nominate 2; 100+ nominate 3. The top 10 teams globally present on Demo Day to investors and venture capital firms.
          </p>
        </section>

        {/* CHALLENGES */}
        <section className="section" id="challenges">
          <div className="section-label">Challenge Tracks</div>
          <h2 className="section-title">11 Priority<br /><em>AI Challenges</em></h2>
          <p className="section-body">These challenges are a guide — not a ceiling. Teams are encouraged to think creatively and identify their own pressing health system problems.</p>
          <div className="challenges-grid">
            {challenges.map((c, i) => (
              <div
                className={`challenge-card ${openChallenge === i ? "open" : ""}`}
                key={i}
                onClick={() => setOpenChallenge(openChallenge === i ? null : i)}
              >
                <div className="challenge-num">{c.num}</div>
                <div className="challenge-title">{c.title}</div>
                <div className="challenge-preview">{c.preview}</div>
                <div className={`challenge-expand ${openChallenge === i ? "open" : ""}`}>
                  <div className="challenge-q">"{c.question}"</div>
                  <span className="challenge-tag">{c.tag}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "var(--muted)" }}>Click any card to reveal the guiding question.</p>
        </section>

        <hr className="divider" />

        {/* TEAM CRITERIA */}
        <section className="section" id="team">
          <div className="section-label">Team & Eligibility</div>
          <h2 className="section-title">Who Should<br /><em>Apply?</em></h2>
          <div className="team-cards">
            {[
              { icon: "🎓", title: "Students & Early Professionals", desc: "Primarily geared toward early-stage innovators. Students, recent graduates, and young professionals are all encouraged to apply." },
              { icon: "🏢", title: "Teams & Startups", desc: "Individuals, teams of 3–5, or early-stage startups are welcome. Both non-profit and for-profit ideas are accepted." },
              { icon: "🔀", title: "Diverse Skill Sets", desc: "Strongly recommend cross-disciplinary teams — combining medicine, engineering, public health, design, and business backgrounds." },
              { icon: "🌐", title: "English Proficiency", desc: "At least 1–2 members should be proficient in English to fully engage in post-hackathon Bootcamp and Venture Building programs." },
              { icon: "💡", title: "No Prototype Required", desc: "Concept-stage ideas are fully welcome. Judges assess the clarity and potential of your idea, not the completeness of a prototype." },
              { icon: "🤖", title: "AI-Focused Solutions", desc: "All solutions should meaningfully leverage AI. Ethical considerations around bias, privacy, and equity must be addressed." },
            ].map((c, i) => (
              <div className="team-card" key={i}>
                <div className="team-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JUDGING */}
        <section className="section" style={{ background: "var(--card)" }} id="judging">
          <div className="section-label">Judging</div>
          <h2 className="section-title">How We Score<br /><em>Your Innovation</em></h2>
          <p className="section-body">A panel of 3–5 local judges with clinical, technical, and business expertise evaluates all pitches on Day 2. Total: 30 points.</p>
          <table className="judging-table">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>What Judges Look For</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {judgingCriteria.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{c.desc}</td>
                  <td><strong>{c.points}</strong></td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} style={{ fontWeight: 600, fontSize: "0.88rem" }}>Total</td>
                <td style={{ fontSize: "1.6rem" }}><strong>/30</strong></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* PITCH */}
        <section className="section" id="pitch">
          <div className="section-label">Pitch Structure</div>
          <h2 className="section-title">3 Minutes.<br /><em>Make It Count.</em></h2>
          <p className="section-body">Structure your pitch to maximize impact. Practice multiple times before delivering.</p>
          <div className="pitch-steps">
            {pitchSteps.map((s, i) => (
              <div className="pitch-step" key={i}>
                <div className="pitch-step-time">{s.time}</div>
                <div>
                  <div className="pitch-step-name">{s.name}</div>
                  <div className="pitch-step-desc">{s.desc}</div>
                </div>
                <div>
                  <div className="pitch-step-bar">
                    <div className="pitch-step-fill" style={{ width: `${s.pct * 3}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SPONSORS */}
        <section className="section sponsors-section" id="sponsors">
          <div className="section-label">Partnerships & Sponsorship</div>
          <h2 className="section-title">Partner With<br /><em>Global Health Innovation</em></h2>
          <p className="section-body">
            Join the HSIL Hackathon as a sponsor or partner. Connect your organization with the next generation of health innovators, AI researchers, and global health leaders across continents.
          </p>
          <div className="sponsor-tiers">
            {[
              { tier: "Tier 1", name: "Community Partner", featured: false, perks: ["Logo on event materials", "Social media acknowledgement", "Access to participant network", "Certificate of partnership"] },
              { tier: "Tier 2", name: "Innovation Sponsor", featured: true, perks: ["All Community Partner benefits", "Branded challenge track", "Speaking slot at keynote panels", "Access to winning team pitches", "Recruitment pipeline access"] },
              { tier: "Tier 3", name: "Strategic Partner", featured: false, perks: ["All Innovation Sponsor benefits", "Hub naming rights", "Judge panel representation", "Demo Day presenting partner", "Venture incubation co-branding", "First-look investment opportunities"] },
            ].map((t, i) => (
              <div className={`sponsor-tier ${t.featured ? "featured" : ""}`} key={i}>
                <div className="tier-name">{t.tier}</div>
                <div className="tier-title">{t.name}</div>
                <ul className="tier-perks">
                  {t.perks.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
                <button className="tier-btn">Get in Touch</button>
              </div>
            ))}
          </div>
        </section>

        {/* RESOURCES */}
        <section className="section" id="resources">
          <div className="section-label">Resources</div>
          <h2 className="section-title">Data & Research<br /><em>Starting Points</em></h2>
          <div className="resources-grid">
            <div className="resource-group">
              <h3>Cardiovascular & Diabetes</h3>
              <a className="resource-link" href="https://www.hsph.harvard.edu/health-systems-innovationlab/2022/05/11/cvd-g20/" target="_blank" rel="noreferrer">CVD in G20+ Countries — HSIL Harvard</a>
              <a className="resource-link" href="https://world-heart-federation.org/cvd-roadmaps/whf-global-roadmaps/cvd-diabetes/" target="_blank" rel="noreferrer">CVD & Diabetes Roadmaps — WHF</a>
              <a className="resource-link" href="https://www.who.int/news-room/fact-sheets/detail/diabetes" target="_blank" rel="noreferrer">Diabetes Fact Sheet — WHO</a>
              <a className="resource-link" href="https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)" target="_blank" rel="noreferrer">CVD Fact Sheet — WHO</a>
            </div>
            <div className="resource-group">
              <h3>Cancer</h3>
              <a className="resource-link" href="https://www.who.int/news/item/01-02-2024-global-cancer-burden-growing--amidst-mounting-need-for-services" target="_blank" rel="noreferrer">Global Cancer Burden — WHO 2024</a>
              <a className="resource-link" href="https://www.iarc.who.int/" target="_blank" rel="noreferrer">International Agency for Research on Cancer</a>
              <a className="resource-link" href="https://www.uicc.org/" target="_blank" rel="noreferrer">Union for International Cancer Control</a>
            </div>
            <div className="resource-group">
              <h3>Mental Health</h3>
              <a className="resource-link" href="https://www.who.int/publications/i/item/9789240036703" target="_blank" rel="noreferrer">Mental Health Atlas — WHO</a>
              <a className="resource-link" href="https://vizhub.healthdata.org/gbd-results/" target="_blank" rel="noreferrer">Global Burden of Disease — IHME</a>
              <a className="resource-link" href="https://extranet.who.int/mindbank/" target="_blank" rel="noreferrer">WHO MiNDbank Database</a>
              <a className="resource-link" href="https://www.who.int/teams/mental-health-and-substance-use/data-research/suicide-data" target="_blank" rel="noreferrer">Global Suicide Data — WHO</a>
            </div>
            <div className="resource-group">
              <h3>Infectious Diseases & AI Ethics</h3>
              <a className="resource-link" href="https://ghdx.healthdata.org" target="_blank" rel="noreferrer">Global Health Data Exchange — IHME</a>
              <a className="resource-link" href="https://www.who.int/publications/i/item/9789240084759" target="_blank" rel="noreferrer">WHO AI Ethics for Health — Guidance on LMMs</a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" id="apply" style={{ background: `linear-gradient(135deg, rgba(165,28,48,0.15) 0%, transparent 60%), var(--card)`, textAlign: "center", padding: "8rem 4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>Ready to Join?</div>
          <h2 className="section-title" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 1.5rem" }}>
            Apply for the<br /><em>2026 Hackathon</em>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 3rem" }}>
            Contact your local Hub organizer to confirm your participation. Accepted participants receive Slack access and pre-event Q&A session details at least two weeks before the event.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="hero-btn">Apply as Participant</button>
            <button className="hero-btn" style={{ background: "transparent", border: "1px solid var(--crimson)", color: "var(--crimson)" }} onClick={() => scrollTo("sponsors")}>
              Become a Sponsor
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <div className="footer-logo"><span>Harvard</span> Health Systems Innovation Lab</div>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: 340, marginTop: "0.75rem" }}>
              The HSIL Hackathon is a powerful platform for innovation and collaboration dedicated to improving healthcare systems around the world.
            </p>
          </div>
          <div style={{ display: "flex", gap: "4rem" }}>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Quick Links</p>
              {["about", "program", "challenges", "judging", "sponsors", "resources"].map(l => (
                <a key={l} onClick={() => scrollTo(l)} style={{ display: "block", fontSize: "0.82rem", color: "var(--muted)", textDecoration: "none", padding: "0.3rem 0", cursor: "pointer", textTransform: "capitalize" }}
                  onMouseEnter={e => e.target.style.color = "var(--text)"}
                  onMouseLeave={e => e.target.style.color = "var(--muted)"}
                >{l}</a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Event</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 2.2 }}>
                April 10–11, 2026<br />
                Global Multi-Hub<br />
                AI & Health Systems<br />
                7th Annual Edition
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Health Systems Innovation Lab, Harvard University. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Contact</a>
              <a href="https://www.hsph.harvard.edu/health-systems-innovationlab/" target="_blank" rel="noreferrer">HSIL Website</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
