import { ExternalLink, Globe, FolderOpen, Eye } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { RECIPE_FOLDER_URL, getViewUrl } from "@/data/recipes";
import { useLanguage } from "@/lib/i18n";

interface RecipeCardProps {
  recipe: Recipe;
  matchedIngredients: string[];
  index: number;
  onViewPdf: (recipe: Recipe, spanish?: boolean) => void;
}

export function RecipeCard({ recipe, matchedIngredients, index, onViewPdf }: RecipeCardProps) {
  const { t, translateCategory, translateHealthGoal } = useLanguage();
  const categoryEmoji: Record<string, string> = {
    "Vegetables": "🥬",
    "Fruits": "🍎",
    "Beans & Legumes": "🫘",
    "Grains & Pasta": "🍝",
    "Protein": "🍗",
    "Soups & Stews": "🍲",
    "Snacks & Sides": "🥨",
    "Desserts": "🍪",
    "Sauces & Dips": "🥫",
  };

  const hasEnglishPdf = !!recipe.driveFileId;
  const hasSpanishPdf = !!recipe.spanishDriveFileId;
  const hasAnyPdf = hasEnglishPdf || hasSpanishPdf;
  const openInDriveUrl = getViewUrl(recipe.driveFileId ?? recipe.spanishDriveFileId ?? "");

  return (
    <div
      className="brand-surface group animate-fade-in-up rounded-2xl border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      {/* Category + Spanish badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{categoryEmoji[recipe.category] || "📄"}</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {translateCategory(recipe.category)}
        </span>
        {recipe.hasSpanish && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            <Globe className="h-3 w-3" />
            {t("recipe.spanish")}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-primary transition-colors">
        {recipe.title}
      </h3>

      {/* Ingredients */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {recipe.ingredients.map((ing) => (
          <span
            key={ing}
            className={`text-xs px-2.5 py-1 rounded-md font-medium ${
              matchedIngredients.includes(ing)
                ? "border border-accent/25 bg-accent/15 text-accent"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {matchedIngredients.includes(ing) && "✓ "}
            {ing}
          </span>
        ))}
      </div>

      {recipe.healthGoals.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {recipe.healthGoals.map((goal) => (
            <span
              key={goal}
              className="rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {translateHealthGoal(goal)}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {hasAnyPdf ? (
          <>
            {hasEnglishPdf && (
              <button
                onClick={() => onViewPdf(recipe)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground transition-all hover:brightness-105 active:scale-[0.97]"
              >
                <Eye className="h-3.5 w-3.5" />
                {t("recipe.viewRecipe")}
              </button>
            )}
            {hasSpanishPdf && (
              <button
                onClick={() => onViewPdf(recipe, true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/15 active:scale-[0.97]"
              >
                <Globe className="h-3.5 w-3.5" />
                {t("recipe.viewSpanish")}
              </button>
            )}
            <a
              href={openInDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("recipe.openDrive")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </>
        ) : (
          <a
            href={RECIPE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors active:scale-[0.97]"
          >
            <FolderOpen className="h-3.5 w-3.5" />
            {t("recipe.findLibrary")}
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
