<template>
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
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    rotation: {
      type: Number,
      default: 0,
    },
    translateX: {
      type: Number,
      default: 0,
    },
    translateY: {
      type: Number,
      default: 0,
    },
    opacity: {
      type: Number,
      default: 0.6,
    },
  },
  setup(props) {
    const planeStyle = computed(() => {
      return {
        transform: `rotate(${props.rotation}deg) translateX(${props.translateX}px) translateY(${props.translateY}px)`,
        opacity: props.opacity,
      };
    });
    return {
      planeStyle,
    };
  },
};
</script>

<style scoped>
.plane {
  width: 40px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  transition: all 1s ease;
  z-index: 5;
}

.plane > div > div {
  background-color: yellow;
  width: 40px;
  height: 40px;
  border: 2px solid red;
  margin: 0;
}

.three {
  display: flex;
}

.plane > .three > div:nth-child(2):before,
.plane > .three > div:nth-child(2):after {
  content: "";
  display: block;
  position: relative;
  width: 36px;
  height: 36px;
  background-color: yellow;
}

.plane > .three > div:nth-child(2):before {
  top: -4px;
  height: 44px;
}
.plane > .three > div:nth-child(2):after {
  top: -44px;
  left: -4px;
  width: 44px;
}

.plane > .three:last-child > div:nth-child(2):before {
  height: 38px;
}
.plane > .three:last-child > div:nth-child(2):after {
  top: -38px;
}
</style>