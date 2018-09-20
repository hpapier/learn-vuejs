<template>
  <transition name="slide" mode="out-in" appear>
    <div id="remove-modal" v-on:click.self="show = false">
      <transition name="fade-in" appear v-on:after-leave="updateData">
        <div v-show="show" id="remove-modal-box">
          <div id="remove-modal-box-title">
            <div id="remove-modal-box-title-text">remove some fun fact:</div>
          </div>
          <div id="remove-modal-box-list">
            <div id="remove-modal-box-list-empty" v-if="facts.length === 0">No facts yet.</div>

            <transition-group name="list-animation" tag="div" appear>
              <div class="remove-modal-box-list-item" v-for="(fact, index) in facts" v-bind:key="index">
                <div class="remove-modal-box-list-content">{{ fact.content.substring(0, 45) + (fact.content.length > 45 ? '..' : '') }}</div>
                <button class="remove-modal-box-list-remove" v-on:click="$emit('removeFact', fact)">
                  <div>remove</div>
                </button>
              </div>
            </transition-group>

          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'remove-modal',
  props: ['facts'],
  data: function() {
    return {
      inputValue: '',
      show: true,
      end: false
    };
  },
  methods: {
    updateData: function() {
      this.end = true;
      this.$forceUpdate();
    }
  },
  updated: function() {
    if (!this.show && this.end)
      this.$emit('removeModalOff');
  },
}
</script>

<style>
  #remove-modal {
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

  #remove-modal-box {
    background: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
    width: 500px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2px;
    padding: 50px 0px;
    overflow: scroll;
  }

  #remove-modal-box-title {
    width: 350px;
    font-size: 1em;
    color: rgba(44, 62, 80, .8);
    margin-bottom: 5px;
  }

  #remove-modal-box-title-text {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-transform: uppercase;
    font-size: .75em;
    font-weight: 400;
    margin-bottom: 10px;
  }

  #remove-modal-box-list {
    width: 350px;
  }

  #remove-modal-box-list-empty {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: .75em;
    font-weight: 300;
    margin-bottom: 10px;
    text-align: center;
    margin-top: 10px;
  }

  .remove-modal-box-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    background: #f2f4f7;
    height: 30px;
    border-radius: 2px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  }

  .remove-modal-box-list-content {
    margin-left: 5px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: .625em;
    color: rgba(44, 62, 80, .8);
  }

  .remove-modal-box-list-remove {
    width: 70px;
    height: 20px;
    border-radius: 2px;
    border: none;
    margin-right: 5px;
    cursor: pointer;
    color: rgba(44, 62, 80, .8);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: .5em;
    text-transform: uppercase;
    margin-top: 1px;
    transition: .1s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .remove-modal-box-list-remove:hover {
    color: #fff;
    background: rgba(44, 62, 80, .8);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
  }

  .remove-modal-box-list-remove div {
    margin-top: 1px;
  }


  #remove-modal-box-submit {
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

  #remove-modal-box-submit:hover {
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


  /* LIST ANIMATION */
  .list-animation-enter,
  .list-animation-leave-to {
    opacity: 0 !important;
    transform: translateX(20px) !important;
  }

  .list-animation-leave,
  .list-animation-enter-to {
    opacity: 1 !important;
  }

  .list-animation-enter-active {
    transition: all .5s !important;
  }

  .list-animation-leave-active {
    transition: all .1s !important;
  }
</style>

