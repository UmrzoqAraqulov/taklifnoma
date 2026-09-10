import React from "react";
import { useLanguage } from "../context/LanguageContext";
import WEDDING_CONFIG from "../config/weddingConfig";

const Hero: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="invitation">
      <div className="background"></div>
      <div className="overlay"></div>
      <div className="content">
        <h1>{t("names")}</h1>
        <div className="date">{WEDDING_CONFIG.date.text[lang]}</div>
        <div className="divider"></div>
        <div className="arabic">وَأَلَّفَ بَيْنَ قُلُوبِهِمْ</div>
        <div className="translation">{t("quote")}</div>
        <div className="source">{t("source")}</div>
        <div className="scroll-down-container">
          <svg
            className="heart-arrow-icon"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M165 45 C 165 10, 100 10, 100 60 C 100 10, 35 10, 35 45 C 35 90, 80 130, 100 150 C 120 135, 150 110, 155 90 M155 90 L165 180 M150 165 L165 180 L180 165"
              fill="none"
              stroke="#D1BFA5"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
