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

  it("filters recipes by a selected health goal", () => {
    const matches = getFilteredRecipes(recipes, {
      selectedHealthGoals: ["Heart Healthy"],
    });

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((recipe) => recipe.healthGoals.includes("Heart Healthy"))).toBe(true);
  });

  it("requires recipes to satisfy every selected health goal", () => {
    const matches = getFilteredRecipes(recipes, {
      selectedHealthGoals: ["Heart Healthy", "Diabetes Friendly"],
    });

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((recipe) => (
      recipe.healthGoals.includes("Heart Healthy")
      && recipe.healthGoals.includes("Diabetes Friendly")
    ))).toBe(true);
    expect(matches.map((recipe) => recipe.id)).not.toContain("fruit-salad");
  });

  it("supports newer high-fiber filtering", () => {
    const matches = getFilteredRecipes(recipes, {
      selectedHealthGoals: ["High Fiber"],
    });

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((recipe) => recipe.healthGoals.includes("High Fiber"))).toBe(true);
    expect(matches.map((recipe) => recipe.id)).toContain("lentil-soup");
  });

  it("supports newer protein-rich filtering", () => {
    const matches = getFilteredRecipes(recipes, {
      selectedHealthGoals: ["Protein Rich"],
    });

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((recipe) => recipe.healthGoals.includes("Protein Rich"))).toBe(true);
    expect(matches.map((recipe) => recipe.id)).toContain("hummus");
  });

  it("provides grouped ingredient options for expandable picker sections", () => {
    const beanGroup = ingredientGroups.find((group) => group.id === "beans-legumes");

    expect(beanGroup?.ingredients).toEqual(
      expect.arrayContaining(["Black Beans", "Kidney Beans", "Chickpeas", "Lentils"]),
    );
  });
});
