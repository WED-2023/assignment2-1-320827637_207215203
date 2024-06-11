<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <div class="main-content">
<!--      <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />-->
      <RecipePreviewList title="Explore this Recipes" class="RandomRecipes center" />
      <div class="sign-in-prompt" v-if="!$root.store.username">
        <form @submit.prevent="signIn">
          <input type="text" v-model="username" placeholder="Username" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
<!--        <router-link v-if="!$root.store.username" to="/login" tag="button">You need to Login to vue this</router-link>-->
<!--        {{ !$root.store.username }}-->
      </div>
    </div>
    <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !$root.store.username,
        center: true
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      this.$root.store.login(this.username, this.password);
    },

  }
};
</script>

<style lang="scss" scoped>

.main-content {
  display: flex;
  justify-content: space-between;
}
.RandomRecipes {
  margin: 10px 0 10px;
}

.sign-in-prompt form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.sign-in-prompt form input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sign-in-prompt form button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sign-in-prompt form button:hover {
  background-color: #0056b3;
}

.sign-in-prompt {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Aligns the form at the top of the container */
  padding: 20px; /* Adds some padding at the top */
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
