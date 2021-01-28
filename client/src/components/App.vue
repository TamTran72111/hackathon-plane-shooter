<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("tryLogin");
    });
  },
};
</script>

<style>
#app {
  margin: 0;
  min-height: 100vh;
  background-image: url("../assets/background.jpg");
}
</style>
