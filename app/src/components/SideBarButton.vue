<script setup lang="ts">
const iconToEmoji = {
  'icon-marketing': '📈',
  'icon-finance': '💰',
  'icon-people': '👥'
}

const props = defineProps<{ icon: string; title: string; route: string }>()
</script>

<template>
  <RouterLink :class="'side-bar-container'" :to="props.route">
    <span class="icon">{{ iconToEmoji[props.icon] }}</span>
    <span>{{ props.title }}</span>
  </RouterLink>
</template>

<style scoped>
.side-bar-container {
  display: flex;
  align-items: center;
  font-size: large;
  padding-left: 1rem;
  margin-left: 5px;
  cursor: pointer;
  width: 100%;
  height: 4rem;
}

.icon {
  margin-right: 0.5rem;
  filter: grayscale(100%);
}

a {
  text-decoration: none;
  color: var(--dgBlack);
}

.router-link-active {
  background-color: white;
  border-left: var(--dgRed) 5px solid;
  margin-left: 0;
}
</style>
