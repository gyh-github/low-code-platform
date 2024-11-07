export default {
    mounted(el, binding) {
        console.log(binding)
        const flag = binding.value;
        function eventHandler(e) {
            if (el.contains(e.target)) {
                console.log('点击元素内部');
                return false;
            }
            if (binding.value && typeof binding.value === 'function') {
                binding.value(e);
            }
            console.log('点击元素外部');
            /**
             * 点击外部时操作
            */
            switch (flag) {
                case 'dropmenu':
                    const dropmenuHTML = document.getElementsByClassName('drop-menu-action')?.[0];
                    if (dropmenuHTML) {
                        document.body.removeChild(dropmenuHTML);
                    }
                    return;
                default:
                    return;
            }
        }
        el.Tag = eventHandler;
        document.addEventListener('click', eventHandler);
    },
    beforeUnmount(el) {
        document.removeEventListener('click', el.Tag);
        delete el.Tag;
    }
}