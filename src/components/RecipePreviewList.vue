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
import { GetRecipesPreview } from '@/services/recipes'; // Adjust path as necessary

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: { 
      type: String,
      requied: false
    },
    recipes: { 
      type: Array,
      requied: false
    }
  },
  // data() {
  //   return {
  //     recipes: []
  //   };
  // },
  methods: {
    // async fetchRecipes() {
    //   try {
    //     const result = await GetRecipesPreview(10); // Fetch 10 recipes
    //     this.recipes = result;
    //   } catch (error) {
    //     console.error('Error fetching recipes:', error);
    //     this.recipes = [];
    //   }
    // }
  },
  mounted() {
    // this.fetchRecipes();
  }
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>
