<template>
  <div class="box how-to-play">
    <h1 class="title is-1 has-text-primary is-italic has-text-centered">
      Welcome to the Plane Shoot game
    </h1>

    <p class="has-text-centered has-text-grey is-size-6">
      To play you need to login
    </p>
    <div class="guide">
      <p>
        Firstly, you need to create a game and wait for another player to join,
        then you can start.
      </p>
      <img
        class="big"
        src="../assets/guide-before-start.png"
        alt="Guide before start"
      />
      <p>
        Then, you will see a 10 x 10 area, where you can place your 3 planes
        before starting to fight. You can use arrow to change your plane
        direction before clicking on a cell to place it.
      </p>
      <img
        class="big"
        src="../assets/guide-placing-planes.png"
        alt="Guide placing planes"
      />
      <p>
        When you and your enemy finish to place planes, the fight starts. When
        it is your turn, you can click on a cell in the enemy area to shoot to
        that cell. If the cell is a head of a plane, you will get a
        headshot&nbsp;
        <img class="small" src="../assets/headshot.png" alt="Headshot" />, and
        that plane will be destroyed. If the cell is another part of a plane,
        you will get a hit&nbsp;
        <img class="small" src="../assets/hit.png" alt="Hit" />, and the plane
        will be damaged. Otherwise, you will get a miss &nbsp;<img
          class="small"
          src="../assets/miss.png"
          alt="Miss"
        />.<br /><br />
        If you destroy all of the 3 enemy planes before the enemy destroys all
        of your planes, you will <strong>win</strong>. Otherwise, you
        <strong>lose</strong>.
      </p>
      <div class="has-text-centered">
        <router-link class="button is-primary is-outlined" to="/"
          >Back to Home</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.box.how-to-play {
  transform: translateY(3vh);
  max-width: 900px;
  margin: auto;
}
.guide {
  margin-top: 1rem;
}
.guide img.big {
  margin: auto;
  display: block;
  width: 400px;
}
.guide img.small {
  width: 25px;
  height: 25px;
  transform: translateY(5px);
}
</style>