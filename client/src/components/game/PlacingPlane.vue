<template>
  <div v-if="isChoosingPlanePositions" class="box placing">
    <div class="columns has-text-centered">
      <div class="column">
        <h4 class="title is-4">Your Sky Area</h4>
        <span class="is-size-7 has-text-grey"
          >Click on any cell to place your plane. You need to place 3 planes to
          start.</span
        >
        <Sky />
      </div>
      <div class="column">
        <h4 class="title is-4">Plane Direction</h4>
        <span class="is-size-7 has-text-grey"
          >Click on the arrow to change the plane direction before placing on
          the sky.</span
        >
        <PlanePicker />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Sky from "../Sky";
import PlanePicker from "../PlanePicker";

export default {
  components: {
    Sky,
    PlanePicker,
  },
  setup() {
    const store = useStore();

    const isChoosingPlanePositions = computed(() => {
      return store.getters.isChoosingPlanePositions;
    });

    return { isChoosingPlanePositions };
  },
};
</script>

<style scoped>
.box.placing {
  max-width: 800px;
  margin: calc(2rem + 5vh) auto;
}
</style>