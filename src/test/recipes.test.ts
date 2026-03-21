import { describe, expect, it } from "vitest";
import { recipes } from "@/data/recipes";

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
});
