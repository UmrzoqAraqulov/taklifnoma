import React from "react";
import { useLanguage } from "../context/LanguageContext";

const Timeline: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <div className="timeline-title">{t("timeline1")}</div>

        <div className="timeline">
          {/* ITEM 1 */}
          <div className="timeline-item">
            <div className="timeline-icon">
              <img src="assets/images/t1.webp" alt="arrival" />
            </div>
            <div className="timeline-center">
              <span className="dot"></span>
              <span className="line"></span>
            </div>
            <div className="timeline-text">
              <div className="time1">18:00</div>
              <div className="desc">{t("timeline2")}</div>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="timeline-item">
            <div className="timeline-icon">
              <img src="assets/images/t2.webp" alt="ceremony" />
            </div>
            <div className="timeline-center">
              <span className="dot"></span>
              <span className="line"></span>
            </div>
            <div className="timeline-text">
              <div className="time1">19:00</div>
              <div className="desc">{t("timeline3")}</div>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="timeline-item">
            <div className="timeline-icon">
              <img src="assets/images/t3.webp" alt="banquet" />
            </div>
            <div className="timeline-center">
              <span className="dot"></span>
              <span className="line"></span>
            </div>
            <div className="timeline-text">
              <div className="time1">20:00</div>
              <div className="desc">{t("timeline4")}</div>
            </div>
          </div>

          {/* ITEM 4 */}
          <div className="timeline-item last">
            <div className="timeline-icon">
              <img src="assets/images/t4.webp" alt="sparklers" />
            </div>
            <div className="timeline-center">
              <span className="dot"></span>
            </div>
            <div className="timeline-text">
              <div className="time1">23:00</div>
              <div className="desc">{t("timeline5")}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="timeline-footer">
          <svg viewBox="0 0 24 24">
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
