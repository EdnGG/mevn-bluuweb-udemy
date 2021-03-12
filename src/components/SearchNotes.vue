<template>
  <b-nav-form @submit.prevent="searchNote()">
    <b-form-input
      size="sm"
      class="mr-sm-2"
      placeholder="Search note's name"
      v-model="note.nombre"
    ></b-form-input>
    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
  </b-nav-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
name: 'SearchNotes',
data () {
  return{
    // Solo se requiere la nota indicada (Se buscaria por nombre de nota)
    note: {
      nombre: '',
      description: ''
    },
    userNote: ''
  }
},
computed: {
  ...mapState(["token"]),
},
methods: {
  // ...mapActions(["usuarioDB"]),
  searchNote(){
    this.$router.push({name: 'buscar', params: {'searchtext': this.note.nombre}})
      // let config = {
      //   headers: {
      //     // El token lo sacamos de 'store'
      //     token: this.token,
      //   },
      // };
      // this.axios
      //   .get("/nota", config)
      //   .then((res) => {

      //     // for( let i=0; i < res.data.notaDB.length; i++){
      //     //   if(res.data.notaDB[i].nombre === this.note){
      //     //     let noteFounded = res.data.notaDB[i].nombre
      //     //     this.userNote = noteFinded
      //     //     console.log('si lo recorrio: ', noteFounded)
      //     //   }
      //     // }

      //     let allNotes = res.data.notaDB

      //     let noteFiltered = allNotes.filter((note) => { return note.nombre.toLowerCase() === this.note.nombre.toLowerCase()})
      //     console.log('Dentro del objeto this.note: ', this.note)
      //     console.log('Usando filter, guardandolo en variable noteFiltered: ', noteFiltered[0].description)


      //     if(this.note.nombre.toLowerCase() === res.data.notaDB[0].nombre.toLowerCase()){
      //       console.log('nota encontrada')
      //     } else {
      //        console.log('nota no encontrada')
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e.response);
      //   });
  },
}

}

</script>

<style>

</style>