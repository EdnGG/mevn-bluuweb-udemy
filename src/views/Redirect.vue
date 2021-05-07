<template>
  
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  mounted() {
    // this.$route.params.searchtext === this.text

    this.text = this.$route.params.searchtext
    console.log('Dentro de text: ', this.text)
    /**
    * Here we redirect the client to the view called  'notas'
    * we pass througth params the note url we want to go   
    */

   
    this.$router.push({name: 'notas', params: {'searchtext': this.text}})
  }
}
</script>

<style>

</style>