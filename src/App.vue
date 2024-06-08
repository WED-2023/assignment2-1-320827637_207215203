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
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ $root.store.username }}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" :to="{ name: 'profile' }">Profile</router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="Logout">Logout</button>
              </div>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
            </li>
          </template>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
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
