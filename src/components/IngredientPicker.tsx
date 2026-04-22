import { useMemo, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import type { IngredientGroup } from "@/data/recipes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from "@/lib/i18n";

interface IngredientPickerProps {
  selected: string[];
  allIngredients: string[];
  ingredientGroups: IngredientGroup[];
  popularIngredients: string[];
  onChange: (ingredients: string[]) => void;
}

const defaultOpenGroups = ["beans-legumes", "vegetables"];

export function IngredientPicker({
  selected,
  allIngredients,
  ingredientGroups,
  popularIngredients,
  onChange,
}: IngredientPickerProps) {
  const { t, translateIngredientGroupDescription, translateIngredientGroupLabel } = useLanguage();
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
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={t("ingredientPicker.searchPlaceholder")}
          className="brand-surface h-12 w-full rounded-xl border border-border pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selected.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground transition-all hover:brightness-105 active:scale-[0.97]"
            >
              {ingredient}
              <X className="h-3.5 w-3.5" />
            </button>
          ))}
          <button
            onClick={() => onChange([])}
            className="rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("ingredientPicker.clearAll")}
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
                  className="rounded-lg border border-transparent bg-secondary px-3.5 py-2 text-sm font-medium text-secondary-foreground transition-all hover:border-primary/30 hover:shadow-sm active:scale-[0.97]"
                >
                  {ingredient}
                </button>
              ))}
          </div>

          {filteredIngredients.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              {t("ingredientPicker.noMatches")}
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
                <div className="brand-surface overflow-hidden rounded-2xl border border-border">
                  <CollapsibleTrigger className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40">
                    <div>
                      <p className="text-base font-semibold">
                        {translateIngredientGroupLabel(group.id, group.label)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {translateIngredientGroupDescription(group.id, group.description)}
                      </p>
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
                              ? "border-accent bg-accent text-accent-foreground"
                              : "border-transparent bg-secondary text-secondary-foreground hover:border-primary/30 hover:shadow-sm"
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
          {t("ingredientPicker.helper", { count: allIngredients.length })}
        </p>
      )}
    </div>
  );
}
