<template>
  <div id="app">
    <div>todos</div>
    <input type='text' v-model="inputTodo" />
    <button v-on:click="addItemToDb">ajouter</button>
    <div v-if="initLoading">Loading</div>
    <struct-nav></struct-nav>

    <todo-list
      v-bind:loading="initLoading"
      v-bind:list="items"
      v-on:removeItem="removeItemToDb"
      v-on:changeCompleteStatus="changeCompleteStatus"
      v-bind:statusLoading="statusLoading"
    >
    </todo-list>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';
import StructNav from './components/StructNav.vue';

const APILINK = 'http://localhost:5000';

export default {
  name: 'app',
  components: {
    TodoList,
    StructNav
  },
  data: function() {
    return {
      inputTodo: '',
      initLoading: true,
      postLoading: false,
      removeLoading: false,
      statusLoading: false,
      items: [],
      mode: 'all',
    };
  },
  mounted: function() {
    fetch(`${APILINK}/api/get/item`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' }
    })
    .then(r => r.json())
    .then(({ data }) => {
      this.initLoading = false;
      this.items = data.items;
    })
    .catch(error => {
      this.initLoading = false;
    });
  },
  methods: {
    addItemToDb: function() {
      if (!this.inputTodo) {
        this.errorMsg = 'Uh ! Why you don\'t write something to do ?'
        return;
      }

      this.errorMsg = '',
      this.postLoading = true;
      fetch('http://localhost:5000/api/add/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: this.inputTodo })
      })
      .then(r => r.json())
      .then(({ data }) => {
        if (!data) this.errorMsg = 'Oups! Une erreur est survenue..';
        else {
          this.items = data.items;
          this.inputTodo = ''; 
        }

        this.postLoading = false;
      })
      .catch(e => {
        this.errorMsg = 'Oups! Une erreur est survenue..';
        this.postLoading = false;
      });
    },
    removeItemToDb: function(item) {
      fetch(`${APILINK}/api/remove/item`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: item })
      })
      .then(r => r.json())
      .then(({ data }) => {
        this.items = data.items;
      })
      .catch(error => console.log(error));
    },

    changeCompleteStatus: function(item) {
      console.log(this.statusLoading);
      if (this.statusLoading) {
        return;
      }

      this.statusLoading = true;
      fetch(`${APILINK}/api/update/item/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: item })
      })
      .then(r => r.json())
      .then(({ data }) => {
        this.items = data.items;
        this.statusLoading = false;
      })
      .catch(error => {
        this.statusLoading = false;
      });
    },
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

body {
  background: #f2f4f7;
}
</style>
