<template>
  <div class="about">
    <h1>About</h1>
    <router-link
      class="btn btn-primary btn-block"
      :to="{ query: { seccion: 1 } }"
      >1</router-link
    >
    <router-link
      class="btn btn-primary btn-block"
      :to="{ query: { seccion: 2 } }"
      >2</router-link
    >
  </div>
</template>

<script>
export default {
  watch: {
    //  dato a observar -- objeto con dif propiedades
    "$route.query.seccion": {
      immediate: true,
      // handler(newVal, oldVal)
      handler(seccion) {
        console.log(`Seccion a cambiado: ${seccion}`);
        console.log()
        
      },
    },
  },
};
</script>
