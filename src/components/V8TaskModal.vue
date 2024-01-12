<script>
import V8Button from '../components/V8Button.vue';
import {BUTTON_TYPES, KEY_LOCAL_STORAGE, SIZES, TASK_STATUS} from '../utils/constants';
import V8Input from "./V8Input.vue";
import { getLocalStorage, saveLocalStorage } from '../services/useLocalStorage.js';
import {getNewDate} from "../utils/dateUtils.js";
import useVuelidate from "@vuelidate/core";
import {required, numeric} from "@vuelidate/validators";
import {toRaw} from 'vue';

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
      form: Object.assign({}, FORM_TASK),
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      form: {
        source: { required, $autoDirty: true},
        title: { required, $autoDirty: true},
        taskRef: { required, numeric, $autoDirty: true},
        message: { required, $autoDirty: true},
        avatarUrl: { required, $autoDirty: true},
      }
    }
  },
  mounted() {
    this.clear();
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSave() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return;
      }
      this.addData(toRaw(this.form))
      this.$emit("reload");
      this.close();
    },
    clear() {
      this.source = '';
      this.title = '';
      this.taskRef = '';
      this.message = '';
      this.avatarUrl = '';
      this.data = [];
    },
    addData(task) {
      const newData = [task];
      for(const value of this.getTasksLocalStorage()) {
        newData.push(value);
      }
      saveLocalStorage(KEY_LOCAL_STORAGE.value, newData);
    },
    getTasksLocalStorage() {
      return getLocalStorage(KEY_LOCAL_STORAGE.value);
    },
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
        <div class="col">
          <div class="row">
            <v8-input
                id="source"
                :class="v$.form.source.$error === true ? 'modal-button text-fields-error':
                  'modal-button text-fields'"
                type="text"
                label="Source:"
                v-model="form.source"
            />
            <p class="text-red"
                v-for="error of v$.form.source.$errors"
                :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
          <div class="row">
            <v8-input
                id="title"
                :class="v$.form.title.$error === true ? 'modal-button text-fields-error':
                  'modal-button text-fields'"
                type="text"
                label="Title:"
                v-model="form.title"
            />
            <p class="text-red"
               v-for="error of v$.form.title.$errors"
               :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
          <div class="row">
            <v8-input
                id="taskRef"
                :class="v$.form.taskRef.$error === true ? 'modal-button text-fields-error':
                  'modal-button text-fields'"
                type="text"
                label="Task Reference:"
                v-model="form.taskRef"
            />
            <p class="text-red"
               v-for="error of v$.form.taskRef.$errors"
               :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
          <div class="row">
            <v8-input
                id="message"
                :class="v$.form.message.$error === true ? 'modal-button text-fields-error':
                  'modal-button text-fields'"
                type="text"
                label="Message:"
                v-model="form.message"
            />
            <p class="text-red"
               v-for="error of v$.form.message.$errors"
               :key="error.$uid"
            >
              {{ error.$message }}
            </p>
          </div>
          <div class="row">
            <v8-input
                id="avatarUrl"
                :class="v$.form.avatarUrl.$error === true ? 'modal-button text-fields-error':
                  'modal-button text-fields'"
                type="text"
                label="Avatar URL:"
                v-model="form.avatarUrl"
            />
            <p class="text-red"
               v-for="error of v$.form.avatarUrl.$errors"
               :key="error.$uid"
            >
              {{ error.$message }}
            </p>
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
    height: 590px;
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

  .modal-footer-button{
    margin: 2px;
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
    float: left;
    width: 100%;
    margin-bottom: 12px;
  }

  .col {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
  }

  .text-red {
    font-size: 12px;
    margin: 0 0 0 6px;
    color: var(--v8-colour-error-500);
  }

</style>