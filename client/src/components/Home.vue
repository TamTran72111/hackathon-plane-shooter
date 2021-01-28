<template>
  <div v-if="isLoggedIn">
    <GameList />
  </div>
  <div v-else>
    <div class="box home has-text-centered">
      <h1 class="title is-1 has-text-primary is-italic">
        Welcome to the Plane Shoot game
      </h1>
      <div class="has-text-grey helperText">Please login to play the game</div>
      <div class="columns">
        <div class="column">
          <button class="button is-primary" @click="toggleLogin">Login</button>
        </div>
        <div class="column">
          <router-link class="button is-info" to="/how-to-play">
            How to Play
          </router-link>
        </div>
      </div>
    </div>
    <Login :showLogin="showLogin" :hideLogin="toggleLogin" />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import Login from "./Login";
import GameList from "./GameList";

export default {
  name: "App",
  components: {
    Login,
    GameList,
  },
  setup() {
    const store = useStore();
    const showLogin = ref(false);

    const toggleLogin = () => {
      showLogin.value = !showLogin.value;
    };
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    return {
      isLoggedIn,
      toggleLogin,
      showLogin,
    };
  },
};
</script>

<style scoped>
.box.home {
  max-width: 860px;
  margin: auto;
  transform: translateY(20vh);
}
.helperText {
  margin: 3rem;
}

.box.home > .columns {
  max-width: 300px;
  margin: auto;
}

.box.home > .columns button.button {
  width: 120px;
}
</style>