<template>
  <form @submit.prevent="send">
    <Row>
      <Col :cols="12"><h1>Fill the form</h1></Col>
    </Row>
    <Row>
      <Col :cols="12">
        <TextField
          v-model="modelValue.email"
          @change="validations.c.email.touch()"
          :error-message="validations.c.email.dirtyMessage"
          label="E-mail"
        />
      </Col>
      <Col :cols="6">
        <TextField
          v-model="modelValue.age"
          @change="validations.c.age.touch()"
          :error-message="validations.c.age.dirtyMessage"
          label="Age"
        />
      </Col>
      <Col :cols="6">
        <TextField
          v-model="modelValue.phone"
          @change="validations.c.phone.touch()"
          :error-message="validations.c.phone.dirtyMessage"
          label="Main phone"
        />
      </Col>
      <Col :cols="12" :class="validations.c.phones.dirty && validations.c.phones.selfInvalid ? 'color_error' : ''">
        Phones count: {{ modelValue.phones.length }}
      </Col>
      <Col :cols="12" v-for="(phone, index) in modelValue.phones" :key="index">
        <TextField
          :label="`Phone #${index + 1}`"
          :model-value="phone"
          @update:model-value="modelValue.phones[index] = $event"
          @change="validations.c.phones.c[index].touch()"
          :error-message="validations.c.phones.c[index].dirtyMessage"
        />
      </Col>
      <Col :cols="12" class="flex justify-end">
        <PushButton @click="addPhone">Add phone</PushButton>
        <PushButton :disabled="!modelValue.phones.length" class="ml_1" @click="removeLastPhone">Remove last phone</PushButton>
      </Col>
      <Col :cols="12" unpadded>
        <Credentials :model-value="modelValue.credentials" :validations="validations.c.credentials" />
      </Col>
      <Col :cols="12">Documents count: {{ modelValue.documents.length }}</Col>
      <Col :cols="12" v-for="(doc, index) in modelValue.documents" :key="doc.fakeId" unpadded>
        <Document :modelValue="doc" :validations="validations.c.documents.c[index]" @remove="removeDocument(doc.fakeId)" />
      </Col>
      <Col :cols="12" class="flex justify-end">
        <PushButton @click="addDocument">Add document</PushButton>
      </Col>
      <Col :cols="12" v-for="(item, index) in modelValue.items" :key="item.fakeId" unpadded>
        <Item
          :modelValue="item"
          :validations="validations.c.items.c[index]"
          @remove="removeItem(item.fakeId)"
          @add-value="addItemValue(item)"
          @remove-value="removeItemValue(item, $event)"
          :removal-allowed="true"
        />
      </Col>
      <Col :cols="12" class="flex justify-end">
        <PushButton @click="addItem">Add item</PushButton>
      </Col>
      <Col v-if="errorMessage" :cols="12">
        <InlineAlert mode="error">{{ errorMessage }}</InlineAlert>
      </Col>
      <Col v-else-if="successMessage" :cols="12">
        <InlineAlert mode="success">{{ successMessage }}</InlineAlert>
      </Col>
      <Col :cols="12" class="flex justify-end">
        <PushButton type="submit">Submit</PushButton>
      </Col>
    </Row>
  </form>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';

import type { Data, Validations, Item as ItemData } from '@/models/human';

import Row from '@/components/shared/grid/row.vue';
import Col from '@/components/shared/grid/col.vue';
import PushButton from '@/components/shared/base/push-button.vue';
import InlineAlert from '@/components/shared/base/inline-alert.vue';
import TextField from '@/components/shared/forms/input/text-field.vue';

import Credentials from './human/credentials.vue';
import Document from './human/document.vue';
import Item from './human/item.vue';

export default defineComponent({
  components: {
    Row,
    Col,
    PushButton,
    InlineAlert,
    TextField,
    Credentials,
    Document,
    Item
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
    errorMessage: String as PropType<string>,
    successMessage: String as PropType<string>
  },

  setup(props, context) {
    const send = () => context.emit('send');
    const addPhone = () => context.emit('add-phone');
    const removeLastPhone = () => context.emit('remove-last-phone');
    const addDocument = () => context.emit('add-document');
    const removeDocument = (fakeId: number) => context.emit('remove-document', fakeId);
    const addItem = () => context.emit('add-item');
    const removeItem = (fakeId: number) => context.emit('remove-item', fakeId);
    const addItemValue = (item: ItemData) => context.emit('add-item-value', item);
    const removeItemValue = (item: ItemData, fakeId: number) => context.emit('remove-item-value', item, fakeId);

    return { send, addPhone, removeLastPhone, addDocument, removeDocument, addItem, removeItem, addItemValue, removeItemValue };
  }
});
</script>
