import { defineComponent } from "vue";
import './index.less';
export default defineComponent({
    props: ['file'],
    emits: ['callback'],
    setup(props, { emit }) {
        const _index = props.file.index;
        console.log(_index)
        //点击上传
        const handleUploadFn = () => {
            const upload = document.getElementById('upload');
            upload.click();
        }
        //获取文件
        const handleChangeFn = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (ev) => {
                const res = ev.target.result;
                console.log(_index)
                emit('callback', { url: res, index: _index }
                )
            };
            reader.readAsDataURL(file);
        }
        return () => <div className="uploader" onClick={() => handleUploadFn()}>
            {JSON.stringify(props.file)}
            <input type="file" name="" id="upload" style="display:none" onChange={handleChangeFn} />
            <img src={props.file.url} alt="" style="height:100%;width:100%" />
        </div>
    }
})