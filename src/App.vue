<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" to="#">Navbar</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" :to="{ name: 'main' }">Vue Recipes <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'search' }">Search</router-link>
          </li>
          <li class="nav-tem">
            <router-link class="nav-link" :to="{ name: 'about' }">About</router-link>
          </li>
          <template v-if="$root.store.username">
            <li class="nav-item">
              <a class="nav-link">{{ $root.store.username }}</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Profile
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" :to="{ name: 'favoriteRecipes' }">Favorite Recipes</router-link>
                <router-link class="dropdown-item" :to="{ name: 'myRecipes' }">My Recipes</router-link>
                <router-link class="dropdown-item" :to="{ name: 'familyRecipes' }">Family Recipes</router-link>
              </div>
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="logout">Disconnect</button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link">Hello, Guest</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      this.$root.store.logout();
      this.$router.push({ name: 'main' });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.navbar {
  margin-bottom: 20px;
}

.navbar .dropdown-menu {
  z-index: 1000; /* Ensure the dropdown is above other content */
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>