<script setup>
import { BUTTON_TYPES, SIZES } from '@utils/constants';

defineProps({
  onClick: {
    type: Function,
    required: true
  },
  label: {
    type: String
  },
  size: {
    type: String,
    validator: value => [SIZES.SMALL, SIZES.MEDIUM, SIZES.LARGE, SIZES.XL, SIZES.XXL].includes(value),
    default: SIZES.MEDIUM
  },
  type: {
    type: String,
    validator: value => Object.values(BUTTON_TYPES).includes(value),
    default: BUTTON_TYPES.PRIMARY
  },
  isFullWidth: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  tooltipText: {
    type: String,
    default: ''
  }
});

const CLASSES = {
  BASE: 'v8-button',
  LABEL: 'label'
};

</script>

<template>
  <button
    @click="onClick"
    :class="[
      CLASSES.BASE,
      `is-${size}`,
      `is-${type}`,
      { 'is-full-width': isFullWidth, 'is-active': isActive }
    ]"
    :disabled="isDisabled"
    :data-tooltip="tooltipText"
  >
    <span v-if="label" :class="[CLASSES.LABEL]">
      {{ label }}
    </span>
  </button>
</template>

<style scoped lang="scss">
button.v8-button {
  --button-colour-main: var(--v8-colour-primary-400);
  --button-colour-hover: var(--v8-colour-primary-500);
  --button-colour-text: var(--v8-colour-white);
  --button-colour-shadow: var(--v8-colour-primary-050);

  @include font-base;
  @include font-smoothing;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 8px 18px;
  border-radius: 8px;
  border: 1px solid var(--button-colour-main);
  background: var(--button-colour-main);
  color: var(--button-colour-text);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  @include simple-tooltip;

  .label {
    user-select: none;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    height: 100%;
  }

  &:not([disabled]) {
    &:hover {
      background-color: var(--button-colour-hover);
      border-color: var(--button-colour-hover);
    }
    &:focus,
    &.is-active {
      background-color: var(--button-colour-main);
      border-color: var(--button-colour-main);
      @include button-focus-shadow(var(--button-colour-shadow));
    }
  }

  &:focus-visible {
    outline: none;
  }

  &.is-icon-only {
    width: 40px;
  }

  &.is-small {
    height: 36px;
    padding: 8px 14px;

    &.is-icon-only {
      width: 36px;
    }
    .label {
      font-size: 14px;
    }
  }

  &.is-large {
    height: 44px;
    padding: 10px 20px;

    &.is-icon-only {
      width: 44px;
    }
  }
  &.is-xl {
    height: 48px;
    padding: 12px 20px;
    gap: 6px;

    &.is-icon-only {
      width: 48px;
    }
  }
  &.is-xxl {
    height: 64px;
    padding: 18px 28px;
    gap: 8px;

    &.is-icon-only {
      width: 64px;
    }
    .label {
      font-size: 18px;
    }
  }

  &.is-full-width {
    width: 100%;
  }

  &.is-primary-inverted {
    --button-colour-main: var(--v8-colour-white);
    --button-colour-text: var(--v8-colour-primary-500);
    --button-colour-hover: var(--v8-colour-primary-025);

    border-color: var(--v8-colour-primary-400);
  }
  &.is-secondary {
    --button-colour-main: var(--v8-colour-white);
    --button-colour-hover: var(--v8-colour-white);
    --button-colour-text: var(--v8-colour-grey-500);
    --button-colour-shadow: var(--v8-colour-primary-050);

    border-color: var(--v8-colour-grey-300);

    &:not([disabled]) {
      &:hover {
        @include button-focus-shadow(var(--v8-colour-white-shadow));
        border-color: var(--v8-colour-grey-300);
      }
      &:focus,
      &.is-active {
        color: var(--v8-colour-primary-500);
        border-color: var(--v8-colour-primary-400);
        @include button-focus-shadow(var(--v8-colour-primary-050));
      }
    }
  }
  &.is-grey {
    --button-colour-main: var(--v8-colour-grey-300);
    --button-colour-hover: var(--v8-colour-grey-400);
    --button-colour-text: var(--v8-colour-grey-600);
    --button-colour-shadow: var(--v8-colour-white-shadow);

    &:not([disabled]) {
      &:hover {
        color: var(--v8-colour-grey-700);
      }
    }
  }
  &.is-danger,
  &.is-danger-inverted {
    --button-colour-main: var(--v8-colour-error-600);
    --button-colour-hover: var(--v8-colour-error-700);
    --button-colour-shadow: var(--v8-colour-error-100);
  }

  &.is-danger-inverted {
    &:not(:hover, :focus, .is-active),
    &[disabled] {
      color: var(--v8-colour-error-700);
      background-color: var(--v8-colour-white);
    }
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
