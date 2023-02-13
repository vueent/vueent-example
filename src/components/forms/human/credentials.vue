<template>
  <Row>
    <Col :cols="12">
      <TextField
        v-if="modelValue && validations"
        label="First name"
        v-model="modelValue.first"
        @change="validations?.c.first.touch()"
        :error-message="validations?.c.first.dirtyMessage"
      />
      <TextField v-else label="First name" readonly />
    </Col>
    <Col :cols="12">
      <TextField
        v-if="modelValue && validations"
        label="Second name"
        v-model="modelValue.second"
        @change="validations?.c.second.touch()"
        :error-message="validations?.c.second.dirtyMessage"
      />
      <TextField v-else label="econd name" readonly />
    </Col>
    <Col :cols="12">
      <TextField
        v-if="modelValue && validations"
        label="Last name"
        v-model="modelValue.last"
        @change="validations?.c.last.touch()"
        :error-message="validations?.c.last.dirtyMessage"
      />
      <TextField v-else label="Last name" readonly />
    </Col>
  </Row>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { Credentials as Data, Validations as HumanValidations } from '@/models/human';

import Row from '@/components/shared/grid/row.vue';
import Col from '@/components/shared/grid/col.vue';
import TextField from '@/components/shared/forms/input/text-field.vue';

type Validations = HumanValidations['c']['credentials'];

export default defineComponent({
  components: {
    Row,
    Col,
    TextField
  },

  props: {
    modelValue: Object as PropType<Data>,
    validations: Object as PropType<Validations>
  }
});
</script>
