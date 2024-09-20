<template>
  <div>
    <div class="background" v-if="recipe">
      <div class="container">
        <div class="recipe-header mt-3 mb-4">
          <h1 style="text-align: center">{{ recipe.title }}</h1>
          <img :src="recipe.image" class="center img-page" alt="Recipe Image"/>
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="details">
                <h2>Details:</h2>
                <p><strong>Preparation Time:</strong> {{ recipe.preparationMinutes || 'N/A' }} minutes</p>
                <p><strong>Cooking Time:</strong> {{ recipe.cookingMinutes || 'N/A' }} minutes</p>
                <p><strong>Servings:</strong> {{ recipe.servings }}</p>
                <p><strong>Health Score:</strong> {{ recipe.healthScore }}</p>
                <p><strong>Weight Watcher Smart Points:</strong> {{ recipe.weightWatcherSmartPoints }}</p>
                <div v-if="recipe.dishTypes.length">
                  <strong>Dish Types:</strong>
                  <ul>
                    <li v-for="type in recipe.dishTypes" :key="type">{{ type }}</li>
                  </ul>
                </div>
              </div>
              <div class="special-diet">
                <h2>Special Diet:</h2>
                <p v-if="recipe.vegetarian">Vegetarian</p>
                <p v-if="recipe.vegan">Vegan</p>
                <p v-if="recipe.glutenFree">Gluten Free</p>
                <p v-if="recipe.dairyFree">Dairy Free</p>
              </div>
            </div>
            <div class="wrapped">
              <div class="ingredients">
                <h2>Ingredients:</h2>
                <ul>
                  <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
                    {{ ingredient.original }}
                  </li>
                </ul>
              </div>
              <div class="instructions">
                <h2>Instructions:</h2>
                <ol>
                  <li v-for="step in recipe.analyzedInstructions[0].steps" :key="step.number">
                    {{ step.step }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading recipe details...</p>
    </div>
    <b-button @click="addToFavorites" variant="primary" style="display: block; background-color: red;">Add to Favorites</b-button>
  </div>
</template>

<script>
import { GetRecipeFullDetails } from "@/services/recipes";
import { addRecipeToFavorites } from "@/services/user";

export default {
  name: "RecipeViewPage",
  data() {
    return {
      recipe: null
    };
  },
  methods: {
    async addToFavorites() {
      try {
        const username = localStorage.getItem('username'); // Retrieve user ID from local storage
        console.log(username);
        if (!username) {
          throw new Error('User ID not found. Please log in again.');
        }
        this.axios.defaults.withCredentials = true;
        const recipeId = this.$route.params.recipeId;
        // await this.axios.post('http://localhost:3000/users/favorites', {
          // http://tastetreasures.cs.bgu.ac.il/
          await this.axios.post('http://tastetreasures.cs.bgu.ac.il/users/favorites', {
          username: username,
          recipeId: recipeId
        }, {withCredentials: true});
        // await addRecipeToFavorites(username, recipeId);
        alert('Recipe added to favorites successfully!');
      } catch (error) {
        console.error('Error adding recipe to favorites:', error);
        alert('Failed to add recipe to favorites.');
      }
    }
  },
  async mounted() {
    try {
      const recipeId = this.$route.params.recipeId;
      const result = await GetRecipeFullDetails(recipeId);
      this.recipe = result;
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      this.$router.replace("/NotFound");
    }
  }
};
</script>

<style scoped>
.background, .container {
  max-width: 900px;
  padding: 20px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.center, .img-page {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.wrapper {
  display: flex;
  justify-content: space-between;
}

.wrapped {
  width: 48%;
}

.instructions ol, .ingredients ul {
  padding-left: 20px;
}

.details, .special-diet {
  margin-bottom: 20px;
}
</style>
