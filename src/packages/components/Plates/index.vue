<script setup>
import { computed, inject } from 'vue';

const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const componentList = inject('componentList');
const cur = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emits('update:modelValue', JSON.parse(JSON.stringify(val)))
    }
})

const dragstartFn = (e, item) => {
    cur.value = item;
    console.log(e, item, cur.value);
}

</script>
<template>
    <div class="plates">
        <div v-for="item in componentList" draggable="true" @dragstart="(e) => dragstartFn(e, item)" :key="item.key"
            class="plates-item">
            <span class="label">{{ item.label }}</span>
            <span v-if="item.key === 'text'"> 文字标题</span>
            <button v-if="item.key === 'button'"> 按钮元素</button>
            <input v-if="item.key === 'input'" />
        </div>
    </div>
</template>
<style scoped lang="less">
.plates {
    padding: 10px;

    &-item {
        padding: 20px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: thin solid #dcdcdc;
        margin-top: 10px;
        cursor: move;

        &>span.label {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            padding: 5px 10px;
            font-size: 12px;
            background-color: aqua;
            color: #fff;
        }
    }
}
</style>