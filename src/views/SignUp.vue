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

      <div class="py-2">
        <!-- <b-form-file
      v-model="image"
      @change="onFileUpload"
      :state="Boolean(image)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file> -->

        <!-- <div class="form-group">
    <label for="exampleFormControlFile1">Example file input</label>
    <input type="file"  @change="onFileUpload" class="form-control-file" id="exampleFormControlFile1">
  </div> -->

        <!-- <div class="mt-3">Selected file: {{ image ? image.image.name : '' }}</div> -->
      </div>

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
  data() {
    return {
      usuario: {
        nombre: "",
        email: "",
        pass: "",
      },
    };
  },
  methods: {
    ...mapActions(["guardarUsuario"]),
    signUp() {
      this.axios
        // ruta del API
        .post("/signup", this.usuario)
        .then((res) => {
          console.log('mostrando enn consola el objeto "res": ', res);
          // token no existe, este se genera cuando usuario hace LOGIN
          // const token = res.token;
          // this.guardarUsuario(token);
          this.$router.push({ name: "login" });
        })
        .catch((e) => {
          console.log("Error desde el frontend", e);
          this.mensaje = e.response.mensaje;
        });
    },
  },
};
</script>

<style>
</style>