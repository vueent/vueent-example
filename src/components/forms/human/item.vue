<template>
  <Row>
    <Col :cols="12">Values count: {{ modelValue ? modelValue.values.length : 0 }}</Col>
    <Col :cols="12" v-for="(value, index) in modelValue?.values" :key="value.fakeId" unpadded>
      <ItemValue
        :modelValue="modelValue?.values[index]"
        :validations="validations?.c.values.c[index]"
        :index="index"
        @remove="$emit('remove-value', value.fakeId)"
        :removal-allowed="Number(modelValue?.values.length) > 1"
      />
    </Col>
    <Col :cols="12" class="flex justify-end">
      <PushButton :disabled="!removalAllowed || !modelValue || !validations" @click="$emit('remove')">Remove</PushButton>
      <PushButton :disabled="!modelValue || !validations" @click="$emit('add-value')" class="ml_1">Add value</PushButton>
    </Col>
  </Row>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { Item as Data, Validations as HumanValidations } from '@/models/human';
import Col from '@/components/shared/grid/col.vue';
import Row from '@/components/shared/grid/row.vue';
import PushButton from '@/components/shared/base/push-button.vue';
import TextField from '@/components/shared/forms/input/text-field.vue';

import ItemValue from './item-value.vue';

type Validations = HumanValidations['c']['items']['c'][0];

export default defineComponent({
  components: {
    Col,
    Row,
    PushButton,
    TextField,
    ItemValue
  },

  props: {
    modelValue: Object as PropType<Data>,
    validations: Object as PropType<Validations>,
    removalAllowed: Boolean as PropType<boolean>
  }
});
</script>
