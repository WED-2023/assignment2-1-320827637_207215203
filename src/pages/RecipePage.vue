<template>
  <div v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <img :src="recipe.image" alt="Recipe image">
    <p v-html="recipe.summary"></p>
    <!-- Display other recipe details here -->
  </div>
</template>

<script>
import recipeData from '@/assets/mocks/recipe_full_view.json';

export default {
  data() {
    return {
      recipe: null
    };
  },
  created() {
    const id = parseInt(this.$route.params.id);
    this.recipe = recipeData.find(recipe => recipe.id === id);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>