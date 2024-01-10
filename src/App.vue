<script>
import V8Button from '@components/V8Button.vue';
import V8Task from '@components/V8Task.vue';
import V8TaskListContainer from '@components/V8TaskListContainer.vue';
import { getTasks } from './services/api';
import {BUTTON_TYPES, SIZES, TASK_STATUS} from './utils/constants';

const CLASSES = {
  BASE: 'app'
};

export default {
  name: 'App',
  components: {
    V8Button,
    V8Task,
    V8TaskListContainer
  },
  data() {
    return {
      BUTTON_TYPES,
      CLASSES,
      SIZES,
      tasks: null
    }
  },
  async mounted() {
    const tasks = await getTasks();
    this.tasks = Object.assign({}, tasks);
  },
  methods: {
    onCompleteAll() {
      for(const value of Object.values(this.tasks)) {
        if(value.status === TASK_STATUS.IN_PROGRESS) {
          this.completeTask(value);
        }
      }
    },
    onCompleteTask(value) {
      this.completeTask(value);
    },
    completeTask(value) {
      value.status = TASK_STATUS.COMPLETE;
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
          :label="'Complete All'"
          :type="BUTTON_TYPES.PRIMARY_INVERTED"
          :size="SIZES.SMALL"
          :onClick="onCompleteAll"
        />
      </section>
    </header>
    <V8TaskListContainer>
      <div v-for="value in tasks">
        <V8Task
            v-if="value"
            v-bind="value"
            @completeTask="onCompleteTask(value)"
        />
        <br>
      </div>
    </V8TaskListContainer>
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
}

</style>
