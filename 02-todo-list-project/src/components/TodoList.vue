<template>
  <div id="todo-list">
    <div v-if="!loading">
      <div v-for="item in list" v-bind:key="item.id">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  props: {
    list: Array,
    loading: Boolean
  }
}
</script>
