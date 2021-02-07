<template>
  <div>
  <b-img center
  class="mt-5 mb-2" 
  v-bind="mainProps"
  src="https://picsum.photos/125/125/?image=55"  rounded="circle" alt="Center image"></b-img>
    <br>
    <h1>{{usuarioDB.data.nombre}}</h1>
    <h2>{{usuarioDB.data.email}}</h2>
    <br>
    <h3>Role: {{usuarioDB.data.role}}</h3>
    <p>Role: {{usuarioDB}}<p>
    <div>

    <p class="home__date--member">Member sice: {{usuarioDB.data.date}}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data() {
      return {
       mainProps: {
         width: 300, height: 300 
       }
      }
    },
    computed: {
      ...mapState(["usuarioDB"])
    },
    methods: {
      
    }
  }
</script>

<style scoped>
.home__date--member{
  display: flex;
  margin-left: 20px;
  padding-top: 7%;
  font-weight: bold;
}
</style>