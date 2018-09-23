<template>
  <div id="todo-list">

    <div v-if="!loading">
      <div class="todo-list-item" v-for="item in list" v-bind:key="item.id">
        <div class="todo-list-item-box">
          <div
            v-bind:class="['todo-list-item-complete', !item.complete ? 'todo-list-item-complete-true' : 'todo-list-item-complete-false']"
            v-on:click="!statusLoading ? $emit('changeCompleteStatus', item) : null"
          >
            <span v-if="item.complete" class="todo-list-item-complete-icon"></span>
          </div>
          <div v-bind:class="['todo-list-item-content', item.complete ? 'todo-list-item-content-true' : '']">{{ item.content }}</div>
        </div>
        <div class="todo-list-item-box">
          <div class="todo-list-item-pin">
            <span v-bind:class="['todo-list-item-pin-icon', item.fav ? 'todo-list-item-pin-icon-true' : '']"></span>
            <span class="todo-list-item-pin-icon-mask"></span>
          </div>
          <div v-on:click="$emit('removeItem', item)" class="todo-list-item-remove">
            <span class="todo-list-item-remove-icon"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else>Loading</div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  props: {
    list: Array,
    loading: Boolean,
    statusLoading: Boolean
  }
}
</script>


<style>
#todo-list {
  width: 500px;
  display: flex;
  flex-direction: column;
}

.todo-list-item {
  width: 100%;
  height: 70px;
  display: flex;
  background: #fff;
  margin-top: 1px;
  justify-content: space-between;
  align-content: center;
  border-radius: 3px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);
}

.todo-list-item-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Complete Button */
.todo-list-item-complete {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #fff;
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #f5f5f5;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list-item-complete-icon {
  width: 7px;
  height: 15px;
  border-bottom: 1px solid #42b983;
  border-right: 1px solid #42b983;
  transform: rotate(45deg);
  margin-bottom: 5px;
  margin-left: 0.5px;
}

.todo-list-item-complete-true {
  border: 1px solid rgba(66, 185, 131, .3);
}

/* Pin Button */
.todo-list-item-pin {
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  cursor: pointer;
  height: 35px;
  margin-right: 10px;
  position: relative;
  transition: .2s;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list-item-pin-icon {
  border-top: 15px solid #f2f4f7;
  border-left: 6px solid #f2f4f7;
  border-right: 6px solid #f2f4f7;
  border-bottom: 5px solid rgba(0, 0, 0, 0);
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  margin-bottom: 1px;
  z-index: 1;
  transition: .2s;
}

.todo-list-item-pin:hover .todo-list-item-pin-icon {
  border-top-color: #42b983 !important;
  border-left-color: #42b983 !important;
  border-right-color: #42b983 !important;
}

.todo-list-item-pin-icon-true {
  border-top-color: #42b983 !important;
  border-left-color: #42b983 !important;
  border-right-color: #42b983 !important;
}

.todo-list-item-pin:hover .todo-list-item-pin-icon-mask {
  display: flex;
}

.todo-list-item-pin-icon-mask {
  display: none;
  border-top: 16px solid rgba(0, 0, 0, 0.05);
  border-left: 7px solid rgba(0, 0, 0, 0.05);
  border-right: 7px solid rgba(0, 0, 0, 0.05);
  border-bottom: 6px solid rgba(0, 0, 0, 0);
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  position: absolute;
  z-index: 0;
  filter: blur(2px);
  transition: .2s;
}

/* Remove Button */
.todo-list-item-remove {
  background: rgba(0, 0, 0, 0);
  border-radius: 50%;
  cursor: pointer;
  height: 35px;
  margin-right: 20px;
  position: relative;
  transition: .2s;
  width: 35px;
}

.todo-list-item-remove:hover .todo-list-item-remove-icon::before,
.todo-list-item-remove:hover .todo-list-item-remove-icon::after {
  background: #42b983;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05)
}

.todo-list-item-remove-icon::before,
.todo-list-item-remove-icon::after {
  content: '';
  width: 20px;
  height: 4px;
  left: 7.5px;
  top: 50%;
  margin-top: -2.05px;
  position: absolute;
  background: #f2f4f7;
  border-radius: 5px;
  transition: .2s;
}

.todo-list-item-remove-icon::before {
  transform: rotate(45deg);
}

.todo-list-item-remove-icon::after {
  transform: rotate(-45deg)
}
</style>

