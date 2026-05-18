
import { useEffect, useState } from "react";
import {
  FiMail, FiUser, FiMessageSquare, FiSend,
  FiCheckCircle, FiAlertCircle, FiPhone, FiMapPin
} from "react-icons/fi";
import Socials from "./Socials";
import { handleGlowMove } from "../utils/mouseGlow";
import { useI18n } from "../i18n";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"sending"|"ok"|"error">("idle");
  const [msg, setMsg] = useState("");
  const { t } = useI18n();

  
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xjkpalwj";

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
        const j = await res.json().catch(() => ({} as { error?: string }));
        setStatus("error");
        setMsg(j?.error || t.contact.submitError);
      }
    } catch {
      setStatus("error");
      setMsg(t.contact.network);
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-head">
          <span className="overline">{t.contact.overline}</span>
          <h2 className="contact-title">{t.contact.title}</h2>
          <p className="contact-intro">{t.contact.intro}</p>
        </div>

        <div className="contact-grid">
          <aside className="contact-info card glow-card reveal" onMouseMove={handleGlowMove}>
            <div className="info-block">
              <FiMail className="info-ico" />
              <div>
                <div className="info-label">{t.contact.email}</div>
                <a className="info-link" href="mailto:otman.trader@gmail.com">otman.trader@gmail.com</a>
              </div>
            </div>

            <div className="info-block">
              <FiPhone className="info-ico" />
              <div>
                <div className="info-label">{t.contact.phone}</div>
                <a className="info-link" href="tel:+34123456789">+34 631 72 01 70</a>
              </div>
            </div>

            <div className="info-block">
              <FiMapPin className="info-ico" />
              <div>
                <div className="info-label">{t.contact.location}</div>
                <div className="info-muted">Sevilla, España</div>
              </div>
            </div>

            <div className="divider"></div>

            <div>
              <div className="info-label" style={{ marginBottom: 8 }}>{t.contact.socials}</div>
              <Socials />
            </div>

            <div className="availability" style={{ marginTop: 14 }}>
              <span className="pulse-dot" aria-hidden="true"></span>
              <span className="availability-text">{t.contact.available}</span>
            </div>
          </aside>

          
          <div className="contact-form-wrap reveal">
            <div className="gradient-border">
              {status === "ok" ? (
                <div className="card success-card">
                  <FiCheckCircle className="success-ico" />
                  <h3>{t.contact.sentTitle}</h3>
                  <p>{t.contact.sentText}</p>
                  <button className="btn" onClick={() => setStatus("idle")}>{t.contact.sendAnother}</button>
                </div>
              ) : status === "error" ? (
                <div className="card error-card">
                  <FiAlertCircle className="error-ico" />
                  <h3>{t.contact.errorTitle}</h3>
                  <p>{msg || t.contact.errorFallback}</p>
                  <button className="btn ghost" onClick={() => setStatus("idle")}>{t.contact.back}</button>
                </div>
              ) : (
                <form className="contact-form glow-card" onMouseMove={handleGlowMove} onSubmit={handleSubmit} noValidate>
                  
                  <input type="text" name="_gotcha" style={{ display:"none" }} tabIndex={-1} aria-hidden="true" />

                  <div className="field">
                    <FiUser className="field-ico" />
                    <input className="input" name="name" id="name" placeholder=" " required />
                    <label htmlFor="name">{t.contact.name}</label>
                  </div>

                  <div className="field">
                    <FiMail className="field-ico" />
                    <input className="input" type="email" name="email" id="email" placeholder=" " required />
                    <label htmlFor="email">{t.contact.email}</label>
                  </div>

                  <div className="field">
                    <FiMessageSquare className="field-ico" />
                    <input className="input" name="subject" id="subject" placeholder=" " />
                    <label htmlFor="subject">{t.contact.subject}</label>
                  </div>

                  <div className="field">
                    <textarea className="input textarea" name="message" id="message" placeholder=" " rows={6} required />
                    <label htmlFor="message">{t.contact.message}</label>
                  </div>

                  <label className="check">
                    <input type="checkbox" required /> {t.contact.privacyPrefix} <a href="#legal" className="link">{t.contact.privacyLink}</a>.
                  </label>

                  <button className="btn submit" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? t.contact.sending : (<><FiSend style={{marginRight:8}} />{t.contact.send}</>)}
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
  
