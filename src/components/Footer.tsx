import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-brand">
            Otman <span>dev.</span>
          </span>

          <p className="footer-text">
            {t.footer.text}
          </p>
        </div>

        <div className="footer-right">
          <a
            className="footer-link"
            href="https://github.com/RaadOtman"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            GitHub
            <FiArrowUpRight />
          </a>

          <a
            className="footer-link"
            href="https://www.linkedin.com/in/otman-raad-951044353/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
            LinkedIn
            <FiArrowUpRight />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <small>
          © {new Date().getFullYear()} Otman Raad · {t.footer.role}
        </small>

        <small className="footer-made">
          React · TypeScript · Vite
        </small>
      </div>
    </footer>
  );
}
