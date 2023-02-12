<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    mode: {
      type: String as PropType<'info' | 'success' | 'warning' | 'error'>,
      default: 'info'
    }
  },

  setup(props, context) {
    const className = computed(() => {
      const result: Record<string, boolean> = { 'inline-alert': true };

      if (props.mode) result[`inline-alert_${props.mode}`] = true;

      return result;
    });

    return { className };
  }
});
</script>

<style lang="scss" scoped>
.inline-alert {
  padding: 8px 12px;
  font-size: 1rem;

  color: #ffffff;
  background-color: #2f2e42;

  &_info {
    background-color: #496c9b;
  }

  &_warning {
    background-color: #927031;
  }

  &_success {
    background-color: #397232;
  }

  &_error {
    background-color: #ff004c;
  }
}
</style>
