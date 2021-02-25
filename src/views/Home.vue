<template>
  <div class="container">
  <b-img center
  class="mt-5 mb-2" 
  v-bind="mainProps"
  :src="usuarioDB.data.image"  rounded="circle" alt="Center image"></b-img>
    <br>
    <h1>{{usuarioDB.data.nombre}}</h1>
    <h2>{{usuarioDB.data.email}}</h2>
    <br>
    <h3>Role: {{usuarioDB.data.role}}</h3>
    <p>Role: {{usuarioDB}}<p>
    <p>ID de usuario : {{ usuarioDB.data._id}}</p>
    <div>

    <p class="home__date--member">Member sice: {{usuarioDB.data.date}}</p>
    </div>
    <div class="py-5">
      <!-- <b-form-file
      v-model="image"
      @change="onFileUpload"
      :state="Boolean(image)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file> -->
    <form @submit.prevent="uploadImage">

    <div class="form-group">
    <label for="exampleFormControlFile1">Upload Profile Image</label>
    <input type="file"  @change="onFileUpload" class="form-control-file" id="exampleFormControlFile1">
    </div>

    <b-button class="btn-block" type="submit">Upload</b-button>

    </form>

    <!-- <div class="mt-3">Selected file: {{ image ? image.image.name : '' }}</div> -->
      </div>
  </div>
  
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
       mainProps: {
         width: 300, height: 300 
       },
       image: '',
      }
    },
    computed: {
      ...mapState(["usuarioDB"])
    },
    methods: {
  ...mapActions(["guardarUsuario"]),
  uploadImage(){
    let formData = new FormData()
    formData.append('image', this.image)
    this.axios
         .put(`/upload/${this.usuarioDB.data._id}`, 
      // .put(`/upload`, 
        formData, { headers: { 'Content-Type': 'multipart/form-data'} })
        .then((res) => {
          // this.guardarUsuario(token);
          console.log('Imagen posteada', res)
        })
        .catch((e) => {
          console.log('Error desde el frontend',e);
          this.mensaje = e.response.mensaje;
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