<script>
export default {
  props: {
    article: Object,
  },
};
</script>

<template>
  <div class="body">
    <div class="main">
      <div v-if="article.id" class="main">
        <h1>{{ article.title }}</h1>
        <div>{{ article.description }}</div>
        <div>
          <h3>Marque:</h3>
          {{ article.brand }}
        </div>
        <div>{{ article.price }} {{ article.currency }}</div>
        <div>
          <router-link :to="{ name: 'edit', params: { id: article.id } }"
            >Modifier</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: center;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 40rem;
  align-content: center;
}
</style>
