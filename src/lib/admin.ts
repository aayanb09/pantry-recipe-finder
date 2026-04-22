import type { Session } from "@supabase/supabase-js";
import type { Recipe } from "@/data/recipes";
import { deleteRemoteRecipe, upsertRemoteRecipe } from "@/lib/recipe-service";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

export function hasBackendConfig() {
  return hasSupabaseConfig;
}

export async function getAdminSession() {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export function subscribeToAdminSession(
  callback: (session: Session | null) => void,
) {
  if (!supabase) {
    return () => undefined;
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return () => subscription.unsubscribe();
}

export async function loginAdmin(email: string, password: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data.session;
}

export async function logoutAdmin() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function saveAdminRecipe(recipe: Recipe) {
  return upsertRemoteRecipe(recipe);
}

export async function deleteAdminRecipe(recipeId: string) {
  return deleteRemoteRecipe(recipeId);
}

export function extractDriveFileIds(input: string) {
  const matches = new Set<string>();
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]{10,})/g,
    /[?&]id=([a-zA-Z0-9_-]{10,})/g,
    /\b([a-zA-Z0-9_-]{20,})\b/g,
  ];

  for (const pattern of patterns) {
    for (const match of input.matchAll(pattern)) {
      const fileId = match[1];
      if (fileId) {
        matches.add(fileId);
      }
    }
  }

  return Array.from(matches);
}

export function slugifyRecipeTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function createRecipeId(title: string, driveFileId: string) {
  const titleSlug = slugifyRecipeTitle(title) || "recipe";
  return `${titleSlug}-${driveFileId.slice(0, 6).toLowerCase()}`;
}
