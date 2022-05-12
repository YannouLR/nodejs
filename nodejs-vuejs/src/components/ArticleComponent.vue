<template>
  <div v-if="article">
    <h2>{{ article.title }}</h2>
    <p>{{ article.description }}</p>
    <p>{{ article.brand }}</p>
    <p>{{ article.price }}{{ article.currency }}</p>
  </div>
  <div id="btns">
    <router-link :to="{ name: 'edit', params: { id: this.$route.params.id } }"
      >Edit</router-link
    >
    | <button id="delete" @click="deleteProduct">Delete</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: {},
      showModal: false,
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    fetchArticle: async function () {
      let res = await fetch(
        `http://localhost:90/articles/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((r) => r.json())
        .catch((e) => console.log(e));
      console.log(res);
      if (res.message === "Not Found")
        this.article = { title: "No product found" };
      this.article = res;
    },
    deleteProduct: async function () {
      await fetch(`http://localhost:90/delete/${this.$route.params.id}`, {
        method: "DELETE",
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
      this.$router.push("/article");
    },
  },
};
</script>
