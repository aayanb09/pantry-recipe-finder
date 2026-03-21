import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { popularIngredients, allIngredients } from "@/data/recipes";

interface IngredientPickerProps {
  selected: string[];
  onChange: (ingredients: string[]) => void;
}

export function IngredientPicker({ selected, onChange }: IngredientPickerProps) {
  const [search, setSearch] = useState("");

  const filteredIngredients = useMemo(() => {
    if (!search.trim()) return popularIngredients;
    const q = search.toLowerCase();
    return allIngredients.filter((i) => i.toLowerCase().includes(q));
  }, [search]);

  const toggle = (ingredient: string) => {
    if (selected.includes(ingredient)) {
      onChange(selected.filter((s) => s !== ingredient));
    } else {
      onChange([...selected, ingredient]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search input */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for an ingredient…"
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow text-base"
        />
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((ing) => (
            <button
              key={ing}
              onClick={() => toggle(ing)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium transition-all hover:opacity-90 active:scale-[0.97]"
            >
              {ing}
              <X className="h-3.5 w-3.5" />
            </button>
          ))}
          <button
            onClick={() => onChange([])}
            className="px-3.5 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Ingredient grid */}
      <div className="flex flex-wrap gap-2">
        {filteredIngredients
          .filter((i) => !selected.includes(i))
          .slice(0, 24)
          .map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggle(ingredient)}
              className="px-3.5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-transparent hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.97]"
            >
              {ingredient}
            </button>
          ))}
      </div>

      {!search && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Showing popular ingredients · Type to search all {allIngredients.length} ingredients
        </p>
      )}
    </div>
  );
}
