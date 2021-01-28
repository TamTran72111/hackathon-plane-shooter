<template>
  <div @click="click" class="cell">
    <div :class="`${status} ${animation}`"></div>
    <Plane
      v-if="isHead"
      :translateX="translate.translateX"
      :translateY="translate.translateY"
      :rotation="rotation"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Plane from "./Plane";

export default {
  props: ["row", "col", "isEnemy"],
  components: { Plane },
  setup(props) {
    const store = useStore();
    const status = computed(() => {
      return store.getters.cell(props.row, props.col, props.isEnemy);
    });
    const isHead = computed(() => {
      return !props.isEnemy && store.getters.isHead(props.row, props.col);
    });
    const translate = computed(() => {
      return store.getters.translate(props.row, props.col);
    });
    const rotation = computed(() => {
      return store.getters.rotation(props.row, props.col);
    });
    const click = () => {
      if (status.value == "") {
        store.dispatch("clickCell", {
          row: props.row,
          col: props.col,
          isEnemy: props.isEnemy,
        });
      }
    };

    const animation = computed(() => {
      if (store.getters.lastShoot(props.row, props.col, props.isEnemy)) {
        return "animation";
      } else {
        return "";
      }
    });
    return {
      status,
      click,
      isHead,
      translate,
      rotation,
      animation,
    };
  },
};
</script>

<style scoped>
.cell {
  border: 1px solid black;
  /* border-right: 1px solid black; */
  width: 40px;
  height: 40px;
}

.cell > div {
  width: 90%;
  height: 90%;
  margin: 5% auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  z-index: 10;
}

.miss {
  background-image: url("../assets/miss.png");
}

.hit {
  background-image: url("../assets/hit.png");
}

.headshot {
  background-image: url("../assets/headshot.png");
}

@keyframes blink {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.animation {
  animation-name: blink;
}
</style>
