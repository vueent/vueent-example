<template>
  <div :class="className">
    <div v-if="label" class="text-field__label">{{ label }}</div>
    <div class="text-field__input">
      <input :value="modelValue" @input="handleInput" @change.prevent="handleChange" :disabled="disabled" :readonly="readonly" />
    </div>
    <div v-if="errorMessage" class="text-field__error-message">{{ errorMessage }}</div>
    <div v-else-if="hint" class="text-field__hint">{{ hint }}</div>
    <div v-else class="text-field__hint">&nbsp;</div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    modelValue: String as PropType<string>,
    errorMessage: String as PropType<string>,
    label: String as PropType<string>,
    hint: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    readonly: Boolean as PropType<boolean>
  },

  setup(props, context) {
    const className = computed(() => {
      const result: Record<string, boolean> = { 'text-field': true };

      if (props.disabled) result['text-field_disabled'] = true;

      return result;
    });

    const handleInput = (event: Event) => context.emit('update:modelValue', (event.target as HTMLInputElement).value);
    const handleChange = (event: Event) => context.emit('change', (event.target as HTMLInputElement).value);

    return { className, handleInput, handleChange };
  }
});
</script>

<style lang="scss" scoped>
.text-field {
  &__input {
    padding: 0;
    display: flex;
    flex-direction: column;

    input {
      font-size: 1.1rem;
      outline: none;
      border: 1px solid rgba(60, 60, 60, 0.12);
      border-radius: 10px;
      background-color: #ffffff;
      box-shadow: none;
      margin: 0;
      padding: 8px 12px;

      &:focus {
        outline: none;
        color: #2f2d47;
        border: 1px solid #2f2d47;
        background-color: hsl(246, 16%, 75%);
        box-shadow: none;
      }
    }
  }

  &__label,
  &__hint,
  &__error-message {
    padding-left: 12px;
    font-size: 0.9rem;
  }

  &__error-message {
    color: #ff004c;
  }

  &_disabled {
    .text-field__input {
      color: #585858;
      background-color: #cecece;

      input,
      input:focus {
        color: #585858;
        background-color: #cecece;
      }
    }
  }
}
</style>
