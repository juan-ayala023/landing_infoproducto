import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import {
  Zap, Cpu, Globe, TrendingUp, Layout, Search,
  ArrowRight, ArrowUpRight, Layers, Code, Compass, CheckCircle2,
  Menu, X, CreditCard, Target, Sparkles, Plus, Minus,
  Activity, Bot, LineChart, Wand2, Rocket, Shield,
} from 'lucide-react';

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  bg:       '#060509',
  bg2:      '#0A0812',
  surface:  'rgba(255,255,255,0.025)',
  surface2: 'rgba(255,255,255,0.05)',
  border:   'rgba(255,255,255,0.08)',
  border2:  'rgba(255,255,255,0.14)',
  text:     '#F4F2F8',
  textMut:  'rgba(244,242,248,0.55)',
  textDim:  'rgba(244,242,248,0.32)',
  purple:   '#8A55F7',
  purpleD:  '#6F39E0',
  blue:     '#38BDF8',
  cream:    '#EFE6D2',
};

// ─── Reusable: section eyebrow with dot ─────────────────────────────────────
const Eyebrow = ({ children, color = C.purple }) => (
  <div style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
    <span style={{
      width:6, height:6, borderRadius:'50%', background:color,
      boxShadow:`0 0 12px ${color}`, animation:'pulse-dot 2.4s ease-in-out infinite',
    }}/>
    <span className="eyebrow" style={{ color: C.textMut }}>{children}</span>
  </div>
);

// ─── Scroll progress bar ────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 20 });
  return <motion.div className="scroll-progress" style={{ scaleX: x, width:'100%' }}/>;
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { l:'Sistema',    href:'#sistema' },
    { l:'Comparativa',href:'#comparativa' },
    { l:'Portafolio', href:'#portafolio' },
    { l:'Métricas',   href:'#metricas' },
    { l:'FAQ',        href:'#faq' },
  ];

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding: scrolled ? '14px 0' : '24px 0',
      background: scrolled ? 'rgba(6,5,9,0.72)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
      transition: 'all .35s cubic-bezier(.2,.8,.2,1)',
    }}>
      <div className="nav-inner" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {/* Logo */}
        <motion.a href="#" initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}}
          style={{display:'flex',alignItems:'center',gap:12,textDecoration:'none'}}>
          <div style={{
            position:'relative', width:36, height:36, borderRadius:10,
            background:`linear-gradient(135deg, ${C.purple} 0%, ${C.blue} 100%)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:900, fontSize:17, color:'#fff',
            boxShadow:`0 6px 24px ${C.purple}55, inset 0 1px 0 rgba(255,255,255,.3)`,
          }}>
            Z
            <span style={{
              position:'absolute', inset:-2, borderRadius:12,
              border:`1px solid ${C.purple}40`, animation:'pulse-dot 3s ease-in-out infinite',
            }}/>
          </div>
          <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
            <span className="display" style={{ fontSize:20, color:'#fff', textTransform:'uppercase' }}>Zenix</span>
            <span className="mono" style={{ fontSize:9, color:C.textDim, letterSpacing:'0.18em', marginTop:3 }}>v2.4 · BETA</span>
          </div>
        </motion.a>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:6 }} className="hidden-mobile">
          <div style={{
            display:'flex', alignItems:'center', gap:4,
            padding:'6px', borderRadius:9999,
            background:C.surface, border:`1px solid ${C.border}`,
          }}>
            {links.map(({l,href}) => (
              <a key={l} href={href}
                style={{
                  padding:'8px 16px', borderRadius:9999,
                  color:C.textMut, fontSize:13, fontWeight:500,
                  textDecoration:'none', transition:'all .25s',
                }}
                onMouseEnter={e=>{e.target.style.color='#fff'; e.target.style.background=C.surface2;}}
                onMouseLeave={e=>{e.target.style.color=C.textMut; e.target.style.background='transparent';}}
              >{l}</a>
            ))}
          </div>
          <motion.button
            whileHover={{scale:1.03}} whileTap={{scale:0.97}}
            onClick={() => document.getElementById('precios')?.scrollIntoView({behavior:'smooth'})}
            className="btn-primary"
            style={{
              marginLeft:10,
              padding:'11px 22px', borderRadius:9999, border:'none', cursor:'pointer',
              background:'#fff', color:'#000', fontWeight:700, fontSize:13,
              display:'inline-flex', alignItems:'center', gap:8,
              transition:'all .3s',
            }}
          >
            Empezar <ArrowRight size={14}/>
          </motion.button>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(!open)}
          style={{ background:C.surface, border:`1px solid ${C.border}`, color:'#fff', cursor:'pointer', display:'none', padding:10, borderRadius:12 }}
          className="show-mobile">
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
            style={{ position:'absolute', top:'100%', left:16, right:16, marginTop:8,
              background:'rgba(10,8,18,0.92)', backdropFilter:'blur(20px)',
              border:`1px solid ${C.border}`, borderRadius:24,
              padding:24, display:'flex', flexDirection:'column', gap:6 }}>
            {links.map(({l,href})=>(
              <a key={l} href={href} onClick={()=>setOpen(false)}
                style={{ color:'#fff', fontSize:18, fontWeight:600, textDecoration:'none', padding:'12px 8px', borderBottom:`1px solid ${C.border}` }}>{l}</a>
            ))}
            <button onClick={()=>setOpen(false)}
              style={{ marginTop:12, width:'100%', padding:'16px 0', background:C.purple, color:'#fff', border:'none', borderRadius:14, fontSize:15, fontWeight:700, cursor:'pointer' }}>
              Empezar Ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero-section" style={{ position:'relative', paddingTop:160, paddingBottom:100, overflow:'hidden', background:C.bg }}>
      {/* Mesh BG */}
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        background: `
          radial-gradient(ellipse 60% 50% at 50% 0%, ${C.purple}22 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 80% 30%, ${C.blue}14 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 20% 30%, ${C.purple}18 0%, transparent 70%)
        `,
      }}/>
      {/* Grid lines */}
      <div style={{
        position:'absolute', inset:0, opacity:.4, pointerEvents:'none', zIndex:0,
        backgroundImage:`linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
        backgroundSize:'72px 72px',
        maskImage:'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%)',
        WebkitMaskImage:'radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 80%)',
      }}/>

      <div className="hero-container section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>

        {/* Top announce pill */}
        <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:.6}}
          style={{ display:'flex', justifyContent:'center', marginBottom:36 }}>
          <a href="#sistema" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'7px 8px 7px 16px', borderRadius:9999,
            background:C.surface, border:`1px solid ${C.border}`,
            color:C.text, fontSize:12, fontWeight:500, textDecoration:'none',
            transition:'all .3s',
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor=C.border2}
          onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
          >
            <span style={{
              padding:'3px 8px', borderRadius:9999, fontSize:10, fontWeight:700,
              background:`${C.purple}25`, color:'#BBA3FF', letterSpacing:'.08em',
            }}>NUEVO</span>
            <span style={{ color:C.textMut }}>Agentes autónomos v2.4 ya disponibles</span>
            <ArrowRight size={14} style={{color:C.textMut}}/>
          </a>
        </motion.div>

        <div style={{ textAlign:'center' }}>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}
            className="display hero-headline" style={{
              fontSize:'clamp(54px,8.4vw,128px)',
              lineHeight:.92, color:'#fff', margin:'0 auto 24px',
              maxWidth:1100,
            }}>
            La fábrica autónoma<br/>
            de <span className="serif" style={{ fontSize:'1.05em', color:C.cream, paddingRight:'.05em' }}>infoproductos</span>{' '}
            <span className="text-gradient">rentables.</span>
          </motion.h1>

          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.25}}
            className="hero-subtitle" style={{
              maxWidth:620, margin:'0 auto 44px', fontSize:18,
              color:C.textMut, lineHeight:1.6,
            }}>
            Investigación, creación, branding y ventas. Una orquesta de agentes IA convierte
            cualquier conocimiento en una operación digital que vende mientras duermes.
          </motion.p>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.4}}
            className="hero-ctas" style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}}
              onClick={() => document.getElementById('precios')?.scrollIntoView({behavior:'smooth'})}
              className="btn-primary"
              style={{
                padding:'16px 28px', borderRadius:9999, border:'none', cursor:'pointer',
                background:'#fff', color:'#000', fontWeight:600, fontSize:15,
                display:'inline-flex', alignItems:'center', gap:10,
                boxShadow:'0 10px 40px rgba(255,255,255,.12)',
              }}>
              Lanzar mi primer producto <ArrowRight size={16}/>
            </motion.button>
            <button style={{
              padding:'16px 28px', borderRadius:9999, cursor:'pointer',
              background:C.surface, color:C.text,
              border:`1px solid ${C.border}`, fontWeight:500, fontSize:15,
              display:'inline-flex', alignItems:'center', gap:10,
              transition:'all .3s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=C.border2; e.currentTarget.style.background=C.surface2;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.surface;}}
            >
              <span style={{
                width:22, height:22, borderRadius:'50%', background:`${C.purple}30`,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
              }}>
                <span style={{ width:0, height:0, borderTop:'4px solid transparent', borderBottom:'4px solid transparent', borderLeft:'6px solid #fff', marginLeft:2 }}/>
              </span>
              Ver demo (2 min)
            </button>
          </motion.div>

          {/* Meta strip */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8,delay:.6}}
            className="hero-meta" style={{ marginTop:36, display:'flex', alignItems:'center', justifyContent:'center', gap:32 }}>
            <div style={{ display:'flex', alignItems:'center', gap:-10 }}>
              {['#7C3AED','#38BDF8','#EFE6D2','#F472B6'].map((bg,i)=>(
                <div key={i} style={{
                  width:28, height:28, borderRadius:'50%', background:bg,
                  border:`2px solid ${C.bg}`, marginLeft: i?-10:0,
                  display:'inline-flex', alignItems:'center', justifyContent:'center',
                  fontSize:10, fontWeight:700, color:'#000',
                }}>{['M','J','A','R'][i]}</div>
              ))}
            </div>
            <div style={{ fontSize:13, color:C.textMut }}>
              <strong style={{ color:'#fff', fontWeight:600 }}>+1,247 creadores</strong> ya operando · 4.9 ★
            </div>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <DashboardMockup/>
      </div>
    </section>
  );
}

// ─── Dashboard Mockup ───────────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.6}}
      className="dashboard-preview" style={{ marginTop:80, position:'relative', maxWidth:1180, margin:'80px auto 0' }}>
      <div className="dashboard-box" style={{
        position:'relative', borderRadius:24, overflow:'hidden',
        background:`linear-gradient(180deg, ${C.bg2}, ${C.bg})`,
        border:`1px solid ${C.border2}`,
        boxShadow:`0 0 80px ${C.purple}25, 0 60px 120px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.06)`,
      }}>
        {/* Window chrome */}
        <div style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'14px 18px', borderBottom:`1px solid ${C.border}`,
          background:'rgba(0,0,0,.3)',
        }}>
          <div style={{ display:'flex', gap:6 }}>
            <span style={{ width:11, height:11, borderRadius:'50%', background:'#FF5F57' }}/>
            <span style={{ width:11, height:11, borderRadius:'50%', background:'#FEBC2E' }}/>
            <span style={{ width:11, height:11, borderRadius:'50%', background:'#28C840' }}/>
          </div>
          <div style={{ flex:1, textAlign:'center' }}>
            <span className="mono" style={{ fontSize:11, color:C.textDim, padding:'4px 14px', borderRadius:8, background:C.surface }}>
              app.zenix.ai/factory
            </span>
          </div>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, color:'#4ade80' }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 6px #4ade80', animation:'pulse-dot 1.6s ease-in-out infinite' }}/>
            LIVE
          </span>
        </div>

        {/* Body */}
        <div style={{ display:'flex', minHeight:420 }}>
          {/* Sidebar */}
          <aside className="dash-side" style={{
            width:200, padding:18, borderRight:`1px solid ${C.border}`,
            display:'flex', flexDirection:'column', gap:6,
            background:'rgba(255,255,255,.012)',
          }}>
            <div className="eyebrow" style={{ marginBottom:8, color:C.textDim }}>FACTORY</div>
            {[
              {i:Activity, l:'Dashboard', active:true},
              {i:Bot,      l:'Agentes',   active:false, count:6},
              {i:Layers,   l:'Productos', active:false, count:38},
              {i:LineChart,l:'Analytics', active:false},
              {i:Wand2,    l:'Branding',  active:false},
            ].map(({i:Icon,l,active,count})=>(
              <div key={l} style={{
                display:'flex', alignItems:'center', gap:10,
                padding:'8px 10px', borderRadius:8,
                background: active ? `${C.purple}1A` : 'transparent',
                color: active ? '#fff' : C.textMut,
                fontSize:13, fontWeight: active?600:500,
                border: active ? `1px solid ${C.purple}30` : '1px solid transparent',
              }}>
                <Icon size={14} style={{color: active?C.purple:C.textDim}}/>
                <span style={{ flex:1 }}>{l}</span>
                {count && <span className="mono" style={{ fontSize:10, color:C.textDim }}>{count}</span>}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="dash-main" style={{ flex:1, padding:24, display:'flex', flexDirection:'column', gap:18 }}>
            {/* Title row */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
              <div>
                <div className="eyebrow" style={{ color:C.textDim, marginBottom:6 }}>ABRIL · TIEMPO REAL</div>
                <div className="display" style={{ fontSize:22, color:'#fff' }}>Operación Activa</div>
              </div>
              <div style={{ display:'flex', gap:6 }}>
                {['7D','30D','MTD'].map((t,i)=>(
                  <span key={t} style={{
                    padding:'6px 10px', borderRadius:8, fontSize:10, fontWeight:600,
                    background: i===1 ? C.surface2 : 'transparent',
                    border:`1px solid ${i===1?C.border2:C.border}`,
                    color: i===1?'#fff':C.textMut,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* KPI cards */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
              {[
                { l:'Productos', v:'1,247', d:'+18%', c:C.purple },
                { l:'Ingresos',  v:'$84.2K',d:'+32%', c:C.blue   },
                { l:'Conv.',     v:'12.4%', d:'+4%',  c:'#4ade80'},
                { l:'Nichos',    v:'38',    d:'+6',   c:C.cream  },
              ].map((k,i)=>(
                <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:1+i*.1}}
                  className="dash-pill" style={{
                  padding:'14px 16px', borderRadius:12,
                  background:C.surface, border:`1px solid ${C.border}`,
                }}>
                  <div className="label eyebrow" style={{ color:C.textDim, marginBottom:6 }}>{k.l}</div>
                  <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
                    <div className="value display" style={{ fontSize:22, color:'#fff' }}>{k.v}</div>
                    <div className="mono" style={{ fontSize:10, color:k.c }}>{k.d}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chart + agents */}
            <div style={{ display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:14, flex:1 }}>
              {/* Chart */}
              <div className="dash-chart" style={{
                padding:18, borderRadius:14,
                background:C.surface, border:`1px solid ${C.border}`,
                display:'flex', flexDirection:'column',
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#fff' }}>Ingresos · 30D</div>
                  <div style={{ display:'flex', gap:10, fontSize:10, color:C.textMut }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                      <span style={{ width:8, height:2, background:C.purple, borderRadius:2 }}/> Actual
                    </span>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}>
                      <span style={{ width:8, height:2, background:C.textDim, borderRadius:2 }}/> Anterior
                    </span>
                  </div>
                </div>
                <svg viewBox="0 0 300 110" style={{ width:'100%', flex:1 }} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.purple} stopOpacity=".4"/>
                      <stop offset="100%" stopColor={C.purple} stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {[20,40,60,80].map(y=>(
                    <line key={y} x1="0" x2="300" y1={y} y2={y} stroke={C.border} strokeDasharray="2 4"/>
                  ))}
                  <path d="M0,80 C30,75 60,68 90,55 S150,40 180,30 S240,20 300,12 L300,110 L0,110 Z" fill="url(#gA)"/>
                  <path d="M0,80 C30,75 60,68 90,55 S150,40 180,30 S240,20 300,12" fill="none" stroke={C.purple} strokeWidth="2"/>
                  <path d="M0,90 C40,86 80,82 120,76 S180,68 220,62 S270,55 300,52" fill="none" stroke={C.textDim} strokeWidth="1.2" strokeDasharray="3 3"/>
                  <circle cx="300" cy="12" r="4" fill={C.purple}/>
                  <circle cx="300" cy="12" r="8" fill={C.purple} opacity=".25"/>
                </svg>
              </div>

              {/* Agents */}
              <div style={{
                padding:14, borderRadius:14,
                background:C.surface, border:`1px solid ${C.border}`,
                display:'flex', flexDirection:'column', gap:8,
              }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#fff' }}>Agentes activos</div>
                  <span className="mono" style={{ fontSize:9, color:'#4ade80' }}>6/6</span>
                </div>
                {[
                  { n:'Researcher', s:'Escaneando nicho…', c:C.blue },
                  { n:'Writer',     s:'Generando ebook…',  c:C.purple },
                  { n:'Brand',      s:'Diseñando logo…',   c:C.cream },
                  { n:'Funnel',     s:'Optimizando CTA…',  c:'#F472B6' },
                ].map(a=>(
                  <div key={a.n} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{
                      width:8, height:8, borderRadius:'50%', background:a.c,
                      boxShadow:`0 0 8px ${a.c}`, flexShrink:0,
                      animation:'pulse-dot 1.6s ease-in-out infinite',
                    }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:11, fontWeight:600, color:'#fff' }}>{a.n}</div>
                      <div style={{ fontSize:10, color:C.textDim, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{delay:1.4}}
        style={{
          position:'absolute', top:-20, right:-10,
          padding:'10px 14px', borderRadius:14,
          background:'rgba(10,8,18,.9)', backdropFilter:'blur(12px)',
          border:`1px solid ${C.purple}40`,
          display:'flex', alignItems:'center', gap:10,
          boxShadow:`0 12px 40px ${C.purple}30`,
        }}
        className="hidden-mobile">
        <Sparkles size={16} style={{color:C.purple}}/>
        <div>
          <div style={{ fontSize:11, color:C.textMut }}>Producto generado</div>
          <div style={{ fontSize:13, fontWeight:600, color:'#fff' }}>"Curso de Notion Pro" → $4.2k</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Trust Bar ──────────────────────────────────────────────────────────────
function TrustBar() {
  const items = ['PRODUCT HUNT', '#1 LAUNCH', 'INDIE HACKERS', 'FORBES 30', 'TECHCRUNCH', 'YC W26', 'A16Z BACKED'];
  return (
    <section style={{ padding:'48px 0', background:C.bg, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, overflow:'hidden' }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px', textAlign:'center', marginBottom:24 }}>
        <span className="eyebrow" style={{ color:C.textDim }}>Confiado por creadores en</span>
      </div>
      <div className="trust-bar" style={{
        position:'relative',
        maskImage:'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage:'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      }}>
        <div className="marquee-track">
          {[...items, ...items].map((t,i)=>(
            <div key={i} className="trust-item" style={{
              padding:'0 56px', fontSize:14, fontWeight:700, letterSpacing:'.18em',
              color:C.textMut, whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:12,
            }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:C.purple, opacity:.5 }}/>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ────────────────────────────────────────────────────────
const STEPS = [
  { icon:Search,     title:'Investigación',         desc:'Identifica nichos rentables y problemas críticos con data en tiempo real.' },
  { icon:Code,       title:'Creación de Producto',  desc:'Genera cursos, ebooks y materiales completos con IA de última generación.' },
  { icon:Compass,    title:'Branding Elite',        desc:'Identidad visual y de voz que garantiza posicionamiento premium.' },
  { icon:Layout,     title:'Activos de Venta',      desc:'Copy de alta conversión, landings y funnels diseñados psicológicamente.' },
  { icon:Zap,        title:'Tráfico & Distribución',desc:'Distribución multicanal automatizada para captar leads orgánicos y pagados.' },
  { icon:TrendingUp, title:'Escalabilidad Infinita',desc:'Métricas y replicabilidad en nuevos nichos para construir un imperio.' },
];

function ProcessCard({ icon:Icon, title, desc, n, delay }) {
  return (
    <motion.div
      className="process-card card-glow"
      initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay,duration:.5}}
      style={{
        position:'relative',
        padding:32, borderRadius:24,
        background: C.surface,
        border:`1px solid ${C.border}`,
        cursor:'default',
      }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28 }}>
        <div style={{
          width:46, height:46, borderRadius:12,
          background:`linear-gradient(135deg, ${C.purple}, ${C.purpleD})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff',
          boxShadow:`0 4px 18px ${C.purple}40, inset 0 1px 0 rgba(255,255,255,.2)`,
        }}>
          <Icon size={20}/>
        </div>
        <div className="serif" style={{
          fontSize:54, color:C.textDim, lineHeight:.8, letterSpacing:'-.04em',
        }}>0{n}</div>
      </div>
      <h3 className="display" style={{
        fontSize:22, color:'#fff', margin:'0 0 10px', letterSpacing:'-.02em',
      }}>
        {title}
      </h3>
      <p style={{ color:C.textMut, lineHeight:1.6, fontSize:14.5, margin:0 }}>
        {desc}
      </p>
    </motion.div>
  );
}

function ProcessSection() {
  return (
    <section id="sistema" className="sec-pad" style={{ position:'relative', padding:'140px 0', background:C.bg }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px' }}>
        <div className="sec-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:72, gap:32, flexWrap:'wrap' }}>
          <div style={{ maxWidth:680 }}>
            <div style={{ marginBottom:20 }}><Eyebrow>El Sistema · 06 etapas</Eyebrow></div>
            <h2 className="display sec-title" style={{
              fontSize:'clamp(40px,5.6vw,72px)', lineHeight:.96,
              color:'#fff', margin:'0 0 18px',
            }}>
              El motor que convierte<br/>
              ideas en <span className="serif" style={{ color:C.cream }}>ingresos</span>{' '}
              <span className="text-gradient">recurrentes.</span>
            </h2>
            <p style={{ color:C.textMut, fontSize:16.5, lineHeight:1.65, margin:0, maxWidth:560 }}>
              No es una herramienta más. Es un ecosistema autónomo que ejecuta por ti las 24
              horas del día, los 7 días de la semana.
            </p>
          </div>
          <div style={{
            padding:'16px 20px', borderRadius:16,
            background:C.surface, border:`1px solid ${C.border}`,
            display:'flex', alignItems:'center', gap:14,
          }}>
            <Zap size={18} style={{color:C.purple}}/>
            <div>
              <div className="mono" style={{ fontSize:10, color:C.textDim, marginBottom:2 }}>UPTIME</div>
              <div style={{ fontSize:14, fontWeight:600, color:'#fff' }}>99.98% · 24/7</div>
            </div>
          </div>
        </div>

        <div className="process-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:18 }}>
          {STEPS.map((s,i)=><ProcessCard key={i} {...s} n={i+1} delay={i*.06}/>)}
        </div>
      </div>
    </section>
  );
}

// ─── Compare Section ────────────────────────────────────────────────────────
function CompareSection() {
  const oldWay = [
    'Semanas investigando nicho manualmente',
    'Contratar copywriter, diseñador, dev',
    'Iterar el producto a ciegas',
    'Tráfico orgánico lento e impredecible',
    '$3K–$10K iniciales antes de validar',
  ];
  const zenix = [
    'Nicho validado con data en 2 horas',
    'Equipo de 6 agentes IA en paralelo',
    'A/B testing automático del funnel',
    'Distribución multicanal automatizada',
    'Lanza tu primer producto en 48 h',
  ];

  return (
    <section id="comparativa" className="sec-pad" style={{ padding:'120px 0', background:C.bg2 }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ textAlign:'center', marginBottom:64, maxWidth:720, margin:'0 auto 64px' }}>
          <div style={{ marginBottom:16, display:'flex', justifyContent:'center' }}><Eyebrow>El contraste</Eyebrow></div>
          <h2 className="display sec-title" style={{
            fontSize:'clamp(36px,5vw,64px)', lineHeight:.98,
            color:'#fff', margin:'0 0 16px',
          }}>
            El método tradicional <span className="serif" style={{color:C.cream}}>vs.</span>{' '}
            <span className="text-gradient">Zenix</span>
          </h2>
          <p style={{ color:C.textMut, fontSize:16, lineHeight:1.6, margin:0 }}>
            La diferencia entre construir un negocio digital en meses o lanzarlo el fin de semana.
          </p>
        </div>

        <div className="compare-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
          {/* Old way */}
          <div className="compare-col" style={{
            padding:'40px 36px', borderRadius:28,
            background:'rgba(255,255,255,.015)',
            border:`1px solid ${C.border}`,
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
              <div className="eyebrow" style={{ color:'#FF7A6B' }}>El viejo modo</div>
              <div className="serif" style={{ fontSize:36, color:C.textDim, lineHeight:1 }}>~6 meses</div>
            </div>
            <h3 className="display" style={{ fontSize:28, color:'#fff', margin:'0 0 24px' }}>Hacerlo a mano.</h3>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
              {oldWay.map(t=>(
                <li key={t} style={{ display:'flex', alignItems:'flex-start', gap:12, color:C.textMut, fontSize:15 }}>
                  <X size={18} style={{ color:'#FF7A6B', marginTop:2, flexShrink:0, opacity:.7 }}/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Zenix */}
          <div className="compare-col" style={{
            position:'relative',
            padding:'40px 36px', borderRadius:28,
            background:`linear-gradient(150deg, ${C.purple}14, ${C.surface})`,
            border:`1px solid ${C.purple}40`,
            boxShadow:`0 0 60px ${C.purple}18`,
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
              <div className="eyebrow" style={{ color:C.purple }}>Con Zenix</div>
              <div className="serif" style={{ fontSize:36, color:C.cream, lineHeight:1 }}>48 horas</div>
            </div>
            <h3 className="display" style={{ fontSize:28, color:'#fff', margin:'0 0 24px' }}>
              La fábrica trabaja por ti.
            </h3>
            <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:14 }}>
              {zenix.map(t=>(
                <li key={t} style={{ display:'flex', alignItems:'flex-start', gap:12, color:'#fff', fontSize:15 }}>
                  <CheckCircle2 size={18} style={{ color:C.purple, marginTop:2, flexShrink:0 }}/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Showcase ───────────────────────────────────────────────────────────────
function ShowCard({ label, name, sub, accentColor, dark, FloatIcon, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay,duration:.6}}
      className="show-card" onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        position:'relative', borderRadius:32, overflow:'hidden', aspectRatio:'4/3',
        cursor:'pointer', border:`1px solid ${C.border}`,
      }}>
      <div style={{
        position:'absolute', inset:0,
        background: dark
          ? `radial-gradient(ellipse at 60% 40%, ${C.purple}24 0%, #06040E 70%)`
          : 'linear-gradient(135deg, #F5EFE5 0%, #E5DBC9 100%)',
        transition:'transform .6s ease',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
      }}/>
      <div style={{
        position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
        color: dark ? `${C.purple}30` : `${accentColor}15`,
        transform: hov ? 'scale(1.08) rotate(6deg)' : 'scale(1) rotate(0)', transition:'transform .8s ease',
      }} className="show-card-float-icon">
        <FloatIcon size={300} strokeWidth={.18}/>
      </div>
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)',
      }}/>

      {/* Top corner stat */}
      <div style={{
        position:'absolute', top:24, left:24, right:24,
        display:'flex', justifyContent:'space-between', alignItems:'center', zIndex:2,
      }}>
        <span style={{
          padding:'5px 12px', borderRadius:9999,
          background: dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.06)',
          backdropFilter:'blur(8px)',
          fontSize:10, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase',
          color: dark ? '#fff' : '#000',
        }}>{label}</span>
        <span className="mono" style={{ fontSize:11, color: dark?C.textMut:'#000', opacity:.7 }}>
          $24.8K · 31D
        </span>
      </div>

      <div className="show-card-content" style={{ position:'absolute', bottom:32, left:32, right:32, zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:16 }}>
          <div>
            <h3 className="display show-card-name" style={{ fontSize:34, color:'#fff', margin:0, letterSpacing:'-.025em' }}>{name}</h3>
            <p style={{ color:'rgba(255,255,255,.55)', fontSize:13, marginTop:8, marginBottom:0 }}>{sub}</p>
          </div>
          <div style={{
            width:46, height:46, borderRadius:'50%', background:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            transform: hov ? 'rotate(0deg) scale(1.05)' : 'rotate(-30deg) scale(1)',
            transition:'all .4s',
          }}>
            <ArrowUpRight size={20} style={{color:'#000'}}/>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Showcase() {
  return (
    <section id="portafolio" className="sec-pad" style={{ padding:'140px 0', background:C.bg }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px' }}>
        <div className="sec-header" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64, gap:24 }}>
          <div>
            <div style={{ marginBottom:18 }}><Eyebrow color={C.cream}>Portafolio · Lanzamientos</Eyebrow></div>
            <h2 className="display sec-title" style={{ fontSize:'clamp(40px,5vw,68px)', color:'#fff', margin:0, lineHeight:.98 }}>
              Productos hechos por <span className="serif" style={{color:C.cream}}>la fábrica.</span>
            </h2>
          </div>
          <a href="#" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            color:C.textMut, fontSize:13, fontWeight:500, textDecoration:'none',
            padding:'10px 16px', borderRadius:9999,
            border:`1px solid ${C.border}`, background:C.surface,
          }}>
            Ver los 38 lanzamientos <ArrowRight size={14}/>
          </a>
        </div>

        <div className="showcase-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(380px,1fr))', gap:20 }}>
          <ShowCard label="Tecnología" name="Neural Academy" sub="Cosmos digital · Conocimiento como energía" accentColor={C.purple} dark FloatIcon={Globe} delay={0}/>
          <ShowCard label="Editorial"  name="Paper & Ink"   sub="Editorial clásica · Sabiduría atemporal"  accentColor="#8B6914" dark={false} FloatIcon={Layers} delay={.1}/>
        </div>
      </div>
    </section>
  );
}

// ─── Metrics Section ────────────────────────────────────────────────────────
function MetricsSection() {
  const metrics = [
    { v:'48h',     l:'Time to first product',   s:'desde idea a venta' },
    { v:'$84K',    l:'Ingresos mensuales',      s:'de un solo cliente' },
    { v:'12.4×',   l:'Más rápido',              s:'que un equipo humano' },
    { v:'97%',     l:'Costos eliminados',       s:'vs. agencia tradicional' },
  ];
  return (
    <section id="metricas" className="sec-pad" style={{ padding:'120px 0', background:C.bg2, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}` }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ textAlign:'center', marginBottom:64, maxWidth:680, margin:'0 auto 64px' }}>
          <div style={{ marginBottom:16, display:'flex', justifyContent:'center' }}><Eyebrow color={C.blue}>Las cifras hablan</Eyebrow></div>
          <h2 className="display sec-title" style={{ fontSize:'clamp(36px,5vw,60px)', color:'#fff', margin:0, lineHeight:1 }}>
            Lo que cambia cuando<br/>la fábrica <span className="serif" style={{color:C.cream}}>opera por ti.</span>
          </h2>
        </div>

        <div className="metrics-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1,
          background:C.border, borderRadius:28, overflow:'hidden',
          border:`1px solid ${C.border}`,
        }}>
          {metrics.map((m,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}
              className="metric-cell" style={{
                padding:'48px 32px', background:C.bg2, position:'relative',
                display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:220,
              }}>
              <div className="mono" style={{ fontSize:10, color:C.textDim, letterSpacing:'.18em' }}>0{i+1}</div>
              <div>
                <div className="display metric-value" style={{ fontSize:60, color:'#fff', lineHeight:.95, letterSpacing:'-.04em', marginBottom:12 }}>
                  {m.v}
                </div>
                <div style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:4 }}>{m.l}</div>
                <div style={{ fontSize:13, color:C.textMut }}>{m.s}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
const FAQS = [
  { q:'¿Necesito conocimientos técnicos para usar Zenix?',
    a:'No. La plataforma fue diseñada para que cualquier creador pueda operar la fábrica sin escribir una línea de código. Los agentes manejan toda la complejidad técnica por ti.' },
  { q:'¿Qué tipos de infoproductos puede crear?',
    a:'Cursos en video, ebooks, PDFs interactivos, plantillas, comunidades, newsletters premium y bundles. Si tiene formato digital, Zenix lo construye y lo lanza.' },
  { q:'¿Cómo se paga? ¿Hay periodo de prueba?',
    a:'Suscripción mensual con cancelación en cualquier momento. Tienes 14 días de prueba con acceso completo a la fábrica. Sin tarjeta para empezar.' },
  { q:'¿Quién es dueño de los productos generados?',
    a:'Tú, al 100%. Branding, propiedad intelectual, listas de clientes y dominios son tuyos. Zenix solo opera la maquinaria.' },
  { q:'¿En qué idiomas funciona?',
    a:'Español, inglés, portugués y francés con calidad nativa. Otros 12 idiomas en beta.' },
  { q:'¿Cómo se integra con mis herramientas actuales?',
    a:'Conexión nativa con Stripe, Shopify, Hotmart, ConvertKit, Notion, Google Drive y +30 plataformas más. API abierta para custom.' },
];

function FAQItem({ q, a, open, onClick }) {
  return (
    <div className="faq-item" style={{ borderBottom:`1px solid ${C.border}` }}>
      <button onClick={onClick}
        style={{
          width:'100%', background:'none', border:'none', cursor:'pointer',
          padding:'24px 0', display:'flex', justifyContent:'space-between', alignItems:'center', gap:24,
          color:'#fff', fontSize:17, fontWeight:500, textAlign:'left',
        }}>
        <span>{q}</span>
        <span style={{
          width:32, height:32, borderRadius:'50%', flexShrink:0,
          background: open ? C.purple : C.surface,
          border:`1px solid ${open ? C.purple : C.border}`,
          display:'inline-flex', alignItems:'center', justifyContent:'center',
          color:'#fff', transition:'all .3s',
        }}>
          {open ? <Minus size={14}/> : <Plus size={14}/>}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}}
            style={{ overflow:'hidden' }}>
            <p style={{ color:C.textMut, fontSize:15, lineHeight:1.7, padding:'0 0 24px', maxWidth:560, margin:0 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpen] = useState(0);
  return (
    <section id="faq" className="sec-pad" style={{ padding:'140px 0', background:C.bg }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px' }}>
        <div className="faq-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80, alignItems:'flex-start' }}>
          <div style={{ position:'sticky', top:120 }}>
            <div style={{ marginBottom:18 }}><Eyebrow>Preguntas frecuentes</Eyebrow></div>
            <h2 className="display sec-title" style={{ fontSize:'clamp(36px,4.5vw,54px)', color:'#fff', margin:'0 0 20px', lineHeight:1 }}>
              Todo lo que querías<br/><span className="serif" style={{color:C.cream}}>preguntar.</span>
            </h2>
            <p style={{ color:C.textMut, fontSize:15.5, lineHeight:1.7, margin:'0 0 24px', maxWidth:340 }}>
              ¿No encuentras tu respuesta? Escríbenos y un humano de carne y hueso te contesta en menos de 4 horas.
            </p>
            <a href="mailto:hi@zenix.ai" style={{
              display:'inline-flex', alignItems:'center', gap:8,
              color:'#fff', fontSize:14, fontWeight:600, textDecoration:'none',
              padding:'10px 18px', borderRadius:9999,
              border:`1px solid ${C.border2}`, background:C.surface,
            }}>
              Hablar con el equipo <ArrowRight size={14}/>
            </a>
          </div>
          <div>
            {FAQS.map((f,i)=>(
              <FAQItem key={i} {...f} open={openIdx===i} onClick={()=>setOpen(openIdx===i?-1:i)}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA / Pricing ──────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="precios" className="sec-pad cta-section" style={{ position:'relative', padding:'140px 0', background:C.bg, overflow:'hidden' }}>
      <div style={{
        position:'absolute', bottom:'-30%', right:'-20%', width:900, height:900, borderRadius:'50%',
        background:`radial-gradient(circle, ${C.purple}25, transparent 60%)`, pointerEvents:'none',
      }}/>
      <div style={{
        position:'absolute', top:'-20%', left:'-15%', width:700, height:700, borderRadius:'50%',
        background:`radial-gradient(circle, ${C.blue}14, transparent 60%)`, pointerEvents:'none',
      }}/>

      <div className="section-x" style={{ position:'relative', zIndex:1, maxWidth:1180, margin:'0 auto', padding:'0 32px' }}>
        <div className="cta-box" style={{
          position:'relative',
          background:`linear-gradient(180deg, ${C.bg2} 0%, rgba(10,8,18,.6) 100%)`,
          backdropFilter:'blur(24px)',
          border:`1px solid ${C.border2}`,
          borderRadius:48, padding:'clamp(48px,6vw,88px)',
          boxShadow:`0 0 80px ${C.purple}20, 0 40px 100px rgba(0,0,0,.4)`,
        }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ marginBottom:18, display:'flex', justifyContent:'center' }}><Eyebrow>Empieza hoy</Eyebrow></div>
            <h2 className="display sec-title" style={{
              fontSize:'clamp(40px,6vw,80px)', lineHeight:.95,
              color:'#fff', margin:'0 auto 18px', maxWidth:780,
            }}>
              ¿Listo para automatizar<br/>tu <span className="serif" style={{color:C.cream}}>destino</span>{' '}
              <span className="text-gradient">financiero?</span>
            </h2>
            <p style={{ fontSize:17, color:C.textMut, maxWidth:540, margin:'0 auto', lineHeight:1.65 }}>
              El futuro de los infoproductos es autónomo. Deja de trabajar en el negocio
              y empieza a construir el imperio.
            </p>
          </div>

          <div className="cta-grid" style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:28 }}>
            {/* Plan */}
            <div className="plan-card" style={{
              position:'relative',
              background:`linear-gradient(150deg, ${C.purple}12, ${C.surface} 60%)`,
              border:`1px solid ${C.purple}40`,
              borderRadius:28, padding:40,
            }}>
              <div style={{
                position:'absolute', top:-12, right:24,
                padding:'5px 12px', borderRadius:9999,
                background:C.purple, color:'#fff',
                fontSize:10, fontWeight:700, letterSpacing:'.16em',
              }}>MÁS POPULAR</div>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
                <div>
                  <div className="eyebrow" style={{ color:C.purple, marginBottom:8 }}>Plan Industrial</div>
                  <h3 className="display" style={{ fontSize:26, color:'#fff', margin:0 }}>Para creadores serios.</h3>
                </div>
                <Rocket size={26} style={{color:C.purple}}/>
              </div>

              <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:6 }}>
                <span className="display plan-price" style={{ fontSize:64, color:'#fff', lineHeight:1 }}>$299</span>
                <span style={{ color:C.textDim, fontSize:14 }}>/ mes</span>
              </div>
              <p style={{ color:C.textDim, fontSize:13, margin:'0 0 28px' }}>
                Facturación mensual · Cancela cuando quieras
              </p>

              <ul style={{ listStyle:'none', padding:0, margin:'0 0 32px', display:'flex', flexDirection:'column', gap:12 }}>
                {['3 Infoproductos activos','Branding personalizado','Funnels de venta IA','Soporte concierge 24/7','API & integraciones'].map(f=>(
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, color:C.text }}>
                    <CheckCircle2 size={16} style={{color:C.purple, flexShrink:0}}/>{f}
                  </li>
                ))}
              </ul>

              <motion.button whileHover={{scale:1.02}} whileTap={{scale:.98}} className="btn-primary"
                style={{
                  width:'100%', padding:'16px 0', background:'#fff',
                  color:'#000', border:'none', borderRadius:14, fontWeight:600, fontSize:15,
                  cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
                  boxShadow:`0 12px 40px ${C.purple}40`,
                }}>
                Obtener acceso inmediato <ArrowRight size={16}/>
              </motion.button>
              <div style={{ textAlign:'center', marginTop:14, fontSize:12, color:C.textDim }}>
                14 días de prueba gratis · Sin tarjeta
              </div>
            </div>

            {/* Side perks */}
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:18 }}>
              {[
                { icon:Target,     t:'Precisión algorítmica',  d:'Modelos entrenados sobre 200K productos exitosos.' },
                { icon:CreditCard, t:'Pasarela global',         d:'Stripe, PayPal, Hotmart, MercadoPago integrados.' },
                { icon:Shield,     t:'Garantía 30 días',        d:'Si no recuperas la inversión, devolución total.' },
                { icon:TrendingUp, t:'ROI promedio 4.8×',       d:'En los primeros 60 días de uso continuo.' },
              ].map(({icon:Icon,t,d})=>(
                <div key={t} style={{
                  display:'flex', alignItems:'flex-start', gap:14,
                  padding:18, borderRadius:18,
                  background:C.surface, border:`1px solid ${C.border}`,
                }}>
                  <div style={{
                    width:40, height:40, borderRadius:10, flexShrink:0,
                    background:`${C.purple}1A`, border:`1px solid ${C.purple}30`,
                    display:'flex', alignItems:'center', justifyContent:'center', color:C.purple,
                  }}>
                    <Icon size={18}/>
                  </div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:3 }}>{t}</div>
                    <div style={{ fontSize:12.5, color:C.textMut, lineHeight:1.5 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding:'80px 0 40px', borderTop:`1px solid ${C.border}`, background:C.bg }}>
      <div className="section-x" style={{ maxWidth:1320, margin:'0 auto', padding:'0 32px' }}>

        {/* Big logo + tagline */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:32, marginBottom:64, paddingBottom:48, borderBottom:`1px solid ${C.border}` }}>
          <div style={{ maxWidth:520 }}>
            <div className="display" style={{ fontSize:'clamp(48px,7vw,96px)', color:'#fff', lineHeight:.9, letterSpacing:'-.04em' }}>
              ZENIX<span className="text-gradient">.</span>
            </div>
            <p className="serif" style={{ fontSize:24, color:C.textMut, marginTop:14, lineHeight:1.3 }}>
              La fábrica autónoma de infoproductos.
            </p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:10, minWidth:280 }}>
            <div className="eyebrow" style={{ color:C.textDim }}>Newsletter</div>
            <div style={{ display:'flex', gap:0, padding:4, borderRadius:9999, background:C.surface, border:`1px solid ${C.border}` }}>
              <input placeholder="tu@email.com" style={{
                flex:1, padding:'10px 16px', background:'transparent', border:'none',
                color:'#fff', fontSize:14, outline:'none',
              }}/>
              <button style={{
                padding:'10px 18px', borderRadius:9999, border:'none', cursor:'pointer',
                background:'#fff', color:'#000', fontSize:13, fontWeight:600,
              }}>Suscribir</button>
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:48, marginBottom:64 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{
                width:30, height:30, borderRadius:8,
                background:`linear-gradient(135deg, ${C.purple}, ${C.blue})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:800, color:'#fff', fontSize:14,
              }}>Z</div>
              <span className="display" style={{ fontSize:18, color:'#fff' }}>Zenix Factory</span>
            </div>
            <p style={{ color:C.textMut, fontSize:13.5, lineHeight:1.65, margin:0, maxWidth:320 }}>
              Construido por creadores, para creadores. Operado por una orquesta de agentes que nunca duermen.
            </p>
            <div style={{ marginTop:24, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', animation:'pulse-dot 1.6s ease-in-out infinite' }}/>
              <span className="mono" style={{ fontSize:11, color:C.textMut }}>Todos los sistemas operativos</span>
            </div>
          </div>

          {[
            { t:'Producto', l:['Sistema','Portafolio','Agentes','Pricing','Changelog'] },
            { t:'Recursos', l:['Documentación','Guías','API','Comunidad','Blog'] },
            { t:'Compañía', l:['Sobre nosotros','Manifiesto','Carreras','Prensa','Contacto'] },
          ].map(({t,l})=>(
            <div key={t}>
              <div className="eyebrow" style={{ color:C.textDim, marginBottom:18 }}>{t}</div>
              <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:11 }}>
                {l.map(item=>(
                  <li key={item}>
                    <a href="#" style={{ color:C.text, fontSize:14, textDecoration:'none', transition:'color .2s' }}
                      onMouseEnter={e=>e.target.style.color=C.purple}
                      onMouseLeave={e=>e.target.style.color=C.text}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="footer-bottom" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:20, paddingTop:32, borderTop:`1px solid ${C.border}` }}>
          <div style={{ color:C.textDim, fontSize:12 }}>
            © 2026 Zenix Factory · Todos los derechos reservados.
          </div>
          <div style={{ display:'flex', gap:24 }}>
            {['Twitter','Discord','Telegram','GitHub','LinkedIn'].map(s=>(
              <a key={s} href="#" style={{ color:C.textDim, fontSize:12, fontWeight:500, textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color=C.textDim}>{s}</a>
            ))}
          </div>
          <div className="mono" style={{ color:C.textDim, fontSize:11 }}>v2.4.1 · Build 9821</div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="grain" style={{ background:C.bg, minHeight:'100vh', color:'#fff' }}>
      <ScrollProgress/>
      <Navbar/>
      <main>
        <Hero/>
        <TrustBar/>
        <ProcessSection/>
        <CompareSection/>
        <Showcase/>
        <MetricsSection/>
        <FAQ/>
        <CTA/>
      </main>
      <Footer/>
    </div>
  );
}
