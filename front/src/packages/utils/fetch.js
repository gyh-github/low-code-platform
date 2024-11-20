export default function (url = "", method = "GET", body = {}) {
    return new Promise((resolve, reject) => {
        console.log(body);
        const config = url.includes('file') ? {
            method,
            body
        } : ['GET', 'get'].includes(method) ? {
            method,
            headers: { "Content-Type": "application/json", }
        } : {
            method,
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json", }
        }
        try {
            fetch(url, { ...config }).then((response) => response.json()).then(res => {
                console.log(res)
                resolve(res)
            }).catch(err => {
                console.error(err)
                reject(err)
            })
        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}