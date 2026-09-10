import React, { useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import WEDDING_CONFIG from "../config/weddingConfig";

const Location: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    elementsRef.current = document.querySelectorAll(".animate-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
          }
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((el) => {
      (el as HTMLElement).style.animationPlayState = "paused";
      observer.observe(el);
    });

    return () => {
      if (elementsRef.current) {
        elementsRef.current.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const moveX = (x - 0.5) * 8;
    const moveY = (y - 0.5) * 8;

    sectionRef.current.style.setProperty("--mouse-x", `${moveX}px`);
    sectionRef.current.style.setProperty("--mouse-y", `${moveY}px`);
  };

  return (
    <section 
      className="location-winner-section" 
      ref={sectionRef} 
      onMouseMove={handleMouseMove}
    >
      <div className="location-glass-container">
        {/* Header */}
        <div className="location-header animate-up">
          <div className="location-badge">{t("venuebadge")}</div>
          <h1 className="location-title">{t("venueheader1")}</h1>
          <div className="location-subtitle">{t("venuesubtitle")}</div>
          <div className="location-divider">
            <span></span>
            <i>⚘</i>
            <span></span>
          </div>
        </div>

        {/* Grid: Map + Venue Info */}
        <div className="location-grid">
          {/* LEFT: Map iframe */}
          <div className="map-card animate-up delay-1">
            <div className="map-frame-wrapper">
              <iframe
                src={WEDDING_CONFIG.venue.googleMapsEmbedSrc}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="map-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{t("googlemaps")}</span>
            </div>
          </div>

          {/* RIGHT: Restaurant info & buttons */}
          <div className="venue-info-card animate-up delay-2">
            <div className="restaurant-name">{t("venueheader2")}</div>

            <div className="address-block">
              <div className="address-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div className="address-text">{t("venueheader3")}</div>
            </div>

            <div className="route-buttons">
              <a
                href={WEDDING_CONFIG.venue.googleMapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="route-btn google-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                  <path d="M12 2v4M22 10h-4M2 10h4M12 18v4" />
                </svg>
                <span>{t("route1")}</span>
              </a>

              <a
                href={WEDDING_CONFIG.venue.yandexMapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="route-btn yandex-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{t("route2")}</span>
              </a>
            </div>

            <div className="location-footer">
              <div className="footer-heart">{t("route3")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
