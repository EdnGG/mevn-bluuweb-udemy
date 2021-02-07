<template>
  <div class="container py-4" >
    <h1>Notes</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>

    <form @submit.prevent="editarNota(notaEditar)" v-if="editar">
      <h3>Edit note</h3>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Note's name"
        v-model="notaEditar.nombre"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Note's description"
        v-model="notaEditar.description"
      />
      <b-button type="submit" class="btn-warning my-2 mx-4">Edit</b-button>
      <b-button type="submit" class="my-2" @click="editar = false"
        >Cancel</b-button
      >
    </form>

    <form @submit.prevent="agregarNota()" v-if="!editar">
      <h3>Type new note</h3>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Note's name"
        v-model="nota.nombre"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Note's description"
        v-model="nota.description"
      />
      <b-button type="submit" class="btn-ligth mb-2 btn-block">Add</b-button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in notas" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.nombre }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
          <td>
            <b-button
              class="btn-warning btn-sm mb-2"
              @click="activarEdicion(item._id)"
              >Edit</b-button
            >
            <!-- <b-button class="btn-warning btn-sm mx-2" @click="alerta()"
              >probando alerta</b-button
            > -->
            <b-button
              class="btn-danger btn-sm  "
              @click="eliminarNota(item._id)"
              >Delete</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>

    <!--  -->

    <nav aria-label="Page navigation example ">
      <ul class="pagination justify-content-center">
        <li class="page-item"
        :class="{ 'disabled': paginaActual === 1 }">
          <router-link
            :to="{ query: { pagina: paginaActual - 1 } }"
            class="page-link"
            
            href="#"
            >Previous</router-link
          >
        </li>
        <li
          class="page-item"
          :class="{ 'active': paginaActual === index + 1 }"
          v-for="(page, index) in cantidadPaginas"
          :key="index"
        >
          <router-link
            :to="{ query: { pagina: index + 1 } }"
            class="page-link"
            >{{ index + 1 }}</router-link
          >
        </li>
        <li class="page-item"
        :class="{ 'disabled': paginaActual === cantidadPaginas }">
          <router-link
            :to="{ query: { pagina: paginaActual + 1 }}"
            class="page-link"
            >Next</router-link
          >
        </li>
      </ul>
    </nav>

    <p>Total notes: {{ totalNotas }} - Total pages: {{ cantidadPaginas }}</p>

    <!--  -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      totalNotas: 0,
      limite: 5,
      paginaActual: 1,
      notas: [],
      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: {
        color: "",
        texto: "",
      },
      nota: { nombre: "", description: "" },
      editar: false,
      notaEditar: {},
    };
  },
  watch: {
    //  con esta funcion leemos la query desde vue.js
    "$route.query.pagina": {
      immediate: true,
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.paginacion(pagina);
        this.paginaActual = pagina;
      },
    },
  },
  // created() {
  //   this.listarNotas();
  // },
  computed: {
    cantidadPaginas() {
      // devuelve un numero entero hacia arriba
      return Math.ceil(this.totalNotas / this.limite);
    },
    ...mapState(["token"]),
  },
  methods: {
    paginacion(pagina) {
      let config = {
        headers: {
          // El token lo sacamos de 'store'
          token: this.token,
        },
      };
      let skip = (pagina - 1) * this.limite;

      this.axios
        .get(`/nota?limit=${this.limite}&skip=${skip}`, config)
        .then((res) => {
          this.notas = res.data.notaDB;
          this.totalNotas = res.data.totalNotas;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    editarNota(item) {
      this.axios
        .put(`/nota/${item._id}`, item)
        .then((res) => {
          const index = this.notas.findIndex((n) => n._id === res.data._id);
          this.notas[index].nombre = res.data.nombre;
          this.notas[index].description = res.data.description;
          this.mensaje.color = "success";
          this.mensaje.texto = "Note was updated";
          this.showAlert();
          this.editar = false;
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    activarEdicion(id) {
      this.axios
        .get(`/nota/${id}`)
        .then((res) => {
          // this.nota.description = res.data.description;
          // this.nota.nombre = res.data.nombre
          this.notaEditar = res.data;
          // console.log(notaEditar);
        })
        .catch((e) => {
          console.log(e.response);
        });
      this.editar = true;
      console.log(id);
    },
    eliminarNota(id) {
      console.log(id);
      this.axios
        .delete(`/nota/${id}`)
        .then((res) => {
          const index = this.notas.findIndex(
            (item) => item._id === res.data._id
          );
          /* Agarramos el index de array y el 1 significa que solo eliminamos un elemento
           */
          this.notas.splice(index, 1);
          this.mensaje.color = "success";
          this.mensaje.texto = "Note was deleted";
          this.showAlert();
        })
        .catch((e) => {
          console.log(e.response);
        });
    },
    agregarNota() {
      let config = {
        headers: {
          // El token lo sacamos de 'store'
          token: this.token,
        },
      };
      console.log(this.nota);
      this.axios
        // 1 ruta, 2 body, 3 headers(config)
        .post("/nueva-nota", this.nota, config)
        .then((res) => {
          this.notas.push(res.data);
          this.nota.nombre = "";
          this.nota.description = "";
          this.mensaje.color = "success";
          this.mensaje.texto = "New note was added";
          this.showAlert();
        })
        .catch((e) => {
          if (e.response.data.error.errors.nombre.message) {
            this.mensaje.texto = e.response.data.error.errors.nombre.message;
          } else {
            this.mensaje.texto = "Something was wrong adding note";
          }
          this.mensaje.color = "danger";
          this.showAlert();
          console.log(e.response);
        });
    },
    alerta() {
      this.mensaje.color = "success";
      this.mensaje.texto = "probando alerta";
      this.showAlert();
    },
    // listarNotas() {
    //   let config = {
    //     headers: {
    //       // El token lo sacamos de 'store'
    //       token: this.token,
    //     },
    //   };
    //   this.axios
    //     .get("/nota", config)
    //     .then((res) => {
    //       console.log(res.data.notaDB);
    //       this.notas = res.data.notaDB;
    //       // console.log(this.notas);
    //     })
    //     .catch((e) => {
    //       console.log(e.response);
    //     });
    // },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style>
</style>