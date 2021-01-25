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
      <div class="plane" :style="planeStyle">
        <div class="one"><div></div></div>
        <div class="three">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="one"><div></div></div>
        <div class="three">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
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
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const plane = ref(0);
    const store = useStore();
    const rotateLeft = () => {
      plane.value -= 90;
      store.dispatch("rotateLeft");
    };

    const rotateRight = () => {
      plane.value += 90;
      store.dispatch("rotateRight");
    };

    const planeStyle = computed(() => {
      return {
        transform: `rotate(${plane.value}deg)`,
      };
    });

    return {
      rotateLeft,
      planeStyle,
      rotateRight,
    };
  },
};
</script>

<style scoped>
.plane-picker {
  display: flex;
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
.plane {
  width: 90px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  transition: all 1s ease;
}

.plane > div > div {
  background-color: yellow;
  width: 30px;
  height: 30px;
  border: 1px solid red;
  margin: 0 -1px -1px 0;
}

.three {
  display: flex;
}

.plane > .three > div:nth-child(2):before,
.plane > .three > div:nth-child(2):after {
  content: "";
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  background-color: yellow;
}

.plane > .three > div:nth-child(2):before {
  top: -2px;
  height: 34px;
}
.plane > .three > div:nth-child(2):after {
  top: -34px;
  left: -2px;
  width: 34px;
}

.plane > .three:last-child > div:nth-child(2):before {
  height: 32px;
}
.plane > .three:last-child > div:nth-child(2):after {
  top: -32px;
}
</style>