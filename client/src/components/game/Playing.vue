<template>
  <div
    v-if="isWaitForTurn || isChoosingShootingPositions"
    class="box playing has-text-centered"
  >
    <div>
      <span class="title is-5" :class="waitingColor">{{ waitingMessage }}</span>
      &nbsp;<span class="waiting"
        ><span>{{ waitingIcon }}</span
        ><span>{{ waitingIcon }}</span
        ><span>{{ waitingIcon }}</span></span
      >
    </div>
    <div class="columns">
      <div class="column">
        <h4 class="title is-4">The Enemy Area</h4>
        <Sky isEnemy />
      </div>
      <div class="column">
        <h4 class="title is-4">Your Area</h4>
        <Sky />
      </div>
    </div>
    <span class="is-size-4" :class="messageColor">{{ message }}</span>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Sky from "../Sky";

export default {
  components: {
    Sky,
  },
  setup() {
    const store = useStore();

    const isWaitForTurn = computed(() => {
      return store.getters.isWaitForTurn;
    });
    const isChoosingShootingPositions = computed(() => {
      return store.getters.isChoosingShootingPositions;
    });

    const waitingMessage = computed(() => {
      if (isWaitForTurn.value) {
        return "Your enemy is shooting";
      } else {
        return "Your turn to shoot";
      }
    });

    const waitingColor = computed(() => {
      if (isWaitForTurn.value) {
        return "has-text-warning";
      } else {
        return "has-text-success";
      }
    });

    const waitingIcon = computed(() => {
      if (isWaitForTurn.value) {
        return "⏰";
      } else {
        return "🔫";
      }
    });

    const message = computed(() => {
      return store.getters.message;
    });

    const messageColor = computed(() => {
      return store.getters.messageColor;
    });

    return {
      isWaitForTurn,
      isChoosingShootingPositions,
      waitingMessage,
      waitingColor,
      waitingIcon,
      message,
      messageColor,
    };
  },
};
</script>

<style scoped>
.box.playing {
  margin: calc(5vh + 2rem) auto;
  max-width: 1000px;
}

.waiting span {
  font-size: 30px;
  animation-name: waiting;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  position: relative;
  top: 2px;
}

.waiting span:nth-child(2) {
  animation-delay: 0.2s;
}

.waiting span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes waiting {
  0% {
    opacity: 0.2;
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
</style>