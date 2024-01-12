<script>
import V8Button from '../components/V8Button.vue';
import {BUTTON_TYPES, KEY_LOCAL_STORAGE, SIZES, TASK_STATUS} from '../utils/constants';
import V8Input from "./V8Input.vue";
import { toRaw } from 'vue';
import { getLocalStorage, saveLocalStorage } from '../services/useLocalStorage.js';
import {getNewDate} from "../utils/dateUtils.js";

const FORM_TASK = {
  id: null,
  status: TASK_STATUS.IN_PROGRESS,
  avatarUrl: '',
  source: '',
  title: '',
  message: '',
  taskRef: '',
  dateCreated: getNewDate(),
  dateCompleted: ''
}

export default {
  name: 'V8TaskModal',
  components: {
    V8Button,
    V8Input
  },
  data() {
    return {
      BUTTON_TYPES,
      SIZES,
      form: FORM_TASK,
      data: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSave() {
      let newTask = this.form;
      this.data.push(newTask);
      this.close();
    },
    getData() {
      for (const value of getLocalStorage(KEY_LOCAL_STORAGE.value)) {
        this.data.push(value);
      }
    }
  }
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">Create Task</slot>
        <button type="button" class="btn-close" @click="close">x</button>
      </header>
      <div class="modal-body">
        <div class="row">
          <div class="col">
            <v8-input id="source" class="modal-button" type="text" label="Source:" v-model="form.source" required/>
          </div>
          <div class="col">
            <v8-input id="title" class="modal-button" type="text" label="Title:" v-model="form.title" />
          </div>
          <div class="col">
            <v8-input id="taskRef" class="modal-button" type="text" label="Task Reference:" v-model="form.taskRef" />
          </div>
          <div class="col">
            <v8-input id="message" class="modal-button" type="password" label="Message:" v-model="form.message" />
          </div>
        </div>
      </div>
      <footer class="modal-footer">
        <V8Button
          :label="'Save'"
          :type="BUTTON_TYPES.PRIMARY_INVERTED"
          :size="SIZES.SMALL"
          :onClick="onSave"
        />
      </footer>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--v8-colour-overlay);
  }

  .modal {
    height: 400px;
    width: 500px;
    border-radius: 8px;
    overflow-x: auto;
    background: var(--v8-colour-grey-050);
    border: 1px solid var(--v8-colour-primary-200);;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    background-color: var(--v8-colour-primary-500);
    border-bottom: 1px solid var(--v8-colour-grey-300);
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    color: var(--v8-colour-white);
  }

  .modal-body {
    display: flex;
    padding: 20px 10px;
  }

  .modal-footer {
    justify-content: flex-end;
    border-top: 1px solid var(--v8-colour-grey-300);
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    color: var(--v8-colour-grey-700);
    border-radius: 4px;
    border: 2px solid var(--v8-colour-primary-200);
    background: var(--v8-colour-white);
    margin-top: 8px;
    margin-right: 8px;
    padding: 0 6px 3px 6px;
    cursor: pointer;
  }

  .btn-close:hover {
    background-color: var(--v8-colour-primary-025);
    border-color: var(--v8-colour-primary-025);
  }

  v8-input,
  textarea {
     width: 98%;
   }

  .row {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
  }

  .col {
    float: left;
    width: 100%;
  }
</style>