<script>
import V8Button from '@components/V8Button.vue';
import V8Task from '@components/V8Task.vue';
import V8TaskListContainer from '@components/V8TaskListContainer.vue';
import V8TaskModal from "./components/V8TaskModal.vue";
import { getTasks } from './services/api';
import {BUTTON_TYPES, KEY_LOCAL_STORAGE, SIZES, TASK_STATUS} from './utils/constants';
import { getLocalStorage, saveLocalStorage } from './services/useLocalStorage.js';
import { getNewDate } from './utils/dateUtils.js';

const CLASSES = {
  BASE: 'app'
};

const COMPLETE_TASK = {
  hide: 'Hide Completed Tasks',
  show: 'Show Completed Tasks'
}

export default {
  name: 'App',
  components: {
    V8Button,
    V8Task,
    V8TaskListContainer,
    V8TaskModal
  },
  data() {
    return {
      BUTTON_TYPES,
      CLASSES,
      SIZES,
      tasks: null,
      keyLocalStorage: KEY_LOCAL_STORAGE.value,
      actualCompleteTask: COMPLETE_TASK.hide,
      isTaskModalVisible: false,
      task: {}
    }
  },
  async mounted() {
    const tasks = await getTasks();
    this.updateTasks(tasks);
    this.saveTasksLocalStorage(this.tasks);
  },
  methods: {
    onCompleteAll() {
      let data = this.getTasksLocalStorage();
      for(const value of data) {
        if(value['status'] === TASK_STATUS.IN_PROGRESS) {
          value.status = TASK_STATUS.COMPLETE;
          value.dateCompleted = getNewDate();
        }
      }
      this.saveTasksLocalStorage(data);
      this.reloadCompletedTasks();
    },
    onCompleteTask(value) {
      this.completeTask(value);
      this.reloadCompletedTasks();
    },
    completeTask(task) {
      let data = this.getTasksLocalStorage();
      for(const value of data) {
        if(task['id'] === value['id']) {
          value.status = TASK_STATUS.COMPLETE;
          value.dateCompleted = getNewDate();
        }
      }
      this.saveTasksLocalStorage(data);
      this.reloadCompletedTasks();
    },
    updateTasks(data) {
      this.tasks = data;
    },
    onFilterCompleteTask() {
      let data;
      this.setTasksLocalStorage();
      if(this.actualCompleteTask === COMPLETE_TASK.hide) {
        data = this.getTasksLocalStorage().filter(value => value.status === TASK_STATUS.IN_PROGRESS);
        this.actualCompleteTask = COMPLETE_TASK.show;
        this.updateTasks(data);
      } else {
        this.actualCompleteTask = COMPLETE_TASK.hide;
        this.setTasksLocalStorage();
      }
    },
    reloadCompletedTasks() {
      this.setTasksLocalStorage();
      this.onFilterCompleteTask();
      this.onFilterCompleteTask();
    },
    setTasksLocalStorage() {
      this.updateTasks(this.getTasksLocalStorage());
    },
    getTasksLocalStorage() {
      return getLocalStorage(KEY_LOCAL_STORAGE.value);
    },
    saveTasksLocalStorage(data) {
      saveLocalStorage(this.keyLocalStorage, data);
    },
    onCreateTask() {
      this.$emit('task')
      this.isTaskModalVisible = true;
    },
    closeTaskModal() {
      this.isTaskModalVisible = false;
    },
    editTask(data) {
      if(data.status === TASK_STATUS.COMPLETE) {
        alert("Task already completed");
        return;
      }
      this.task = data;
      this.onCreateTask();
    }
  }
}

</script>

<template>
  <div :class="CLASSES.BASE">
    <header>
      <h2>
        valid8Me-Task-Manager
      </h2>
      <section>
        <V8Button
          :label="actualCompleteTask"
          :type="BUTTON_TYPES.PRIMARY_INVERTED"
          :size="SIZES.SMALL"
          :onClick="onFilterCompleteTask"
        />
      </section>
    </header>
    <div class="box-actions">
      <div class="box-itens">
        <V8Button
            :label="'Complete All'"
            :type="BUTTON_TYPES.PRIMARY_INVERTED"
            :size="SIZES.SMALL"
            :onClick="onCompleteAll"
        />
      </div>
      <div class="box-itens">
        <V8Button
            :label="'Create task'"
            :type="BUTTON_TYPES.PRIMARY_INVERTED"
            :size="SIZES.SMALL"
            :onClick="onCreateTask"
        />
      </div>
    </div>
    <V8TaskListContainer>
      <div v-for="value in tasks">
        <V8Task
            v-if="value"
            v-bind="value"
            @completeTask="onCompleteTask(value)"
            @click="editTask(value)"
        />
        <br>
      </div>
    </V8TaskListContainer>
    <V8TaskModal
        v-if="isTaskModalVisible"
        @close="closeTaskModal"
        @reload="reloadCompletedTasks"
        :task="task"
    />
  </div>
</template>

<style lang="scss" scoped>
.app {
  @include font-base;
  @include font-smoothing;
  display: flex;
  flex-direction: column;
  width: 630px;
  height: 100vh;
  margin: auto;
  background-color: var(--v8-colour-white);
  @include v8-box-shadow-shadow-small;

  header {
    display: flex;
    align-items: center;
    padding: 1em 2em;
    background-color: var(--v8-colour-primary-500);

    h2 {
      margin: 0;
      color: var(--v8-colour-white);
    }

    > section {
      margin-left: auto;
    }
  }

  .box-actions {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    width: 94%;
    margin: 10px 10px 10px 10px;
  }
  .box-itens {
    margin-left: 10px;
  }
}

</style>
