<template>
  <div @click="shoot" class="cell">
    <div :class="status"></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["row", "col"],
  setup(props) {
    const store = useStore();
    const status = computed(() => {
      return store.getters.cell(props.row, props.col);
    });

    const shoot = () => {
      store.dispatch("shoot", { row: props.row, col: props.col });
    };

    return {
      status,
      shoot,
    };
  },
};
</script>

<style scoped>
.cell {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  width: 30px;
  height: 30px;
}

.cell > div {
  width: 90%;
  height: 90%;
  margin: 5% auto;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
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
</style>
