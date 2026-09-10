// ==========================================
// WEDDING INVITATION CONFIGURATION
// To'y taklifnomasi sozlamalari
// ==========================================

import { WEDDING_NAMES, WEDDING_DATE } from "../constants";

const WEDDING_CONFIG = {
  // Kelin va kuyov ismlari (Bride & Groom Names)
  names: WEDDING_NAMES,

  // To'y sanasi (Wedding Date)
  date: WEDDING_DATE,

  // O'tkazilish joyi (Venue Location)
  venue: {
    name: {
      uz: "“Nurli 2” to‘yxonasi",
      uz_cy: "“Нурли 2” тўйхонаси",
      ru: "Ресторан «Нурли 2»",
      en: "Wedding Hall «Nurli 2»",
    },
    address: {
      uz: "Samarqand viloyati, Pastdarg‘om tumani",
      uz_cy: "Самарқанд вилояти, Пастдарғом тумани",
      ru: "Самаркандская область, Пастдаргомский район",
      en: "Samarkand region, Pastdargom district",
    },
    // Google Maps Iframe src (Map Embed link)
    googleMapsEmbedSrc:
      "https://maps.google.com/maps?q=39.7512229,66.5818728&t=&z=17&ie=UTF8&iwloc=&output=embed",

    // Marshrut tugmalari havolalari (Route links)
    googleMapsRouteUrl:
      "https://maps.app.goo.gl/JSDXG3cN1veS5pt28",
    yandexMapsRouteUrl:
      "https://yandex.uz/maps/-/CTh76Gn7",
  },

  // RSVP sozlamalari (RSVP settings)
  rsvp: {
    adminPassword: "0505", // Mehmonlar ro'yxatini ko'rish paroli (Access code for the guests table)
  },
};

export default WEDDING_CONFIG;
