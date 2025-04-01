//将图片转为base64
export const imgUrlToBase64 = (url) => {
    const _url = url.split('/uploads/')?.[1];
    fetch('/api/uploads/' + _url)
        .then(response => response.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result; // Base64 编码
                //   console.log('Base64 数据:', base64data);

                // 使用 Base64 数据（例如绘制到 Canvas）
                const img = new Image();
                img.src = base64data;

                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/jpeg');
                    sessionStorage.setItem('pageBackgroundImage', dataURL)
                    // console.log('Canvas 导出的 Base64 数据:', dataURL);
                };
            };
            reader.readAsDataURL(blob);
        })
        .catch(error => {
            console.error('图片请求失败:', error);
        });
}