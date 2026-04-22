import { X } from "lucide-react";
import { getPreviewUrl } from "@/data/recipes";
import type { Recipe } from "@/data/recipes";
import { useLanguage } from "@/lib/i18n";

interface RecipeViewerProps {
  recipe: Recipe;
  spanish?: boolean;
  onClose: () => void;
}

export function RecipeViewer({ recipe, spanish, onClose }: RecipeViewerProps) {
  const { t } = useLanguage();
  const fileId = spanish ? recipe.spanishDriveFileId : recipe.driveFileId;

  if (!fileId) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
      <div className="brand-surface h-[85vh] w-full max-w-4xl animate-fade-in-up overflow-hidden rounded-2xl border border-border shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <h2 className="font-semibold text-lg truncate pr-4">
            {recipe.title}
            {spanish && <span className="ml-2 text-sm text-primary font-medium">{t("viewer.spanish")}</span>}
          </h2>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-lg hover:bg-muted transition-colors active:scale-[0.95]"
            aria-label={t("viewer.close")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PDF Embed */}
        <div className="flex-1 bg-muted/80">
          <iframe
            src={getPreviewUrl(fileId)}
            className="w-full h-full border-0"
            title={t("viewer.frameTitle", { title: recipe.title })}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
}
