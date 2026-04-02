import { useEffect, useState } from "react";
import { Instagram, Linkedin } from "lucide-react";

const HEADSHOT = "/images/headshot.jpg";

export default function FloatingFaceCard({ showAfter = 320 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  return (
    <div className={`floating-face ${visible ? "floating-face--visible" : ""}`} aria-hidden={!visible}>
      <a
        href="mailto:tcrawford.design@gmail.com"
        className="floating-face__contact"
        aria-label="Contact me by email"
      >
        Contact Me
      </a>
      <div className="floating-face__shell border-2 border-white/25 bg-black shadow-brut-sm">
        <div className="profile-card profile-card--compact profile-card--floating" aria-label="Portrait of Travis Crawford">
          <img
            src={HEADSHOT}
            alt="Travis Crawford"
            className="profile-card__image"
            loading="lazy"
            decoding="async"
          />
          <div className="profile-card__overlay" />
          <div className="profile-card__border">
            <div className="profile-card__name">Travis Crawford</div>
            <div className="profile-card__icons" aria-label="Social links">
              <a
                href="https://www.linkedin.com/in/travis-crawford-67759b24a"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/treves_/" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
