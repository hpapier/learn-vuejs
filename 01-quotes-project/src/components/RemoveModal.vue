<template>
  <div id="remove-modal">
    <div>
      <div>title</div>
      <input type="text" v-model="inputValue" />
      <button>Remove fun fact</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'remove-modal',
  data: function() {
    return {
      inputValue: ''
    };
  }
}
</script>

<style>

</style>

