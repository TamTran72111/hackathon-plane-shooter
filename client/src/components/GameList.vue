<template>
  <div class="box game-list">
    <div class="has-text-right">
      <button class="button is-outlined is-success" @click="createGame">
        Create Game &nbsp;<span
          class="is-size-4"
          style="transform: translateY(-2px)"
          >+</span
        >
      </button>
      <router-link class="button is-info" to="/how-to-play"
        >How to Play</router-link
      >
      <button class="button is-primary" @click="logout">Logout</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Game Id</th>
          <th>Host</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.id }}</td>
          <td>{{ game.host }}</td>
          <td>
            <button
              v-if="game.guest === null"
              class="button is-small is-info"
              @click="joinGame(game)"
            >
              Join
            </button>
            <button v-else class="button is-small is-danger" disabled>
              Full
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("fetchGames");
    });

    const games = computed(() => {
      return store.getters.games;
    });

    const createGame = () => {
      store.dispatch("createGame");
    };

    const joinGame = (game) => {
      store.dispatch("joinGame", game);
    };

    const logout = () => {
      store.dispatch("logout");
    };

    return { games, createGame, joinGame, logout };
  },
};
</script>


<style scoped>
.box.game-list {
  margin: auto;
  max-width: 600px;
  transform: translateY(5vh);
}
.box.game-list > div:first-child button.button {
  margin: 0 8px;
}
</style>