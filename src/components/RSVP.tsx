import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const RSVP: React.FC = () => {
  const { t } = useLanguage();
  const [guestName, setGuestName] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const increment = () => setGuestsCount((prev) => Math.min(prev + 1, 5));
  const decrement = () => setGuestsCount((prev) => Math.max(prev - 1, 1));

  const showToast = (message: string) => {
    let toast = document.querySelector(".toast-message");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast-message";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast?.classList.remove("show");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      showToast("❌ Пожалуйста, введите ваше имя");
      return;
    }

    if (!attending) {
      showToast("❌ Iltimos, to‘yga kelasizmi, shuni ko‘rsating.");
      return;
    }

    setLoading(true);

    const BOT_TOKEN = "8898215248:AAFzhRayd_vE_DYVuaexd7yaCFAJBmxyACk";
    const CHAT_ID = "748642876";
    const uniqueId = `wedding_${CHAT_ID}_2`;

    let totalGuestsOverall = "Noma'lum";

    try {
      if (attending === "yes") {
        for (let i = 0; i < guestsCount; i++) {
          const countRes = await fetch(`https://api.counterapi.dev/v1/${uniqueId}/guests/up`);
          const countData = await countRes.json();
          totalGuestsOverall = countData.count;
        }
      } else {
        const countRes = await fetch(`https://api.counterapi.dev/v1/${uniqueId}/guests/`);
        const countData = await countRes.json();
        totalGuestsOverall = countData.count || 0;
      }
    } catch (err) {
      console.error("Counter xatosi:", err);
    }

    const messageText = `Taklifnoma javobi (RSVP) 💌

👤 Mehmon ismi: ${guestName}
👥 Mehmonlar soni: ${guestsCount}
✅ Keladimi: ${attending === "yes" ? "Ha, mamnuniyat bilan" : "Yo'q, kela olmaydi"}
💬 Izoh: ${comment || "Yo'q"}

📊 UMUMIY MEHMONLAR SONI: ${totalGuestsOverall} ta`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
        }),
      });

      if (response.ok) {
        showToast("✅ Muvaffaqiyatli yuborildi! Rahmat!");
        setGuestName("");
        setGuestsCount(1);
        setAttending(null);
        setComment("");
      } else {
        throw new Error("Telegram API xatosi");
      }
    } catch (err) {
      showToast("❌ Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-winner-section">
      <div className="rsvp-card">
        <div className="rsvp-inner">
          <div className="rsvp-header">
            <div className="rsvp-badge">✦ R.S.V.P. ✦</div>
            <h2 className="rsvp-title">{t("rsvp1")}</h2>
            <div className="rsvp-sub">{t("rsvp2")}</div>
            <div className="rsvp-divider">
              <span></span>
              <i>♡</i>
              <span></span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="form-group">
              <label className="form-label">
                {t("rsvp3")} <span className="required-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                {t("rsvp4")} <span className="required-star">*</span>
              </label>
              <div className="guest-counter">
                <button type="button" className="counter-btn" onClick={decrement}>−</button>
                <span className="guest-value">{guestsCount}</span>
                <button type="button" className="counter-btn" onClick={increment}>+</button>
              </div>
              <div className="guest-limit-hint">{t("rsvp5")}</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {t("rsvp6")} <span className="required-star">*</span>
              </label>
              <div className="radio-group">
                <label className={`radio-option ${attending === "yes" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={attending === "yes"}
                    onChange={() => setAttending("yes")}
                  />
                  <span>{t("rsvp7")}</span>
                </label>
                <label className={`radio-option ${attending === "no" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={attending === "no"}
                    onChange={() => setAttending("no")}
                  />
                  <span>{t("rsvp8")}</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t("rsvp9")}</label>
              <textarea
                className="form-input"
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <span>⌛</span>
                  <span>Yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <span>{t("rsvp10")}</span>
                  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </>
              )}
            </button>
            <div className="required-footnote">{t("rsvp11")}</div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
