import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import HowToPlay from './components/HowToPlay.vue';
import Game from './components/game/Game.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/how-to-play', name: 'how-to-play', component: HowToPlay },
  { path: '/game/:id', name: 'game', component: Game },
  { path: '/:catchAll(.*)', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
