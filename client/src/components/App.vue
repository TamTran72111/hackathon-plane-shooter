<template>
  <Sky />
  <PlanePicker />
</template>

<script>
import Sky from "./Sky";
import PlanePicker from "./PlanePicker";

export default {
  name: "App",
  components: {
    Sky,
    PlanePicker,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
