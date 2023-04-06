<script>

const CLASSES = {
  BASE: 'v8-task-list-container'
};

export default {
  name: 'V8TaskListContainer',
  data() {
    return {
      CLASSES
    }
  }
}

</script>

<template>
  <div :class="CLASSES.BASE">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.v8-task-list-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border-top: 1px solid var(--v8-colour-grey-100);
    padding-top: 2em;
    overflow-y: auto;
    overflow-x: hidden;
    @include thin-scrollbar;
}

</style>
