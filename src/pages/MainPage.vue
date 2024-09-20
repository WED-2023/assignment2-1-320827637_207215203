<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="main-content">
      <RecipePreviewList title="Explore Recipes" :recipes="randomRecipes" class="RandomRecipes center" />
      <div v-if="!$root.store.username" class="sign-in-prompt mt-4">
        <form @submit.prevent="signIn" class="sign-in-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="username" class="form-control" id="username" placeholder="Enter username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" class="form-control" id="password" placeholder="Enter password" required />
          </div>
          <button type="submit" class="btn login-btn">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import RecipePreviewList from '../components/RecipePreviewList.vue';
import { GetRecipesPreview } from '@/services/recipes'; // Adjust path as necessary

export default {
  name: 'MainPage',
  components: {
    RecipePreviewList
  },
  data() {
    return {
      randomRecipes: [],
      username: '',
      password: ''
    };
  },
  async mounted() {
    this.fetchRandomRecipes();
  },
  methods: {
    async fetchRandomRecipes() {
      try {
        const result = await GetRecipesPreview();
        console.log("result = ", result);
        this.randomRecipes = result.recipes;
      } catch (error) {
        console.error('Error fetching recipes:', error);
        this.randomRecipes = [];
      }
    },
    signIn() {
      axios.post('/users/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        if (response.data.success) {
          this.$root.store.login(this.username);  // Assuming this method also handles setting auth tokens or similar
          this.$router.push({ name: 'main' });
        } else {
          alert('Login failed: ' + response.data.message);  // Provide user feedback
        }
      }).catch(error => {
        console.error('Login error:', error);
        alert('Login failed, please try again.');
      });
    }
  }
};
</script>

<style scoped>
.main-content {
  margin-top: 20px;
}

.sign-in-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.sign-in-prompt {
  text-align: center;
}

.title {
  margin-bottom: 20px;
  text-align: center;
  color: #2c3e50;
}

.login-btn {
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: darken(#4a90e2, 10%);
}
</style>
