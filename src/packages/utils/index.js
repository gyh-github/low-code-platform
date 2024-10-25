import json2html from 'json2html'; // 导入模块
const { convert } = json2html; // 从 Json2html 中导入方法

//导出数据
export function exportJSONFn(data) {
    console.log(data)
};

//预览
export function previewFn(data) {
    if (!data) return;

    // const template = {
    //     "<>": "div", "style": { "height": data.container?.height + "px", "width": data.container.width + "px" }, "html": [
    //         data.plates.map((item) => {
    //             return {
    //                 "<>": item.key, "style": { "top": item.top + "px", "left": item.left + "px", "height": item.height + "px", "widht": item.width + "px" }, "html": []
    //             }
    //         })

    //     ]
    // };
    // const html = render(template);
    // console.log(html)
    var http = require('http');
    var json2html = require('json2html')
    http.createServer(function (req, res) {
        var myJson = {
            a_table: [
                { name: 'hugo', tel: '1234561234', email: 'hugo@blah.com' },
                { name: 'joe', tel: '1234569999', email: 'joe@blah.com' }
            ],
            straigh_array: ['a', 'b', 'c'],
            an_object: {
                myAttribute: { a: 1, b: 2 },
                anotherAttribute: { r: 1, d: 2 }
            }
        };
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(json2html.render(myJson));
    }).listen(1337, '127.0.0.1');
}
