import type { RecipeCategory } from "@/data/recipes";
import { allCategories } from "@/data/recipes";

interface CategoryFilterProps {
  selected: RecipeCategory | null;
  onChange: (cat: RecipeCategory | null) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const emoji: Record<string, string> = {
    "Vegetables": "🥬",
    "Fruits": "🍎",
    "Beans & Legumes": "🫘",
    "Grains & Pasta": "🍝",
    "Protein": "🍗",
    "Soups & Stews": "🍲",
    "Snacks & Sides": "🥨",
    "Desserts": "🍪",
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-card text-foreground border border-border hover:bg-secondary/65"
        }`}
      >
        All Recipes
      </button>
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(selected === cat ? null : cat)}
          className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.97] ${
            selected === cat
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-card text-foreground border border-border hover:bg-secondary/65"
          }`}
        >
          <span className="mr-1.5">{emoji[cat]}</span>
          {cat}
        </button>
      ))}
    </div>
  );
}
