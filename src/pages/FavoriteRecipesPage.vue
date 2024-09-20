<template>
  <div>
    <h1>Favorite Recipes</h1>
    <FavoriterecipePreviewList :recipeIds="favoriteRecipeIds" title="Your Favorite Recipes" />
  </div>
</template>

<script>
import FavoriterecipePreviewList from '@/components/FavoriterecipePreviewList.vue';
import { GetFavoriteRecipes } from '@/services/user';

export default {
  name: 'FavoriteRecipesPage',
  components: {
    FavoriterecipePreviewList
  },
  data() {
    return {
      favoriteRecipeIds: []
    };
  },
  methods: {
    async fetchFavoriteRecipes() {
      try {
        this.favoriteRecipeIds = await GetFavoriteRecipes();
        console.log('Favorite recipes here:', this.favoriteRecipeIds);
      } catch (error) {
        console.error('Error fetching favorite recipes:', error);
      }
    }
  },
  created() {
    this.fetchFavoriteRecipes();
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>