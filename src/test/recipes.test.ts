import { describe, expect, it } from "vitest";
import { getFilteredRecipes, ingredientGroups, recipes } from "@/data/recipes";

describe("recipe PDF mappings", () => {
  it("provides at least one direct PDF id for every recipe", () => {
    const missing = recipes.filter((recipe) => !recipe.driveFileId && !recipe.spanishDriveFileId);
    expect(missing).toEqual([]);
  });

  it("does not reuse recipe ids", () => {
    const seen = new Set<string>();
    const duplicates = recipes.filter((recipe) => {
      if (seen.has(recipe.id)) return true;
      seen.add(recipe.id);
      return false;
    });

    expect(duplicates).toEqual([]);
  });

  it("finds recipes by title search", () => {
    const matches = getFilteredRecipes(recipes, { searchQuery: "hummus" });

    expect(matches.map((recipe) => recipe.title)).toContain("Delicious Hummus");
    expect(matches.map((recipe) => recipe.title)).toContain("Flavorful Hummus");
  });

  it("keeps direct title matches ahead of ingredient-only matches", () => {
    const matches = getFilteredRecipes(recipes, { searchQuery: "black bean" });

    expect(matches[0]?.title).toBe("Black Bean & Corn Salad with Lime Dressing");
  });

  it("provides grouped ingredient options for expandable picker sections", () => {
    const beanGroup = ingredientGroups.find((group) => group.id === "beans-legumes");

    expect(beanGroup?.ingredients).toEqual(
      expect.arrayContaining(["Black Beans", "Kidney Beans", "Chickpeas", "Lentils"]),
    );
  });
});
