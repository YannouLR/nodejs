<template>
  <div>
    <form @submit.prevent="signupsubmit">
      <input
        type="text"
        name="name"
        id="name"
        v-model="sign.name"
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        id="email"
        v-model="sign.email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        id="password"
        v-model="sign.password"
        placeholder="password"
      />
      <input type="submit" value="inscription" />
    </form>
    <div v-if="response !== ''">{{ response }}</div>
  </div>
</template>

<script>
export default {
  methods: {
    signupsubmit: async function () {
      let response = await fetch("http://localhost:90/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.sign),
      })
        .then((r) => r.json())
        .catch((e) => console.log("error", e));
      this.sign = response;
      if (response) this.response = "l'utilisateur a bien était créer";
    },
  },
  data() {
    return {
      sign: {},
      response: "",
    };
  },
};
</script>
