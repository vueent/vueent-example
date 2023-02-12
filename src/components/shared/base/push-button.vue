<template>
  <button :class="className" :disabled="disabled" :title="title" :type="type"><slot></slot></button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    title: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    }
  },

  setup(props) {
    const className = computed(() => {
      const result: Record<string, boolean> = { 'push-button': true };

      if (props.disabled) result['push-button_disabled'] = true;

      return result;
    });

    return { className };
  }
});
</script>

<style lang="scss" scoped>
.push-button {
  border: 0;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 1rem;
  outline: none;
  box-shadow: none;
  background-color: #303030;
  color: #ffffff;

  &:hover {
    background-color: #414141;
  }

  &:active {
    background-color: #2f2e42;
  }

  &:focus {
    outline: 2px solid hsla(245, 22%, 23%, 0.5);
  }

  &_disabled {
    color: #cecece;
    background-color: #585858;

    &:hover,
    &:active {
      color: #cecece;
      background-color: #585858;
    }
  }
}
</style>
