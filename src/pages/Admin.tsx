import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { FolderSync, LockKeyhole, LogOut, Plus, ShieldCheck, Trash2 } from "lucide-react";
import {
  allCategories,
  healthGoals,
  type Recipe,
  type RecipeCategory,
  type RecipeHealthGoal,
} from "@/data/recipes";
import { LanguageSelector } from "@/components/LanguageSelector";
import {
  createRecipeId,
  deleteAdminRecipe,
  extractDriveFileIds,
  getAdminSession,
  hasBackendConfig,
  loginAdmin,
  logoutAdmin,
  saveAdminRecipe,
  subscribeToAdminSession,
} from "@/lib/admin";
import { useLanguage } from "@/lib/i18n";
import { getAdminManagedRecipes, getAllRecipesFromBackend } from "@/lib/recipe-service";

interface DraftRecipe {
  fileId: string;
  title: string;
  category: RecipeCategory;
  ingredients: string;
  healthGoals: RecipeHealthGoal[];
  hasSpanish: boolean;
  spanishDriveFileId: string;
}

const defaultCategory: RecipeCategory = "Vegetables";

function createDraft(fileId: string): DraftRecipe {
  return {
    fileId,
    title: "",
    category: defaultCategory,
    ingredients: "",
    healthGoals: [],
    hasSpanish: false,
    spanishDriveFileId: "",
  };
}

const Admin = () => {
  const { t, translateCategory, translateHealthGoal } = useLanguage();
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [syncInput, setSyncInput] = useState("");
  const [detectedFileIds, setDetectedFileIds] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DraftRecipe>>({});
  const [syncStatus, setSyncStatus] = useState("");
  const [storedRecipes, setStoredRecipes] = useState<Recipe[]>([]);
  const [catalogCount, setCatalogCount] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!hasBackendConfig()) {
      setAuthLoading(false);
      setDataLoading(false);
      return;
    }

    let cancelled = false;

    const loadSession = async () => {
      try {
        const activeSession = await getAdminSession();
        if (!cancelled) {
          setSession(activeSession);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    };

    void loadSession();

    const unsubscribe = subscribeToAdminSession((nextSession) => {
      if (!cancelled) {
        setSession(nextSession);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setStoredRecipes([]);
      setCatalogCount(0);
      setDataLoading(false);
      return;
    }

    let cancelled = false;

    const loadRecipes = async () => {
      setDataLoading(true);

      try {
        const [managedRecipes, allRecipes] = await Promise.all([
          getAdminManagedRecipes(),
          getAllRecipesFromBackend(),
        ]);

        if (!cancelled) {
          setStoredRecipes(managedRecipes);
          setCatalogCount(allRecipes.length);
        }
      } catch (error) {
        if (!cancelled) {
          setSyncStatus(error instanceof Error ? error.message : t("admin.statusLoadError"));
        }
      } finally {
        if (!cancelled) {
          setDataLoading(false);
        }
      }
    };

    void loadRecipes();

    return () => {
      cancelled = true;
    };
  }, [session]);

  const syncedFileIds = useMemo(
    () => new Set(
      storedRecipes
        .flatMap((recipe) => [recipe.driveFileId, recipe.spanishDriveFileId])
        .filter((fileId): fileId is string => Boolean(fileId)),
    ),
    [storedRecipes],
  );

  const unsyncedFileIds = useMemo(
    () => detectedFileIds.filter((fileId) => !syncedFileIds.has(fileId)),
    [detectedFileIds, syncedFileIds],
  );

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError("");

    try {
      const nextSession = await loginAdmin(email, password);
      setSession(nextSession);
      setPassword("");
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : t("admin.statusSignInError"));
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setSession(null);
    setPassword("");
  };

  const refreshRecipes = async () => {
    const [managedRecipes, allRecipes] = await Promise.all([
      getAdminManagedRecipes(),
      getAllRecipesFromBackend(),
    ]);

    setStoredRecipes(managedRecipes);
    setCatalogCount(allRecipes.length);
  };

  const runDetection = () => {
    const fileIds = extractDriveFileIds(syncInput);
    setDetectedFileIds(fileIds);
    setSyncStatus(
      fileIds.length === 0
        ? t("admin.statusNoFiles")
        : t("admin.statusDetectedFiles", {
            count: fileIds.length,
            plural: fileIds.length === 1 ? "" : "s",
          }),
    );

    setDrafts((current) => {
      const next = { ...current };
      fileIds.forEach((fileId) => {
        next[fileId] = current[fileId] ?? createDraft(fileId);
      });
      return next;
    });
  };

  const updateDraft = (fileId: string, patch: Partial<DraftRecipe>) => {
    setDrafts((current) => ({
      ...current,
      [fileId]: {
        ...(current[fileId] ?? createDraft(fileId)),
        ...patch,
      },
    }));
  };

  const toggleDraftHealthGoal = (fileId: string, goal: RecipeHealthGoal) => {
    const currentGoals = drafts[fileId]?.healthGoals ?? [];
    updateDraft(fileId, {
      healthGoals: currentGoals.includes(goal)
        ? currentGoals.filter((item) => item !== goal)
        : [...currentGoals, goal],
    });
  };

  const syncRecipe = async (fileId: string) => {
    const draft = drafts[fileId];
    if (!draft) return;

    const ingredients = draft.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);

    if (!draft.title.trim() || ingredients.length === 0) {
      setSyncStatus(t("admin.statusMissingRecipeFields"));
      return;
    }

    const nextRecipe: Recipe = {
      id: createRecipeId(draft.title, fileId),
      title: draft.title.trim(),
      ingredients,
      category: draft.category,
      healthGoals: draft.healthGoals,
      hasSpanish: draft.hasSpanish,
      driveFileId: fileId,
      spanishDriveFileId: draft.hasSpanish && draft.spanishDriveFileId.trim()
        ? draft.spanishDriveFileId.trim()
        : undefined,
    };

    try {
      await saveAdminRecipe(nextRecipe);
      await refreshRecipes();
      setSyncStatus(t("admin.statusSyncedRecipe", { title: nextRecipe.title }));
    } catch (error) {
      setSyncStatus(error instanceof Error ? error.message : t("admin.statusSyncError"));
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    try {
      await deleteAdminRecipe(recipeId);
      await refreshRecipes();
    } catch (error) {
      setSyncStatus(error instanceof Error ? error.message : t("admin.statusRemoveError"));
    }
  };

  if (!hasBackendConfig()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t("admin.setupEyebrow")}
          </p>
          <h1 className="mb-3 text-3xl font-bold">{t("admin.setupTitle")}</h1>
          <p className="mb-6 text-muted-foreground">{t("admin.setupBody")}</p>
          <Link to="/" className="inline-flex rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90">
            {t("admin.backHome")}
          </Link>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="rounded-2xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground">
          {t("admin.loadingSession")}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-stretch">
          <div className="flex-1 rounded-[2rem] border border-border/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.95),rgba(245,239,224,0.94))] p-8 shadow-[0_24px_70px_rgba(59,69,89,0.08)]">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t("admin.loginEyebrow")}
            </p>
            <h1 className="mb-3 text-4xl font-bold leading-tight">{t("admin.loginTitle")}</h1>
            <p className="max-w-xl text-base text-muted-foreground">{t("admin.loginBody")}</p>
          </div>

          <div className="brand-surface w-full max-w-md rounded-[2rem] border border-border p-8 shadow-[0_20px_60px_rgba(59,69,89,0.08)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{t("admin.loginEyebrow")}</h2>
                
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium">{t("admin.loginEmail")}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card px-4 outline-none transition-shadow focus:ring-2 focus:ring-primary/25"
                  autoComplete="username"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">{t("admin.loginPassword")}</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-border bg-card px-4 outline-none transition-shadow focus:ring-2 focus:ring-primary/25"
                  autoComplete="current-password"
                />
              </label>

              {loginError && (
                <p className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("admin.loginButton")}
              </button>
            </form>

            
            <Link to="/" className="mt-6 inline-flex text-sm font-medium text-primary hover:underline">
              {t("admin.backHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="brand-panel sticky top-0 z-50 border-b border-border">
        <div className="container flex min-h-24 flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">Meal Maker</p>
            <h1 className="text-2xl font-bold">{t("admin.dashboardTitle")}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link to="/" className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary/40">
              {t("admin.viewPublicSite")}
            </Link>
            <button
              onClick={() => void handleLogout()}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <LogOut className="h-4 w-4" />
              {t("admin.signOut")}
            </button>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="brand-surface rounded-2xl border border-border p-5">
            <p className="text-sm text-muted-foreground">{t("admin.totalRecipes")}</p>
            <p className="mt-2 text-3xl font-bold">{catalogCount}</p>
          </div>
          <div className="brand-surface rounded-2xl border border-border p-5">
            <p className="text-sm text-muted-foreground">{t("admin.backendRecipes")}</p>
            <p className="mt-2 text-3xl font-bold">{storedRecipes.length}</p>
          </div>
          <div className="brand-surface rounded-2xl border border-border p-5">
            <p className="text-sm text-muted-foreground">{t("admin.trackedDriveIds")}</p>
            <p className="mt-2 text-3xl font-bold">{syncedFileIds.size}</p>
          </div>
        </div>

        <section className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-8">
            <div className="brand-surface rounded-[2rem] border border-border p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
                  <FolderSync className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{t("admin.syncTitle")}</h2>
                  <p className="text-sm text-muted-foreground">{t("admin.syncBody")}</p>
                </div>
              </div>

              <textarea
                value={syncInput}
                onChange={(event) => setSyncInput(event.target.value)}
                placeholder={t("admin.syncPlaceholder")}
                className="min-h-40 w-full rounded-2xl border border-border bg-card px-4 py-3 outline-none transition-shadow focus:ring-2 focus:ring-primary/25"
              />

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={runDetection}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Plus className="h-4 w-4" />
                  {t("admin.detectFiles")}
                </button>
                {syncStatus && <p className="text-sm text-muted-foreground">{syncStatus}</p>}
              </div>
            </div>

            <div className="space-y-4">
              {unsyncedFileIds.length > 0 ? (
                unsyncedFileIds.map((fileId) => {
                  const draft = drafts[fileId] ?? createDraft(fileId);

                  return (
                    <div key={fileId} className="brand-surface rounded-[1.75rem] border border-border p-6">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-primary">{t("admin.newDriveFile")}</p>
                          <p className="text-xs text-muted-foreground break-all">{fileId}</p>
                        </div>
                        <a
                          href={`https://drive.google.com/file/d/${fileId}/view`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {t("admin.openInDrive")}
                        </a>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <label className="block">
                          <span className="mb-2 block text-sm font-medium">{t("admin.recipeTitle")}</span>
                          <input
                            value={draft.title}
                            onChange={(event) => updateDraft(fileId, { title: event.target.value })}
                            className="h-11 w-full rounded-xl border border-border bg-card px-4 outline-none transition-shadow focus:ring-2 focus:ring-primary/25"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-medium">{t("admin.category")}</span>
                          <select
                            value={draft.category}
                            onChange={(event) => updateDraft(fileId, { category: event.target.value as RecipeCategory })}
                            className="h-11 w-full rounded-xl border border-border bg-card px-4 outline-none transition-shadow focus:ring-2 focus:ring-primary/25"
                          >
                            {allCategories.map((category) => (
                              <option key={category} value={category}>{translateCategory(category)}</option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <label className="mt-4 block">
                        <span className="mb-2 block text-sm font-medium">{t("admin.ingredients")}</span>
                        <input
                          value={draft.ingredients}
                          onChange={(event) => updateDraft(fileId, { ingredients: event.target.value })}
                          placeholder={t("admin.ingredientsPlaceholder")}
                          className="h-11 w-full rounded-xl border border-border bg-card px-4 outline-none transition-shadow focus:ring-2 focus:ring-primary/25"
                        />
                      </label>

                      <div className="mt-4">
                        <p className="mb-2 text-sm font-medium">{t("admin.healthGoals")}</p>
                        <div className="flex flex-wrap gap-2">
                          {healthGoals.map((goal) => {
                            const isSelected = draft.healthGoals.includes(goal.id);

                            return (
                              <button
                                key={goal.id}
                                onClick={() => toggleDraftHealthGoal(fileId, goal.id)}
                                className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-card hover:bg-secondary/35"
                                }`}
                              >
                                {translateHealthGoal(goal.id)}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr]">
                        <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3">
                          <input
                            type="checkbox"
                            checked={draft.hasSpanish}
                            onChange={(event) => updateDraft(fileId, { hasSpanish: event.target.checked })}
                          />
                          <span className="text-sm font-medium">{t("admin.spanishPdf")}</span>
                        </label>

                        <label className="block">
                          <span className="mb-2 block text-sm font-medium">{t("admin.spanishFileId")}</span>
                          <input
                            value={draft.spanishDriveFileId}
                            onChange={(event) => updateDraft(fileId, { spanishDriveFileId: event.target.value })}
                            disabled={!draft.hasSpanish}
                            className="h-11 w-full rounded-xl border border-border bg-card px-4 outline-none transition-shadow disabled:cursor-not-allowed disabled:opacity-50 focus:ring-2 focus:ring-primary/25"
                          />
                        </label>
                      </div>

                      <div className="mt-5">
                        <button
                          onClick={() => void syncRecipe(fileId)}
                          className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                        >
                          {t("admin.syncRecipe")}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-[1.75rem] border border-dashed border-border bg-card/40 px-6 py-10 text-center">
                  <p className="text-lg font-semibold">{t("admin.noUnsyncedTitle")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t("admin.noUnsyncedBody")}</p>
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="brand-surface rounded-[2rem] border border-border p-6">
              <h2 className="text-lg font-semibold">{t("admin.notesTitle")}</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>{t("admin.notesOne")}</li>
                <li>{t("admin.notesTwo")}</li>
                <li>{t("admin.notesThree")}</li>
              </ul>
            </div>

            <div className="brand-surface rounded-[2rem] border border-border p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{t("admin.sharedRecipes")}</h2>
                  <p className="text-sm text-muted-foreground">{t("admin.sharedRecipesBody")}</p>
                </div>
              </div>

              {dataLoading ? (
                <p className="text-sm text-muted-foreground">{t("admin.loadingRecipes")}</p>
              ) : storedRecipes.length > 0 ? (
                <div className="space-y-3">
                  {storedRecipes
                    .slice()
                    .reverse()
                    .map((recipe) => (
                      <div key={recipe.id} className="rounded-2xl border border-border bg-card/70 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold">{recipe.title}</p>
                            <p className="text-xs text-muted-foreground">{translateCategory(recipe.category)}</p>
                            <p className="mt-2 text-xs text-muted-foreground break-all">{recipe.driveFileId}</p>
                          </div>
                          <button
                            onClick={() => void deleteRecipe(recipe.id)}
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                            aria-label={`${t("admin.removeRecipe")}: ${recipe.title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t("admin.noBackendRecipes")}</p>
              )}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Admin;
