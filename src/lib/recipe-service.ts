import {
  recipes as bundledRecipes,
  type Recipe,
  type RecipeCategory,
  type RecipeHealthGoal,
} from "@/data/recipes";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

export interface RemoteRecipeRow {
  id: string;
  title: string;
  ingredients: string[];
  category: RecipeCategory;
  health_goals: RecipeHealthGoal[] | null;
  has_spanish: boolean;
  drive_file_id: string | null;
  spanish_drive_file_id: string | null;
  created_at?: string;
}

function toRecipe(row: RemoteRecipeRow): Recipe {
  return {
    id: row.id,
    title: row.title,
    ingredients: row.ingredients ?? [],
    category: row.category,
    healthGoals: row.health_goals ?? [],
    hasSpanish: row.has_spanish,
    driveFileId: row.drive_file_id ?? undefined,
    spanishDriveFileId: row.spanish_drive_file_id ?? undefined,
  };
}

function toRemoteRecipe(recipe: Recipe): RemoteRecipeRow {
  return {
    id: recipe.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    category: recipe.category,
    health_goals: recipe.healthGoals,
    has_spanish: recipe.hasSpanish,
    drive_file_id: recipe.driveFileId ?? null,
    spanish_drive_file_id: recipe.spanishDriveFileId ?? null,
  };
}

export async function fetchRemoteRecipes() {
  if (!supabase) return [] as Recipe[];

  const { data, error } = await supabase
    .from("recipes")
    .select("id,title,ingredients,category,health_goals,has_spanish,drive_file_id,spanish_drive_file_id,created_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []).map((row) => toRecipe(row as RemoteRecipeRow));
}

export async function getAllRecipesFromBackend() {
  if (!hasSupabaseConfig) {
    return bundledRecipes;
  }

  const remoteRecipes = await fetchRemoteRecipes();
  const seenIds = new Set(remoteRecipes.map((recipe) => recipe.id));
  const missingBundledRecipes = bundledRecipes.filter((recipe) => !seenIds.has(recipe.id));
  return [...missingBundledRecipes, ...remoteRecipes];
}

export async function upsertRemoteRecipe(recipe: Recipe) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("recipes").upsert(toRemoteRecipe(recipe));
  if (error) throw error;
}

export async function deleteRemoteRecipe(recipeId: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("recipes").delete().eq("id", recipeId);
  if (error) throw error;
}

export async function getAdminManagedRecipes() {
  if (!hasSupabaseConfig) {
    return [] as Recipe[];
  }

  return fetchRemoteRecipes();
}
