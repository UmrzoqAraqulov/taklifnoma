import { useState, useRef, useEffect } from "react";
import LockScreen from "./components/LockScreen";
import Hero from "./components/Hero";
import InviteText from "./components/InviteText";
import LuxuryDate from "./components/LuxuryDate";
import Timeline from "./components/Timeline";
import Location from "./components/Location";
import GuestsTable from "./components/GuestsTable";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

function MainContent() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { setLang } = useLanguage();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => { });
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <LockScreen onUnlock={handleUnlock} />

      <div className={`main-content ${isUnlocked ? "visible" : ""}`} id="mainContent">
        <Hero />
        <InviteText id="inviteSection2" />
        <LuxuryDate />
        <Timeline />
        <Location />
        {/* <RSVP /> */}
        <GuestsTable />
        <InviteText id="inviteSection" isEnd={true} />
      </div>

      <audio ref={audioRef} id="bgMusic" loop>
        <source src="music/music2.mp3" type="audio/mpeg" />
      </audio>

      <button id="musicToggle" onClick={toggleMusic} style={{ zIndex: 1020 }}>
        {isPlaying ? "❚❚" : "▷"}
      </button>

      <div id="langSwitcher">
        <button onClick={() => setLang("uz")}>UZ</button>
        <button onClick={() => setLang("uz_cy")}>ЎЗ</button>
        <button onClick={() => setLang("ru")}>RU</button>
        <button onClick={() => setLang("en")}>EN</button>
      </div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;
