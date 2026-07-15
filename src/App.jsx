import { useState } from "react";

const BRAND = "¿Eres Narcisista?";
const COACH = "Test Narcisista";
const PROGRAM = "Test Narcisista";

const preguntas = [
  {
    id: 1,
    texto: "¿Crees que mereces un trato especial en la mayoría de situaciones?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 2,
    texto: "¿Te cuesta admitir errores frente a otras personas?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 3,
    texto: "¿Sientes que las reglas generales no deberían aplicar a ti?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 4,
    texto: "¿Disfrutas cuando los demás reconocen tus logros públicamente?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 5,
    texto: "¿Te resulta difícil empatizar con el dolor ajeno?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 6,
    texto: "¿Piensas que la mayoría de personas no están a tu nivel intelectual?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 7,
    texto: "¿Usas relaciones personales para obtener beneficios?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 8,
    texto: "¿Reaccionas con enojo o frialdad ante críticas, aunque sean constructivas?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 9,
    texto: "¿Fantaseas con el éxito ilimitado, el poder o la admiración?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
  {
    id: 10,
    texto: "¿Sueles dominar las conversaciones hablando principalmente de ti?",
    opciones: ["Nunca", "A veces", "Frecuentemente", "Siempre"],
  },
];

const getResultado = (puntuacion) => {
  if (puntuacion <= 10) {
    return {
      nivel: "Bajo",
      titulo: "Sin rasgos narcisistas significativos",
      emoji: "🌱",
      color: "#4CAF50",
      descripcion:
        "Tus respuestas indican que tienes una autoestima saludable y equilibrada. Muestras empatía hacia los demás y reconoces tus limitaciones. Esto es una señal positiva de madurez emocional.",
      consejo:
        "¡Felicidades! Sigue cultivando tus relaciones con honestidad y empatía. Considera aprender más sobre inteligencia emocional para continuar creciendo.",
      cta: "Descubre cómo mantener relaciones sanas",
    };
  } else if (puntuacion <= 20) {
    return {
      nivel: "Moderado",
      titulo: "Algunos rasgos narcisistas presentes",
      emoji: "⚠️",
      color: "#FF9800",
      descripcion:
        "Muestras ciertos rasgos narcisistas que pueden estar afectando tus relaciones personales y profesionales. Esto no significa que seas un narcisista clínico, pero hay patrones que vale la pena explorar.",
      consejo:
        "Trabajar con un profesional puede ayudarte a identificar estos patrones y desarrollar estrategias para relacionarte de manera más sana y auténtica.",
      cta: "Comienza tu proceso de autoconocimiento",
    };
  } else {
    return {
      nivel: "Alto",
      titulo: "Rasgos narcisistas prominentes",
      emoji: "🔴",
      color: "#F44336",
      descripcion:
        "Tus respuestas sugieren la presencia de rasgos narcisistas significativos que probablemente están generando conflictos en tus relaciones. El narcisismo no tratado puede causar un daño profundo en ti y en quienes te rodean.",
      consejo:
        "Te recomendamos buscar apoyo profesional especializado. Reconocer estos patrones es el primer paso hacia una vida más plena y relaciones más auténticas.",
      cta: "Busca apoyo profesional ahora",
    };
  }
};

const testimonios = [
  {
    nombre: "Lucía M.",
    texto:
      "Este test me abrió los ojos. Nunca me había dado cuenta de cómo mis comportamientos afectaban a las personas que quiero.",
    estrella: 5,
  },
  {
    nombre: "Carlos R.",
    texto:
      "Pensaba que mi expareja era la narcisista, pero el test me mostró que yo también tenía cosas que trabajar. Muy revelador.",
    estrella: 5,
  },
  {
    nombre: "Sofía P.",
    texto:
      "Claro, directo y honesto. Me dio claridad sobre patrones que no quería ver. Gracias por esta herramienta.",
    estrella: 5,
  },
];

const faqs = [
  {
    pregunta: "¿Este test es un diagnóstico clínico?",
    respuesta:
      "No. Este test es una herramienta de autoconocimiento basada en rasgos del Trastorno Narcisista de la Personalidad descritos en el DSM-5. No reemplaza el diagnóstico de un profesional de la salud mental.",
  },
  {
    pregunta: "¿Mis respuestas son confidenciales?",
    respuesta:
      "Sí. Tus respuestas son anónimas y no se almacenan en ningún servidor. El cálculo se realiza completamente en tu dispositivo.",
  },
  {
    pregunta: "¿Qué hago si mi resultado es alto?",
    respuesta:
      "El primer paso es reconocerlo, que es lo más difícil y lo que ya hiciste. Te recomendamos buscar apoyo de un psicólogo o terapeuta especializado en personalidad.",
  },
  {
    pregunta: "¿Sirve para identificar a alguien narcisista en mi vida?",
    respuesta:
      "Puedes compartir el test con otras personas, pero recuerda que solo un profesional puede emitir un diagnóstico. Úsalo como punto de partida para una conversación, no como una condena.",
  },
];

export default function App() {
  const [pantalla, setPantalla] = useState("inicio"); // inicio | quiz | resultado
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [puntuacion, setPuntuacion] = useState(0);
  const [faqAbierta, setFaqAbierta] = useState(null);
  const [animando, setAnimando] = useState(false);
  const [email, setEmail] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  const styles = {
    app: {
      fontFamily: "'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minHeight: "100vh",
      background: "#faf9f7",
      color: "#313131",
    },

    // NAVBAR
    nav: {
      background: "#fff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      padding: "0 1.5rem",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    navInner: {
      maxWidth: "900px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "64px",
    },
    navLogo: {
      fontWeight: 800,
      fontSize: "1.15rem",
      color: "#7c3aed",
      letterSpacing: "-0.5px",
      cursor: "pointer",
    },
    navCta: {
      background: "#7c3aed",
      color: "#fff",
      border: "none",
      borderRadius: "24px",
      padding: "0.5rem 1.2rem",
      fontSize: "0.85rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "background 0.2s",
    },

    // HERO
    hero: {
      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
      padding: "4rem 1.5rem 5rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    heroBadge: {
      display: "inline-block",
      background: "rgba(255,255,255,0.2)",
      color: "#fff",
      borderRadius: "24px",
      padding: "0.3rem 1rem",
      fontSize: "0.8rem",
      fontWeight: 600,
      marginBottom: "1.2rem",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.3)",
    },
    heroTitle: {
      fontSize: "clamp(2rem, 6vw, 3.2rem)",
      fontWeight: 900,
      color: "#fff",
      lineHeight: 1.15,
      marginBottom: "1.2rem",
      letterSpacing: "-1px",
    },
    heroSubtitle: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      color: "rgba(255,255,255,0.9)",
      marginBottom: "2rem",
      lineHeight: 1.6,
      maxWidth: "600px",
      margin: "0 auto 2rem",
    },
    heroBtn: {
      background: "#fff",
      color: "#7c3aed",
      border: "none",
      borderRadius: "50px",
      padding: "1rem 2.5rem",
      fontSize: "1.1rem",
      fontWeight: 800,
      cursor: "pointer",
      boxShadow: "0 8px 32px rgba(124,58,237,0.3)",
      transition: "transform 0.2s, box-shadow 0.2s",
      display: "inline-block",
      marginBottom: "1.5rem",
    },
    heroBtnSecundario: {
      background: "transparent",
      color: "rgba(255,255,255,0.85)",
      border: "none",
      fontSize: "0.9rem",
      cursor: "pointer",
      display: "block",
      margin: "0 auto",
    },
    heroStats: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      flexWrap: "wrap",
      marginTop: "2.5rem",
    },
    heroStat: {
      color: "#fff",
      textAlign: "center",
    },
    heroStatNum: {
      fontSize: "1.8rem",
      fontWeight: 900,
      display: "block",
    },
    heroStatLabel: {
      fontSize: "0.78rem",
      opacity: 0.8,
    },

    // SECCIONES
    section: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "4rem 1.5rem",
    },
    sectionTitle: {
      fontSize: "clamp(1.5rem, 4vw, 2rem)",
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: "0.5rem",
      lineHeight: 1.2,
    },
    sectionSubtitle: {
      color: "#666",
      fontSize: "1rem",
      marginBottom: "2.5rem",
      lineHeight: 1.6,
    },
    badge: {
      display: "inline-block",
      background: "#ede9fe",
      color: "#7c3aed",
      borderRadius: "20px",
      padding: "0.25rem 0.8rem",
      fontSize: "0.78rem",
      fontWeight: 700,
      marginBottom: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },

    // RASGOS
    rasgosGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1rem",
    },
    rasgoCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      border: "1px solid #f0ece8",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    rasgoEmoji: {
      fontSize: "1.8rem",
      marginBottom: "0.75rem",
      display: "block",
    },
    rasgoTitulo: {
      fontWeight: 700,
      fontSize: "0.95rem",
      color: "#1a1a2e",
      marginBottom: "0.4rem",
    },
    rasgoTexto: {
      fontSize: "0.85rem",
      color: "#666",
      lineHeight: 1.5,
    },

    // QUIZ
    quizContainer: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf9f7 0%, #f3f0ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem",
    },
    quizCard: {
      background: "#fff",
      borderRadius: "24px",
      boxShadow: "0 8px 40px rgba(124,58,237,0.12)",
      padding: "2.5rem",
      maxWidth: "600px",
      width: "100%",
    },
    progressBar: {
      background: "#ede9fe",
      borderRadius: "8px",
      height: "8px",
      marginBottom: "2rem",
      overflow: "hidden",
    },
    progressFill: {
      background: "linear-gradient(90deg, #7c3aed, #a855f7)",
      height: "100%",
      borderRadius: "8px",
      transition: "width 0.4s ease",
    },
    quizCounter: {
      fontSize: "0.8rem",
      color: "#9b87bf",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
    quizPregunta: {
      fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
      fontWeight: 700,
      color: "#1a1a2e",
      lineHeight: 1.4,
      marginBottom: "2rem",
    },
    opcionBtn: {
      display: "block",
      width: "100%",
      background: "#faf9f7",
      border: "2px solid #e8e4f0",
      borderRadius: "12px",
      padding: "1rem 1.2rem",
      fontSize: "0.95rem",
      fontWeight: 600,
      color: "#313131",
      cursor: "pointer",
      marginBottom: "0.75rem",
      textAlign: "left",
      transition: "all 0.2s",
    },
    opcionBtnHover: {
      background: "#ede9fe",
      borderColor: "#7c3aed",
      color: "#7c3aed",
    },

    // RESULTADO
    resultadoContainer: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #faf9f7 0%, #f3f0ff 100%)",
      padding: "2rem 1.5rem",
    },
    resultadoCard: {
      background: "#fff",
      borderRadius: "24px",
      boxShadow: "0 8px 40px rgba(124,58,237,0.12)",
      padding: "2.5rem",
      maxWidth: "650px",
      margin: "0 auto 2rem",
      textAlign: "center",
    },
    resultadoEmoji: {
      fontSize: "4rem",
      marginBottom: "1rem",
      display: "block",
    },
    resultadoNivel: {
      display: "inline-block",
      borderRadius: "24px",
      padding: "0.35rem 1.2rem",
      fontSize: "0.85rem",
      fontWeight: 700,
      marginBottom: "1rem",
    },
    resultadoTitulo: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "#1a1a2e",
      marginBottom: "1rem",
    },
    resultadoDescripcion: {
      color: "#555",
      lineHeight: 1.7,
      marginBottom: "1.5rem",
      fontSize: "0.95rem",
    },
    resultadoConsejo: {
      background: "#f3f0ff",
      borderRadius: "12px",
      padding: "1.2rem",
      color: "#5b21b6",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      marginBottom: "2rem",
      textAlign: "left",
      borderLeft: "4px solid #7c3aed",
    },
    scoreBar: {
      background: "#ede9fe",
      borderRadius: "12px",
      height: "14px",
      overflow: "hidden",
      marginBottom: "0.5rem",
    },
    scoreFill: {
      height: "100%",
      borderRadius: "12px",
      transition: "width 1s ease",
    },
    scoreLabel: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.8rem",
      color: "#888",
      marginBottom: "1.5rem",
    },

    // BOTONES GENERALES
    btnPrimario: {
      background: "linear-gradient(135deg, #7c3aed, #a855f7)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "0.9rem 2rem",
      fontSize: "1rem",
      fontWeight: 700,
      cursor: "pointer",
      width: "100%",
      transition: "opacity 0.2s, transform 0.2s",
      boxShadow: "0 4px 20px rgba(124,58,237,0.3)",
    },
    btnSecundario: {
      background: "transparent",
      color: "#7c3aed",
      border: "2px solid #7c3aed",
      borderRadius: "50px",
      padding: "0.85rem 2rem",
      fontSize: "0.95rem",
      fontWeight: 700,
      cursor: "pointer",
      width: "100%",
      marginTop: "0.75rem",
      transition: "all 0.2s",
    },

    // TESTIMONIOS
    testimonioGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "1.2rem",
    },
    testimonioCard: {
      background: "#fff",
      borderRadius: "16px",
      padding: "1.5rem",
      boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
      border: "1px solid #f0ece8",
    },
    testimonioEstrellas: {
      color: "#f59e0b",
      fontSize: "0.9rem",
      marginBottom: "0.75rem",
    },
    testimonioTexto: {
      color: "#444",
      fontSize: "0.9rem",
      lineHeight: 1.6,
      marginBottom: "1rem",
      fontStyle: "italic",
    },
    testimonioNombre: {
      fontWeight: 700,
      fontSize: "0.85rem",
      color: "#7c3aed",
    },

    // FAQ
    faqItem: {
      background: "#fff",
      borderRadius: "12px",
      marginBottom: "0.75rem",
      border: "1px solid #e8e4f0",
      overflow: "hidden",
    },
    faqPregunta: {
      padding: "1.2rem 1.5rem",
      fontWeight: 700,
      color: "#1a1a2e",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "0.95rem",
      transition: "background 0.2s",
    },
    faqRespuesta: {
      padding: "0 1.5rem 1.2rem",
      color: "#555",
      fontSize: "0.9rem",
      lineHeight: 1.7,
    },

    // EMAIL CAPTURE
    emailSection: {
      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
      padding: "4rem 1.5rem",
      textAlign: "center",
    },
    emailForm: {
      display: "flex",
      gap: "0.75rem",
      maxWidth: "480px",
      margin: "1.5rem auto 0",
      flexWrap: "wrap",
    },
    emailInput: {
      flex: 1,
      minWidth: "200px",
      padding: "0.9rem 1.2rem",
      borderRadius: "50px",
      border: "none",
      fontSize: "0.95rem",
      outline: "none",
      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    },
    emailBtn: {
      background: "#fff",
      color: "#7c3aed",
      border: "none",
      borderRadius: "50px",
      padding: "0.9rem 1.8rem",
      fontSize: "0.95rem",
      fontWeight: 700,
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "opacity 0.2s",
    },

    // FOOTER
    footer: {
      background: "#1a1a2e",
      color: "#aaa",
      textAlign: "center",
      padding: "2rem 1.5rem",
      fontSize: "0.82rem",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem",
      marginBottom: "1rem",
      flexWrap: "wrap",
    },
    footerLink: {
      color: "#888",
      cursor: "pointer",
      transition: "color 0.2s",
      textDecoration: "none",
    },

    // AVISO
    aviso: {
      background: "#fffbeb",
      border: "1px solid #fde68a",
      borderRadius: "12px",
      padding: "1rem 1.2rem",
      fontSize: "0.82rem",
      color: "#92400e",
      lineHeight: 1.6,
      maxWidth: "600px",
      margin: "0 auto 1.5rem",
      textAlign: "center",
    },
  };

  const rasgos = [
    {
      emoji: "👑",
      titulo: "Grandiosidad",
      texto: "Sentido exagerado de importancia propia y creencia de ser superior a los demás.",
    },
    {
      emoji: "🪞",
      titulo: "Falta de empatía",
      texto: "Dificultad para reconocer o identificarse con los sentimientos de otras personas.",
    },
    {
      emoji: "🧲",
      titulo: "Necesidad de admiración",
      texto: "Búsqueda constante de elogios y validación externa.",
    },
    {
      emoji: "🎭",
      titulo: "Fantasías de éxito",
      texto: "Pensamientos recurrentes sobre poder ilimitado, brillantez o amor ideal.",
    },
    {
      emoji: "⚡",
      titulo: "Explotación de relaciones",
      texto: "Tendencia a aprovecharse de otros para alcanzar metas propias.",
    },
    {
      emoji: "🛡️",
      titulo: "Sensibilidad a la crítica",
      texto: "Reacciones desproporcionadas ante la crítica, la vergüenza o el fracaso.",
    },
  ];

  const iniciarQuiz = () => {
    setPantalla("quiz");
    setPreguntaActual(0);
    setRespuestas([]);
    setPuntuacion(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const responder = (valor) => {
    if (animando) return;
    const nuevasRespuestas = [...respuestas, valor];
    setRespuestas(nuevasRespuestas);

    if (preguntaActual < preguntas.length - 1) {
      setAnimando(true);
      setTimeout(() => {
        setPreguntaActual(preguntaActual + 1);
        setAnimando(false);
      }, 200);
    } else {
      const total = nuevasRespuestas.reduce((sum, v) => sum + v, 0);
      setPuntuacion(total);
      setPantalla("resultado");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const reiniciar = () => {
    setPantalla("inicio");
    setPreguntaActual(0);
    setRespuestas([]);
    setPuntuacion(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resultado = getResultado(puntuacion);
  const porcentaje = Math.round((puntuacion / 30) * 100);

  if (pantalla === "quiz") {
    const p = preguntas[preguntaActual];
    const progreso = ((preguntaActual) / preguntas.length) * 100;

    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <span style={styles.navLogo} onClick={reiniciar}>{BRAND}</span>
            <button style={styles.navCta} onClick={reiniciar}>← Salir</button>
          </div>
        </nav>
        <div style={styles.quizContainer}>
          <div style={styles.quizCard}>
            <div style={styles.progressBar}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progreso}%`,
                }}
              />
            </div>
            <div style={styles.quizCounter}>
              Pregunta {preguntaActual + 1} de {preguntas.length}
            </div>
            <div
              style={{
                ...styles.quizPregunta,
                opacity: animando ? 0 : 1,
                transform: animando ? "translateY(8px)" : "translateY(0)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
            >
              {p.texto}
            </div>
            <div style={{ opacity: animando ? 0 : 1, transition: "opacity 0.2s" }}>
              {p.opciones.map((opcion, idx) => (
                <OpcionBoton
                  key={idx}
                  texto={opcion}
                  valor={idx}
                  onClick={responder}
                  styles={styles}
                />
              ))}
            </div>
            <div
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                fontSize: "0.78rem",
                color: "#bbb",
              }}
            >
              Tus respuestas son completamente anónimas
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pantalla === "resultado") {
    return (
      <div style={styles.app}>
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <span style={styles.navLogo} onClick={reiniciar}>{BRAND}</span>
            <button style={styles.navCta} onClick={reiniciar}>Repetir test</button>
          </div>
        </nav>
        <div style={styles.resultadoContainer}>
          <div style={{ maxWidth: "650px", margin: "0 auto", paddingTop: "2rem" }}>
            <div style={styles.aviso}>
              ⚠️ <strong>Aviso importante:</strong> Este test es solo orientativo y no constituye un diagnóstico clínico. Consulta siempre con un profesional de salud mental.
            </div>
            <div style={styles.resultadoCard}>
              <span style={styles.resultadoEmoji}>{resultado.emoji}</span>
              <div
                style={{
                  ...styles.resultadoNivel,
                  background: resultado.color + "20",
                  color: resultado.color,
                }}
              >
                Nivel {resultado.nivel}
              </div>
              <div style={styles.resultadoTitulo}>{resultado.titulo}</div>

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={styles.scoreBar}>
                  <div
                    style={{
                      ...styles.scoreFill,
                      width: `${porcentaje}%`,
                      background: resultado.color,
                    }}
                  />
                </div>
                <div style={styles.scoreLabel}>
                  <span>0 — Sin rasgos</span>
                  <span style={{ fontWeight: 700, color: resultado.color }}>
                    Tu puntuación: {puntuacion}/30 ({porcentaje}%)
                  </span>
                  <span>30 — Muy altos</span>
                </div>
              </div>

              <div style={styles.resultadoDescripcion}>{resultado.descripcion}</div>
              <div style={styles.resultadoConsejo}>
                💡 <strong>Recomendación:</strong> {resultado.consejo}
              </div>

              <button
                style={styles.btnPrimario}
                onClick={() => {
                  // TODO: Conectar con pasarela de pago o enlace al programa premium
                  alert("🌸 Próximamente: programa personalizado de autoconocimiento");
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {resultado.cta} →
              </button>
              <button
                style={styles.btnSecundario}
                onClick={iniciarQuiz}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#7c3aed";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#7c3aed";
                }}
              >
                Repetir el test
              </button>
            </div>

            {/* Compartir */}
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "1.5rem",
                textAlign: "center",
                marginBottom: "2rem",
                boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                border: "1px solid #f0ece8",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  fontSize: "0.95rem",
                }}
              >
                ¿Conoces a alguien que debería hacer este test?
              </div>
              <div style={{ color: "#888", fontSize: "0.85rem", marginBottom: "1rem" }}>
                Comparte con alguien de confianza
              </div>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { label: "📱 WhatsApp", color: "#25d366", href: `https://wa.me/?text=Hice este test de narcisismo y fue muy revelador. ¿Te animas? ${window.location.href}` },
                  { label: "📘 Facebook", color: "#1877f2", href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}` },
                  { label: "🐦 Twitter/X", color: "#1da1f2", href: `https://twitter.com/intent/tweet?text=Acabo de hacer el Test Narcisista y me dejó pensando...&url=${window.location.href}` },
                ].map((btn) => (
                  <a
                    key={btn.label}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: btn.color,
                      color: "#fff",
                      borderRadius: "24px",
                      padding: "0.5rem 1.1rem",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "opacity 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <span style={styles.footerLink}>Política de privacidad</span>
            <span style={styles.footerLink}>Aviso legal</span>
            <span style={styles.footerLink}>Contacto</span>
          </div>
          <div>© {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.</div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
            Este test es orientativo y no reemplaza la evaluación de un profesional de salud mental.
          </div>
        </footer>
      </div>
    );
  }

  // PANTALLA INICIO
  return (
    <div style={styles.app}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <span style={styles.navLogo}>{BRAND}</span>
          <button
            style={styles.navCta}
            onClick={iniciarQuiz}
            onMouseOver={(e) => (e.currentTarget.style.background = "#6d28d9")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#7c3aed")}
          >
            Hacer el test gratis
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={styles.heroBadge}>🧠 Test gratuito · Solo 2 minutos</div>
          <h1 style={styles.heroTitle}>
            ¿Tienes rasgos{" "}
            <span
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "8px",
                padding: "0 0.3rem",
              }}
            >
              narcisistas?
            </span>
          </h1>
          <p style={styles.heroSubtitle}>
            Descubre si tus patrones de comportamiento incluyen rasgos narcisistas con nuestro test basado en los criterios del DSM-5. Honesto, confidencial y sin costo.
          </p>
          <button
            style={styles.heroBtn}
            onClick={iniciarQuiz}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(124,58,237,0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.3)";
            }}
          >
            Hacer el test ahora →
          </button>
          <button style={styles.heroBtnSecundario} onClick={() => {
            document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
          }}>
            ¿Cómo funciona? ↓
          </button>
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>10</span>
              <span style={styles.heroStatLabel}>preguntas</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>2 min</span>
              <span style={styles.heroStatLabel}>duración</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>100%</span>
              <span style={styles.heroStatLabel}>gratis</span>
            </div>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>anónimo</span>
              <span style={styles.heroStatLabel}>sin registros</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ background: "#fff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={styles.badge}>¿Cómo funciona?</span>
            <h2 style={styles.sectionTitle}>Simple, rápido y revelador</h2>
            <p style={styles.sectionSubtitle}>
              Nuestro test identifica los 9 rasgos principales del Trastorno Narcisista de la Personalidad (TNP) según el DSM-5.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                num: "01",
                titulo: "Responde honestamente",
                texto: "10 preguntas sobre tus pensamientos y comportamientos habituales.",
              },
              {
                num: "02",
                titulo: "Recibe tu resultado",
                texto: "Calculamos tu nivel de rasgos narcisistas al instante.",
              },
              {
                num: "03",
                titulo: "Obtén orientación",
                texto: "Descubre qué significa tu resultado y qué puedes hacer al respecto.",
              },
            ].map((paso) => (
              <div
                key={paso.num}
                style={{
                  textAlign: "center",
                  padding: "1.5rem",
                  background: "#faf9f7",
                  borderRadius: "16px",
                  border: "1px solid #f0ece8",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    color: "#fff",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    margin: "0 auto 1rem",
                  }}
                >
                  {paso.num}
                </div>
                <div
                  style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#1a1a2e" }}
                >
                  {paso.titulo}
                </div>
                <div style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.5 }}>
                  {paso.texto}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RASGOS */}
      <section style={styles.section}>
        <span style={styles.badge}>¿Qué medimos?</span>
        <h2 style={styles.sectionTitle}>Los 6 rasgos principales del narcisismo</h2>
        <p style={styles.sectionSubtitle}>
          El narcisismo no es solo "quererse mucho". Es un patrón de comportamiento que afecta relaciones, trabajo y bienestar personal.
        </p>
        <div style={styles.rasgosGrid}>
          {rasgos.map((rasgo) => (
            <RasgoCard key={rasgo.titulo} rasgo={rasgo} styles={styles} />
          ))}
        </div>
      </section>

      {/* CTA INTERMEDIO */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🪞</div>
          <h2
            style={{
              ...styles.sectionTitle,
              color: "#fff",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            La autoconciencia es el primer paso
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Muchas personas con rasgos narcisistas no son conscientes de ellos. Hacer este test ya es un acto de valentía y apertura.
          </p>
          <button
            style={{
              ...styles.btnPrimario,
              width: "auto",
              padding: "1rem 3rem",
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
            }}
            onClick={iniciarQuiz}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Iniciar el test gratis →
          </button>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section style={{ background: "#fff", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={styles.badge}>Testimonios</span>
            <h2 style={styles.sectionTitle}>Lo que dicen quienes lo hicieron</h2>
          </div>
          <div style={styles.testimonioGrid}>
            {testimonios.map((t) => (
              <div key={t.nombre} style={styles.testimonioCard}>
                <div style={styles.testimonioEstrellas}>
                  {"⭐".repeat(t.estrella)}
                </div>
                <p style={styles.testimonioTexto}>"{t.texto}"</p>
                <div style={styles.testimonioNombre}>— {t.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={styles.badge}>Preguntas frecuentes</span>
          <h2 style={styles.sectionTitle}>Dudas comunes</h2>
        </div>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={styles.faqItem}>
              <div
                style={styles.faqPregunta}
                onClick={() => setFaqAbierta(faqAbierta === idx ? null : idx)}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#faf9f7")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span>{faq.pregunta}</span>
                <span
                  style={{
                    transform: faqAbierta === idx ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                    color: "#7c3aed",
                  }}
                >
                  ▼
                </span>
              </div>
              {faqAbierta === idx && (
                <div style={styles.faqRespuesta}>{faq.respuesta}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={styles.emailSection}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💌</div>
          <h2
            style={{
              ...styles.sectionTitle,
              color: "#fff",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Recibe recursos sobre salud emocional
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem" }}>
            Guías gratuitas, artículos y consejos para mejorar tus relaciones y tu bienestar.
          </p>
          {/* TODO: Conectar con servicio de email marketing (Mailchimp, ConvertKit, etc.) */}
          {emailEnviado ? (
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                padding: "1rem",
                color: "#fff",
                fontWeight: 700,
                marginTop: "1.5rem",
              }}
            >
              ✅ ¡Gracias! Te contactaremos pronto.
            </div>
          ) : (
            <div style={styles.emailForm}>
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.emailInput}
              />
              <button
                style={styles.emailBtn}
                onClick={() => {
                  if (email.includes("@")) setEmailEnviado(true);
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Suscribirme
              </button>
            </div>
          )}
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.75rem",
              marginTop: "0.75rem",
            }}
          >
            Sin spam. Puedes darte de baja en cualquier momento.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <span style={styles.footerLink}>Política de privacidad</span>
          <span style={styles.footerLink}>Aviso legal</span>
          <span style={styles.footerLink}>Contacto</span>
          <span style={styles.footerLink}>Sobre {PROGRAM}</span>
        </div>
        <div>© {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.</div>
        <div style={{ marginTop: "0.75rem", maxWidth: "600px", margin: "0.75rem auto 0", lineHeight: 1.5 }}>
          Este test es orientativo y no constituye un diagnóstico clínico. Para cualquier preocupación sobre tu salud mental, consulta a un profesional cualificado.
        </div>
      </footer>
    </div>
  );
}

// SUBCOMPONENTES
function OpcionBoton({ texto, valor, onClick, styles }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      style={hover ? { ...styles.opcionBtn, ...styles.opcionBtnHover } : styles.opcionBtn}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onClick(valor)}
    >
      {texto}
    </button>
  );
}

function RasgoCard({ rasgo, styles }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        ...styles.rasgoCard,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover
          ? "0 8px 32px rgba(124,58,237,0.15)"
          : "0 2px 16px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={styles.rasgoEmoji}>{rasgo.emoji}</span>
      <div style={styles.rasgoTitulo}>{rasgo.titulo}</div>
      <div style={styles.rasgoTexto}>{rasgo.texto}</div>
    </div>
  );
}