<template>
  <div class="box has-text-centered">
    <h3 class="title is-3">Game Info</h3>
    <div class="columns">
      <div class="column">
        <span
          >Host: <strong>{{ host }}</strong></span
        >
      </div>
      <div class="column">
        <span
          >Guest: <strong>{{ guest }}</strong></span
        >
      </div>
    </div>
    <div class="columns" v-if="canStart">
      <div class="column">
        <button @click="startGame" class="button is-success is-light">
          Start
        </button>
      </div>
      <div class="column">
        <button
          v-if="guest"
          @click="kickGuest"
          class="button is-danger is-light"
        >
          Kick
        </button>
      </div>
    </div>
    <button @click="leave" class="button is-danger is-outlined">Leave</button>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    onMounted(() => {
      if (!store.getters.isInRoom) {
        router.push("/");
      }
    });

    const host = computed(() => {
      return store.getters.host;
    });

    const guest = computed(() => {
      return store.getters.guest;
    });

    const canStart = computed(() => {
      return store.getters.isHost && store.getters.isWaiting;
    });

    const leave = () => {
      store.dispatch("leaveGame");
      router.push("/");
    };

    const startGame = () => {
      store.dispatch("startGame");
    };

    const kickGuest = () => {
      store.dispatch("kick");
    };

    return {
      host,
      guest,
      canStart,
      leave,
      startGame,
      kickGuest,
    };
  },
};
</script>

<style scoped>
.box {
  max-width: 600px;
  margin: auto;
  transform: translateY(5vh);
}
</style>