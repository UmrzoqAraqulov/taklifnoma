import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import WEDDING_CONFIG from "../config/weddingConfig";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbLeft, setThumbLeft] = useState(4);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const getMaxLeft = () => {
    if (!trackRef.current || !thumbRef.current) return 0;
    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbRect = thumbRef.current.getBoundingClientRect();
    return trackRect.width - thumbRect.width - 4;
  };

  const updateThumbPosition = (clientX: number) => {
    if (!trackRef.current || !thumbRef.current || isUnlocked) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbRect = thumbRef.current.getBoundingClientRect();
    const maxLeft = getMaxLeft();

    let newLeft = clientX - trackRect.left - thumbRect.width / 2;
    newLeft = Math.max(4, Math.min(newLeft, maxLeft));

    setThumbLeft(newLeft);
  };

  const unlockScreen = () => {
    if (isUnlocked) return;
    setIsUnlocked(true);

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 300);

    setOpacity(0);

    setTimeout(() => {
      setIsHidden(true);
      onUnlock();
    }, 1000);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
      if (!isDragging || isUnlocked) return;
      e.preventDefault();
      
      let clientX = 0;
      if (e instanceof TouchEvent) {
        clientX = e.touches[0].clientX;
      } else if (e instanceof PointerEvent) {
        clientX = e.clientX;
      }

      if (clientX) {
        updateThumbPosition(clientX);
      }
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      setIsDragging(false);

      const maxLeft = getMaxLeft();
      if (thumbLeft >= maxLeft - 3) {
        unlockScreen();
      } else {
        setThumbLeft(4);
      }
    };

    if (isDragging) {
      document.addEventListener("pointermove", handlePointerMove as any);
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("touchmove", handlePointerMove as any, { passive: false });
      document.addEventListener("touchend", handlePointerUp);
    }

    return () => {
      document.removeEventListener("pointermove", handlePointerMove as any);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("touchmove", handlePointerMove as any);
      document.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, isUnlocked, thumbLeft]);

  if (isHidden) return null;

  return (
    <div className="lock-screen" style={{ opacity, visibility: opacity === 0 ? "hidden" : "visible" }}>
      <div className="lock-bg"></div>
      <div className="lock-blur"></div>
      <div className="lock-gradient"></div>

      <div className="lock-content">
        <div className="lock-invited">{t("lockinvited1")}</div>
        <div className="lock-names">{t("names")}</div>
        <div className="lock-date">
          {String(WEDDING_CONFIG.date.day).padStart(2, "0")} • {String(WEDDING_CONFIG.date.month + 1).padStart(2, "0")} • {WEDDING_CONFIG.date.year}
        </div>
        <div className="lock-arabic">وَأَلَّفَ بَيْنَ قُلُوبِهِمْ</div>
        <div className="lock-translation">{t("quote")}</div>
        <div className="lock-source">{t("source")}</div>

        <div className="lock-heart">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="slider-container">
          <div className="slider-track" ref={trackRef}>
            <div className="slider-text">{t("slider1")}</div>
            <div className="slider-arrow">→</div>
            <div
              className={`slider-thumb ${isShaking ? "shake" : ""}`}
              ref={thumbRef}
              style={{
                left: `${thumbLeft}px`,
                transition: isDragging ? "none" : "left 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
              }}
              onPointerDown={(e) => {
                if (isUnlocked) return;
                e.preventDefault();
                setIsDragging(true);
              }}
              onTouchStart={() => {
                if (isUnlocked) return;
                // Avoid preventing default here to not break scrolling on some devices, 
                // but since lock screen is fixed it's fine.
                setIsDragging(true);
              }}
              onDragStart={(e) => e.preventDefault()}
            >
              <svg className="lock-icon-svg" viewBox="0 0 24 24">
                <rect x="6" y="11" width="12" height="10" rx="2" />
                <path d="M8 11V8c0-2.2 1.8-4 4-4s4 1.8 4 4v3" />
                <circle cx="12" cy="16" r="1.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
