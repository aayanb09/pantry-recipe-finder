import { ExternalLink, Globe } from "lucide-react";
import type { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  matchedIngredients: string[];
  index: number;
}

export function RecipeCard({ recipe, matchedIngredients, index }: RecipeCardProps) {
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

  return (
    <div
      className="group bg-card rounded-2xl border border-border p-5 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${Math.min(index * 60, 600)}ms` }}
    >
      {/* Category + Spanish badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{categoryEmoji[recipe.category] || "📄"}</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {recipe.category}
        </span>
        {recipe.hasSpanish && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
            <Globe className="h-3 w-3" />
            Español
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
                ? "bg-accent/15 text-accent border border-accent/25"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {matchedIngredients.includes(ing) && "✓ "}
            {ing}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={recipe.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline transition-colors active:scale-[0.97]"
      >
        View recipe
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
