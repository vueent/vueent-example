<template>
  <Row>
    <Row v-if="error">
      <Col :cols="12">
        <InlineAlert type="error">Could not remove an item</InlineAlert>
      </Col>
    </Row>
    <Row v-for="item in items" :key="item.data.id">
      <Col :cols="12" :sm="8">ID: {{ item.pk }}</Col>
      <Col :cols="12" :sm="4"><PushButton @click="remove(item)">Remove</PushButton></Col>
      <Col :cols="8">E-mail: {{ item.data.email }}</Col>
      <Col :cols="4">Age: {{ item.data.age }}</Col>
      <Col :cols="12">Main phone: {{ item.data.phone }}</Col>
      <Col :cols="12">Additional phones: {{ item.data.phones.length }}</Col>
      <Col :cols="12" v-for="(phone, index) in item.data.phones">Phone #{{ index + 1 }}: {{ phone }}</Col>
      <Col :cols="12" unpadded>
        <Row>
          <Col :cols="item.data.credentials.second ? 4 : 6">First name: {{ item.data.credentials.first }}</Col>
          <Col v-if="item.data.credentials.second" :cols="4">Second name: {{ item.data.credentials.second }}</Col>
          <Col :cols="item.data.credentials.second ? 4 : 6">Last name: {{ item.data.credentials.last }}</Col>
        </Row>
      </Col>
      <Col :cols="12">Documents count: {{ item.data.documents.length }}</Col>
      <Col :cols="12" unpadded>
        <Row v-for="(doc, index) in item.data.documents" :key="doc.fakeId">
          <Col :cols="12">Document ID: {{ doc.id }}</Col>
          <Col :cols="12">Filename: {{ doc.filename }}</Col>
        </Row>
      </Col>
      <Col :cols="12">Items count: {{ item.data.items.length }}</Col>
      <Col :cols="12">
        <Row v-for="it in item.data.items" :key="it.fakeId">
          <Col :cols="12">Values count: {{ it.values.length }}</Col>
          <Col :cols="12" unpadded>
            <Row v-for="(value, index) in it.values" :key="value.fakeId">
              <Col :cols="12">Value #{{ index }} {{ value.val }}</Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  </Row>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import Col from '@/components/shared/grid/col.vue';
import Row from '@/components/shared/grid/row.vue';
import PushButton from '@/components/shared/base/push-button.vue';
import InlineAlert from '@/components/shared/base/inline-alert.vue';
import { useController } from '@/vueent';

import ListController from './list';

export default defineComponent({
  components: {
    Col,
    Row,
    PushButton,
    InlineAlert
  },

  setup() {
    const controller = useController(ListController);

    const items = computed(() => controller.items);
    const error = computed(() => controller.error);

    const remove = controller.remove.bind(controller);

    return { items, error, remove };
  }
});
</script>
