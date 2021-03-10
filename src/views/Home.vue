<template>
  <b-container fluid="md">
    <b-row align-h="center" align-v="center" 
    class="py-5 justify-content-md-small"
    >
      <b-col cols="8" sm="6">
        <b-card
          bg-variant="transparent"
          no-body
          class="mt-4 pt-4 border-0" 
        >
        <b-img center
          rounded="circle"
          :src="usuarioDB.image ? usuarioDB.image: defaultImage" 
          alt="User Profile"
          v-bind="mainProps"
          
        ></b-img>
        </b-card>
      </b-col>
    </b-row>
  
    <h4 class="pt-6 mt-6">{{usuarioDB.nombre}}</h4>
     <b-card-body>
      <b-card-title class="mb-4">{{usuarioDB.email}}</b-card-title>
      <b-card-sub-title class="mb-4">Account type: {{usuarioDB.role}}</b-card-sub-title>
      <b-card-text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quibusdam odit, aperiam architecto perferendis quas vitae soluta quia non corrupti aut animi, repellat numquam, alias aliquam esse nisi tenetur ut.
      </b-card-text>
    </b-card-body>
    <div>
    <p class="home__date--member">Member since: {{ usuarioDB.date | moment("dddd, MMMM Do YYYY")}}</p>
    </div>
    <div class="py-2">
    <form @submit.prevent="uploadImage">

    <div class="form-group">

      <b-form-file
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      @change="onFileUpload"
    ></b-form-file>
    <div class="mt-3">Selected file: {{ image ? image.name : '' }}</div>
    </div>

    <b-button pill class="btn-block" type="submit">Upload</b-button>
    <p v-if="message">Error : {{message}}</p>

    </form>
  </div>
</b-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        result: '',
        defaultImage: "https://lenguajejs.com/javascript/logo.svg",
        mainProps: {
          width: 250, height: 250, center: true
        },
        image: null,
        message: null
      }
    },
    computed: {
      ...mapState(["usuarioDB"]),
      getDate(){
        return  this.usuarioDB.date | moment("dddd, MMMM Do YYYY")
      }
    },
    methods: {
    ...mapActions(["guardarUsuario", "updateImageUsuario"]),
    uploadImage(){
    var formData = new FormData()
    formData.append('image', this.image)
    console.log('form-data: ', formData)
    this.axios.put(`/upload/${this.usuarioDB._id}`, 
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data'} }
        )
        .then((res) => {
          console.log('res.data: ', res.data)
          console.log('usuarioDB ya con la imagen: ', res.data.usuarioDB)
          this.updateImageUsuario(res.data.usuarioDB)
        })
        .catch((e) => {
          console.log('Error: ', e.response.data.err.message);
          this.message = e.response.data.err.message;
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
img {
  display: flex;
  text-align: center;
  align-items: center;
}
</style>