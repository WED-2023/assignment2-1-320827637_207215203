<template>
  <b-container>
    <h3>{{ title }}</h3>
    <b-row>
      <b-col v-for="recipe in recipes" :key="recipe.id" cols="12" sm="6" md="4" lg="3">
        <RecipePreview :recipe="recipe" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from './RecipePreview.vue';
import axios from 'axios';

export default {
  name: "FavoriterecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: false
    },
    recipeIds: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const apiKey = "eee0057bb4964d09b8734fd44f51ad7f"; // Ensure this variable is set in your .env file
        const recipeDetailsPromises = this.recipeIds.map(id =>
            axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
              params: {
                apiKey: apiKey
              }
            })
        );
        const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);
        this.recipes = recipeDetailsResponses.map(res => res.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  },
  mounted() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>