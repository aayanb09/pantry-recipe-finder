import { describe, expect, it } from "vitest";
import {
  createRecipeId,
  extractDriveFileIds,
  slugifyRecipeTitle,
} from "@/lib/admin";

describe("admin utilities", () => {
  it("extracts unique Drive file ids from pasted links", () => {
    const input = [
      "https://drive.google.com/file/d/1AbCdEfGhIJkLmNoPqRsTuVwXyZ123456/view?usp=drive_link",
      "https://drive.google.com/open?id=2BcDeFgHiJkLmNoPqRsTuVwXyZ1234567",
      "1AbCdEfGhIJkLmNoPqRsTuVwXyZ123456",
    ].join("\n");

    expect(extractDriveFileIds(input)).toEqual([
      "1AbCdEfGhIJkLmNoPqRsTuVwXyZ123456",
      "2BcDeFgHiJkLmNoPqRsTuVwXyZ1234567",
    ]);
  });

  it("slugifies recipe titles for generated ids", () => {
    expect(slugifyRecipeTitle("Black Bean & Corn Salad with Lime Dressing")).toBe(
      "black-bean-corn-salad-with-lime-dressing",
    );
  });

  it("creates stable recipe ids from title and drive file id", () => {
    expect(createRecipeId("Fresh Tomato Pasta", "1AbCdEfGhIJkLmNoPqRsTuVwXyZ123456")).toBe(
      "fresh-tomato-pasta-1abcde",
    );
  });
});
