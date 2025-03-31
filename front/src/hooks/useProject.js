import { useStore } from '@/store';
import { uploadFile } from '@/apis/common';
import { add,edit } from '@/apis/project';
import { storeToRefs } from 'pinia';
import { getUser } from '@/utils/sessionStor';
import html2canvas from 'html2canvas';

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
    const { pageInfo, containerModules, projectTitle } = storeToRefs(store);
    //保存
    const saveProject = async () => {
        const userInfo = getUser();
        const containerHTML = demo?.value || document.getElementById('containerMain');
        if (containerHTML) {
            html2canvas(containerHTML, {
                scale: 2, // 提高分辨率
                useCORS: true, // 允许跨域图片
                allowTaint: false, // 禁止污染 Canvas
                onclone: () => {
                    containerHTML.style.backgroundImage = `url(${sessionStorage.getItem('pageBackgroundImage')})`;
                    containerHTML.querySelectorAll('.selected').forEach(element => {
                        element.classList.remove('selected');
                    });
                }
            }).then(async (canvas) => {
                // 将 Canvas 转换为图片 URL
                const imgData = canvas.toDataURL('image/png');
                const formData = new FormData();
                const fileName = 'project_thumbnail_' + new Date().getTime().toString() + '.png'
                formData.append('file', dataURLtoBlob(imgData), fileName);
                const uploadRes = await uploadFile(formData);
                await add({
                    title: projectTitle.value,
                    json_data: {
                        pageInfo: pageInfo.value,
                        modules: containerModules.value
                    },
                    thumbnail_url: uploadRes,
                    author_id: userInfo?.user_id,
                    author_name: userInfo?.user_name
                })
            });
        }
    };
    //设置为模板
    const setProjectModule = () => { };
    //设置为作品
    const saveProjectCreation = () => { };

    return {
        saveProject,
        setProjectModule,
        saveProjectCreation
    };
}