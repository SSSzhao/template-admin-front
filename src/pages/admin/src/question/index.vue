<template>
  <div class="">
    <Draggable
      v-model="list1"
      :group="{ name: 'people', pull: 'clone', put: 'false' }"
      :sort="false"
      item-key="id"
      :animation="100"
    >
      <template #item="{ element }">
        <div class="1">{{ element.name }}</div>
      </template>
    </Draggable>

    <Draggable v-model="list2" group="people" item-key="id" :animation="100">
      <template #item="{ element }">
        <div>{{ element.name }}</div>
      </template>
    </Draggable>
  </div>
</template>
<script setup lang="ts">
import Draggable from 'vuedraggable'
const list1 = [
  { name: 'dog 1', id: 1 },
  { name: 'dog 2', id: 2 },
  { name: 'dog 3', id: 3 },
  { name: 'dog 4', id: 4 }
]

const list2 = ref([
  { name: 'cat 5', id: 5 },
  { name: 'cat 6', id: 6 },
  { name: 'cat 7', id: 7 }
])
</script>
<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  title: '问卷管理'
  sort: 1
</route>
