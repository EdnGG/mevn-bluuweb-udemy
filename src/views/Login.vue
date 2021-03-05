<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        type="email"
        placeholder="email"
        class="form-control my-2"
        v-model="usuario.email"
      />
      <input
        type="text"
        placeholder="password"
        class="form-control my-2"
        v-model="usuario.pass"
      />
      <b-button class="btn-block" type="submit">Log in</b-button>
    </form>
    <div v-if="mensaje != ''">
      <p>{{ mensaje }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      usuario: { email: "usuario2@usuario2.com", pass: "123123" },
      mensaje: "",
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]), 
    login() {
      // console.log(this.usuario);
      this.axios
        .post("/login", this.usuario)
        .then((res) => {
          // console.log(res.data);
          const data = res.data;
          console.log('res.data: ', res.data)
          console.log('Data: ', res)
          this.guardarUsuario(data);
          this.$router.push({ name: "notas" });
        })
        .catch((e) => {
          console.log(e.response);
          this.mensaje = e.response;
        });
    },
  },
};
</script>

<style>
</style>