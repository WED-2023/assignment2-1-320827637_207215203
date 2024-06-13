<template>
    <div>
      <b-button v-b-modal.modal-1>New Recipe</b-button>
  
      <b-modal id="modal-1" title="Create New Recipe" hide-footer>
        <b-form @submit.prevent="onSubmit">
          <b-form-group label="Recipe Title:" label-for="recipe-title">
            <b-form-input id="recipe-title" v-model="recipe.title" required></b-form-input>
          </b-form-group>
  
          <b-form-group label="Description:" label-for="recipe-description">
            <b-form-textarea 
              id="recipe-description" 
              v-model="recipe.description" 
              rows="3" 
              max-rows="6"
              required>
            </b-form-textarea>
          </b-form-group>
  
          <b-form-group label="Ingredients:" label-for="recipe-ingredients">
            <b-form-textarea 
              id="recipe-ingredients" 
              v-model="recipe.ingredients" 
              placeholder="List each ingredient on a new line" 
              rows="4" 
              required>
            </b-form-textarea>
          </b-form-group>
  
          <b-form-group label="Instructions:" label-for="recipe-instructions">
            <b-form-textarea 
              id="recipe-instructions" 
              v-model="recipe.instructions" 
              placeholder="Step-by-step instructions" 
              rows="5" 
              required>
            </b-form-textarea>
          </b-form-group>
  
          <b-button type="submit" variant="primary">Create Recipe</b-button>
        </b-form>
      </b-modal>
    </div>
  </template>
  
  <script>
  import { mockAddUserRecipe } from "@/services/user.js"; // Import the mock API
  
  export default {
    data() {
      return {
        recipe: {
          title: '',
          description: '',
          ingredients: '',
          instructions: ''
        }
      };
    },
    methods: {
      onSubmit() {
        console.log('Recipe Data:', this.recipe);
        mockAddUserRecipe(this.recipe).then(response => {
          if (response.status === 200) {
            alert(response.response.data.message); // Success message
            this.$router.push({ name: 'myRecipes' }); // Redirect to My Recipes page
          } else {
            alert("Failed to add recipe.");
          }
        }).catch(error => {
          console.error("Error adding recipe:", error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any specific styles for your create recipe page here */
  </style>
  