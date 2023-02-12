<template>
  <Human
    :modelValue="data"
    :validations="validations"
    @send="send"
    @add-phone="addPhone"
    @remove-last-phone="removeLastPhone"
    @add-document="addDocument"
    @remove-document="removeDocument"
    @add-item="addItem"
    @remove-item="removeItem"
    @add-item-value="addItemValue"
    @remove-item-value="removeItemValue"
    :error-message="errorMessage"
    :success-message="successMessage"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import Human from '@/components/forms/human.vue';
import { useController } from '@/vueent';

import HomeController, { Message } from './home';

export default defineComponent({
  components: {
    Human
  },

  setup() {
    const controller = useController(HomeController);

    const data = computed(() => controller.human.data);
    const validations = computed(() => controller.human.v);
    const errorMessage = computed(() => (controller.message === Message.error ? 'Could not save a form.' : ''));
    const successMessage = computed(() => (controller.message === Message.success ? 'Form has been saved successfully.' : ''));

    const send = controller.send.bind(controller);
    const addPhone = controller.addPhone.bind(controller);
    const removeLastPhone = controller.removeLastPhone.bind(controller);
    const addDocument = controller.addDocument.bind(controller);
    const removeDocument = controller.removeDocument.bind(controller);
    const addItem = controller.addItem.bind(controller);
    const removeItem = controller.removeItem.bind(controller);
    const addItemValue = controller.addItemValue.bind(controller);
    const removeItemValue = controller.removeItemValue.bind(controller);

    return {
      data,
      validations,
      errorMessage,
      successMessage,
      send,
      addPhone,
      removeLastPhone,
      addDocument,
      removeDocument,
      addItem,
      removeItem,
      addItemValue,
      removeItemValue
    };
  }
});
</script>
