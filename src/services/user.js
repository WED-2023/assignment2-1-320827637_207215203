// src/services/user.js
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";


  // export function mockAddFavorite(recipeId) {
  //   return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
  // }
  
  // export function mockAddUserRecipe(recipeDetails) {
  //   return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };

  // }
  
  import axios from 'axios';
  const API_URL = 'http://localhost:3000'; // Adjust the URL as needed

  export async function createPersonalRecipe(recipe) {
    try {
      const response = await axios.post(`${API_URL}/createPersonalRecipe`, recipe);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }