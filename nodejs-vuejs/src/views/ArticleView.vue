<template>
  <div class="main">
    <!--<h1>This is my {{ current.article.title }} page</h1>-->
    <ArticleComponent :article="article" />
  </div>
</template>

<script>
import ArticleComponent from "@/components/ArticleComponent.vue";
import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  components: {
    ArticleComponent,
  },
  mounted() {
    axios
      .get(`http://localhost:90/articles/${this.$route.params.id}`)
      .then((res) => {
        console.log("test", res.data);
        this.article = res.data;
      });
  },
  data() {
    return {
      article: {},
    };
  },
};
</script>
