import { createI18n } from "vue-i18n";
import en from "@/locales/en";
import es from "@/locales/es";
import de from "@/locales/de";
import ja from "@/locales/ja";
import fr from "@/locales/fr";

const messages = {
  en: en,
  es: es,
  de: de,
  ja: ja,
  fr: fr,
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  globalInjection: true,
  messages,
});

export default i18n;
