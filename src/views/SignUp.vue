<template>
  <div class="container">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input
        type="text"
        placeholder="Name"
        class="form-control my-2"
        v-model="usuario.nombre"
      />
      <input
        type="email"
        placeholder="Email"
        class="form-control my-2"
        v-model="usuario.email"
      />
      <input
        type="text"
        placeholder="Password"
        class="form-control my-2"
        v-model="usuario.pass"
      />

      <!-- <div class="py-5">
      <b-form-file
      v-model="usuario.image"
      :state="Boolean(usuario.image)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ usuario.image ? usuario.image.name : '' }}</div>
      </div> -->

      <b-button class="btn-block" type="submit">Sign Up</b-button>
    </form>
    <!-- <div v-if="mensaje != ''">
      <p>{{ mensaje }}</p>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
data(){
  return{
    usuario: {
      nombre: '',
      email: '',
      pass: '',
      image: null,
      }
  }
},
methods: {
  ...mapActions(["guardarUsuario"]),
  signUp(){

    console.log(this.usuario);
      this.axios
      // ruta del API 
        .post("/signup", this.usuario)
        .then((res) => {
          console.log(res);
          const token = res.data.token;
          this.guardarUsuario(token);
          this.$router.push({ name: "notas" });
        })
        .catch((e) => {
          console.log(e);
          this.mensaje = e.response.data.mensaje;
        });

  }
},

}
</script>

<style>

</style>