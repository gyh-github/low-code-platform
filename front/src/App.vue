<script setup>
import container from './packages/container';
import Home from '@/views/home';
import Login from '@/views/login';
import Preview from '@/views/preview/index.jsx';
import { ref, computed } from 'vue';

const routes = {
  '/': Home,
  "/container": container,
  "/preview": Preview
};
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  const user = sessionStorage.getItem('userName');
  if (!user) {
    window.location.href = '/#/login';
    return Login;
  };
  return routes[currentPath.value.slice(1) || '/'] || NotFound;
})
</script>

<template>
  <component :is="currentView" />
</template>

<style scoped></style>
