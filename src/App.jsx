import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Cpu, Globe, TrendingUp, Layout, Search,
  ArrowRight, Layers, Code, Compass, CheckCircle2,
  Menu, X, CreditCard, Target
} from 'lucide-react';

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  purple: '#8A55F7',
  blue:   '#38BDF8',
  black:  '#000000',
  gray:   '#0a0a0a',
  card:   'rgba(255,255,255,0.04)',
  border: 'rgba(255,255,255,0.08)',
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      padding: scrolled ? '16px 0' : '32px 0',
      background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
      transition: 'all .3s ease',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        {/* Logo */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{
            width:40, height:40, borderRadius:12,
            background:`linear-gradient(135deg, ${C.purple}, ${C.blue})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontWeight:900, fontSize:20, color:'#fff',
            boxShadow:`0 0 20px ${C.purple}60`,
          }}>Z</div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:26, letterSpacing:'-1px', textTransform:'uppercase', fontStyle:'italic', color:'#fff' }}>
            Zenix
          </span>
        </motion.div>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:32 }} className="hidden-mobile">
          {['Sistema','Portafolio','Precios'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color:'rgba(255,255,255,0.5)', fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color=C.purple}
              onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.5)'}
            >{l}</a>
          ))}
          <motion.button
            whileHover={{scale:1.05}} whileTap={{scale:0.95}}
            onClick={() => document.getElementById('precios')?.scrollIntoView({behavior:'smooth'})}
            style={{
              padding:'12px 28px', borderRadius:9999, border:'none', cursor:'pointer',
              background:'#fff', color:'#000', fontWeight:900, fontSize:13,
              letterSpacing:'0.05em', textTransform:'uppercase', transition:'all .3s',
            }}
            onMouseEnter={e=>{ e.target.style.background=C.purple; e.target.style.color='#fff'; }}
            onMouseLeave={e=>{ e.target.style.background='#fff'; e.target.style.color='#000'; }}
          >
            Encender Máquina
          </motion.button>
        </div>

        {/* Hamburger */}
        <button onClick={()=>setOpen(!open)} style={{ background:'none', border:'none', color:'#fff', cursor:'pointer', display:'none' }} className="show-mobile">
          {open ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            style={{ position:'absolute', top:'100%', left:0, right:0, background:'rgba(0,0,0,0.95)', backdropFilter:'blur(20px)', padding:40, display:'flex', flexDirection:'column', alignItems:'center', gap:32 }}>
            {['Sistema','Portafolio','Precios'].map(l=>(
              <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setOpen(false)}
                style={{ color:'#fff', fontSize:24, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', textDecoration:'none' }}>{l}</a>
            ))}
            <button style={{ width:'100%', padding:'20px 0', background:C.purple, color:'#fff', border:'none', borderRadius:20, fontSize:18, fontWeight:900, cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.05em' }}>
              Empezar Ahora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position:'relative', paddingTop:160, paddingBottom:80, overflow:'hidden', background:C.black }}>
      {/* Glow BG */}
      <div style={{
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
        width:900, height:900, pointerEvents:'none', zIndex:0,
        background:`radial-gradient(circle at center, ${C.purple}25 0%, transparent 70%)`,
      }}/>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', textAlign:'center', position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
          {/* Badge */}
          <span style={{
            display:'inline-block', padding:'8px 18px', borderRadius:9999,
            border:`1px solid ${C.purple}50`,
            background:`${C.purple}18`,
            color:C.purple, fontSize:11, fontWeight:700, letterSpacing:'0.2em',
            textTransform:'uppercase', marginBottom:28,
          }}>
            Inteligencia Artificial Progresiva
          </span>

          {/* Headline */}
          <h1 style={{
            fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'clamp(48px,8vw,96px)',
            lineHeight:.95, letterSpacing:'-3px', textTransform:'uppercase',
            color:'#fff', marginBottom:28, marginTop:0,
          }}>
            La Máquina de<br/>
            <span className="text-gradient">Dinero Automatizada</span>
          </h1>

          <p style={{ maxWidth:640, margin:'0 auto', fontSize:18, color:'rgba(255,255,255,0.45)', lineHeight:1.7, marginBottom:48 }}>
            Transforma cualquier conocimiento en una factoría rentable de infoproductos.
            Investigación, creación, branding y ventas. Todo lo hace{' '}
            <strong style={{ color:'#fff', fontStyle:'italic' }}>ZENIX</strong> por ti.
          </p>

          {/* CTAs */}
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <motion.button whileHover={{scale:1.05}} whileTap={{scale:.95}} style={{
              padding:'18px 40px', borderRadius:9999, border:'none', cursor:'pointer',
              background:C.purple, color:'#fff', fontWeight:900, fontSize:17,
              display:'flex', alignItems:'center', gap:12,
              boxShadow:`0 0 40px ${C.purple}60`, fontStyle:'italic', letterSpacing:'-0.5px',
            }}>
              Lanzar Mi Primer Producto <ArrowRight size={20}/>
            </motion.button>
            <button style={{
              padding:'18px 40px', borderRadius:9999, cursor:'pointer',
              background:'transparent', color:'rgba(255,255,255,0.6)',
              border:'1px solid rgba(255,255,255,0.15)', fontWeight:600, fontSize:16,
              transition:'all .2s',
            }}
            onMouseEnter={e=>e.target.style.borderColor='rgba(255,255,255,0.4)'}
            onMouseLeave={e=>e.target.style.borderColor='rgba(255,255,255,0.15)'}
            >
              Ver Demo Interactiva
            </button>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:.5,duration:.8}}
          style={{ marginTop:80, position:'relative', maxWidth:900, margin:'80px auto 0' }}>
          <div style={{
            aspectRatio:'16/9', borderRadius:32, overflow:'hidden',
            background:'rgba(138,85,247,0.06)',
            border:`1px solid ${C.purple}30`,
            boxShadow:`0 0 100px ${C.purple}20, 0 40px 80px rgba(0,0,0,0.5)`,
            display:'flex', alignItems:'center', justifyContent:'center', position:'relative',
          }}>
            {/* Grid lines */}
            <div style={{
              position:'absolute', inset:0,
              backgroundImage:`linear-gradient(${C.purple}08 1px, transparent 1px), linear-gradient(90deg, ${C.purple}08 1px, transparent 1px)`,
              backgroundSize:'40px 40px',
            }}/>
            {/* Center icon */}
            <div style={{ zIndex:1, color:`${C.purple}80`, animation:'float 6s ease-in-out infinite' }}>
              <Cpu size={120} strokeWidth={.6}/>
            </div>
            {/* Floating data pills */}
            {[
              { label:'Productos creados', value:'1,247', top:'15%', left:'8%' },
              { label:'Ingresos generados', value:'$84k', top:'15%', right:'8%' },
              { label:'Conversión promedio', value:'12.4%', bottom:'18%', left:'8%' },
              { label:'Nichos activos', value:'38', bottom:'18%', right:'8%' },
            ].map((p,i)=>(
              <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1+i*.2}}
                style={{
                  position:'absolute', ...(p.top?{top:p.top}:{}), ...(p.bottom?{bottom:p.bottom}:{}),
                  ...(p.left?{left:p.left}:{}), ...(p.right?{right:p.right}:{}),
                  background:'rgba(0,0,0,0.7)', backdropFilter:'blur(12px)',
                  border:`1px solid ${C.border}`, borderRadius:16, padding:'12px 20px',
                  minWidth:130,
                }}>
                <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:4 }}>{p.label}</div>
                <div style={{ fontSize:22, color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:800 }}>{p.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────
const STEPS = [
  { icon:Search,     title:'Investigación',       desc:'Identifica nichos de alta rentabilidad y problemas críticos con data en tiempo real.' },
  { icon:Code,       title:'Creación de Producto', desc:'Genera cursos, ebooks y materiales educativos completos con IA de última generación.' },
  { icon:Compass,    title:'Branding Elite',       desc:'Construye identidad visual y de voz que garantiza el posicionamiento premium de tu marca.' },
  { icon:Layout,     title:'Activos de Venta',     desc:'Copy de alta conversión, landings optimizadas y funnels psicológicamente diseñados.' },
  { icon:Zap,        title:'Tráfico & Distribución',desc:'Distribución multicanal automatizada para captar leads de forma orgánica y pagada.' },
  { icon:TrendingUp, title:'Escalabilidad Infinita',desc:'Análisis de métricas y replicabilidad en nuevos nichos para crear un imperio digital.' },
];

function ProcessCard({ icon:Icon, title, desc, n, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay,duration:.5}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        padding:36, borderRadius:28,
        background: hov ? `${C.purple}12` : C.card,
        border:`1px solid ${hov ? C.purple+'60' : C.border}`,
        boxShadow: hov ? `0 0 40px ${C.purple}15` : 'none',
        transition:'all .4s ease', cursor:'default',
      }}>
      <div style={{
        width:52, height:52, borderRadius:14, marginBottom:24,
        background:`linear-gradient(135deg, ${C.purple}, ${C.blue})`,
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'#fff', transform: hov?'scale(1.1)':'scale(1)', transition:'transform .3s',
        boxShadow:`0 4px 20px ${C.purple}40`,
      }}>
        <Icon size={24}/>
      </div>
      <div style={{ fontSize:11, color:`${C.purple}`, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:8, opacity:.7 }}>
        ETAPA 0{n}
      </div>
      <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:22, textTransform:'uppercase', letterSpacing:'-0.5px', color:'#fff', margin:'0 0 12px' }}>
        {title}
      </h3>
      <p style={{ color:'rgba(255,255,255,0.4)', lineHeight:1.7, fontSize:15, margin:0, transition:'color .3s', ...(hov?{color:'rgba(255,255,255,0.65)'}:{}) }}>
        {desc}
      </p>
    </motion.div>
  );
}

function ProcessSection() {
  return (
    <section id="sistema" style={{ padding:'120px 0', background:C.black }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:80, gap:32, flexWrap:'wrap' }}>
          <div style={{ maxWidth:580 }}>
            <h2 style={{
              fontFamily:'Syne,sans-serif', fontWeight:900,
              fontSize:'clamp(40px,6vw,72px)', lineHeight:.95,
              textTransform:'uppercase', letterSpacing:'-2px', color:'#fff', margin:'0 0 20px',
            }}>
              El Motor del<br/>
              <em style={{ color:C.purple }}>Crecimiento Digital</em>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:16, lineHeight:1.7, margin:0 }}>
              No es una herramienta, es un ecosistema autónomo que ejecuta por ti las 24 horas del día.
            </p>
          </div>
          <div style={{ color:'rgba(255,255,255,0.15)', fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:8 }}>
            ALGORITMOS DE ALTA FRECUENCIA <Zap size={14} style={{color:C.purple}}/> EFICIENCIA MÁXIMA
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:24 }}>
          {STEPS.map((s,i)=><ProcessCard key={i} {...s} n={i+1} delay={i*.1}/>)}
        </div>
      </div>
    </section>
  );
}

// ─── Showcase ────────────────────────────────────────────────────────────────
function ShowCard({ label, name, sub, accentColor, dark, FloatIcon }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ borderRadius:40, overflow:'hidden', aspectRatio:'4/3', position:'relative', cursor:'pointer', border:`1px solid ${C.border}` }}>
      {/* BG */}
      <div style={{
        position:'absolute', inset:0,
        background: dark
          ? `radial-gradient(ellipse at 60% 40%, ${C.purple}20 0%, #05020f 70%)`
          : 'linear-gradient(135deg, #F6F1EB 60%, #E8DFD2)',
        transition:'transform .6s ease',
        transform: hov ? 'scale(1.04)' : 'scale(1)',
      }}/>
      {/* Float icon */}
      <div style={{
        position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
        color: dark ? `${C.purple}30` : `${accentColor}15`,
        transform: hov ? 'scale(1.1)' : 'scale(1)', transition:'transform .6s ease',
      }}>
        <FloatIcon size={280} strokeWidth={.15}/>
      </div>
      {/* Overlay on hover */}
      <div style={{
        position:'absolute', inset:0,
        background: `linear-gradient(to top, ${dark?C.purple+'80':'#00000090'} 0%, transparent 60%)`,
        opacity: hov ? 1 : 0, transition:'opacity .4s',
      }}/>
      {/* Text always shown gradient bottom */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
      }}/>
      {/* Content */}
      <div style={{ position:'absolute', bottom:40, left:40, right:40, zIndex:2 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.25em', textTransform:'uppercase', color:accentColor, display:'block', marginBottom:8 }}>{label}</span>
            <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:36, textTransform:'uppercase', letterSpacing:'-1px', color:'#fff', margin:0 }}>{name}</h3>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:12, fontWeight:600, letterSpacing:'0.15em', textTransform:'uppercase', fontStyle:'italic', marginTop:8, marginBottom:0 }}>{sub}</p>
          </div>
          <div style={{
            width:52, height:52, borderRadius:'50%', background:'#fff',
            display:'flex', alignItems:'center', justifyContent:'center',
            opacity: hov ? 1 : 0, transform: hov ? 'rotate(0deg)' : 'rotate(-45deg)',
            transition:'all .4s',
          }}>
            <ArrowRight size={22} style={{color:'#000'}}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function Showcase() {
  return (
    <section id="portafolio" style={{ padding:'120px 0', background:C.gray }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
        <div style={{ textAlign:'center', marginBottom:72 }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'clamp(36px,5vw,64px)', textTransform:'uppercase', letterSpacing:'-2px', margin:'0 0 16px', color:'#fff' }}>
            Éxitos de la <span className="text-gradient">Fábrica</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.35)', maxWidth:500, margin:'0 auto', fontSize:16 }}>
            Productos reales lanzados y escalados por los agentes de ZENIX en menos de 48 horas.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(380px,1fr))', gap:32 }}>
          <ShowCard label="Opción A" name="Neural Academy" sub="Cosmos Digital · Conocimiento como energía" accentColor={C.purple} dark FloatIcon={Globe}/>
          <ShowCard label="Opción B" name="Paper & Ink" sub="Editorial Clásica · Sabiduría Atemporal" accentColor="#8B6914" dark={false} FloatIcon={Layers}/>
        </div>
      </div>
    </section>
  );
}

// ─── CTA / Pricing ───────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="precios" style={{ padding:'140px 0', background:C.black, position:'relative', overflow:'hidden' }}>
      {/* Glow orb */}
      <div style={{
        position:'absolute', bottom:'-30%', right:'-10%', width:800, height:800, borderRadius:'50%',
        background:`radial-gradient(circle, ${C.purple}15, transparent 70%)`, pointerEvents:'none',
      }}/>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>
        <div style={{
          background:C.card, backdropFilter:'blur(24px)',
          border:`1px solid ${C.border}`,
          borderRadius:60, padding:'clamp(48px,6vw,96px)',
          textAlign:'center',
          boxShadow:`0 0 80px ${C.purple}10`,
        }}>
          <motion.div initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}>
            <h2 style={{
              fontFamily:'Syne,sans-serif', fontWeight:900,
              fontSize:'clamp(36px,6vw,72px)', lineHeight:.95,
              textTransform:'uppercase', letterSpacing:'-2px',
              color:'#fff', margin:'0 0 24px',
            }}>
              ¿Listo para <em style={{color:C.purple}}>Automatizar</em><br/>tu destino financiero?
            </h2>
            <p style={{ fontSize:18, color:'rgba(255,255,255,0.4)', maxWidth:580, margin:'0 auto 56px', lineHeight:1.7 }}>
              El futuro de los infoproductos es autónomo. Deja de trabajar en el negocio y empieza a construir el imperio.
            </p>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:32, textAlign:'left' }}>
              {/* Plan card */}
              <div style={{
                background:'rgba(138,85,247,0.08)', border:`1px solid ${C.purple}40`,
                borderLeft:`4px solid ${C.purple}`, borderRadius:28, padding:36,
              }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:C.purple, marginBottom:16 }}>Plan Industrial</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:28 }}>
                  <span style={{ fontSize:52, fontWeight:900, fontStyle:'italic', color:'#fff', fontFamily:'Syne,sans-serif' }}>$299</span>
                  <span style={{ color:'rgba(255,255,255,0.3)', fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em' }}>/ Mes</span>
                </div>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 32px', display:'flex', flexDirection:'column', gap:14 }}>
                  {['3 Infoproductos Activos','Branding Personalizado','Funnels de Venta IA','Soporte Concierge 24/7'].map(f=>(
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, fontWeight:600, color:'rgba(255,255,255,0.8)' }}>
                      <CheckCircle2 size={18} style={{color:C.purple, flexShrink:0}}/>{f}
                    </li>
                  ))}
                </ul>
                <motion.button whileHover={{scale:1.03}} whileTap={{scale:.97}} style={{
                  width:'100%', padding:'16px 0', background:C.purple,
                  color:'#fff', border:'none', borderRadius:18, fontWeight:900, fontSize:15,
                  cursor:'pointer', textTransform:'uppercase', letterSpacing:'0.05em',
                  boxShadow:`0 8px 32px ${C.purple}50`,
                }}>
                  Obtener Acceso Inmediato
                </motion.button>
              </div>

              {/* Features column */}
              <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:28 }}>
                <div>
                  <h4 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:26, textTransform:'uppercase', letterSpacing:'-0.5px', color:'#fff', margin:'0 0 8px' }}>Máximo Escalamiento</h4>
                  <p style={{ color:'rgba(255,255,255,0.35)', fontSize:14, fontStyle:'italic', margin:0, lineHeight:1.6 }}>Para emprendedores seriales que buscan dominar múltiples nichos simultáneamente.</p>
                </div>
                {[
                  { icon:Target, label:'Precisión Algorítmica' },
                  { icon:CreditCard, label:'Pasarela de Pagos Global' },
                  { icon:TrendingUp, label:'ROI Garantizado en 30 días' },
                ].map(({icon:Icon,label})=>(
                  <div key={label} style={{ display:'flex', alignItems:'center', gap:16 }}>
                    <div style={{
                      width:48, height:48, borderRadius:'50%',
                      background:C.card, border:`1px solid ${C.border}`,
                      display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0,
                    }}>
                      <Icon size={20}/>
                    </div>
                    <span style={{ fontWeight:700, fontSize:14, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.7)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding:'60px 0', borderTop:`1px solid ${C.border}`, background:C.black }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:24 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:`${C.purple}30`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color:'#fff', fontSize:16 }}>Z</div>
          <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:20, letterSpacing:'-0.5px', textTransform:'uppercase', fontStyle:'italic', color:'#fff' }}>Zenix</span>
        </div>
        <div style={{ display:'flex', gap:32 }}>
          {['Twitter','Discord','Telegram'].map(s=>(
            <a key={s} href="#" style={{ color:'rgba(255,255,255,0.25)', fontSize:11, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='#fff'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.25)'}>{s}</a>
          ))}
        </div>
        <div style={{ color:'rgba(255,255,255,0.15)', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.15em' }}>
          © 2026 Zenix Factory
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background:C.black, minHeight:'100vh', color:'#fff' }}>
      <Navbar/>
      <main>
        <Hero/>
        <ProcessSection/>
        <Showcase/>
        <CTA/>
      </main>
      <Footer/>
    </div>
  );
}
