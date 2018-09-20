<template>
  <div id="menu">
    <div id="menu-toggle" v-on:click="toggleValue">
      <div v-bind:class="show ? 'menu-toggle-close' : 'menu-toggle-open'"></div>
      <div v-bind:class="show ? 'menu-toggle-close' : 'menu-toggle-open'"></div>
      <div v-bind:class="show ? 'menu-toggle-hide' : 'menu-toggle-open'"></div>
    </div>

    <transition name="menu-fade" tag="div">
      <div id="menu-option" v-show="show">
        <button id="menu-option-add" v-on:click="$emit('showModal')">Add fun fact</button>
        <button id="menu-option-remove">Remove fun fact</button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    toggleValue: function() {
      this.show = !this.show;
    },

    showModal: function() {

    }
  }
}
</script>

<style>
  #menu {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #menu-toggle {
    width: 40px;
    margin-left: 30px;
    margin-top: 25px;
    height: 40px;
    position: relative;
    cursor: pointer;
    opacity: .5;
    transition: .2s;
  }

  #menu-toggle:hover {
    opacity: 1;
  }

  .menu-toggle-open {
    width: 40px;
    height: 4px;
    background: rgba(44, 62, 80, 1);
    margin-bottom: 6px;
    transition: .2s;
    border-radius: 15px;
  }

  .menu-toggle-close {
    width: 35px;
    height: 4px;
    margin-bottom: 6px;
    transition: .2s;
    position: absolute;
    top: 14px;
    left: -5px;
    background: rgba(44, 62, 80, 1);
    border-radius: 15px;
  }

  .menu-toggle-close:first-child {
    transform: rotate(45deg);
    margin: 0px;
  }

  .menu-toggle-close:nth-child(2) {
    transform: rotate(-45deg);
    margin: 0px;
  }

  .menu-toggle-hide {
    display: none;
  }

  #menu-option {
    margin-left: 40px;
    display: flex;
  }

  .menu-fade-enter,
  .menu-fade-leave {
    opacity: 0;
    transform: translateX(-10px);
  }

  .menu-fade-enter-to {
    opacity: 1;
  }

  .menu-fade-leave-to {
    opacity: 0;
    transform: translateX(-10px);
  }

  .menu-fade-enter-active,
  .menu-fade-leave-active {
    transition: all .3s ease;
  }

  #menu-option-add,
  #menu-option-remove {
    min-width: 130px;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    background: rgba(44, 62, 80, .8);
    color: #fff;
    min-height: 25px;
    border-radius: 2px;
    margin-top: 15px;
    margin-right: 5px;
    cursor: pointer;
    transition: .2s;
    opacity: .8;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: .625em;
    outline: none;
  }

  #menu-option-add:hover,
  #menu-option-remove:hover {
    opacity: 1;
    /* background: rgba(44, 62, 80, .9); */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }
</style>
