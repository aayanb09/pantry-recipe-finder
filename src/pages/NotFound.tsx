import { useLanguage } from "@/lib/i18n";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t("notFound.eyebrow")}
        </p>
        <h1 className="mb-3 text-3xl font-bold">{t("notFound.title")}</h1>
        <p className="mb-6 text-muted-foreground">{t("notFound.body")}</p>
        <a href="/" className="inline-flex rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90">
          {t("notFound.back")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
