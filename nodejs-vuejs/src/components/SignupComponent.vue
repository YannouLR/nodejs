<template>
  <div v-if="sign">
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
      let res = await fetch("http://localhost:90/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.sign),
      })
        .then((r) => r.json())
        .catch((e) => console.log("error", e));
      this.sign = res;
      if (res) this.$router.push("/article");
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
