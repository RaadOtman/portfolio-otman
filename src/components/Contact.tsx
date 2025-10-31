// src/components/Contact.tsx
import { useEffect, useState } from "react";
import {
  FiMail, FiUser, FiMessageSquare, FiSend,
  FiCheckCircle, FiAlertCircle, FiPhone, FiMapPin
} from "react-icons/fi";
import Socials from "./Socials";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [msg, setMsg] = useState("");

  // ⚠️ Sustituye por tu endpoint real de Formspree
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkpalwj";

  // === REVEAL: observer + fallback para que siempre se vea ===
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#contact .reveal"));
    if (els.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target as Element);
        }
      });
    }, { threshold: 0.18 });

    const checkNow = () => {
      const vh = window.innerHeight || 800;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    };

    els.forEach((el) => io.observe(el));
    checkNow();

    const onScroll = () => checkNow();
    const onResize = () => checkNow();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        const j = await res.json().catch(() => ({} as any));
        setStatus("error");
        setMsg(j?.error || "No se pudo enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch {
      setStatus("error");
      setMsg("Error de red. Comprueba tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-head">
          <span className="overline">Contacto</span>
          <h2 className="contact-title">Hablemos</h2>
          <p className="contact-intro">(Escribe aquí tu mensaje. Respondo lo antes posible.)</p>
        </div>

        <div className="contact-grid">
          {/* Columna izquierda: info */}
          <aside className="contact-info card reveal">
            <div className="info-block">
              <FiMail className="info-ico" />
              <div>
                <div className="info-label">Email</div>
                <a className="info-link" href="mailto:otman@example.com">otman.trader@gmail.com.com</a>
              </div>
            </div>

            <div className="info-block">
              <FiPhone className="info-ico" />
              <div>
                <div className="info-label">Teléfono</div>
                <a className="info-link" href="tel:+34123456789">+34 631 72 01 70</a>
              </div>
            </div>

            <div className="info-block">
              <FiMapPin className="info-ico" />
              <div>
                <div className="info-label">Ubicación</div>
                <div className="info-muted">Sevilla, España</div>
              </div>
            </div>

            <div className="divider"></div>

            <div>
              <div className="info-label" style={{ marginBottom: 8 }}>Redes</div>
              <Socials />
            </div>

            <div className="availability" style={{ marginTop: 14 }}>
              <span className="pulse-dot" aria-hidden="true"></span>
              <span className="availability-text">Disponible para trabajar</span>
            </div>
          </aside>

          {/* Columna derecha: formulario */}
          <div className="contact-form-wrap reveal">
            <div className="gradient-border">
              {status === "ok" ? (
                <div className="card success-card">
                  <FiCheckCircle className="success-ico" />
                  <h3>¡Mensaje enviado!</h3>
                  <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                  <button className="btn" onClick={() => setStatus("idle")}>Enviar otro</button>
                </div>
              ) : status === "error" ? (
                <div className="card error-card">
                  <FiAlertCircle className="error-ico" />
                  <h3>Ups, algo falló</h3>
                  <p>{msg || "Inténtalo de nuevo en unos minutos."}</p>
                  <button className="btn ghost" onClick={() => setStatus("idle")}>Volver al formulario</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot antispam */}
                  <input type="text" name="_gotcha" style={{ display:"none" }} tabIndex={-1} aria-hidden="true" />

                  <div className="field">
                    <FiUser className="field-ico" />
                    <input className="input" name="name" id="name" placeholder=" " required />
                    <label htmlFor="name">Nombre</label>
                  </div>

                  <div className="field">
                    <FiMail className="field-ico" />
                    <input className="input" type="email" name="email" id="email" placeholder=" " required />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="field">
                    <FiMessageSquare className="field-ico" />
                    <input className="input" name="subject" id="subject" placeholder=" " />
                    <label htmlFor="subject">Asunto (opcional)</label>
                  </div>

                  <div className="field">
                    <textarea className="input textarea" name="message" id="message" placeholder=" " rows={6} required />
                    <label htmlFor="message">Mensaje</label>
                  </div>

                  <label className="check">
                    <input type="checkbox" required /> He leído y acepto la <a href="#legal" className="link">política de privacidad</a>.
                  </label>

                  <button className="btn submit" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Enviando..." : (<><FiSend style={{marginRight:8}} />Enviar</>)}
                  </button>

                  <input type="hidden" name="_subject" value="Nuevo mensaje desde el portfolio" />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  