import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { RecipeCategory, RecipeHealthGoal } from "@/data/recipes";

export type LanguageCode = "en" | "es";

interface LanguageOption {
  code: LanguageCode;
  label: string;
}

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  translateCategory: (category: RecipeCategory) => string;
  translateHealthGoal: (goal: RecipeHealthGoal) => string;
  translateHealthGoalDescription: (goal: RecipeHealthGoal) => string;
  translateIngredientGroupLabel: (groupId: string, fallback: string) => string;
  translateIngredientGroupDescription: (groupId: string, fallback: string) => string;
  languageOptions: LanguageOption[];
}

const LANGUAGE_STORAGE_KEY = "meal-maker-language";

export const languageOptions: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const categoriesByLanguage: Record<LanguageCode, Record<RecipeCategory, string>> = {
  en: {
    "Vegetables": "Vegetables",
    "Fruits": "Fruits",
    "Beans & Legumes": "Beans & Legumes",
    "Grains & Pasta": "Grains & Pasta",
    "Protein": "Protein",
    "Soups & Stews": "Soups & Stews",
    "Snacks & Sides": "Snacks & Sides",
    "Desserts": "Desserts",
    "Sauces & Dips": "Sauces & Dips",
  },
  es: {
    "Vegetables": "Verduras",
    "Fruits": "Frutas",
    "Beans & Legumes": "Frijoles y legumbres",
    "Grains & Pasta": "Granos y pasta",
    "Protein": "Proteína",
    "Soups & Stews": "Sopas y guisos",
    "Snacks & Sides": "Bocadillos y acompañamientos",
    "Desserts": "Postres",
    "Sauces & Dips": "Salsas y dips",
  },
};

const healthGoalLabels: Record<LanguageCode, Record<RecipeHealthGoal, string>> = {
  en: {
    "Heart Healthy": "Heart Healthy",
    "Diabetes Friendly": "Diabetes Friendly",
    "High Fiber": "High Fiber",
    "Protein Rich": "Protein Rich",
  },
  es: {
    "Heart Healthy": "Saludable para el corazón",
    "Diabetes Friendly": "Apto para diabetes",
    "High Fiber": "Alto en fibra",
    "Protein Rich": "Rico en proteína",
  },
};

const healthGoalDescriptions: Record<LanguageCode, Record<RecipeHealthGoal, string>> = {
  en: {
    "Heart Healthy": "Recipes centered on produce, beans, and lighter cooking fats.",
    "Diabetes Friendly": "Recipes with more fiber-forward, savory ingredients and fewer sweets.",
    "High Fiber": "Recipes built around beans, lentils, vegetables, fruits, or oats.",
    "Protein Rich": "Recipes with beans, lentils, dairy, eggs, nuts, or meat as a key ingredient.",
  },
  es: {
    "Heart Healthy": "Recetas centradas en vegetales, frijoles y grasas de cocina más ligeras.",
    "Diabetes Friendly": "Recetas con más fibra, ingredientes salados y menos dulces.",
    "High Fiber": "Recetas basadas en frijoles, lentejas, verduras, frutas o avena.",
    "Protein Rich": "Recetas con frijoles, lentejas, lácteos, huevos, nueces o carne como ingrediente principal.",
  },
};

const ingredientGroupLabels: Record<LanguageCode, Record<string, string>> = {
  en: {
    "beans-legumes": "Beans & Legumes",
    vegetables: "Vegetables",
    fruit: "Fruit",
    "grains-starches": "Grains & Starches",
    "protein-dairy": "Protein & Dairy",
    flavorings: "Seasonings & Sauces",
  },
  es: {
    "beans-legumes": "Frijoles y legumbres",
    vegetables: "Verduras",
    fruit: "Fruta",
    "grains-starches": "Granos y almidones",
    "protein-dairy": "Proteína y lácteos",
    flavorings: "Condimentos y salsas",
  },
};

const ingredientGroupDescriptions: Record<LanguageCode, Record<string, string>> = {
  en: {
    "beans-legumes": "Choose the kind of beans, peas, or lentils you have.",
    vegetables: "Fresh, frozen, and canned produce.",
    fruit: "Whole fruit and fruit mixes.",
    "grains-starches": "Pasta, rice, oats, and other pantry staples.",
    "protein-dairy": "Meat, eggs, cheese, and creamy basics.",
    flavorings: "Aromatics, sauces, oils, and flavor builders.",
  },
  es: {
    "beans-legumes": "Elige el tipo de frijoles, chícharos o lentejas que tienes.",
    vegetables: "Productos frescos, congelados y enlatados.",
    fruit: "Fruta entera y mezclas de fruta.",
    "grains-starches": "Pasta, arroz, avena y otros básicos de despensa.",
    "protein-dairy": "Carne, huevos, queso y básicos cremosos.",
    flavorings: "Aromáticos, salsas, aceites y potenciadores de sabor.",
  },
};

type TranslationKey =
  | "nav.tagline"
  | "nav.browsePdfs"
  | "nav.admin"
  | "nav.language"
  | "nav.logoAlt"
  | "hero.badge"
  | "hero.title"
  | "hero.description"
  | "hero.cta"
  | "hero.imageAlt"
  | "ingredients.title"
  | "ingredients.subtitle"
  | "ingredientPicker.searchPlaceholder"
  | "ingredientPicker.noMatches"
  | "ingredientPicker.helper"
  | "ingredientPicker.clearAll"
  | "health.title"
  | "health.subtitle"
  | "category.allRecipes"
  | "search.label"
  | "search.placeholder"
  | "search.clear"
  | "results.loadingTitle"
  | "results.loadingBody"
  | "results.emptyTitle"
  | "results.emptyBody"
  | "results.count"
  | "footer.credit"
  | "footer.link"
  | "recipe.spanish"
  | "recipe.viewRecipe"
  | "recipe.openDrive"
  | "recipe.findLibrary"
  | "recipe.viewSpanish"
  | "viewer.spanish"
  | "viewer.frameTitle"
  | "viewer.close"
  | "notFound.eyebrow"
  | "notFound.title"
  | "notFound.body"
  | "notFound.back"
  | "admin.setupEyebrow"
  | "admin.setupTitle"
  | "admin.setupBody"
  | "admin.loadingSession"
  | "admin.loginEyebrow"
  | "admin.loginTitle"
  | "admin.loginBody"
  | "admin.loginSharedBackend"
  | "admin.loginSharedBackendBody"
  | "admin.loginProtectedRoute"
  | "admin.loginProtectedRouteBody"
  | "admin.loginEmail"
  | "admin.loginPassword"
  | "admin.loginButton"
  | "admin.loginHelp"
  | "admin.backHome"
  | "admin.dashboardTitle"
  | "admin.viewPublicSite"
  | "admin.signOut"
  | "admin.totalRecipes"
  | "admin.backendRecipes"
  | "admin.trackedDriveIds"
  | "admin.syncTitle"
  | "admin.syncBody"
  | "admin.syncPlaceholder"
  | "admin.detectFiles"
  | "admin.newDriveFile"
  | "admin.openInDrive"
  | "admin.recipeTitle"
  | "admin.category"
  | "admin.ingredients"
  | "admin.ingredientsPlaceholder"
  | "admin.healthGoals"
  | "admin.spanishPdf"
  | "admin.spanishFileId"
  | "admin.syncRecipe"
  | "admin.noUnsyncedTitle"
  | "admin.noUnsyncedBody"
  | "admin.statusNoFiles"
  | "admin.statusDetectedFiles"
  | "admin.statusMissingRecipeFields"
  | "admin.statusSyncedRecipe"
  | "admin.statusLoadError"
  | "admin.statusSignInError"
  | "admin.statusSyncError"
  | "admin.statusRemoveError"
  | "admin.notesTitle"
  | "admin.notesOne"
  | "admin.notesTwo"
  | "admin.notesThree"
  | "admin.sharedRecipes"
  | "admin.sharedRecipesBody"
  | "admin.loadingRecipes"
  | "admin.noBackendRecipes"
  | "admin.removeRecipe";

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    "nav.tagline": "Pantry recipes made simple",
    "nav.browsePdfs": "Browse all PDFs",
    "nav.admin": "Admin",
    "nav.language": "Language",
    "nav.logoAlt": "The Food Bank for Central & Northeast Missouri",
    "hero.badge": "Food Bank Recipe Finder",
    "hero.title": "What's in your kitchen today?",
    "hero.description": "Find easy, delicious recipes using the ingredients you already have at home or received from the pantry. All PDFs are made by The Food Bank for Central & Northeast Missouri.",
    "hero.cta": "Find recipes",
    "hero.imageAlt": "Fresh vegetables, fruits, beans and grains on a wooden table",
    "ingredients.title": "Select your ingredients",
    "ingredients.subtitle": "Pick what you have and we'll find matching recipes",
    "ingredientPicker.searchPlaceholder": "Search for an ingredient or browse categories below",
    "ingredientPicker.noMatches": "No ingredient names matched that search.",
    "ingredientPicker.helper": "Start with a category like beans or vegetables, or type to search all {count} ingredients.",
    "ingredientPicker.clearAll": "Clear all",
    "health.title": "Health needs",
    "health.subtitle": "Turn on one or more goals to only show recipes that fit every selected need.",
    "category.allRecipes": "All Recipes",
    "search.label": "Search recipes by name or ingredient",
    "search.placeholder": "Try hummus, lentil soup, zucchini, or tacos",
    "search.clear": "Clear recipe search",
    "results.loadingTitle": "Loading recipes",
    "results.loadingBody": "Pulling the latest catalog from the shared recipe library.",
    "results.emptyTitle": "No recipes match yet",
    "results.emptyBody": "Try a different recipe name, adjust a health toggle, select other ingredients, or clear your filters",
    "results.count": "{count} recipe{plural} found",
    "footer.credit": "Recipes by The Food Bank for Central & Northeast Missouri",
    "footer.link": "View full recipe library",
    "recipe.spanish": "Español",
    "recipe.viewRecipe": "View recipe",
    "recipe.openDrive": "Open in Drive",
    "recipe.findLibrary": "Find in recipe library",
    "recipe.viewSpanish": "View in Spanish",
    "viewer.spanish": "(Español)",
    "viewer.frameTitle": "{title} recipe PDF",
    "viewer.close": "Close recipe viewer",
    "notFound.eyebrow": "Page Not Found",
    "notFound.title": "This page is not in the recipe library.",
    "notFound.body": "Head back to the finder to browse recipes by ingredient.",
    "notFound.back": "Back to Recipe Finder",
    "admin.setupEyebrow": "Backend Setup Needed",
    "admin.setupTitle": "The admin dashboard needs backend configuration.",
    "admin.setupBody": "Configure the backend settings and database, then create the recipes table and at least one admin mapping.",
    "admin.loadingSession": "Checking admin session...",
    "admin.loginEyebrow": "Admin Access",
    "admin.loginTitle": "Manage recipe sync and pantry content.",
    "admin.loginBody": "Sign in with your admin credentials to sync Google Drive files into the shared recipe catalog for everyone.",
    "admin.loginSharedBackend": "Shared backend",
    "admin.loginSharedBackendBody": "Recipes saved here appear on the live site for every visitor, not just one browser.",
    "admin.loginProtectedRoute": "Protected route",
    "admin.loginProtectedRouteBody": "Only authenticated admin users can open the sync and deletion tools.",
    "admin.loginEmail": "Email",
    "admin.loginPassword": "Password",
    "admin.loginButton": "Open admin dashboard",
    "admin.loginHelp": "Create this user in the authentication system and add them to the admin users list.",
    "admin.backHome": "Back to recipe finder",
    "admin.dashboardTitle": "Admin Dashboard",
    "admin.viewPublicSite": "View public site",
    "admin.signOut": "Sign out",
    "admin.totalRecipes": "Total recipes in the live catalog",
    "admin.backendRecipes": "Backend-managed recipes",
    "admin.trackedDriveIds": "Tracked Drive file IDs",
    "admin.syncTitle": "Sync new Drive files",
    "admin.syncBody": "Paste Google Drive share links, file IDs, or exported folder text. The dashboard will detect any files not yet synced into the shared catalog.",
    "admin.syncPlaceholder": "Paste one or more Google Drive file links here",
    "admin.detectFiles": "Detect files",
    "admin.newDriveFile": "New Drive file detected",
    "admin.openInDrive": "Open in Drive",
    "admin.recipeTitle": "Recipe title",
    "admin.category": "Category",
    "admin.ingredients": "Ingredients",
    "admin.ingredientsPlaceholder": "Separate ingredients with commas",
    "admin.healthGoals": "Health goals",
    "admin.spanishPdf": "Spanish PDF available",
    "admin.spanishFileId": "Spanish file ID",
    "admin.syncRecipe": "Sync this recipe",
    "admin.noUnsyncedTitle": "No unsynced Drive files detected yet",
    "admin.noUnsyncedBody": "Paste new Drive links above to review them and publish recipes one by one.",
    "admin.statusNoFiles": "No Google Drive file IDs were detected.",
    "admin.statusDetectedFiles": "Detected {count} file{plural} from the pasted content.",
    "admin.statusMissingRecipeFields": "Each synced recipe needs a title and at least one ingredient.",
    "admin.statusSyncedRecipe": "Synced \"{title}\" into the shared recipe catalog.",
    "admin.statusLoadError": "Could not load recipe data.",
    "admin.statusSignInError": "Could not sign in.",
    "admin.statusSyncError": "Could not sync this recipe.",
    "admin.statusRemoveError": "Could not remove this recipe.",
    "admin.notesTitle": "Helpful admin notes",
    "admin.notesOne": "Uploading a PDF to Google Drive alone still does not publish it. An admin has to sync it here.",
    "admin.notesTwo": "Recipes synced here are stored in the shared backend and appear for all users on the live site.",
    "admin.notesThree": "Create a user in the authentication system, then add that user's id to the admin users list to grant admin rights.",
    "admin.sharedRecipes": "Shared recipes",
    "admin.sharedRecipesBody": "These are the recipes already stored in the backend.",
    "admin.loadingRecipes": "Loading recipes...",
    "admin.noBackendRecipes": "No backend recipes yet.",
    "admin.removeRecipe": "Remove recipe",
  },
  es: {
    "nav.tagline": "Recetas de despensa hechas simples",
    "nav.browsePdfs": "Ver todos los PDF",
    "nav.admin": "Admin",
    "nav.language": "Idioma",
    "nav.logoAlt": "The Food Bank for Central & Northeast Missouri",
    "hero.badge": "Buscador de recetas del banco de alimentos",
    "hero.title": "¿Qué hay en tu cocina hoy?",
    "hero.description": "Encuentra recetas fáciles y deliciosas usando los ingredientes que ya tienes en casa o recibiste de la despensa.",
    "hero.cta": "Buscar recetas",
    "hero.imageAlt": "Verduras, frutas, frijoles y granos frescos sobre una mesa de madera",
    "ingredients.title": "Selecciona tus ingredientes",
    "ingredients.subtitle": "Elige lo que tienes y encontraremos recetas que coincidan",
    "ingredientPicker.searchPlaceholder": "Busca un ingrediente o explora las categorías abajo",
    "ingredientPicker.noMatches": "Ningún ingrediente coincidió con esa búsqueda.",
    "ingredientPicker.helper": "Comienza con una categoría como frijoles o verduras, o escribe para buscar entre {count} ingredientes.",
    "ingredientPicker.clearAll": "Borrar todo",
    "health.title": "Necesidades de salud",
    "health.subtitle": "Activa una o más metas para mostrar solo recetas que cumplan cada necesidad seleccionada.",
    "category.allRecipes": "Todas las recetas",
    "search.label": "Buscar recetas por nombre o ingrediente",
    "search.placeholder": "Prueba hummus, sopa de lentejas, calabacín o tacos",
    "search.clear": "Borrar búsqueda de recetas",
    "results.loadingTitle": "Cargando recetas",
    "results.loadingBody": "Obteniendo el catálogo más reciente de la biblioteca compartida.",
    "results.emptyTitle": "Aún no hay recetas que coincidan",
    "results.emptyBody": "Prueba otro nombre, ajusta una meta de salud, selecciona otros ingredientes o limpia los filtros",
    "results.count": "{count} receta{plural} encontrada",
    "footer.credit": "Recetas del Food Bank for Central & Northeast Missouri",
    "footer.link": "Ver biblioteca completa",
    "recipe.spanish": "Español",
    "recipe.viewRecipe": "Ver receta",
    "recipe.openDrive": "Abrir en Drive",
    "recipe.findLibrary": "Buscar en la biblioteca",
    "recipe.viewSpanish": "Ver en español",
    "viewer.spanish": "(Español)",
    "viewer.frameTitle": "PDF de receta: {title}",
    "viewer.close": "Cerrar visor de recetas",
    "notFound.eyebrow": "Página no encontrada",
    "notFound.title": "Esta página no está en la biblioteca de recetas.",
    "notFound.body": "Vuelve al buscador para explorar recetas por ingrediente.",
    "notFound.back": "Volver al buscador",
    "admin.setupEyebrow": "Se necesita configuración",
    "admin.setupTitle": "El panel admin necesita configuración del backend.",
    "admin.setupBody": "Configura los ajustes del backend y la base de datos, luego crea la tabla de recetas y al menos una asignación de admin.",
    "admin.loadingSession": "Verificando sesión de admin...",
    "admin.loginEyebrow": "Acceso admin",
    "admin.loginTitle": "Administra la sincronización y el contenido.",
    "admin.loginBody": "Inicia sesión con tus credenciales de admin para sincronizar archivos de Google Drive al catálogo compartido.",
    "admin.loginSharedBackend": "Backend compartido",
    "admin.loginSharedBackendBody": "Las recetas guardadas aquí aparecen para todos los visitantes.",
    "admin.loginProtectedRoute": "Ruta protegida",
    "admin.loginProtectedRouteBody": "Solo los admins autenticados pueden abrir las herramientas.",
    "admin.loginEmail": "Correo electrónico",
    "admin.loginPassword": "Contraseña",
    "admin.loginButton": "Abrir panel admin",
    "admin.loginHelp": "Crea este usuario en el sistema de autenticación y agrégalo a la lista de usuarios admin.",
    "admin.backHome": "Volver al buscador",
    "admin.dashboardTitle": "Panel admin",
    "admin.viewPublicSite": "Ver sitio público",
    "admin.signOut": "Cerrar sesión",
    "admin.totalRecipes": "Total de recetas en el catálogo",
    "admin.backendRecipes": "Recetas del backend",
    "admin.trackedDriveIds": "IDs de Drive rastreados",
    "admin.syncTitle": "Sincronizar nuevos archivos de Drive",
    "admin.syncBody": "Pega enlaces compartidos, IDs de archivo o texto exportado de carpeta.",
    "admin.syncPlaceholder": "Pega aquí uno o más enlaces de Google Drive",
    "admin.detectFiles": "Detectar archivos",
    "admin.newDriveFile": "Nuevo archivo de Drive detectado",
    "admin.openInDrive": "Abrir en Drive",
    "admin.recipeTitle": "Título de la receta",
    "admin.category": "Categoría",
    "admin.ingredients": "Ingredientes",
    "admin.ingredientsPlaceholder": "Separa los ingredientes con comas",
    "admin.healthGoals": "Metas de salud",
    "admin.spanishPdf": "PDF en español disponible",
    "admin.spanishFileId": "ID del archivo en español",
    "admin.syncRecipe": "Sincronizar receta",
    "admin.noUnsyncedTitle": "Aún no hay archivos detectados sin sincronizar",
    "admin.noUnsyncedBody": "Pega nuevos enlaces de Drive arriba para revisarlos y publicarlos.",
    "admin.statusNoFiles": "No se detectaron IDs de archivos de Google Drive.",
    "admin.statusDetectedFiles": "Se detectaron {count} archivo{plural} en el contenido pegado.",
    "admin.statusMissingRecipeFields": "Cada receta sincronizada necesita un título y al menos un ingrediente.",
    "admin.statusSyncedRecipe": "\"{title}\" se sincronizó en el catálogo compartido.",
    "admin.statusLoadError": "No se pudieron cargar los datos de recetas.",
    "admin.statusSignInError": "No se pudo iniciar sesión.",
    "admin.statusSyncError": "No se pudo sincronizar esta receta.",
    "admin.statusRemoveError": "No se pudo eliminar esta receta.",
    "admin.notesTitle": "Notas útiles",
    "admin.notesOne": "Subir un PDF a Google Drive por sí solo no lo publica.",
    "admin.notesTwo": "Las recetas sincronizadas aquí aparecen para todos los usuarios.",
    "admin.notesThree": "Crea un usuario en el sistema de autenticación y luego agrega su id a la lista de usuarios admin para conceder derechos de admin.",
    "admin.sharedRecipes": "Recetas compartidas",
    "admin.sharedRecipesBody": "Estas son las recetas almacenadas en el backend.",
    "admin.loadingRecipes": "Cargando recetas...",
    "admin.noBackendRecipes": "Aún no hay recetas en el backend.",
    "admin.removeRecipe": "Eliminar receta",
  },
};

const fallbackLanguage: LanguageCode = "en";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;

  return template.replace(/\{(\w+)\}/g, (_match, key: string) => String(params[key] ?? ""));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return fallbackLanguage;
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
    return saved && languageOptions.some((option) => option.code === saved) ? saved : fallbackLanguage;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    t: (key, params) => interpolate(translations[language][key] ?? translations.en[key], params),
    translateCategory: (category) => categoriesByLanguage[language][category] ?? category,
    translateHealthGoal: (goal) => healthGoalLabels[language][goal] ?? goal,
    translateHealthGoalDescription: (goal) => healthGoalDescriptions[language][goal] ?? healthGoalDescriptions.en[goal],
    translateIngredientGroupLabel: (groupId, fallback) => ingredientGroupLabels[language][groupId] ?? ingredientGroupLabels.en[groupId] ?? fallback,
    translateIngredientGroupDescription: (groupId, fallback) => ingredientGroupDescriptions[language][groupId] ?? ingredientGroupDescriptions.en[groupId] ?? fallback,
    languageOptions,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export type { TranslationKey };
