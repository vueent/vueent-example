<template>
  <Row>
    <Col :cols="12">
      <TextField
        v-if="modelValue && validations"
        label="Document ID"
        v-model="modelValue.id"
        @change="validations?.c.id.touch()"
        :error-message="validations.c.id.dirtyMessage"
      />
      <TextField v-else label="Document ID" readonly />
    </Col>
    <Col :cols="12">
      <TextField
        v-if="modelValue && validations"
        label="Document filename"
        v-model="modelValue.filename"
        @change="validations?.c.filename.touch()"
        :error-message="validations.c.filename.dirtyMessage"
      />
      <TextField v-else label="Document filename" readonly />
    </Col>
    <Col :cols="12" class="flex justify-end">
      <PushButton :disabled="!modelValue || !validations" @click="$emit('remove')">Remove</PushButton>
    </Col>
  </Row>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { Document as Data, Validations as HumanValidations } from '@/models/human';
import Col from '@/components/shared/grid/col.vue';
import Row from '@/components/shared/grid/row.vue';
import PushButton from '@/components/shared/base/push-button.vue';
import TextField from '@/components/shared/forms/input/text-field.vue';

type Validations = HumanValidations['c']['documents']['c'][0];

export default defineComponent({
  components: {
    Col,
    Row,
    PushButton,
    TextField
  },

  props: {
    modelValue: Object as PropType<Data>,
    validations: Object as PropType<Validations>
  }
});
</script>
