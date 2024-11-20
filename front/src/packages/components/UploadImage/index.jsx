import { defineComponent } from "vue";
import './index.less';
import { uploadFile } from './../../utils/apis';
export default defineComponent({
    props: ['file'],
    emits: ['callback'],
    setup(props, { emit }) {
        let _index = props.file.index;
        //点击上传
        const handleUploadFn = () => {
            const _input = document.createElement('input');
            _input.type = 'file';
            _input.click();
            _input.onchange = handleChangeFn;
        }
        //获取文件
        const handleChangeFn = async (e) => {
            const file = e.target.files[0];
            var formData = new FormData();
            formData.append('file', file);
            const uploadRes = await uploadFile(formData);
            emit('callback', { url: uploadRes?.data, index: _index });
        }
        return () => <div className="uploader" onClick={() => handleUploadFn()}>
            <img src={props.file.url} alt="" style="height:100%;width:100%" />
        </div>
    }
})