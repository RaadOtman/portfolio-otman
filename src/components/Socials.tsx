import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Socials() {
  const socials = [
    { href: "https://www.linkedin.com/in/otman-raad-951044353/", icon: <FaLinkedin />, label: "LinkedIn" },
    { href: "https://github.com/RaadOtman", icon: <FaGithub />, label: "GitHub" },
    { href: "mailto:otman.trader@gmail.com", icon: <FaEnvelope />, label: "Email" },
  ];

  return (
    <div className="socials">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="social-link"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}