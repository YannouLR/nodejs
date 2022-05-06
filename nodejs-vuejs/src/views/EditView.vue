<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="main" v-if="edit">
      <form @submit.prevent="HandleSubmit">
        <input type="text" v-model="edit.title" name="title" />
        <textarea v-model="edit.description" name="description"></textarea>
        <input type="number" name="price" v-model="edit.price" />
        <input type="submit" value="Modifier" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    HandleSubmit: async function () {
      let res = await fetch(
        `http://localhost:90/edit/${this.$route.params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.edit),
        }
      ).then((r) => {
        r.json();
      });
      console.log("test", res);
      this.edit = res;
    },
  },
  data() {
    return {
      edit: {},
    };
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
}
form {
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 2rem;
  width: 20rem;
  gap: 2rem;
}
</style>
