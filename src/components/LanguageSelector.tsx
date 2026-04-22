import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function LanguageSelector() {
  const { language, setLanguage, languageOptions, t } = useLanguage();

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
      <Languages className="h-4 w-4" />
      <span className="hidden sm:inline">{t("nav.language")}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as typeof language)}
        className="bg-transparent text-foreground outline-none"
        aria-label={t("nav.language")}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
