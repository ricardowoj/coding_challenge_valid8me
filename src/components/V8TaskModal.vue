<script>
import V8Button from '../components/V8Button.vue';
import {BUTTON_TYPES, SIZES} from '../utils/constants';


export default {
  name: 'V8TaskModal',
  components: {
    V8Button,
  },
  data() {
    return {
      BUTTON_TYPES,
      SIZES,
    }
  },
  methods: {
    close() {
      this.$emit("close");
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
      <section class="modal-body">

      </section>
      <footer class="modal-footer">
        <V8Button
          :label="'Save'"
          :type="BUTTON_TYPES.PRIMARY_INVERTED"
          :size="SIZES.SMALL"
          :onClick="close"
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
    height: 280px;
    width: 500px;
    border-radius: 8px;
    overflow-x: auto;
    background: var(--v8-colour-grey-050);
    border: 1px solid var(--v8-colour-success-200);
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
    font-size: 14px;
    font-weight: 600;
    color: var(--v8-colour-white);
  }

  .modal-body {
    position: relative;
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
    border: 2px solid var(--v8-colour-success-100);
    background: var(--v8-colour-white);;
    margin-top: 8px;
    margin-right: 8px;
    padding: 0 6px 3px 6px;
    cursor: pointer;
  }

  .btn-close:hover {
    background-color: var(--v8-colour-success-100);
    border-color: var(--v8-colour-success-100);
  }

  input,
  textarea{
     width: 98%;
   }

</style>