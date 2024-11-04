import { defineComponent, onMounted, ref, watch } from "vue";
import { Terminal } from 'xterm';
import "xterm/css/xterm.css";
import './index.less';

export default defineComponent({
    props: ['modelValue'],
    emits: ['update:modelValue'],
    setup({ modelValue }, { emit }) {
        const termRef = ref(null);
        const hideFn = () => {
            emit('update:modelValue', false)
        };
        watch(() => modelValue, (val) => {
            console.log(val)
        })
        onMounted(() => {
            var term = new Terminal({
                cols: 79,
                rows: 50,
                fontSize: 12,
                theme: {
                    background: '#000'
                }
            });
            term.open(termRef.value);
            // 添加事件监听器，支持输入方法
            term.onKey(e => {
                const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey
                if (e.domEvent.keyCode === 13) {
                    term.prompt()
                } else if (e.domEvent.keyCode === 8) { // back 删除的情况
                    if (term._core.buffer.x > 0) {
                        term.write('\b \b')
                    }
                } else if (printable) {
                    term.write(e.key)
                }
                console.log(1, 'print', e.key)
            })
            term.onData((val) => {
                if (val.length > 1) term.write(val)
            });
        })
        return () => (<>
            {modelValue.value && <div className="xterm-com" onClick={() => hideFn()}>
                <div className="xterm-com-main">
                    <div ref={termRef}></div>
                </div>
            </div>}
        </>)
    }
})