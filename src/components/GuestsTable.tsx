import React from "react";

const GuestsTable: React.FC = () => {
  return (
    <section className="guests-table-section" id="rsvp11">
      <div className="guests-table-card">
        <div className="guests-table-header">
          <div className="guests-table-badge">✦ MEHMONLAR RO‘YXATI ✦</div>
          <h2 className="guests-table-title">Ishtirokchilar jadvali</h2>
          <div className="guests-table-divider">
            <span></span>
            <i>♡</i>
            <span></span>
          </div>
        </div>

        {/* Stats */}
        <div className="guests-stats">
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Jami mehmonlar</div>
          </div>
          <div className="stat-card accepted">
            <div className="stat-value">0</div>
            <div className="stat-label">Tasdiqlangan</div>
          </div>
          <div className="stat-card declined">
            <div className="stat-value">0</div>
            <div className="stat-label">Kela olmaydi</div>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="guests-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Mehmon ismi</th>
                <th>Mehmonlar soni</th>
                <th>Holat</th>
                <th>Izoh</th>
                <th>Vaqt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="empty-row">
                <td colSpan={6}>
                  Hali hech qanday ma'lumot yo'q. Birinchi bo'lib RSVP qoldiring!
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="guests-table-footer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default GuestsTable;
