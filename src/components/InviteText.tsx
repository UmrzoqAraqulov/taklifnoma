import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

interface InviteTextProps {
  id?: string;
  isEnd?: boolean;
}

const InviteText: React.FC<InviteTextProps> = ({ id = "inviteSection2", isEnd = false }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("active"));
            const bg = entry.target.querySelector(".invite-bg") as HTMLElement;
            if (bg) bg.style.transform = "scale(1)";
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="invite-section" id={id} ref={sectionRef}>
      <div className="invite-bg"></div>
      <div className="invite-overlay"></div>
      <div className="invite-content">
        {!isEnd ? (
          <>
            <div className="invite-top reveal">{t("invitetop1")}</div>
            <div className="invite-names reveal delay-1">{t("invitetop2")}</div>
            <div className="invite-text reveal delay-2">
              <span>{t("invitetop3")}</span>
              <br />
              <span>{t("invitetop4")}</span>
            </div>
            <div className="invite-heart reveal delay-3">♡</div>
          </>
        ) : (
          <>
            <div className="invite-top reveal rsvp11">{t("invitetop5")}</div>
            <div className="invite-names2 reveal delay-1">{t("invitetop6")}</div>
            <div className="invite-text reveal delay-2">{t("invitetop7")}</div>
            <div className="invite-heart reveal delay-3">♡</div>
          </>
        )}
      </div>
    </section>
  );
};

export default InviteText;
