<template>
  <div class="search-page">
    <h1>Search Recipes</h1>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Search for recipes...">
      <select v-model="selectedCuisine">
        <option value="">All Cuisines</option>
        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
      </select>
      <select v-model="selectedDiet">
        <option value="">All Diets</option>
        <option v-for="diet in diets" :key="diet" :value="diet">{{ diet }}</option>
      </select>
      <select v-model="selectedIntolerance">
        <option value="">No Intolerance</option>
        <option v-for="intolerance in intolerances" :key="intolerance" :value="intolerance">{{ intolerance }}</option>
      </select>
      <select v-model="resultsLimit">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <button @click="fetchRecipes">Search</button>
    </div>
    <div v-if="searchResults.length">
      <div v-for="result in searchResults" :key="result.id" class="recipe-preview">
        <img :src="result.image" @click="goToRecipe(result.id)">
        <div>
          <h3>{{ result.title }}</h3>
          <p>Prep Time: {{ result.readyInMinutes }} minutes</p>
          <p>Likes: {{ result.aggregateLikes }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="searchInitiated">
      <p>No recipes found. Try adjusting your search criteria.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      selectedCuisine: null,
      selectedDiet: null,
      selectedIntolerance: '',
      resultsLimit: '5',

      cuisines: [
        'African','Asian', 'American', 'British','Cajun','Caribbean','Chinese','Eastern European','European',
        'French','German','Greek','Indian','Irish','Italian','Japanese', 'Jewish','Korean','Latin American','Mediterranean','Mexican',
        'Middle Eastern','Nordic','Southern',
        'Spanish', 'Thai', 'Vietnamese',
      ],
      diets: [
        'Gluten Free', 'Ketogenic', 'Vegetarian', 'Lacto-Vegetarian',
        'Ovo-Vegetarian', 'Vegan', 'Pescetarian', 'Paleo','Primal','Low FODMAP', 'Whole30'
      ],
      intolerances: [
        'Dairy', 'Egg', 'Gluten','Grain', 'Peanut', 'Seafood',
        'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'
      ],
      selectedIntolerances: [],
      sortOption: 'popularity',
      sortDirection: 'desc',
      searchInitiated: false, // Tracks if search has been performed
    };
  },
  methods: {
    async fetchRecipes() {
      const url = this.$root.store.server_domain + '/recipes/search';
      console.log(this.searchQuery);
      console.log(this.selectedCuisine);
      console.log(this.selectedDiet);
      console.log(this.selectedIntolerance);
      console.log(this.resultsLimit);
      const params = {
            recipeName: this.searchQuery || '',
            // recipeName: this.searchQuery, // Ensure the param names match the backend expectations
            // sort: this.sortOption,
            cuisine: this.selectedCuisine,
            diet: this.selectedDiet,
            intolerance: this.selectedIntolerance,
            number: this.resultsLimit,
            ddRecipeInformation: true
      };
      // Object.keys(params).forEach(key => {
      //   if (!params[key]) {
      //     delete params[key];
      //   }
      // });

      try{
        // console.log("params=",params);
        const response = await axios.get(url, { params });
        // this.recipes = response.data;
        this.searchResults = response.data;
        console.log(response)
      } catch (error){
        console.error(error)
      }


      // this.searchInitiated = true;
      // axios.get('/recipes/search', {
      //   params: {
      //     query: this.searchQuery || '',
      //     // recipeName: this.searchQuery, // Ensure the param names match the backend expectations
      //     sort: this.sortOption,
      //     cuisine: this.selectedCuisine,
      //     diet: this.selectedDiet,
      //     intolerance: this.selectedIntolerance,
      //     number: this.resultsLimit,
      //     ddRecipeInformation: true
      //   }
      // })
      // .then(response => {
      //   this.searchResults = response.data; // Expecting the backend to send an array of recipes
      // })
      // .catch(error => {
      //   console.error('Error fetching recipes:', error);
      //   this.searchResults = [];
      // });
    },
    goToRecipe(id) {
      this.$router.push({ name: 'recipe', params: { recipeId: id } });
    }
  },
  computed: {
    limitAmount(){
      return this.recipes.slice(0, this.resultsLimit);
    }
    // sortedResults() {
    //   return this.searchResults.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    // }
  }
};
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.recipe-preview {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.recipe-preview img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
</style>
