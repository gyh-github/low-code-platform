import { useStore } from '@/store';
import { uploadFile } from '@/apis/common';
import { add, edit } from '@/apis/project';
import { storeToRefs } from 'pinia';
import { getUser } from '@/utils/sessionStor';
import html2canvas from 'html2canvas';
import { message, Modal } from 'ant-design-vue';
import { createVNode } from 'vue';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';

// 将 Base64 转换为 Blob
const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

export function useProject(demo) {
    const store = useStore();
    const { pageInfo, containerModules, projectTitle, projectId, projectOperate } = storeToRefs(store);
    //保存前确认
    const saveConfirm = (params = null) => {
        Modal.confirm({
            title: '温馨提示',
            centered: true,
            icon: createVNode(ExclamationCircleFilled),
            content: createVNode('div', { padding: '30px' }, [
                createVNode('p', { style: 'color:#ee0000;font-weight:600;' }, params?.content || '即将离开该页面，是否保存本次修改？'),
                createVNode('span', {}, '项目名称：'),
                createVNode('input', { value: projectTitle.value, onChange: (e) => store.setProjectTitle(e.target.value) })]),
            okText: params?.okText || '保存后离开',
            cancelText: params?.cancelText || '直接离开',
            onOk() {
                saveProject();
            },
        });
    };

    //保存
    const saveProject = async () => {
        if (projectId.value && projectOperate.value === 'edit') {
            const res = await edit({
                id: projectId.value,
                title: projectTitle.value,
                json_data: {
                    pageInfo: pageInfo.value,
                    modules: containerModules.value
                },
            });
            if (res) {
                message.success('编辑成功！');
            }
            return;
        }
        const userInfo = getUser();
        const containerHTML = demo?.value || document.getElementById('containerMain');
        if (containerHTML) {
            const img = new Image();
            const imgUrl = sessionStorage.getItem('pageBackgroundImage') 
            img.src = imgUrl;
            img.onload = () => {
                containerHTML.style.backgroundImage = `url(${imgUrl})`;
                containerHTML.querySelectorAll('.selected').forEach(element => {
                    element.classList.remove('selected');
                });
                html2canvas(containerHTML, {
                    scale: 0.5, // 提高分辨率
                    useCORS: true, // 允许跨域图片
                    allowTaint: false, // 禁止污染 Canvas
                }).then(async (canvas) => {
                    // 将 Canvas 转换为图片 URL
                    const imgData = canvas.toDataURL('image/png');
                    const formData = new FormData();
                    const fileName = 'project_thumbnail_' + new Date().getTime().toString() + '.png'
                    formData.append('file', dataURLtoBlob(imgData), fileName);
                    const uploadRes = await uploadFile(formData);
                    const res = await add({
                        title: projectTitle.value,
                        json_data: {
                            pageInfo: pageInfo.value,
                            modules: containerModules.value
                        },
                        thumbnail_url: uploadRes,
                        author_id: userInfo?.user_id,
                        author_name: userInfo?.user_name,
                        create_time: '',
                        status:0,
                        module_id: projectOperate.value === 'copy' ? projectId.value : ''
                    });
                    if (res) {
                        message.success('新增项目成功！');
                    }
                });

            };
            img.onerror = (err) => {
                console.error(err)
            }
        }
    };
    //设置为模板
    const setProjectModule = () => { };
    //设置为作品
    const saveProjectCreation = () => { };

    return {
        saveProject,
        setProjectModule,
        saveProjectCreation,
        saveConfirm
    };
}