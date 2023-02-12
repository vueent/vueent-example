<template>
  <Row>
    <Col :cols="8">
      <TextField
        :label="`Item value #${Number(index) + 1}`"
        v-model="modelValue.val"
        @change="validations.c.val.touch()"
        :error-message="validations.c.val.dirtyMessage"
      />
    </Col>
    <Col :cols="4" class="flex justify-end align-center">
      <PushButton :disabled="!removalAllowed" @click="$emit('remove')">Remove value</PushButton>
    </Col>
  </Row>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { Value as Data, Validations as HumanValidations } from '@/models/human';
import Col from '@/components/shared/grid/col.vue';
import Row from '@/components/shared/grid/row.vue';
import PushButton from '@/components/shared/base/push-button.vue';
import TextField from '@/components/shared/forms/input/text-field.vue';

type Validations = HumanValidations['c']['items']['c'][0]['c']['values']['c'][0];

export default defineComponent({
  components: {
    Col,
    Row,
    PushButton,
    TextField
  },

  props: {
    modelValue: {
      type: Object as PropType<Data>,
      required: true
    },
    validations: {
      type: Object as PropType<Validations>,
      required: true
    },
    index: Number as PropType<number>,
    removalAllowed: Boolean as PropType<boolean>
  }
});
</script>
