<script setup>
const { data } = defineProps(['data']);

</script>
<template>
    <span v-if="data.key === 'text'" :style="{ ...data?.style }">{{ data.label }}</span>
    <button v-else-if="data.key === 'button'" :style="{ ...data?.style }">{{ data.label }}</button>
    <input type="text" v-else-if="data.key === 'input'" :style="{ ...data?.style }" />
    <span v-else>未知元素</span>
</template>