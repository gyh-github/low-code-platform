export default function (url = "", method = "GET", body = {}) {
    return new Promise((resolve, reject) => {
        console.log(body)
        try {
            fetch(url, {
                method,
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json", }
            }).then((response) => response.json()).then(res => {
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