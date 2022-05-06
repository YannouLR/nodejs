<script>
export default {
  props: {
    articles: Array,
  },
};
</script>

<template>
  <div class="main">
    <table>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Prix</th>
        <th>Currency</th>
        <th>Brand</th>
        <th>Action</th>
      </tr>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.id }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.description }}</td>
        <td>{{ article.price }}</td>
        <td>{{ article.currency }}</td>
        <td>{{ article.brand }}</td>
        <td>
          <router-link :to="{ name: 'articles', params: { id: article.id } }"
            >view</router-link
          >
        </td>
      </tr>
    </table>
  </div>
</template>
