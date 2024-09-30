<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import Plates from './components/Plates/index.vue';
import ELem from './components/ELem/index.vue';
const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const currentElem = ref(null);

const containerCenter = ref(null);
const containerCenterC = ref(null);

const data = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})

const workspaceStyle = {
    width: data.value.container?.width + 'px',
    height: data.value.container?.height + 'px'
}
const changeSize = () => {
    nextTick(() => {
        containerCenter.value.scrollTo({
            top: (containerCenterC.value.clientHeight - containerCenter.value.clientHeight) / 2,
            left: (containerCenterC.value.clientWidth - containerCenter.value.clientWidth) / 2,
            behavior: "smooth",
        })
    })
}

const dropFn = (e) => {
    e.preventDefault();
    console.log(e, currentElem);
    data.value.plates.push({
        ...currentElem.value,
        style: {
            position: 'absolute',
            top: e.layerY + 'px',
            left: e.layerX + 'px',
            zIndex: 9999,
            border: 'thin solid #dcdcdc'
        }
    });
}
const dragoverFn = (e) => {
    e.preventDefault();
    // console.log(e)

}


onMounted(() => {
    changeSize()
    window.addEventListener('resize', changeSize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', changeSize)
})

</script>
<template>
    <div class="container">
        <div class="container-top"></div>
        <div class="container-left">
            <Plates v-model="currentElem"></Plates>
        </div>
        <div class="container-right"></div>
        <div class="container-center" ref="containerCenter">
            <div class="container-center-container" ref="containerCenterC">
                <div class="container-center-container-workspace" :style="workspaceStyle" @dragover="dragoverFn"
                    @drop="dropFn">
                    内容区域
                    <template v-for="ele in data.plates" :key="ele.key">
                        <ELem :data="ele"></ELem>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
@import url('./container.less');
</style>