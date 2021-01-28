<template>
  <div class="sky">
    <div class="row" v-for="row in SKY_SIZE" :key="row">
      <Cell
        :isEnemy="isEnemy"
        v-for="col in SKY_SIZE"
        :key="col"
        :row="row - 1"
        :col="col - 1"
      />
    </div>
  </div>
</template>

<script>
import Cell from "./Cell";
import { SKY_SIZE } from "../constants";

export default {
  components: { Cell },
  props: {
    isEnemy: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      SKY_SIZE,
    };
  },
};
</script>

<style scoped>
.sky {
  border: 1px solid black;
  width: 402px;
  margin: 1rem auto;
}
.row {
  display: flex;
}
</style>