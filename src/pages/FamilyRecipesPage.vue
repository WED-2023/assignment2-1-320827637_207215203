<template>
  <div class="container">
    <h1 class="title">Family Recipes</h1>
    <div class="main-content">
      <RecipePreviewList title="Family Recipes" :recipes="familyRecipes" class="FamilyRecipes center" />
    </div>
  </div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue'; // Adjust the path accordingly
import familyRecipes from '../assets/mocks/Family/family_preview.json'; // Adjust the path to where your JSON file is stored

export default {
  name: 'FamilyRecipesPage',
  components: {
    RecipePreviewList
  },
  data() {
    return {
      familyRecipes: familyRecipes
    };
  }
};
</script>

<style scoped>
.main-content {
  margin-top: 20px;
}

.title {
  margin-bottom: 20px;
  text-align: center;
  color: #2c3e50;
}
</style>
