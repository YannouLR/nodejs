<template>
  <div v-if="login" class="form">
    <form @submit.prevent="loginSubmit">
      <input
        type="email"
        name="email"
        id="email"
        v-model="login.email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        id="password"
        v-model="login.password"
        placeholder="password"
      />
      <input type="submit" value="Connection" />
    </form>
    <div v-if="response !== ''">{{ response }}</div>
  </div>
</template>

<script>
export default {
  methods: {
    loginSubmit: async function () {
      let res = await fetch("http://localhost:90/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.login),
      })
        .then((r) => r.json())
        .catch((e) => console.log("error", e));
      this.login = res;
      if (res) {
        localStorage.setItem("token", res.token);
        this.$router.push("/article");
      }
    },
  },
  data() {
    return {
      login: {},
      response: "",
    };
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 30rem;
  align-items: center;
}
.form {
  display: flex;
  justify-content: center;
}
</style>
