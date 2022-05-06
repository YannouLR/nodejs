<template>
  <div class="form" @submit.prevent="AddSubmit">
    <form>
      <input
        type="text"
        name="Title"
        v-model="add.title"
        id="title"
        placeholder="Titre de l'article"
      />
      <textarea
        name="description"
        id="description"
        v-model="add.description"
        cols="30"
        rows="10"
        placeholder="Description de l'article"
      ></textarea>
      <input
        type="number"
        step="0.01"
        name="price"
        v-model="add.price"
        id="price"
        placeholder="Prix en €"
      />
      <select name="brand" id="brand">
        <option value="">Friskies</option>
        <option value="">Wiskas</option>
      </select>
      <input type="submit" value="Publier l'article" />
    </form>
  </div>
</template>

<script>
export default {
  methods() {}
};
</script>
