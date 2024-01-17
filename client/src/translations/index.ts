import global_en from "@/translations/en/global.json";
import global_ru from "@/translations/ru/global.json";
import i18n from "i18next";

i18n.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: { global: global_en },
    ru: { global: global_ru },
  },
});

export default i18n;
