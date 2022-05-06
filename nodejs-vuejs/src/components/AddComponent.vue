<template>
  <h2>Add a new product</h2>
  <form @submit.prevent="handleSubmit">
    <label for="title">Title</label>
    <input v-model="add.title" type="text" name="title" id="title" required />
    <label for="description">Descriptions</label>
    <textarea
      v-model="add.description"
      name="description"
      id="description"
      required
      cols="30"
      rows="10"
    ></textarea>
    <label for="price">Price</label>
    <input type="number" name="price" id="price" v-model="add.price" />
    <input type="hidden" name="currency" v-model="add.currency" />
    <label for="brand">Brand</label>
    <input type="text" name="brand" id="brand" required v-model="add.brand" />
    <input type="submit" value="Add" />
  </form>
  <div v-if="response !== ''">{{ response }}</div>
</template>

<script>
export default {
  data() {
    return {
      add: {},
      response: "",
    };
  },
  methods: {
    handleSubmit: async function () {
      this.product.currency = "€";
      let res = await fetch("http://localhost:90/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.add),
      })
        .then((r) => r.json())
        .catch((e) => console.log(e));
      if (res) this.response = "Data added successfully";
    },
  },
};
</script>
