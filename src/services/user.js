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
  // const API_URL = 'http://localhost:3000'; // Adjust the URL as needed
  const API_URL = 'http://tastetreasures.cs.bgu.ac.il'; // Adjust the URL as needed


  export async function createPersonalRecipe(recipe) {
    try {
      const response = await axios.post(`${API_URL}/createPersonalRecipe`, recipe);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }


export async function addRecipeToFavorites(username, recipeId) {
  try {
    const response = await axios.post(`${API_URL}/users/favorites`, {
      username,
      recipeId
    }, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    throw error;
  }
}

export async function GetFavoriteRecipes() {
  try {
    const response = await axios.get(`${API_URL}/users/favorites`, {
      withCredentials: true // Ensure credentials are sent with the request
    });
    const recipeIds = response.data;
    console.log('Favorite Recipe IDs:', recipeIds);
    return recipeIds;
    // Fetch full details for each favorite recipe from Spoonacular API
    // const recipeDetailsPromises = recipeIds.map(id => axios.get(`${API_URL}/recipes/${id}`));
    // const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);
    // const favoriteRecipes = recipeDetailsResponses.map(res => res.data);

    // return favoriteRecipes;
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    throw error;
  }
}