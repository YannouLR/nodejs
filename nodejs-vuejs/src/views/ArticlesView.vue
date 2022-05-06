<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ArticlesComponent :articles="articles" />
  </div>
</template>

<script>
import ArticlesComponent from "@/components/ArticlesComponent.vue";
import axios from "axios";

export default {
  components: { ArticlesComponent },
  mounted() {
    axios.get("http://localhost:90/articles").then((response) => {
      console.log("test", response.data);
      this.articles = response.data.articles;
    });
  },
  data() {
    return {
      articles: {},
    };
  },
};
</script>
