export type RecipeCategory = 
  | "Vegetables" 
  | "Fruits" 
  | "Beans & Legumes" 
  | "Grains & Pasta" 
  | "Protein" 
  | "Soups & Stews" 
  | "Snacks & Sides" 
  | "Desserts"
  | "Sauces & Dips";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  category: RecipeCategory;
  healthGoals: RecipeHealthGoal[];
  hasSpanish: boolean;
  driveFileId?: string;
  spanishDriveFileId?: string;
}

export const RECIPE_FOLDER_URL = "https://drive.google.com/drive/folders/1JDEg1DdvElV0Y1bl4U9n8MI3ANX_lKv1";

export function getPreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

export interface IngredientGroup {
  id: string;
  label: string;
  description: string;
  ingredients: string[];
}

export type RecipeHealthGoal =
  | "Heart Healthy"
  | "Diabetes Friendly"
  | "High Fiber"
  | "Protein Rich";

export interface HealthGoalDefinition {
  id: RecipeHealthGoal;
  label: string;
  description: string;
}

export interface RecipeFilters {
  selectedCategory?: RecipeCategory | null;
  selectedIngredients?: string[];
  selectedHealthGoals?: RecipeHealthGoal[];
  searchQuery?: string;
}

export const healthGoals: HealthGoalDefinition[] = [
  {
    id: "Heart Healthy",
    label: "Heart Healthy",
    description: "Recipes centered on produce, beans, and lighter cooking fats.",
  },
  {
    id: "Diabetes Friendly",
    label: "Diabetes Friendly",
    description: "Recipes with more fiber-forward, savory ingredients and fewer sweets.",
  },
  {
    id: "High Fiber",
    label: "High Fiber",
    description: "Recipes built around beans, lentils, vegetables, fruits, or oats.",
  },
  {
    id: "Protein Rich",
    label: "Protein Rich",
    description: "Recipes with beans, lentils, dairy, eggs, nuts, or meat as a key ingredient.",
  },
];

const recipeHealthGoalMap: Partial<Record<string, RecipeHealthGoal[]>> = {
  broccoli: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  rutabagas: ["Heart Healthy", "High Fiber"],
  "sweet-potatoes-2": ["Heart Healthy", "High Fiber"],
  kohlrabi: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  carrots: ["Heart Healthy", "High Fiber"],
  tomatoes: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  zucchini: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "bell-peppers": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "brussels-sprouts": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "butternut-squash": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  cabbage: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  cauliflower: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  eggplant: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  spinach: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  chayote: ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "baked-sweet-potato-fries": ["Heart Healthy", "High Fiber"],
  "bok-choy-salad": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "fresh-bok-choy": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  pickles: ["Diabetes Friendly"],
  "mango-salsa": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "fruit-salad": ["Heart Healthy", "High Fiber"],
  "green-smoothie": ["Heart Healthy", "High Fiber", "Protein Rich"],
  "black-beans": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "snap-peas": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "black-bean-corn-salad": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "black-bean-enchiladas": ["High Fiber", "Protein Rich"],
  "black-bean-fajita-pasta": ["High Fiber", "Protein Rich"],
  "beans-rice-casserole": ["High Fiber", "Protein Rich"],
  "four-bean-salad": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "chickpea-salad": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "baked-falafel": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "chana-masala": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "brown-lentil-curry": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "lentil-soup": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "lentils-split-peas": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "pb-oatmeal": ["High Fiber", "Protein Rich"],
  "barley-jambalaya": ["High Fiber", "Protein Rich"],
  "baked-oat-cheesecake": ["High Fiber", "Protein Rich"],
  "asian-beef-pasta": ["Protein Rich"],
  "turkey-tacos": ["Protein Rich"],
  "bison-meatballs": ["Protein Rich"],
  "bison-tacos": ["Protein Rich"],
  "chicken-noodle-soup": ["Protein Rich"],
  "fiesta-taco-bake": ["Protein Rich"],
  "beef-soup": ["Protein Rich"],
  "eggplant-recipes": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  "fall-harvest-soup": ["Heart Healthy", "Diabetes Friendly", "High Fiber"],
  walnuts: ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  hummus: ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "flavorful-hummus": ["Heart Healthy", "Diabetes Friendly", "High Fiber", "Protein Rich"],
  "chocolate-hummus": ["Protein Rich"],
  "cucumber-lime": ["Heart Healthy", "Diabetes Friendly"],
  "black-bean-brownies": ["High Fiber", "Protein Rich"],
  "cinnamon-apple-cookies": ["High Fiber"],
  "chocolate-zucchini-muffins": ["High Fiber", "Protein Rich"],
};

const baseRecipes: Omit<Recipe, "healthGoals">[] = [
  // Vegetables
  { id: "broccoli", title: "2 Ways to Cook Broccoli", ingredients: ["Broccoli", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: false, driveFileId: "1mVkN2tpRIB2avLhBX3sHutH5DZVNglgB" },
  { id: "rutabagas", title: "2 Ways to Cook Rutabagas", ingredients: ["Rutabaga", "Butter", "Onion"], category: "Vegetables", hasSpanish: false, driveFileId: "1AgOWfdCk60x5xqaMOnd0CXr970Lwv8em" },
  { id: "sweet-potatoes-2", title: "2 Ways to Cook Sweet Potatoes", ingredients: ["Sweet Potato", "Butter", "Cinnamon"], category: "Vegetables", hasSpanish: false, driveFileId: "1m8SOfQQ4RsyHyUWEyEPPiu3xTcem8gga" },
  { id: "kohlrabi", title: "2 Ways to Use Kohlrabi", ingredients: ["Kohlrabi", "Olive Oil", "Lemon"], category: "Vegetables", hasSpanish: false, driveFileId: "17Ad8oZdy_AVLKKXIJnK7wwjgNGxx6X4x" },
  { id: "carrots", title: "4 Ways to Cook Carrots", ingredients: ["Carrots", "Olive Oil", "Honey"], category: "Vegetables", hasSpanish: false, driveFileId: "16eUwojTI_kLah5ohAhFQy48wYIoSVv9i" },
  { id: "corn-cob", title: "4 Ways to Cook Corn on the Cob", ingredients: ["Corn", "Butter", "Salt"], category: "Vegetables", hasSpanish: false, driveFileId: "1Pn6qTD8QaipeKlguV1spCp58WWogF5X0" },
  { id: "russet-potatoes", title: "4 Ways to Cook Russet Potatoes", ingredients: ["Russet Potatoes", "Butter", "Sour Cream"], category: "Vegetables", hasSpanish: false, driveFileId: "1SofXNzRr3sxTrlbUP6WQf4IAkWqGdDBE" },
  { id: "tomatoes", title: "4 Ways to Cook Tomatoes", ingredients: ["Tomatoes", "Garlic", "Olive Oil"], category: "Vegetables", hasSpanish: true, driveFileId: "1y_9wsu33OgwrydoQyQE5g0CGVF98BMpA", spanishDriveFileId: "1yuhCRasO9Wybl54ayKC2d1OiOmy7mwIl" },
  { id: "zucchini", title: "4 Ways to Cook Zucchini", ingredients: ["Zucchini", "Garlic", "Olive Oil"], category: "Vegetables", hasSpanish: true, driveFileId: "18K2Y-Kr_HUbPLzw9idiHjfqc3-OoDm-b", spanishDriveFileId: "1kaAUTRWwTGDNip8oDpTcq1Xqx2RIoSS4" },
  { id: "bell-peppers", title: "4 Ways to Use Bell Peppers", ingredients: ["Bell Peppers", "Onion", "Olive Oil"], category: "Vegetables", hasSpanish: false, driveFileId: "10QdvNRbN9fijxnmheWSfwt2K_1-dbPt1" },
  { id: "brussels-sprouts", title: "4 Ways to Use Brussels Sprouts", ingredients: ["Brussels Sprouts", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: false, driveFileId: "1Knivz9kc4HZQ0Qs4w3GL0pthPjqZKlyd" },
  { id: "butternut-squash", title: "4 Ways to Use Butternut Squash", ingredients: ["Butternut Squash", "Olive Oil", "Onion"], category: "Vegetables", hasSpanish: false, driveFileId: "17j5yt6d-YIOoUk_9YhvxZT8nkWIHYOiB" },
  { id: "cabbage", title: "4 Ways to Use Cabbage", ingredients: ["Cabbage", "Onion", "Garlic"], category: "Vegetables", hasSpanish: false, driveFileId: "1NKvtr_8MvW4h-CPiTsX8JtidbQl8rfv_" },
  { id: "canned-corn", title: "4 Ways to Use Canned Corn", ingredients: ["Canned Corn", "Butter", "Onion"], category: "Vegetables", hasSpanish: true, driveFileId: "1ni-1EKfOfq-CF3UszrjX_JG8jpGl3OY_", spanishDriveFileId: "1PvcZbB5b007-qpVOVXSWkOby6-cpNIY8" },
  { id: "canned-green-beans", title: "4 Ways to Use Canned Green Beans", ingredients: ["Canned Green Beans", "Garlic", "Bacon"], category: "Vegetables", hasSpanish: true, driveFileId: "1hr76nPn7U0A-UctuNSpcoPhshmP2XDnh", spanishDriveFileId: "1ydpG_Xwmf66qUbLZuyKXYNx5-69LUOki" },
  { id: "canned-peas", title: "4 Ways to Use Canned Peas", ingredients: ["Canned Peas", "Butter", "Onion"], category: "Vegetables", hasSpanish: true, spanishDriveFileId: "1a6HiiSPvPNYjzOUsJQc89cKtiVC7sW1o" },
  { id: "cauliflower", title: "4 Ways to Use Cauliflower", ingredients: ["Cauliflower", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: true, driveFileId: "1KAM_eCBRdMmE2vS2pzHZKiqxVKdgx5gw", spanishDriveFileId: "1pB1-DpT7DRZDmaStcPXcciljzVCO5_0m" },
  { id: "eggplant", title: "4 Ways to Use Eggplant", ingredients: ["Eggplant", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: false, driveFileId: "11lS2AUY3-3HhMB3OYlWFwSe5CFzEli_0" },
  { id: "spinach", title: "4 Ways to Use Spinach", ingredients: ["Spinach", "Garlic", "Olive Oil"], category: "Vegetables", hasSpanish: false, driveFileId: "18Rk5kmphZR3BSX4Z23Wo3SykVsJnVWCU" },
  { id: "chayote", title: "Chayote – A Squash with Zucchini Flavor", ingredients: ["Chayote", "Garlic", "Lime"], category: "Vegetables", hasSpanish: false, driveFileId: "1uiG-MDqpSmuux-2Bk-pcyFLJBStxR1Uw" },
  { id: "baked-sweet-potato-fries", title: "Baked Sweet Potato Fries", ingredients: ["Sweet Potato", "Olive Oil", "Salt"], category: "Vegetables", hasSpanish: false, driveFileId: "1fKKpY-PwQf0gl5hIipcvr7Ko8o7N6NRW" },
  { id: "buffalo-cauliflower", title: "Buffalo Cauliflower Bites", ingredients: ["Cauliflower", "Hot Sauce", "Flour"], category: "Vegetables", hasSpanish: false, driveFileId: "1KK-q6NuyLH4hDBZLoYnP6TvZBAAVOiJL" },
  { id: "bok-choy-salad", title: "Easy Bok Choy Salad", ingredients: ["Bok Choy", "Sesame Oil", "Soy Sauce"], category: "Vegetables", hasSpanish: false, driveFileId: "1EJnVQvytitYdtBTcjdAP-bnwHWm-HDac" },
  { id: "fresh-bok-choy", title: "Fresh & Easy Bok Choy Salad", ingredients: ["Bok Choy", "Rice Vinegar", "Sesame Seeds"], category: "Vegetables", hasSpanish: false, driveFileId: "1_NWPA9-Akq_CYlkbJ2_6Jmermvw8AmqU" },
  { id: "pickles", title: "Easy Refrigerator Pickles", ingredients: ["Cucumbers", "Vinegar", "Dill"], category: "Vegetables", hasSpanish: false, driveFileId: "1pk_HBfDQ5a0QEacfCP0bvmzVWVMh7kQV" },

  // Fruits
  { id: "apples", title: "4 Ways to Cook Apples", ingredients: ["Apples", "Cinnamon", "Sugar"], category: "Fruits", hasSpanish: false, driveFileId: "1FSaEQjNGCDXt9F0e1zCBHpRZuq5G-Ech" },
  { id: "oranges", title: "3 Ways to Use Oranges", ingredients: ["Oranges", "Sugar", "Honey"], category: "Fruits", hasSpanish: false, driveFileId: "1T9ixRGv0hUXgh86aTSO5m8EhbuxXMqhS" },
  { id: "peaches", title: "4 Ways to Use Peaches", ingredients: ["Peaches", "Sugar", "Cinnamon"], category: "Fruits", hasSpanish: false, driveFileId: "172l9yKJfLN_4Os6JJNHdM5eucsEk9xPD" },
  { id: "bananas", title: "4 Ways to Use Ripe Bananas", ingredients: ["Bananas", "Flour", "Sugar"], category: "Fruits", hasSpanish: false, driveFileId: "1fSr3eFJuE8zWvk1b7le5LeCIbGmb9trA" },
  { id: "pumpkin-puree", title: "4 Ways to Use Pumpkin Puree", ingredients: ["Pumpkin Puree", "Cinnamon", "Sugar"], category: "Fruits", hasSpanish: false, driveFileId: "11tFgVJxrbmd0SYLVNEAeZIN88e4zUxZB" },
  { id: "mango-salsa", title: "Chilled Mango Salsa", ingredients: ["Mango", "Lime", "Cilantro", "Onion"], category: "Fruits", hasSpanish: false, driveFileId: "16wfyUkTarzF0W3yk3LMYJ87x9xOsPigU" },
  { id: "fruit-salad", title: "Fruit Salad", ingredients: ["Mixed Fruit", "Honey", "Lime"], category: "Fruits", hasSpanish: false, driveFileId: "1bRwC3FDDjqA_axhMMLJWmsfdqObRefoH" },
  { id: "fruit-smoothie", title: "Fruit Smoothie", ingredients: ["Mixed Fruit", "Yogurt", "Milk"], category: "Fruits", hasSpanish: false, driveFileId: "1vDXcC_HUKWbFt4fiXCQI3G3fY8jj7_Ex" },
  { id: "green-smoothie", title: "Delectable Green Smoothie", ingredients: ["Spinach", "Banana", "Yogurt", "Honey"], category: "Fruits", hasSpanish: false, driveFileId: "17f5nh9GZBW9dhaZ1qrtO1_Axeona1aXF" },

  // Beans & Legumes
  { id: "black-beans", title: "3 Ways to Cook Black Beans", ingredients: ["Black Beans", "Garlic", "Onion"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1Q1Ip1hM1CDqQe0RmyEpPmpiZpTLeAHM9" },
  { id: "snap-peas", title: "3 Ways to Use Snap Peas", ingredients: ["Snap Peas", "Garlic", "Sesame Oil"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1Bx212uA7V9vLnQuKoQ842AGoL6gHaIeL" },
  { id: "black-bean-corn-salad", title: "Black Bean & Corn Salad with Lime Dressing", ingredients: ["Black Beans", "Corn", "Lime", "Cilantro"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "15ZUdtUS8jQ2lphi04YAgXmaJnhO3OPT-" },
  { id: "black-bean-enchiladas", title: "Black Bean & Sweet Potato Enchiladas", ingredients: ["Black Beans", "Sweet Potato", "Tortillas", "Enchilada Sauce"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1VcEezB0FmCaq6z0kWcbHvF0b3Uig8_Ox" },
  { id: "black-bean-fajita-pasta", title: "Black Bean Fajita Pasta", ingredients: ["Black Beans", "Pasta", "Bell Peppers", "Onion"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1SfXoJFcaTqL-2DRxDUv3X2nLfT1GuqZK" },
  { id: "beans-rice-casserole", title: "Beans & Rice Casserole", ingredients: ["Beans", "Rice", "Cheese", "Onion"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1DreswosK3HvzO_YDzUMaqZWWCn_Qh0kW" },
  { id: "four-bean-salad", title: "Four Bean Salad", ingredients: ["Kidney Beans", "Green Beans", "Chickpeas", "Vinegar"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1mXPiQqdLLsy7hUStC1mkFwIBRslZJX-p" },
  { id: "chickpea-salad", title: "Chickpea Salad", ingredients: ["Chickpeas", "Cucumber", "Tomato", "Lemon"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1b-VCGj14l8rpR2SCrW99vqgSsSVILiIN" },
  { id: "baked-falafel", title: "Baked Falafel Bites", ingredients: ["Chickpeas", "Garlic", "Flour", "Cumin"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "10GNSQ1KuhDRPMY0orr2MK_PO4xPFtnaQ" },
  { id: "chana-masala", title: "Chana Masala", ingredients: ["Chickpeas", "Tomatoes", "Onion", "Garlic", "Spices"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1d46RmwkqN96dj6v3SFyTBvFuGi-cNd0o" },
  { id: "brown-lentil-curry", title: "Brown Lentil Curry (Masoor Dal)", ingredients: ["Lentils", "Onion", "Tomatoes", "Garlic", "Spices"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1dQp6aOKhU-eVYgaY0-NRs28XZP25cEr-" },
  { id: "lentil-soup", title: "Delicious Lentil Soup", ingredients: ["Lentils", "Carrots", "Onion", "Garlic"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "1sqTR7ZgPFczonN187XVbtBQ3i8u5trYQ" },
  { id: "lentils-split-peas", title: "How to Cook Lentils and Split Peas", ingredients: ["Lentils", "Split Peas", "Onion", "Garlic"], category: "Beans & Legumes", hasSpanish: false, driveFileId: "13t9zcxZy1ck-ExZ57waUTl00lu0RstNV" },

  // Grains & Pasta
  { id: "mac-cheese", title: "4 Ways to Cook Mac & Cheese", ingredients: ["Macaroni", "Cheese", "Milk", "Butter"], category: "Grains & Pasta", hasSpanish: true, driveFileId: "1ZjXFtGO9aDP9Ls8ixg51uVlfvcW_P1TQ", spanishDriveFileId: "1lbg0xR2LWLftJzTrJN7c5RRgsq9ZG88e" },
  { id: "pb-oatmeal", title: "2 Ways to Use PB & Oatmeal", ingredients: ["Peanut Butter", "Oatmeal", "Honey"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "11C8b5bU_fmN-SWBZ3HXfQn9YnewO6KyP" },
  { id: "barley-jambalaya", title: "Barley Jambalaya", ingredients: ["Barley", "Sausage", "Bell Peppers", "Tomatoes"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "1-Xtfj32KsTbWGzAkCMxrq--DcKDYTemP" },
  { id: "butternut-mac", title: "Butternut Squash Mac and Cheese", ingredients: ["Butternut Squash", "Macaroni", "Cheese", "Milk"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "1HYAJ17fysD8zT0GNeY8nu3h_Vn8hVnug" },
  { id: "chili-mac", title: "Chili Mac n' Cheese", ingredients: ["Macaroni", "Cheese", "Chili", "Ground Beef"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "1zsGQeey6e8A6yDNp97rXZ2Z4yWcTraJX" },
  { id: "flatbread-pizza", title: "Easy Flatbread Pizza & Homemade Sauce", ingredients: ["Flatbread", "Pizza Sauce", "Cheese", "Toppings"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "11GOghIPqJ2GSnOQJR-2WBMY8cR9o7po6" },
  { id: "baked-oat-cheesecake", title: "Baked Oat Breakfast Cheesecake", ingredients: ["Oats", "Cream Cheese", "Eggs", "Honey"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "1-N7OzP31Rkc9CzoManAfN6SVhBTaiFFM" },
  { id: "asian-beef-pasta", title: "Asian Beef Pasta Salad", ingredients: ["Pasta", "Beef", "Soy Sauce", "Vegetables"], category: "Grains & Pasta", hasSpanish: false, driveFileId: "1rusxJVFCUVBJ8BfjXFmE88KaVIfkLjCt" },

  // Protein
  { id: "turkey-tacos", title: "After Thanksgiving Turkey Tacos", ingredients: ["Turkey", "Tortillas", "Salsa", "Lettuce"], category: "Protein", hasSpanish: false, driveFileId: "1_NgJzEfgScMYh8ee4xrni7VYjWe0_JlU" },
  { id: "bison-meatballs", title: "Bison Swedish Inspired Meatballs", ingredients: ["Ground Bison", "Bread Crumbs", "Cream", "Onion"], category: "Protein", hasSpanish: false, driveFileId: "1x_jLWFMHXlrsxpEF8IUkH-vLi5mwhcx0" },
  { id: "bison-tacos", title: "Bison Tacos", ingredients: ["Ground Bison", "Tortillas", "Salsa", "Lettuce"], category: "Protein", hasSpanish: false, driveFileId: "1Oz5A8LYJmdMSUo-tvqJAX0hHO2uAtXuF" },
  { id: "chicken-noodle-soup", title: "Chicken Noodle Soup with Ramen Noodles", ingredients: ["Chicken", "Ramen Noodles", "Carrots", "Celery"], category: "Protein", hasSpanish: false, driveFileId: "1Pv5kEKbDUknygfxYvNlW-TMeiQhGXfUX" },
  { id: "fiesta-taco-bake", title: "Fiesta Taco Bake", ingredients: ["Ground Beef", "Tortillas", "Cheese", "Beans"], category: "Protein", hasSpanish: false, driveFileId: "1AVASeynsRrrjZ9z6wCPgHjqK9cspvNls" },
  { id: "vienna-sausages", title: "4 Ways to Use Vienna Sausages", ingredients: ["Vienna Sausages", "Rice", "Eggs"], category: "Protein", hasSpanish: false, driveFileId: "1rsZPYTtly3DtN0yzXWDqrU595FPC9V_C" },
  { id: "beef-soup", title: "Vegetable & Beef Soup", ingredients: ["Beef", "Mixed Vegetables", "Broth", "Potatoes"], category: "Protein", hasSpanish: false, driveFileId: "1wfTZmeqp_8aHKyavDivJ9lRdjq3NZklN" },
  { id: "eggplant-recipes", title: "Eggplant Recipes", ingredients: ["Eggplant", "Tomatoes", "Garlic", "Olive Oil"], category: "Protein", hasSpanish: false, driveFileId: "1VHZ7s2hMhRVNx38uW1hOCyiqgP6vnEmz" },

  // Soups & Stews
  { id: "fall-harvest-soup", title: "Fall Harvest Soup", ingredients: ["Squash", "Carrots", "Onion", "Broth"], category: "Soups & Stews", hasSpanish: false, driveFileId: "1aI15R8ObeilZaHxmT7pgtpmyRbb9BNz5" },
  { id: "fall-smoothie-bowls", title: "Fall Smoothie Bowl Recipes", ingredients: ["Pumpkin", "Banana", "Yogurt", "Granola"], category: "Soups & Stews", hasSpanish: false, driveFileId: "1uqaOcaZAlVhghUgIb58UPisD3i9Tng6p" },

  // Snacks & Sides
  { id: "protein-bites", title: "2 Ways to Use Gladian Protein Bites", ingredients: ["Protein Bites", "Peanut Butter", "Chocolate"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "1r_P4mMwtNBQQNY3pDAFbqpkf-zvBvBuZ" },
  { id: "walnuts", title: "7 Ways to Use Walnuts", ingredients: ["Walnuts", "Honey", "Oats"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "148PiREL8qK_Hphwfg5slIGb7_hA3TqW8" },
  { id: "hummus", title: "Delicious Hummus", ingredients: ["Chickpeas", "Tahini", "Lemon", "Garlic"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "1bm_A8lXIw1Hex7sva9ZVFj4WK8H0Kogg" },
  { id: "flavorful-hummus", title: "Flavorful Hummus", ingredients: ["Chickpeas", "Tahini", "Garlic", "Olive Oil"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "1aXZ9HVKf-c7uFqArJBe6yghAZtnZnNT-" },
  { id: "chocolate-hummus", title: "Chocolate Hummus", ingredients: ["Chickpeas", "Cocoa Powder", "Honey", "Tahini"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "1H46sGbSuSNWYmXeXzVAGfP4hRqiseMBW" },
  { id: "taco-seasoning", title: "4 Ways to Use Taco Seasoning", ingredients: ["Taco Seasoning", "Ground Beef", "Tortillas"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "14WgvRQhsYsrdIKHZNMwnbR-nyLSzTrUb" },
  { id: "malt-o-meal-muffins", title: "Malt-O-Meal Magic Muffins", ingredients: ["Malt-O-Meal", "Flour", "Eggs", "Milk"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "1xEhAVbEdng_3yxZaXelnuhJICgmoaEKC" },
  { id: "cucumber-lime", title: "Cucumber Lime Refresher", ingredients: ["Cucumber", "Lime", "Mint", "Water"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "17FGyGLIk-nTnY1FzEju_2HDodozvQdhZ" },
  { id: "day-of-dead-atole", title: "Day of the Dead Warm Atole", ingredients: ["Cornstarch", "Milk", "Cinnamon", "Sugar"], category: "Snacks & Sides", hasSpanish: false, driveFileId: "1tT8a8gxNvCXs-lWXlIGOgKLlwPF-pVq9" },

  // Desserts
  { id: "black-bean-brownies", title: "Black Bean Chocolate Chunk Brownies", ingredients: ["Black Beans", "Chocolate Chips", "Eggs", "Sugar"], category: "Desserts", hasSpanish: false, driveFileId: "1EEZDqvJ64BNG8JrJJpJBr5jOPn6_2qcf" },
  { id: "cinnamon-apple-cookies", title: "Cinnamon Apple Cookies", ingredients: ["Apples", "Cinnamon", "Oats", "Flour"], category: "Desserts", hasSpanish: false, driveFileId: "1VGUVN2HwWsQ3qq5OYTmo7JIBRfq9Vnc3" },
  { id: "chocolate-date-brownies", title: "Chocolate Date Brownies", ingredients: ["Dates", "Cocoa Powder", "Eggs", "Flour"], category: "Desserts", hasSpanish: false, driveFileId: "14lVili6d-eK6igDVwl9trBorPRNppKDO" },
  { id: "chocolate-zucchini-muffins", title: "Chocolate Zucchini Lentil Muffins", ingredients: ["Zucchini", "Lentils", "Cocoa Powder", "Flour"], category: "Desserts", hasSpanish: false, driveFileId: "1hNxfcazqehgzDw4rqlXyB9tRffTQJqDq" },
  { id: "cardamom-shortbread", title: "Cardamom Pistachio Shortbread Cookie", ingredients: ["Flour", "Butter", "Cardamom", "Pistachios"], category: "Desserts", hasSpanish: false, driveFileId: "1-SUPIFN-UUnQI8b5Op3pxvouxScPR1bN" },
  { id: "awesomely-mashed-sweet-potatoes", title: "Awesomely Mashed Sweet Potatoes", ingredients: ["Sweet Potato", "Butter", "Brown Sugar", "Cinnamon"], category: "Desserts", hasSpanish: false, driveFileId: "17v8HB7Lpb9U3_jiPTLJuJ0pJOPN_CRyr" },
];

// Extract all unique ingredients sorted
export const recipes: Recipe[] = baseRecipes.map((recipe) => ({
  ...recipe,
  healthGoals: recipeHealthGoalMap[recipe.id] ?? [],
}));

export function getAllIngredients(allRecipes: Recipe[]) {
  return Array.from(new Set(allRecipes.flatMap((recipe) => recipe.ingredients))).sort();
}

export const allIngredients = getAllIngredients(recipes);

export const allCategories: RecipeCategory[] = [
  "Vegetables",
  "Fruits",
  "Beans & Legumes",
  "Grains & Pasta",
  "Protein",
  "Soups & Stews",
  "Snacks & Sides",
  "Desserts",
  "Sauces & Dips",
];

export const curatedPopularIngredients = [
  "Black Beans", "Rice", "Chickpeas", "Carrots", "Onion", "Garlic",
  "Tomatoes", "Potatoes", "Corn", "Spinach", "Bananas", "Apples",
  "Chicken", "Ground Beef", "Pasta", "Cheese", "Eggs", "Lentils",
  "Sweet Potato", "Zucchini", "Bell Peppers", "Cabbage", "Oats",
  "Peanut Butter", "Tortillas", "Broccoli",
];

const ingredientGroupDefinitions: IngredientGroup[] = [
  {
    id: "beans-legumes",
    label: "Beans & Legumes",
    description: "Choose the kind of beans, peas, or lentils you have.",
    ingredients: ["Beans", "Black Beans", "Kidney Beans", "Chickpeas", "Lentils", "Split Peas", "Snap Peas"],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    description: "Fresh, frozen, and canned produce.",
    ingredients: ["Broccoli", "Carrots", "Cabbage", "Cauliflower", "Corn", "Canned Corn", "Canned Green Beans", "Canned Peas", "Tomatoes", "Zucchini", "Bell Peppers", "Sweet Potato", "Russet Potatoes", "Spinach", "Bok Choy", "Butternut Squash", "Eggplant", "Cucumbers"],
  },
  {
    id: "fruit",
    label: "Fruit",
    description: "Whole fruit and fruit mixes.",
    ingredients: ["Apples", "Bananas", "Oranges", "Peaches", "Pumpkin Puree", "Pumpkin", "Mango", "Mixed Fruit", "Dates"],
  },
  {
    id: "grains-starches",
    label: "Grains & Starches",
    description: "Pasta, rice, oats, and other pantry staples.",
    ingredients: ["Rice", "Pasta", "Macaroni", "Oats", "Oatmeal", "Barley", "Ramen Noodles", "Flatbread", "Tortillas", "Granola", "Flour", "Cornstarch"],
  },
  {
    id: "protein-dairy",
    label: "Protein & Dairy",
    description: "Meat, eggs, cheese, and creamy basics.",
    ingredients: ["Chicken", "Ground Beef", "Beef", "Ground Bison", "Turkey", "Sausage", "Vienna Sausages", "Eggs", "Cheese", "Milk", "Yogurt", "Cream Cheese", "Peanut Butter", "Tahini"],
  },
  {
    id: "flavorings",
    label: "Seasonings & Sauces",
    description: "Aromatics, sauces, oils, and flavor builders.",
    ingredients: ["Onion", "Garlic", "Olive Oil", "Butter", "Honey", "Cinnamon", "Lemon", "Lime", "Salsa", "Soy Sauce", "Sesame Oil", "Vinegar", "Hot Sauce", "Taco Seasoning", "Enchilada Sauce", "Pizza Sauce"],
  },
];

export function getPopularIngredients(allRecipes: Recipe[]) {
  const availableIngredients = getAllIngredients(allRecipes);
  const curated = curatedPopularIngredients.filter((ingredient) =>
    availableIngredients.includes(ingredient),
  );

  if (curated.length >= 12) {
    return curated;
  }

  const fallback = availableIngredients.filter((ingredient) => !curated.includes(ingredient));
  return [...curated, ...fallback].slice(0, 24);
}

export const popularIngredients = getPopularIngredients(recipes);

export function getIngredientGroups(allRecipes: Recipe[]): IngredientGroup[] {
  const availableIngredients = getAllIngredients(allRecipes);

  return ingredientGroupDefinitions
    .map((group) => ({
      ...group,
      ingredients: group.ingredients.filter((ingredient) => availableIngredients.includes(ingredient)),
    }))
    .filter((group) => group.ingredients.length > 0);
}

export const ingredientGroups: IngredientGroup[] = getIngredientGroups(recipes);

export function getFilteredRecipes(
  allRecipes: Recipe[],
  {
    selectedCategory = null,
    selectedIngredients = [],
    selectedHealthGoals = [],
    searchQuery = "",
  }: RecipeFilters = {},
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return allRecipes
    .map((recipe) => {
      const ingredientMatchCount = recipe.ingredients.filter((ingredient) =>
        selectedIngredients.includes(ingredient),
      ).length;

      const title = recipe.title.toLowerCase();
      const ingredientMatchesQuery = recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(normalizedQuery),
      );
      const categoryMatchesQuery = recipe.category.toLowerCase().includes(normalizedQuery);
      const titleStartsWithQuery = normalizedQuery.length > 0 && title.startsWith(normalizedQuery);
      const titleIncludesQuery = normalizedQuery.length > 0 && title.includes(normalizedQuery);
      const searchScore = normalizedQuery.length === 0
        ? 0
        : titleStartsWithQuery
          ? 3
          : titleIncludesQuery
            ? 2
            : ingredientMatchesQuery || categoryMatchesQuery
              ? 1
              : 0;

      return { recipe, ingredientMatchCount, searchScore };
    })
    .filter(({ recipe, ingredientMatchCount, searchScore }) => {
      if (selectedCategory && recipe.category !== selectedCategory) {
        return false;
      }

      if (selectedIngredients.length > 0 && ingredientMatchCount === 0) {
        return false;
      }

      if (selectedHealthGoals.length > 0) {
        const matchesAllHealthGoals = selectedHealthGoals.every((goal) =>
          recipe.healthGoals.includes(goal),
        );

        if (!matchesAllHealthGoals) {
          return false;
        }
      }

      if (normalizedQuery && searchScore === 0) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (b.searchScore !== a.searchScore) {
        return b.searchScore - a.searchScore;
      }

      if (b.ingredientMatchCount !== a.ingredientMatchCount) {
        return b.ingredientMatchCount - a.ingredientMatchCount;
      }

      return a.recipe.title.localeCompare(b.recipe.title);
    })
    .map(({ recipe }) => recipe);
}
