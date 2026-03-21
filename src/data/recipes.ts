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

// To link directly to a PDF in Google Drive, you need the file's unique ID.
// Format: https://drive.google.com/file/d/FILE_ID/view
// The folder link is used as a fallback when individual IDs aren't available.

export interface Recipe {
  id: string;
  title: string;
  fileName: string;
  ingredients: string[];
  category: RecipeCategory;
  hasSpanish: boolean;
}

const DRIVE_BASE = "https://drive.google.com/drive/folders/1JDEg1DdvElV0Y1bl4U9n8MI3ANX_lKv1";

export const recipes: Recipe[] = [
  // Vegetables
  { id: "broccoli", title: "2 Ways to Cook Broccoli", ingredients: ["Broccoli", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "rutabagas", title: "2 Ways to Cook Rutabagas", ingredients: ["Rutabaga", "Butter", "Onion"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "sweet-potatoes-2", title: "2 Ways to Cook Sweet Potatoes", ingredients: ["Sweet Potato", "Butter", "Cinnamon"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "kohlrabi", title: "2 Ways to Use Kohlrabi", ingredients: ["Kohlrabi", "Olive Oil", "Lemon"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "carrots", title: "4 Ways to Cook Carrots", ingredients: ["Carrots", "Olive Oil", "Honey"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "corn-cob", title: "4 Ways to Cook Corn on the Cob", ingredients: ["Corn", "Butter", "Salt"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "russet-potatoes", title: "4 Ways to Cook Russet Potatoes", ingredients: ["Russet Potatoes", "Butter", "Sour Cream"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "tomatoes", title: "4 Ways to Cook Tomatoes", ingredients: ["Tomatoes", "Garlic", "Olive Oil"], category: "Vegetables", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "zucchini", title: "4 Ways to Cook Zucchini", ingredients: ["Zucchini", "Garlic", "Olive Oil"], category: "Vegetables", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "bell-peppers", title: "4 Ways to Use Bell Peppers", ingredients: ["Bell Peppers", "Onion", "Olive Oil"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "brussels-sprouts", title: "4 Ways to Use Brussels Sprouts", ingredients: ["Brussels Sprouts", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "butternut-squash", title: "4 Ways to Use Butternut Squash", ingredients: ["Butternut Squash", "Olive Oil", "Onion"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "cabbage", title: "4 Ways to Use Cabbage", ingredients: ["Cabbage", "Onion", "Garlic"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "canned-corn", title: "4 Ways to Use Canned Corn", ingredients: ["Canned Corn", "Butter", "Onion"], category: "Vegetables", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "canned-green-beans", title: "4 Ways to Use Canned Green Beans", ingredients: ["Canned Green Beans", "Garlic", "Bacon"], category: "Vegetables", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "canned-peas", title: "4 Ways to Use Canned Peas", ingredients: ["Canned Peas", "Butter", "Onion"], category: "Vegetables", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "cauliflower", title: "4 Ways to Use Cauliflower", ingredients: ["Cauliflower", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "eggplant", title: "4 Ways to Use Eggplant", ingredients: ["Eggplant", "Olive Oil", "Garlic"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "spinach", title: "4 Ways to Use Spinach", ingredients: ["Spinach", "Garlic", "Olive Oil"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chayote", title: "Chayote – A Squash with Zucchini Flavor", ingredients: ["Chayote", "Garlic", "Lime"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "baked-sweet-potato-fries", title: "Baked Sweet Potato Fries", ingredients: ["Sweet Potato", "Olive Oil", "Salt"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "buffalo-cauliflower", title: "Buffalo Cauliflower Bites", ingredients: ["Cauliflower", "Hot Sauce", "Flour"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "bok-choy-salad", title: "Easy Bok Choy Salad", ingredients: ["Bok Choy", "Sesame Oil", "Soy Sauce"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "fresh-bok-choy", title: "Fresh & Easy Bok Choy Salad", ingredients: ["Bok Choy", "Rice Vinegar", "Sesame Seeds"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "pickles", title: "Easy Refrigerator Pickles", ingredients: ["Cucumbers", "Vinegar", "Dill"], category: "Vegetables", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Fruits
  { id: "apples", title: "4 Ways to Cook Apples", ingredients: ["Apples", "Cinnamon", "Sugar"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "oranges", title: "3 Ways to Use Oranges", ingredients: ["Oranges", "Sugar", "Honey"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "peaches", title: "4 Ways to Use Peaches", ingredients: ["Peaches", "Sugar", "Cinnamon"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "bananas", title: "4 Ways to Use Ripe Bananas", ingredients: ["Bananas", "Flour", "Sugar"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "pumpkin-puree", title: "4 Ways to Use Pumpkin Puree", ingredients: ["Pumpkin Puree", "Cinnamon", "Sugar"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "mango-salsa", title: "Chilled Mango Salsa", ingredients: ["Mango", "Lime", "Cilantro", "Onion"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "fruit-salad", title: "Fruit Salad", ingredients: ["Mixed Fruit", "Honey", "Lime"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "fruit-smoothie", title: "Fruit Smoothie", ingredients: ["Mixed Fruit", "Yogurt", "Milk"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "green-smoothie", title: "Delectable Green Smoothie", ingredients: ["Spinach", "Banana", "Yogurt", "Honey"], category: "Fruits", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Beans & Legumes
  { id: "black-beans", title: "3 Ways to Cook Black Beans", ingredients: ["Black Beans", "Garlic", "Onion"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "snap-peas", title: "3 Ways to Use Snap Peas", ingredients: ["Snap Peas", "Garlic", "Sesame Oil"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "black-bean-corn-salad", title: "Black Bean & Corn Salad with Lime Dressing", ingredients: ["Black Beans", "Corn", "Lime", "Cilantro"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "black-bean-enchiladas", title: "Black Bean & Sweet Potato Enchiladas", ingredients: ["Black Beans", "Sweet Potato", "Tortillas", "Enchilada Sauce"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "black-bean-fajita-pasta", title: "Black Bean Fajita Pasta", ingredients: ["Black Beans", "Pasta", "Bell Peppers", "Onion"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "beans-rice-casserole", title: "Beans & Rice Casserole", ingredients: ["Beans", "Rice", "Cheese", "Onion"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "four-bean-salad", title: "Four Bean Salad", ingredients: ["Kidney Beans", "Green Beans", "Chickpeas", "Vinegar"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chickpea-salad", title: "Chickpea Salad", ingredients: ["Chickpeas", "Cucumber", "Tomato", "Lemon"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "baked-falafel", title: "Baked Falafel Bites", ingredients: ["Chickpeas", "Garlic", "Flour", "Cumin"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chana-masala", title: "Chana Masala", ingredients: ["Chickpeas", "Tomatoes", "Onion", "Garlic", "Spices"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "brown-lentil-curry", title: "Brown Lentil Curry (Masoor Dal)", ingredients: ["Lentils", "Onion", "Tomatoes", "Garlic", "Spices"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "lentil-soup", title: "Delicious Lentil Soup", ingredients: ["Lentils", "Carrots", "Onion", "Garlic"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "lentils-split-peas", title: "How to Cook Lentils and Split Peas", ingredients: ["Lentils", "Split Peas", "Onion", "Garlic"], category: "Beans & Legumes", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Grains & Pasta
  { id: "mac-cheese", title: "4 Ways to Cook Mac & Cheese", ingredients: ["Macaroni", "Cheese", "Milk", "Butter"], category: "Grains & Pasta", hasSpanish: true, pdfUrl: DRIVE_BASE },
  { id: "pb-oatmeal", title: "2 Ways to Use PB & Oatmeal", ingredients: ["Peanut Butter", "Oatmeal", "Honey"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "barley-jambalaya", title: "Barley Jambalaya", ingredients: ["Barley", "Sausage", "Bell Peppers", "Tomatoes"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "butternut-mac", title: "Butternut Squash Mac and Cheese", ingredients: ["Butternut Squash", "Macaroni", "Cheese", "Milk"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chili-mac", title: "Chili Mac n' Cheese", ingredients: ["Macaroni", "Cheese", "Chili", "Ground Beef"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "flatbread-pizza", title: "Easy Flatbread Pizza & Homemade Sauce", ingredients: ["Flatbread", "Pizza Sauce", "Cheese", "Toppings"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "baked-oat-cheesecake", title: "Baked Oat Breakfast Cheesecake", ingredients: ["Oats", "Cream Cheese", "Eggs", "Honey"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "asian-beef-pasta", title: "Asian Beef Pasta Salad", ingredients: ["Pasta", "Beef", "Soy Sauce", "Vegetables"], category: "Grains & Pasta", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Protein
  { id: "turkey-tacos", title: "After Thanksgiving Turkey Tacos", ingredients: ["Turkey", "Tortillas", "Salsa", "Lettuce"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "bison-meatballs", title: "Bison Swedish Inspired Meatballs", ingredients: ["Ground Bison", "Bread Crumbs", "Cream", "Onion"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "bison-tacos", title: "Bison Tacos", ingredients: ["Ground Bison", "Tortillas", "Salsa", "Lettuce"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chicken-noodle-soup", title: "Chicken Noodle Soup with Ramen Noodles", ingredients: ["Chicken", "Ramen Noodles", "Carrots", "Celery"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "fiesta-taco-bake", title: "Fiesta Taco Bake", ingredients: ["Ground Beef", "Tortillas", "Cheese", "Beans"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "vienna-sausages", title: "4 Ways to Use Vienna Sausages", ingredients: ["Vienna Sausages", "Rice", "Eggs"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "beef-soup", title: "Vegetable & Beef Soup", ingredients: ["Beef", "Mixed Vegetables", "Broth", "Potatoes"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "eggplant-recipes", title: "Eggplant Recipes", ingredients: ["Eggplant", "Tomatoes", "Garlic", "Olive Oil"], category: "Protein", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Soups & Stews
  { id: "fall-harvest-soup", title: "Fall Harvest Soup", ingredients: ["Squash", "Carrots", "Onion", "Broth"], category: "Soups & Stews", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "fall-smoothie-bowls", title: "Fall Smoothie Bowl Recipes", ingredients: ["Pumpkin", "Banana", "Yogurt", "Granola"], category: "Soups & Stews", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Snacks & Sides
  { id: "protein-bites", title: "2 Ways to Use Gladian Protein Bites", ingredients: ["Protein Bites", "Peanut Butter", "Chocolate"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "walnuts", title: "7 Ways to Use Walnuts", ingredients: ["Walnuts", "Honey", "Oats"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "hummus", title: "Delicious Hummus", ingredients: ["Chickpeas", "Tahini", "Lemon", "Garlic"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "flavorful-hummus", title: "Flavorful Hummus", ingredients: ["Chickpeas", "Tahini", "Garlic", "Olive Oil"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chocolate-hummus", title: "Chocolate Hummus", ingredients: ["Chickpeas", "Cocoa Powder", "Honey", "Tahini"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "taco-seasoning", title: "4 Ways to Use Taco Seasoning", ingredients: ["Taco Seasoning", "Ground Beef", "Tortillas"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "malt-o-meal-muffins", title: "Malt-O-Meal Magic Muffins", ingredients: ["Malt-O-Meal", "Flour", "Eggs", "Milk"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "cucumber-lime", title: "Cucumber Lime Refresher", ingredients: ["Cucumber", "Lime", "Mint", "Water"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "day-of-dead-atole", title: "Day of the Dead Warm Atole", ingredients: ["Cornstarch", "Milk", "Cinnamon", "Sugar"], category: "Snacks & Sides", hasSpanish: false, pdfUrl: DRIVE_BASE },

  // Desserts
  { id: "black-bean-brownies", title: "Black Bean Chocolate Chunk Brownies", ingredients: ["Black Beans", "Chocolate Chips", "Eggs", "Sugar"], category: "Desserts", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "cinnamon-apple-cookies", title: "Cinnamon Apple Cookies", ingredients: ["Apples", "Cinnamon", "Oats", "Flour"], category: "Desserts", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chocolate-date-brownies", title: "Chocolate Date Brownies", ingredients: ["Dates", "Cocoa Powder", "Eggs", "Flour"], category: "Desserts", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "chocolate-zucchini-muffins", title: "Chocolate Zucchini Lentil Muffins", ingredients: ["Zucchini", "Lentils", "Cocoa Powder", "Flour"], category: "Desserts", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "cardamom-shortbread", title: "Cardamom Pistachio Shortbread Cookie", ingredients: ["Flour", "Butter", "Cardamom", "Pistachios"], category: "Desserts", hasSpanish: false, pdfUrl: DRIVE_BASE },
  { id: "awesomely-mashed-sweet-potatoes", title: "Awesomely Mashed Sweet Potatoes", ingredients: ["Sweet Potato", "Butter", "Brown Sugar", "Cinnamon"], category: "Desserts", hasSpanish: false, pdfUrl: DRIVE_BASE },
];

// Extract all unique ingredients sorted
export const allIngredients = Array.from(
  new Set(recipes.flatMap((r) => r.ingredients))
).sort();

export const allCategories: RecipeCategory[] = [
  "Vegetables",
  "Fruits",
  "Beans & Legumes",
  "Grains & Pasta",
  "Protein",
  "Soups & Stews",
  "Snacks & Sides",
  "Desserts",
];

// Common pantry ingredients people are likely to search
export const popularIngredients = [
  "Black Beans", "Rice", "Chickpeas", "Carrots", "Onion", "Garlic",
  "Tomatoes", "Potatoes", "Corn", "Spinach", "Bananas", "Apples",
  "Chicken", "Ground Beef", "Pasta", "Cheese", "Eggs", "Lentils",
  "Sweet Potato", "Zucchini", "Bell Peppers", "Cabbage", "Oats",
  "Peanut Butter", "Tortillas", "Broccoli",
];
