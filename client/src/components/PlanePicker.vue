<template>
  <div class="plane-picker">
    <div class="turn-left">
      <img
        class="arrow"
        src="../assets/arrow.png"
        alt="Turn icon"
        @click="rotateLeft"
      />
    </div>
    <div class="plane-wrapper">
      <Plane :rotation="rotation" :opacity="1" />
    </div>
    <div>
      <img
        class="arrow"
        src="../assets/arrow.png"
        alt="Turn icon"
        @click="rotateRight"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import Plane from "./Plane";

export default {
  components: { Plane },
  setup() {
    const rotation = ref(0);
    const store = useStore();
    const rotateLeft = () => {
      rotation.value -= 90;
      store.dispatch("rotateLeft");
    };

    const rotateRight = () => {
      rotation.value += 90;
      store.dispatch("rotateRight");
    };

    return {
      rotateLeft,
      rotateRight,
      rotation,
    };
  },
};
</script>

<style scoped>
.plane-picker {
  display: flex;
  margin: 1rem auto;
  width: 300px;
}

.arrow {
  width: 80px;
  transform: translateY(70px) rotate(90deg);
}

.turn-left {
  transform: rotateY(180deg);
}

.plane-wrapper {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>