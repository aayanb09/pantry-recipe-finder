import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { allIngredients, ingredientGroups, popularIngredients } from "@/data/recipes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface IngredientPickerProps {
  selected: string[];
  onChange: (ingredients: string[]) => void;
}

const defaultOpenGroups = ["beans-legumes", "vegetables"];

export function IngredientPicker({ selected, onChange }: IngredientPickerProps) {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<string[]>(defaultOpenGroups);

  const query = search.trim().toLowerCase();

  const filteredIngredients = useMemo(() => {
    if (!query) return popularIngredients;
    return allIngredients.filter((ingredient) => ingredient.toLowerCase().includes(query));
  }, [query]);

  const filteredGroups = useMemo(() => {
    if (!query) return ingredientGroups;

    return ingredientGroups
      .map((group) => ({
        ...group,
        ingredients: group.ingredients.filter((ingredient) =>
          ingredient.toLowerCase().includes(query),
        ),
      }))
      .filter((group) => group.ingredients.length > 0);
  }, [query]);

  const toggleIngredient = (ingredient: string) => {
    if (selected.includes(ingredient)) {
      onChange(selected.filter((item) => item !== ingredient));
      return;
    }

    onChange([...selected, ingredient]);
  };

  const toggleGroup = (groupId: string) => {
    setOpenGroups((current) =>
      current.includes(groupId)
        ? current.filter((item) => item !== groupId)
        : [...current, groupId],
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for an ingredient or browse categories below"
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow text-base"
        />
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium transition-all hover:opacity-90 active:scale-[0.97]"
            >
              {ingredient}
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

      {query ? (
        <>
          <div className="flex flex-wrap gap-2">
            {filteredIngredients
              .filter((ingredient) => !selected.includes(ingredient))
              .slice(0, 30)
              .map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className="px-3.5 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium border border-transparent hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.97]"
                >
                  {ingredient}
                </button>
              ))}
          </div>

          {filteredIngredients.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No ingredient names matched that search.
            </p>
          )}
        </>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredGroups.map((group) => {
            const isOpen = openGroups.includes(group.id);

            return (
              <Collapsible
                key={group.id}
                open={isOpen}
                onOpenChange={() => toggleGroup(group.id)}
              >
                <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                  <CollapsibleTrigger className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left hover:bg-muted/35 transition-colors">
                    <div>
                      <p className="text-base font-semibold">{group.label}</p>
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 mt-1 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="border-t border-border data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="flex flex-wrap gap-2 px-5 py-4">
                      {group.ingredients.map((ingredient) => (
                        <button
                          key={ingredient}
                          onClick={() => toggleIngredient(ingredient)}
                          className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all active:scale-[0.97] ${
                            selected.includes(ingredient)
                              ? "bg-accent text-accent-foreground border-accent"
                              : "bg-secondary text-secondary-foreground border-transparent hover:border-primary/30 hover:shadow-sm"
                          }`}
                        >
                          {selected.includes(ingredient) ? `${ingredient} ✓` : ingredient}
                        </button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
        </div>
      )}

      {!query && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Start with a category like beans or vegetables, or type to search all {allIngredients.length} ingredients.
        </p>
      )}
    </div>
  );
}
