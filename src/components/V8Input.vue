<script>
export default {
  name: 'V8input',
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: '',
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
}
</script>
<template>
  <div>
    <label v-if="label" :for="id">
      {{ label }}
    </label>
    <br>
    <input
      :type="type"
      :value="modelValue"
      @input="updateInput"
    >
  </div>
</template>
<style scoped>
input {
  margin: 6px;
  font-size: 16px;
  font-family: inherit;
  padding: 5px;
  width: 95%;
  border: none;
  border-bottom: 1px solid var(--v8-colour-grey-400);
  background-color: transparent;
}

input:hover {
  border: none;
  border-bottom: 1px solid var(--v8-colour-primary-400);
}

input[type="text"] {
  caret-color: var(--v8-colour-success-500);
}

input:focus {
  outline: none !important;
  border: none;
  border-bottom: 2px solid var(--v8-colour-primary-400);
}

label {
  margin-left: 6px;
}
</style>
