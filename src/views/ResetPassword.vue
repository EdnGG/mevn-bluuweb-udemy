<template>
  <div>
    <template>
      <div class="container">
        <h1>Reset Password</h1>
        <form @submit.prevent="reset">
          <input
            type="email"
            placeholder="email"
            class="form-control my-2"
            v-model="usuario.email"
          />
          <b-button class="btn-block my-4" type="submit">Log in</b-button>
        </form>
        <div v-if="mensaje != ''">
          <p>{{ mensaje }}</p>
        </div>
      </div>
    </template>
  </div>
</template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {
        email: "",
        pass: "",
      },
      mensaje: "",
    };
  },
  methods: {
    reset() {
      console.log("Reset");
    },
  },
};
</script>

<style scoped>
</style>