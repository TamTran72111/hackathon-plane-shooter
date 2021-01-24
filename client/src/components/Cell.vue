<template>
  <div class="cell">
    <div :class="status"></div>
  </div>
</template>

<script>
export default {
  props: ["status"],
};
</script>

<style scoped>
.cell {
  border: 3px solid black;
  width: 40px;
  height: 40px;
}

.cell > div {
  width: 100%;
  height: 100%;
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
