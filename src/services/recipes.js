// src/services/recipes.js
import axios from 'axios';

// Base URL for the recipe API
const BASE_URL = 'http://localhost:3000/recipes';

// Fetch a preview of recipes, amount specifies how many recipes to fetch
export async function GetRecipesPreview() {
  try {
    const response = await axios.get(`${BASE_URL}/randomRecipes`, {
      params: {  }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return { data: { recipes: [] } }; // Return an empty array if there's an error
  }
}

// Fetch full details of a specific recipe by ID
export async function GetRecipeFullDetails(recipeId) {
  try {
    const response = await axios.get(`${BASE_URL}/recipe/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch recipe details:', error);
    return { data: { recipe: null } }; // Return null if there's an error
  }
}
