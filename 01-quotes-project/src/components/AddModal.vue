<template>
  <transition name="slide" mode="out-in" appear>
    <div id="add-modal" v-on:click.self="show = false">
      <transition name="fade-in" appear v-on:after-leave="updateData">
        <form v-show="show" v-on:submit.prevent="onSubmit" id="add-modal-box">
          <div id="add-modal-box-title">
            <div id="add-modal-box-title-text">Add a new fun fact:</div>
          </div>
          <textarea type="text" v-model="inputValue" id="add-modal-box-input"></textarea>
          <button type="submit" id="add-modal-box-submit">Add fun fact</button>
        </form>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'add-modal',
  data: function() {
    return {
      inputValue: '',
      show: true,
      end: false
    };
  },
  methods: {
    onSubmit: function() {
      this.$emit('addFact', this.inputValue);
      this.show = false;
    },

    updateData: function() {
      this.end = true;
      this.$forceUpdate();
    }
  },
  updated: function() {
    if (!this.show && this.end)
      this.$emit('addModalOff');
  },
}
</script>

<style>
  #add-modal {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  #add-modal-box {
    background: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
  }

  #add-modal-box-title {
    width: 350px;
    margin-top: 60px;
    font-size: 1em;
    color: rgba(44, 62, 80, .8);
    margin-bottom: 5px;
  }

  #add-modal-box-title-text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-transform: uppercase;
    font-size: .75em;
    font-weight: 400;
  }

  #add-modal-box-input {
    width: 350px;
    height: 100px;
    resize: none;
    border-color: rgba(44, 62, 80, .1);
    border-radius: 2px;
    outline: none;
    transition: .2s;
    color: rgba(44, 62, 80, .8);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  #add-modal-box-input:focus {
    border-color: rgba(44, 62, 80, .3);
  }

  #add-modal-box-submit {
    width: 150px;
    border: none;
    height: 35px;
    background: rgba(44, 62, 80, .8);
    color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: .625em;
    font-weight: bold;
    opacity: .8;
    transition: .2s;
    cursor: pointer;
    outline: none;
    margin-top: 20px;
    border-radius: 2px;
  }

  #add-modal-box-submit:hover {
    opacity: 1;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  }

  /* SLIDE TRANSITION */
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
  }

  .slide-leave,
  .slide-enter-to {
    opacity: 1;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all .2s;
  }

  /* FADE-IN TRANSITION */
  .fade-in-enter,
  .fade-in-leave-to {
    opacity: 0;
    transform: translateY(-50px)
  }

  .fade-in-leave,
  .fade-in-enter-to {
    opacity: 1;
  }

  .fade-in-enter-active,
  .fade-in-leave-active {
    transition: all .3s;
  }


</style>

