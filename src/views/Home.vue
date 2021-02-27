<template>
  <div class="container">
  <b-img center
  class="mt-5 mb-2" 
  v-bind="mainProps"
  :src="usuarioDB.image"  
  rounded="circle" alt="Profile-image"></b-img>
    <br>
    <h1>{{usuarioDB.nombre}}</h1>
    <h2>{{usuarioDB.email}}</h2>
    <br>
    <h3>Role: {{usuarioDB.role}}</h3>
    <p>Role: {{usuarioDB}}<p>
    <p>ID de usuario : {{ usuarioDB._id}}</p>
    <div>

    <p class="home__date--member">Member since: {{usuarioDB.date}}</p>
    </div>
    <div class="py-5">
    <form @submit.prevent="uploadImage">

    <div class="form-group">
    <label for="exampleFormControlFile1">Upload Profile Image</label>
    <input type="file"  @change="onFileUpload" class="form-control-file" id="exampleFormControlFile1">
    </div>

    <b-button class="btn-block" type="submit">Upload</b-button>

    </form>

    <!-- <p>Resultado{{result}}</p> -->

    <!-- <div class="mt-3">Selected file: {{ image ? image.name : '' }}</div> -->
      </div>
  </div>
  
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        result: '',
        // imageUpdated: this.usuarioDB.data.image,
        // defaultImage: "https://lenguajejs.com/javascript/logo.svg",
        mainProps: {
          width: 300, height: 300 
        },
        image: '',
      }
    },
    created(){
      console.log('this.image: ', this.image)
    },
    updated(){
      console.log('Result', this.result)
      console.log('this.image updated: ', this.image)
      console.log('this.res updated: ', this.res)
    },
    computed: {
      ...mapState(["usuarioDB"])
    },
    methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario"]),
    uploadImage(){
    let formData = new FormData()
    formData.append('image', this.image)
    this.axios
         .put(`/upload/${this.usuarioDB._id}`, 
        formData, { headers: { 'Content-Type': 'multipart/form-data'} })
        .then((res) => {
          console.log(res.data.usuarioDB)
          this.updateImageUsuario(res.data.usuarioDB)
          
        })
        .catch((e) => {
          console.log('Error: ', e.response);
          this.mensaje = e.response.data.mensaje;
        });
  },
  onFileUpload (event) {
    this.image = event.target.files[0]
    console.log('contenido de this.image', this.image)
  }
},
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