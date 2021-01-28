<template>
  <Info />
  <PlacingPlane />
  <Playing />
  <GameOver />
</template>

<script>
import Info from "./Info";
import PlacingPlane from "./PlacingPlane";
import Playing from "./Playing";
import GameOver from "./GameOver";

export default {
  components: {
    Info,
    PlacingPlane,
    Playing,
    GameOver,
  },
};
</script>