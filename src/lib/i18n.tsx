import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { RecipeCategory, RecipeHealthGoal } from "@/data/recipes";

export type LanguageCode = "en" | "es" | "fr" | "de" | "ar" | "zh" | "hi" | "vi";

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
  languageOptions: LanguageOption[];
}

const LANGUAGE_STORAGE_KEY = "meal-maker-language";

export const languageOptions: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
  { code: "vi", label: "Tiếng Việt" },
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
  fr: {
    "Vegetables": "Légumes",
    "Fruits": "Fruits",
    "Beans & Legumes": "Haricots et légumineuses",
    "Grains & Pasta": "Céréales et pâtes",
    "Protein": "Protéines",
    "Soups & Stews": "Soupes et ragoûts",
    "Snacks & Sides": "Collations et accompagnements",
    "Desserts": "Desserts",
    "Sauces & Dips": "Sauces et trempettes",
  },
  de: {
    "Vegetables": "Gemüse",
    "Fruits": "Obst",
    "Beans & Legumes": "Bohnen und Hülsenfrüchte",
    "Grains & Pasta": "Getreide und Pasta",
    "Protein": "Protein",
    "Soups & Stews": "Suppen und Eintöpfe",
    "Snacks & Sides": "Snacks und Beilagen",
    "Desserts": "Desserts",
    "Sauces & Dips": "Saucen und Dips",
  },
  ar: {
    "Vegetables": "خضروات",
    "Fruits": "فواكه",
    "Beans & Legumes": "فاصوليا وبقوليات",
    "Grains & Pasta": "حبوب ومعكرونة",
    "Protein": "بروتين",
    "Soups & Stews": "شوربات ويخنات",
    "Snacks & Sides": "وجبات خفيفة وأطباق جانبية",
    "Desserts": "حلويات",
    "Sauces & Dips": "صلصات وتغميسات",
  },
  zh: {
    "Vegetables": "蔬菜",
    "Fruits": "水果",
    "Beans & Legumes": "豆类与荚果",
    "Grains & Pasta": "谷物与意面",
    "Protein": "蛋白质",
    "Soups & Stews": "汤与炖菜",
    "Snacks & Sides": "小吃与配菜",
    "Desserts": "甜点",
    "Sauces & Dips": "酱汁与蘸酱",
  },
  hi: {
    "Vegetables": "सब्जियां",
    "Fruits": "फल",
    "Beans & Legumes": "बीन्स और दालें",
    "Grains & Pasta": "अनाज और पास्ता",
    "Protein": "प्रोटीन",
    "Soups & Stews": "सूप और स्ट्यू",
    "Snacks & Sides": "नाश्ते और साथ के व्यंजन",
    "Desserts": "मिठाइयाँ",
    "Sauces & Dips": "सॉस और डिप",
  },
  vi: {
    "Vegetables": "Rau củ",
    "Fruits": "Trái cây",
    "Beans & Legumes": "Đậu và họ đậu",
    "Grains & Pasta": "Ngũ cốc và mì",
    "Protein": "Chất đạm",
    "Soups & Stews": "Súp và món hầm",
    "Snacks & Sides": "Món ăn nhẹ và món kèm",
    "Desserts": "Tráng miệng",
    "Sauces & Dips": "Nước sốt và món chấm",
  },
};

const healthGoalLabels: Record<LanguageCode, Record<RecipeHealthGoal, string>> = {
  en: { "Heart Healthy": "Heart Healthy", "Diabetes Friendly": "Diabetes Friendly" },
  es: { "Heart Healthy": "Saludable para el corazón", "Diabetes Friendly": "Apto para diabetes" },
  fr: { "Heart Healthy": "Bon pour le coeur", "Diabetes Friendly": "Adapté au diabète" },
  de: { "Heart Healthy": "Herzgesund", "Diabetes Friendly": "Diabetesfreundlich" },
  ar: { "Heart Healthy": "صحي للقلب", "Diabetes Friendly": "مناسب لمرضى السكري" },
  zh: { "Heart Healthy": "护心健康", "Diabetes Friendly": "适合糖尿病人" },
  hi: { "Heart Healthy": "हृदय के लिए अच्छा", "Diabetes Friendly": "मधुमेह के अनुकूल" },
  vi: { "Heart Healthy": "Tốt cho tim mạch", "Diabetes Friendly": "Phù hợp cho tiểu đường" },
};

const healthGoalDescriptions: Record<LanguageCode, Record<RecipeHealthGoal, string>> = {
  en: {
    "Heart Healthy": "Recipes centered on produce, beans, and lighter cooking fats.",
    "Diabetes Friendly": "Recipes with more fiber-forward, savory ingredients and fewer sweets.",
  },
  es: {
    "Heart Healthy": "Recetas centradas en vegetales, frijoles y grasas de cocina más ligeras.",
    "Diabetes Friendly": "Recetas con más fibra, ingredientes salados y menos dulces.",
  },
  fr: {
    "Heart Healthy": "Recettes axées sur les légumes, les haricots et des matières grasses plus légères.",
    "Diabetes Friendly": "Recettes avec plus de fibres, des ingrédients salés et moins de sucré.",
  },
  de: {
    "Heart Healthy": "Rezepte mit Gemüse, Bohnen und leichteren Kochfetten.",
    "Diabetes Friendly": "Rezepte mit mehr Ballaststoffen, herzhaften Zutaten und weniger Süßem.",
  },
  ar: {
    "Heart Healthy": "وصفات تركز على الخضار والبقول ودهون الطهي الأخف.",
    "Diabetes Friendly": "وصفات أكثر غنى بالألياف والمكونات المالحة وأقل حلاوة.",
  },
  zh: {
    "Heart Healthy": "以蔬菜、豆类和较清淡烹调用油为主的食谱。",
    "Diabetes Friendly": "富含纤维、偏咸香且甜味较少的食谱。",
  },
  hi: {
    "Heart Healthy": "सब्जियों, बीन्स और हल्के पकाने वाले वसा पर आधारित रेसिपी।",
    "Diabetes Friendly": "अधिक फाइबर, नमकीन सामग्री और कम मीठेपन वाली रेसिपी।",
  },
  vi: {
    "Heart Healthy": "Công thức tập trung vào rau củ, đậu và chất béo nấu ăn nhẹ hơn.",
    "Diabetes Friendly": "Công thức nhiều chất xơ hơn, vị mặn hơn và ít ngọt hơn.",
  },
};

type TranslationKey =
  | "nav.tagline"
  | "nav.browsePdfs"
  | "nav.admin"
  | "nav.language"
  | "hero.badge"
  | "hero.title"
  | "hero.description"
  | "hero.cta"
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
  | "viewer.spanish"
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
    "hero.badge": "Food Bank Recipe Finder",
    "hero.title": "What's in your kitchen today?",
    "hero.description": "Find easy, delicious recipes using the ingredients you already have at home or received from the pantry. All PDFs are made by The Food Bank for Central & Northeast Missouri.",
    "hero.cta": "Find recipes",
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
    "viewer.spanish": "(Español)",
    "notFound.eyebrow": "Page Not Found",
    "notFound.title": "This page is not in the recipe library.",
    "notFound.body": "Head back to the finder to browse recipes by ingredient.",
    "notFound.back": "Back to Recipe Finder",
    "admin.setupEyebrow": "Backend Setup Needed",
    "admin.setupTitle": "The admin dashboard needs Supabase configuration.",
    "admin.setupBody": "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then create the recipes table and at least one admin mapping.",
    "admin.loadingSession": "Checking admin session...",
    "admin.loginEyebrow": "Admin Access",
    "admin.loginTitle": "Manage recipe sync and pantry content.",
    "admin.loginBody": "Sign in with your Supabase admin credentials to sync Google Drive files into the shared recipe catalog for everyone.",
    "admin.loginSharedBackend": "Shared backend",
    "admin.loginSharedBackendBody": "Recipes saved here appear on the live site for every visitor, not just one browser.",
    "admin.loginProtectedRoute": "Protected route",
    "admin.loginProtectedRouteBody": "Only authenticated admin users can open the sync and deletion tools.",
    "admin.loginEmail": "Email",
    "admin.loginPassword": "Password",
    "admin.loginButton": "Open admin dashboard",
    "admin.loginHelp": "Create this user in Supabase Authentication and add them to public.admin_users.",
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
    "admin.notesTitle": "Helpful admin notes",
    "admin.notesOne": "Uploading a PDF to Google Drive alone still does not publish it. An admin has to sync it here.",
    "admin.notesTwo": "Recipes synced here are stored in the shared backend and appear for all users on the live site.",
    "admin.notesThree": "Create a user in Supabase Authentication, then add that user's id to public.admin_users to grant admin rights.",
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
    "hero.badge": "Buscador de recetas del banco de alimentos",
    "hero.title": "¿Qué hay en tu cocina hoy?",
    "hero.description": "Encuentra recetas fáciles y deliciosas usando los ingredientes que ya tienes en casa o recibiste de la despensa.",
    "hero.cta": "Buscar recetas",
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
    "viewer.spanish": "(Español)",
    "notFound.eyebrow": "Página no encontrada",
    "notFound.title": "Esta página no está en la biblioteca de recetas.",
    "notFound.body": "Vuelve al buscador para explorar recetas por ingrediente.",
    "notFound.back": "Volver al buscador",
    "admin.setupEyebrow": "Se necesita configuración",
    "admin.setupTitle": "El panel admin necesita configuración de Supabase.",
    "admin.setupBody": "Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY, luego crea la tabla de recetas y al menos una asignación de admin.",
    "admin.loadingSession": "Verificando sesión de admin...",
    "admin.loginEyebrow": "Acceso admin",
    "admin.loginTitle": "Administra la sincronización y el contenido.",
    "admin.loginBody": "Inicia sesión con tus credenciales de Supabase para sincronizar archivos de Google Drive al catálogo compartido.",
    "admin.loginSharedBackend": "Backend compartido",
    "admin.loginSharedBackendBody": "Las recetas guardadas aquí aparecen para todos los visitantes.",
    "admin.loginProtectedRoute": "Ruta protegida",
    "admin.loginProtectedRouteBody": "Solo los admins autenticados pueden abrir las herramientas.",
    "admin.loginEmail": "Correo electrónico",
    "admin.loginPassword": "Contraseña",
    "admin.loginButton": "Abrir panel admin",
    "admin.loginHelp": "Crea este usuario en Supabase Authentication y agrégalo a public.admin_users.",
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
    "admin.notesTitle": "Notas útiles",
    "admin.notesOne": "Subir un PDF a Google Drive por sí solo no lo publica.",
    "admin.notesTwo": "Las recetas sincronizadas aquí aparecen para todos los usuarios.",
    "admin.notesThree": "Crea un usuario en Supabase Authentication y luego agrega su id a public.admin_users.",
    "admin.sharedRecipes": "Recetas compartidas",
    "admin.sharedRecipesBody": "Estas son las recetas almacenadas en el backend.",
    "admin.loadingRecipes": "Cargando recetas...",
    "admin.noBackendRecipes": "Aún no hay recetas en el backend.",
    "admin.removeRecipe": "Eliminar receta",
  },
  fr: {} as Record<TranslationKey, string>,
  de: {} as Record<TranslationKey, string>,
  ar: {} as Record<TranslationKey, string>,
  zh: {} as Record<TranslationKey, string>,
  hi: {} as Record<TranslationKey, string>,
  vi: {} as Record<TranslationKey, string>,
};

const fallbackLanguage: LanguageCode = "en";
for (const code of ["fr", "de", "ar", "zh", "hi", "vi"] as LanguageCode[]) {
  translations[code] = { ...translations.en, "nav.language": languageOptions.find((option) => option.code === code)?.label ?? translations.en["nav.language"] };
}

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
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: setLanguageState,
    t: (key, params) => interpolate(translations[language][key] ?? translations.en[key], params),
    translateCategory: (category) => categoriesByLanguage[language][category] ?? category,
    translateHealthGoal: (goal) => healthGoalLabels[language][goal] ?? goal,
    translateHealthGoalDescription: (goal) => healthGoalDescriptions[language][goal] ?? healthGoalDescriptions.en[goal],
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
