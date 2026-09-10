import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import WEDDING_CONFIG from "../config/weddingConfig";

const LuxuryDate: React.FC = () => {
  const { t } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(
      WEDDING_CONFIG.date.year,
      WEDDING_CONFIG.date.month,
      WEDDING_CONFIG.date.day,
      WEDDING_CONFIG.date.hour,
      WEDDING_CONFIG.date.minute,
      0
    ).getTime();

    const updateClock = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  // Generate Calendar
  const year = WEDDING_CONFIG.date.year;
  const month = WEDDING_CONFIG.date.month;
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray: (number | string)[] = [];
  let startOffset = startDay === 0 ? 6 : startDay - 1;

  for (let i = 0; i < startOffset; i++) {
    daysArray.push("");
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  return (
    <div className="luxury-date-section">
      <div className="luxury-card">
        <div className="date-header">{t("dateheader1")}</div>
        <div className="big-date">
          <span>{String(WEDDING_CONFIG.date.day).padStart(2, "0")}</span>
          <span>{String(WEDDING_CONFIG.date.month + 1).padStart(2, "0")}</span>
          <span>{WEDDING_CONFIG.date.year}</span>
        </div>

        <div className="luxury-divider">
          <span></span>
          <i>♡</i>
          <span></span>
        </div>

        <div className="timer-label">{t("dateheader2")}</div>
        <div className="countdown">
          <div className="countdown-item">
            <span className="flip-number">{timeLeft.days}</span>
            <small>{t("dateheader3")}</small>
          </div>
          <div className="countdown-item">
            <span className="flip-number">{timeLeft.hours}</span>
            <small>{t("dateheader4")}</small>
          </div>
          <div className="countdown-item">
            <span className="flip-number">{timeLeft.minutes}</span>
            <small>{t("dateheader5")}</small>
          </div>
          <div className="countdown-item">
            <span className="flip-number">{timeLeft.seconds}</span>
            <small>{t("dateheader6")}</small>
          </div>
        </div>

        <div className="ornament">✧</div>

        <div className="calendar-title">{t("dateheader7")}</div>
        <div className="week">
          <span>{t("dateheader8")}</span>
          <span>{t("dateheader9")}</span>
          <span>{t("dateheader10")}</span>
          <span>{t("dateheader11")}</span>
          <span>{t("dateheader12")}</span>
          <span>{t("dateheader13")}</span>
          <span>{t("dateheader14")}</span>
        </div>
        <div className="days">
          {daysArray.map((day, index) => (
            <span
              key={index}
              className={day === WEDDING_CONFIG.date.day ? "active" : ""}
            >
              {day}
            </span>
          ))}
        </div>

        <div className="time">{t("dateheader15")}</div>
      </div>
    </div>
  );
};

export default LuxuryDate;
