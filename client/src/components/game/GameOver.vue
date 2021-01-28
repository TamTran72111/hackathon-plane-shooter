<template>
  <div class="modal" :class="{ 'is-active': isGameOver }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box has-text-centered">
        <h2 class="title is-2 has-text-primary">Game Over</h2>
        <h4 class="title is-4">{{ message }}</h4>
        <button
          class="button is-rounded is-medium"
          :class="buttonClass"
          @click="finish"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const message = computed(() => {
      if (store.getters.win) {
        return "Congratulations! You win!!! 🎉🎉🎉";
      }
      {
        return "You lose!!! 😥😥😥";
      }
    });

    const buttonClass = computed(() => {
      if (store.getters.win) {
        return "is-success";
      } else {
        return "is-danger";
      }
    });

    const isGameOver = computed(() => {
      return store.getters.isGameOver;
    });

    const finish = () => {
      store.commit("finish");
    };
    return { message, buttonClass, finish, isGameOver };
  },
};
</script>