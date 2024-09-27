<script setup>
import container from './packages/container.vue';
import data from './packages/data.json';
import plateConfig from './packages/utils/plateConfig';
import { provide, reactive } from 'vue';

const state = reactive(data);
const { componentList, componentMap, register } = plateConfig();

register({
  label: '文本',
  preview: () => "文本",
  render: () => "<span>渲染文本</span>",
  key: "text"
})
register({
  label: '按钮',
  preview: () => "<button>按钮</button>",
  render: () => "<button>按钮</button>",
  key: "button"
})


provide('componentList', componentList)
provide('componentMap', componentMap)

</script>

<template>
  <container v-model="state"></container>
</template>

<style scoped></style>
