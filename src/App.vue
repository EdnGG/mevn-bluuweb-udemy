<template>
  <div id="app">
    <!--  -->
    <div class="main--div">
      <!-- <b-container fluid="sm"> -->
      <b-navbar toggleable="md" type="dark" variant="dark">
        <!-- <b-navbar-brand href="#">Todo Notes</b-navbar-brand> -->

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav justified>
            <b-nav-item to="/" v-if="estaActivo">Profile</b-nav-item>
            <b-nav-item to="/signup" v-if="!estaActivo">Sign Up</b-nav-item>
            <b-nav-item to="/login" v-if="!estaActivo">Login</b-nav-item>
            <b-nav-item to="/notas" v-if="estaActivo">Notes</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto nav--dropdown">
            <SearchNotes v-if="estaActivo" />
            <b-nav-item-dropdown right v-if="estaActivo">
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ usuarioDB.nombre }}</em>
              </template>
              <b-dropdown-item to="/">Profile</b-dropdown-item>
              <b-dropdown-item to="/notas">Notes</b-dropdown-item>
              <b-dropdown-item @click="cerrarSesion()"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <!-- </b-container> -->
    </div>
    <!--  -->

    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import SearchNotes from "./components/SearchNotes";

export default {
  components: {
    SearchNotes,
  },
  methods: {
    ...mapActions(["cerrarSesion", "leerToken"]),
  },
  computed: {
    ...mapGetters(["estaActivo"]),
    ...mapState(["usuarioDB"]),
  },
  created() {
    this.leerToken();
  },
};
</script>

<style>
* {
  background-color: #76949f;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  padding-right: 0px;
  padding-left: 0px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#nav-collapse {
  background-color: #343a40;
}
.navbar-nav,
.nav-item,
.form-inline,
.dropdown-menu-rigth,
b-dropdown-item,
em {
  background-color: #343a40;
  color: #b8dbd9;
  font-weight: 800;
}
b-dropdown-item {
  color: #b8dbd9;
  font-weight: 800;
}
</style>
