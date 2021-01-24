<template>
  <div class="map">
    <div class="row" v-for="row in SKY_SIZE" :key="row">
      <Cell v-for="col in SKY_SIZE" :key="col" :row="row - 1" :col="col - 1" />
    </div>
  </div>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

import Cell from "./Cell";
import { SKY_SIZE } from "../constants";

export default {
  components: { Cell },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("createSky");
    });
    return {
      SKY_SIZE,
    };
  },
};
</script>

<style scoped>
.map {
  border: none;
  border-top: 1px solid black;
  border-left: 1px solid black;
}
.row {
  display: flex;
}
</style>