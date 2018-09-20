<template>
  <div id="app">
    <menu-component v-on:showModal="toggleModal" v-on:showRmvModal="toggleRmvModal"></menu-component>
    <add-modal
      v-if="addModal"
      v-on:addModalOff="toggleModal"
      v-on:addFact="addFact"
    >
    </add-modal>
    <remove-modal
      v-if="rmvModal"
      v-bind:facts="funFacts"
      v-on:removeModalOff="toggleRmvModal"
      v-on:removeFact="removeFact"
    >
    </remove-modal>
    <div id="app-fact-box">
      <div id="app-fact-box-title">Fun fact:</div>
      <transition name="fade" class="fade" appear mode="out-in">
        <span id="app-fact-box-content" v-bind:key="factIndex">{{ currentFact }}</span>
      </transition>
      <button id="app-fact-box-pushup" v-if="!funFacts[factIndex].pushUp" v-on:click="pushUp">Push Up</button>
      <button id="app-fact-box-pushdown" v-if="funFacts[factIndex].pushUp" v-on:click="pushDown">Push Down</button>
    </div>
    <button id="app-fact-change" v-on:click="showAnotherFact">Show another fact !</button>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';
import AddModal from './components/AddModal.vue';
import RemoveModal from './components/RemoveModal.vue';

export default {
  name: 'app',
  components: {
    'menu-component': Menu,
    AddModal,
    RemoveModal
  },
  data: function() {
    return {
      addModal: false,
      rmvModal: false,
      someText: 'lol',
      factIndex: 0,
      funFacts: [
        {
          content: 'The game Sonic Hedgehog has inspired a gene in the human body called SHH (sonic Hedgehog). It is responsible for ensuring all our limbs and organs grow where they are supposed to.',
          pushUp: false
        },
        {
          content: 'In Pokemon Red & Blue, the three renowned birds Arcticuno, Zapdos and Moltres actually means “One Two Three” in Spanish! Artic-UNO, Zap-DOS, Mol-TRES as spelled in Spanish',
          pushUp: false
        },
        {
          content: 'So everybody thought that the video games are actually useless! Here the answer: Studies indicate that surgeons who regularly play video games make 37% fewer mistakes and operate 27% faster than their peers.',
          pushUp: false
        },
        {
          content: 'All you people out there who have been often ridiculed for playing too many video games, now it’s to time to answer all your critics. Studies have found that playing video games train the person to swiftly take the correct decisions. Video gamers are also found to be better in multitasking, driving and navigating around the streets.',
          pushUp: false
        },
        {
          content: 'If you ever pitied Rockstar’s GTA for getting all the negative reviews, you can save your pity. Because Rockstar games paid to get negative press for its GTA series.',
          pushUp: false
        },
        {
          content: 'The highly successful FPS GoldenEye 007 was developed by a team who had never previously worked for any video games. 8 of 10 of its developers were totally inexperienced in the art of making video games.',
          pushUp: false
        },
        {
          content: 'Steve Wozniak’s (apple co-founder) favorite game was Tetris. So much that, in 1900s, he submitted his high scores to Nintendo Power so many times that they refused to print his scores. So he started sending them under another name, “Evets Kainzow” that is reversed of his name.',
          pushUp: false
        },
        {
          content: 'According to Toru Iwatwani, the creator of Pac-Man, he wanted to create a game that will attract women to play it. And the reason he chose Pac-man as always eating something was because he thought the women were always eating something.',
          pushUp: false
        },
        {
          content: 'Robin Willams (famous Hollywood star) is a big fan of video games, so much so that he has named his kids after the character of popular video games – Zelda (The legend of Zelda) and Cody (Final Fight).',
          pushUp: false
        },
        {
          content: 'Donkey Kong got the name because Miyamoto thought “donkey” meant “stupid” in English.',
          pushUp: false
        },
      ]
    }
  },
  computed: {
    currentFact: function() {
      if (this.funFacts.length === 0)
        return 'No fun fact yet.';
      else if (this.factIndex > this.funFacts.length - 1)
        return this.funFacts[this.funFacts.length - 1].content;

      return this.funFacts[this.factIndex].content;
    }
  },
  methods: {
    showAnotherFact: function() {
      if (this.factIndex < this.funFacts.length - 1)
        this.factIndex += 1;
      else
        this.factIndex = 0;
    },

    pushUp: function() {
      this.funFacts[this.factIndex].pushUp = true;
    },

    pushDown: function() {
      this.funFacts[this.factIndex].pushUp = false;
    },

    toggleModal: function() {
      this.addModal = !this.addModal;
    },

    addFact: function(item) {
      this.funFacts.push({ content: item, pushUp: 0 });
    },

    toggleRmvModal: function() {
      this.rmvModal = !this.rmvModal;
    },

    removeFact: function(factIndex) {
      this.funFacts = this.funFacts.filter(item => item !== factIndex);
    }
  } 
}
</script>

<style>
  body {
    background: #f2f4f7;
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  #app {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #app-fact-box {
    width: 600px;
    height: 400px;
    background: #fff;
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 3px;
    box-shadow: 0px 2px 4px rgba(44, 62, 80, .05); 
  }

  #app-fact-box-title {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    opacity: .1;
    font-size: 2em;
    margin-top: 20px;
    font-weight: bold;
  } 

  #app-fact-box-content {
    width: 90%;
    margin: 20px auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app-fact-box-pushup,
  #app-fact-box-pushdown {
    width: 150px;
    height: 25px;
    border: none;
    background: rgba(0, 0, 0, 0);
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 20px auto;
    cursor: pointer;
    border: 1px solid #2c3e50;
    border-radius: 15px;
    outline: none;
    transition: .2s
  }

  #app-fact-box-pushup:hover,
  #app-fact-box-pushdown:hover {
    box-shadow: 0px 0px 4px rgba(44, 62, 80, .5);
  }

  #app-fact-box-pushdown {
    background: #2c3e50;
    color: #fff;
  }

  #app-fact-change {
    margin-top: 50px;
    width: 200px;
    height: 40px;
    border: 1px solid #fff;
    background: #fff;
    color: #2c3e50;
    box-shadow: 0px 2px 4px rgba(44, 62, 80, .08);
    cursor: pointer;
    transition: .2s;
    outline: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: .75em
  }

  #app-fact-change:hover {
    box-shadow: 0px 0px 8px rgba(44, 62, 80, .12);
  }

  .fade-enter {
    transform: translateX(30px);
    opacity: 0;
  }

  .fade-leave-to {
    transform: translateX(-30px);
    opacity: 0;
  }

  .fade-leave,
  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter-active {
    transition: all .3s;
  }

  .fade-leave-active {
    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
