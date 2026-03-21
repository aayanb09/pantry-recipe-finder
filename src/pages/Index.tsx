import { useState, useMemo, useRef, useEffect } from "react";
import { ChefHat, UtensilsCrossed, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";
import { recipes, type Recipe, type RecipeCategory } from "@/data/recipes";
import { IngredientPicker } from "@/components/IngredientPicker";
import { RecipeCard } from "@/components/RecipeCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { RecipeViewer } from "@/components/RecipeViewer";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} ${className}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </div>
  );
}

const Index = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [viewingRecipe, setViewingRecipe] = useState<{ recipe: Recipe; spanish?: boolean } | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filteredRecipes = useMemo(() => {
    let result = recipes;

    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (selectedIngredients.length > 0) {
      result = result
        .map((r) => ({
          recipe: r,
          matchCount: r.ingredients.filter((i) => selectedIngredients.includes(i)).length,
        }))
        .filter((r) => r.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .map((r) => r.recipe);
    }

    return result;
  }, [selectedIngredients, selectedCategory]);

  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* PDF Viewer Modal */}
      {viewingRecipe && (
        <RecipeViewer
          recipe={viewingRecipe.recipe}
          spanish={viewingRecipe.spanish}
          onClose={() => setViewingRecipe(null)}
        />
      )}
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Recipe Finder</span>
          </div>
          <a
            href="https://drive.google.com/drive/folders/1JDEg1DdvElV0Y1bl4U9n8MI3ANX_lKv1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse all PDFs →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fresh vegetables, fruits, beans and grains on a wooden table"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative container py-20 md:py-28">
          <div className="max-w-lg animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] mb-4" style={{ lineHeight: 1.1 }}>
              What's in your kitchen today?
            </h1>
            <p className="text-lg text-white/85 mb-8 max-w-md leading-relaxed">
              Find easy, delicious recipes using the ingredients you already have at home or received from the pantry.
            </p>
            <button
              onClick={scrollToResults}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.97]"
            >
              Find recipes
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Ingredient Picker Section */}
      <Section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Select your ingredients</h2>
            <p className="text-muted-foreground">
              Pick what you have and we'll find matching recipes
            </p>
          </div>
          <IngredientPicker selected={selectedIngredients} onChange={setSelectedIngredients} />
        </div>
      </Section>

      {/* Results */}
      <div ref={resultsRef} className="scroll-mt-16">
        <Section className="pb-16 md:pb-24">
          <div className="container">
            {/* Category filter */}
            <div className="mb-8">
              <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
            </div>

            {/* Count */}
            <div className="flex items-center gap-2 mb-6">
              <UtensilsCrossed className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 && "s"} found
                {selectedIngredients.length > 0 && ` for ${selectedIngredients.length} ingredient${selectedIngredients.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            {/* Grid */}
            {filteredRecipes.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe, i) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    matchedIngredients={selectedIngredients}
                    index={i}
                    onViewPdf={(r, spanish) => setViewingRecipe({ recipe: r, spanish })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <p className="text-xl font-semibold mb-2">No recipes match yet</p>
                <p className="text-muted-foreground">
                  Try selecting different ingredients or clearing your filters
                </p>
              </div>
            )}
          </div>
        </Section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Recipes by The Food Bank for Central & Northeast Missouri · 
            <a
              href="https://drive.google.com/drive/folders/1JDEg1DdvElV0Y1bl4U9n8MI3ANX_lKv1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              View full recipe library
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
